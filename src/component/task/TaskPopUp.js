import {
    Box,
    Typography,
    Input,
    Container
  } from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useContext, useEffect, useState, useRef} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { color } from "@mui/system";
import useFetch from "../../hook/use-fetch";
import {useParams} from "react-router-dom";
import useUserProjects from "../../hook/use-projects";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {timerActions} from "../../store/timer";
import AddOneMember from "./AddOneMember";

export default function TaskPopUp(props) {
    const navigate = useNavigate();
    const { isLoadingDelete, errorDelete, sendRequest: deleteTaskRequest} = useFetch();
    const { isLoadingEdit, errorEdit, sendRequest: editTaskRequest } = useFetch();
    const { isLoadingSetTimer, errorSetTimer, sendRequest: setTimerRequest } = useFetch();
    const [ setterOn, setSetterOn ] = useState(false);
    

    const { isMembersLoading, membersError, sendRequest: fetchMembers } = useFetch();
    const [members, setMembers] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const handleGetUsers = (usersObj) => {
            const loadedUsers = [];
            for (const usersKey in usersObj) {
                loadedUsers.push({ 
                    id: usersObj[usersKey].id, 
                    name: usersObj[usersKey].name,
                    email: usersObj[usersKey].email });
            }
            setMembers(loadedUsers);
            console.log("członków pobrano = " + loadedUsers.length)
        }

        const urlRequest = `/project/${props.project.id}/members/all`;
        const fetchUsersRequest = {
            url: urlRequest
        };
        fetchMembers(fetchUsersRequest, handleGetUsers);
    }, [fetchMembers]);


    const sendSelectedMember = (selected) => {
        setSelectedMember(selected);
    };

    const deleteTaskHandler = () => {

        const deleteTaskRequestContent = {
            url: `/project/task/delete/${props.task.id}`,
            method: "DELETE",
            body: null,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        deleteTaskRequest(deleteTaskRequestContent, navigate(0));
    }
    //TO DO: upewnienie czy chce usunąć taska?

    const timer = useSelector((state) => state.timer).find(timer => timer.id === props.task.id);
    const dispatch = useDispatch();

    const taskNameInput = useRef();
    const dueDateInput = useRef();
    const descriptionInput = useRef();

    



    const submitHandler = (event) => {
        event.preventDefault();
        const enteredTaskName = taskNameInput.current.value;
        const enteredDueDate = dueDateInput.current.value;
        const enteredTaskDescription = descriptionInput.current.value;

        const deadlineDate = enteredDueDate.split("/");
        const month = deadlineDate[0];
        const day = deadlineDate[1];
        const year = deadlineDate[2];

        const jsonDate = year + "-" + month + "-" + day + "T18:25:43.511Z"
        // const createdProjectAddress = `/project/${projectId}`;

        const editTaskRequestContent = {
            url: `/project/task/edit/${props.task.id}`,
            method: "PUT",
            body: {
                'name': enteredTaskName,
                'description': enteredTaskDescription,
                "startDate": props.task.startDate,
                "deadLine": jsonDate,
                "priority": props.task.priority,
                "status": props.task.status,
                "totalTime": props.task.totalTime,
                "assigneeId" : selectedMember.id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        editTaskRequest(editTaskRequestContent, navigate(0));
    }

    const t = useTranslation()[0]
    const [startValue, setStartValue] = React.useState(new Date(props.task.startDate));
    const [value, setValue] = React.useState(new Date(props.task.deadLine));

    const handleClick = () => {
        props.handleTimer();
    }

    const handleReset = () => {
        dispatch(timerActions.resetTime(props.task.id));
        const setTimerRequestContent = {
            url: `/project/task/${props.task.id}/settime`,
            method: "PUT",
            body: {
                time: 0
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimerRequest(setTimerRequestContent);
    }

    const handleTimeSetter = () => {
        if (setterOn) {
            setSetterOn(false);
        }
        else {
            setSetterOn(true);
        }
    }

    const hoursInput = useRef();
    const minutesInput = useRef();
    const secondsInput = useRef();

    const handleSetterSubmit = () => {
        const hoursValue = parseInt(hoursInput.current.value);
        const minutesValue = parseInt(minutesInput.current.value);
        const secondsValue = parseInt(secondsInput.current.value);

        const timeValue = hoursValue * 3600 + minutesValue * 60 + secondsValue;

        const actionPayload = {
            taskId: props.task.id,
            timeValue: timeValue
        };

        dispatch(timerActions.setTime(actionPayload));
        const setTimerRequestContent = {
            url: `/project/task/${props.task.id}/settime`,
            method: "PUT",
            body: {
                time: timeValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimerRequest(setTimerRequestContent);
        setSetterOn(false);
    }

    const seconds = <span>{("0" + Math.floor(timer.time % 60)).slice(-2)}</span>;
    const minutes = <span>{("0" + Math.floor(timer.time / 60 % 60)).slice(-2)}</span>;
    const hours = <span>{("0" + Math.floor(timer.time / 3600)).slice(-2)}</span>;

    return (
    <form onSubmit={submitHandler}>
    <Container maxWidth='xl'>
    <Box sx={{ width: '70%', height: 80, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input inputRef={taskNameInput} name="name" type="name" defaultValue={props.task.name} placeholder={t('taskNameInput')} disableUnderline='true' 
        sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%', fontSize: 36, fontWeight: 600}}></Input>
    </Box>
    <Button onClick={deleteTaskHandler} variant="contained" size="large" color='error' sx={{ width: 150, height: 40, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
        <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
        {t('delete')}
        </Typography>
    </Button>
    <Box sx={{clear: 'both', height: 10}}></Box>
    {!setterOn && 
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
        <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('time')}:</Typography>
        </Box>
        <Box sx={{ width: '25%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%', paddingLeft: '10%'}}>
            {hours}:{minutes}:{seconds}</Typography>
        <IconButton onClick={handleClick} sx={{paddingRight: '5%', alignSelf: 'right'}}> 
            {!timer.timerOn &&
                <PlayArrowRoundedIcon fontSize='large'/>
            }
            {timer.timerOn &&
                <PauseRoundedIcon fontSize='large'/>
            }
        </IconButton>
        </Box>
        <Box sx={{float: 'left', width: 10}}></Box>
        <Button disabled={timer.timerOn} onClick={handleReset} variant="contained" size="large" sx={{ width: 120, height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
            <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
            {t('reset')}
            </Typography>
        </Button>
        <Box sx={{float: 'left', width: 20}}></Box>
        <Button disabled={timer.timerOn} onClick={handleTimeSetter} variant="contained" size="large" sx={{ width: 150, height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
            <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
            {t('setTime')}
            </Typography>
        </Button>
    </Stack>
    }
    
    {setterOn && 
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
        <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('time')}:</Typography>
        </Box>
        <Box sx={{ width: '28%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Stack
        direction="row"
        spacing={0.25}
        >
            <Box sx={{ width: 20 }}></Box>
            <Box sx={{ width: '27%', border: '1px solid grey'}}>
                <Input inputRef={hoursInput} disableUnderline='true' type="number" inputProps={{min: 0, max: 99}} defaultValue='00' 
                sx={{ align: 'center'}} style={{fontSize: 24, fontWeight: 600, textAlign: 'center', width: 45 }}></Input>
            </Box>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>:</Typography>
            <Box sx={{ width: '27%', border: '1px solid grey'}}>
                <Input inputRef={minutesInput} disableUnderline='true' type="number" inputProps={{min: 0, max: 99}} defaultValue='00'
                sx={{ align: 'center'}} style={{fontSize: 24, fontWeight: 600, textAlign: 'center', width: 45 }}></Input>
            </Box>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>:</Typography>
            <Box sx={{ width: '27%', border: '1px solid grey'}}>
                <Input inputRef={secondsInput} disableUnderline='true' type="number" inputProps={{min: 0, max: 99}} defaultValue='00'
                sx={{ align: 'center'}} style={{fontSize: 24, fontWeight: 600, textAlign: 'center', width: 45 }}></Input>
            </Box>
        </Stack>
        </Box>
        <Box sx={{float: 'left', width: 10}}></Box>
        <Button disabled={timer.timerOn} onClick={handleSetterSubmit} variant="contained" size="large" color="success"
         sx={{ width: 120, height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
            <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
            {t('submit')}
            </Typography>
        </Button>
        <Box sx={{float: 'left', width: 20}}></Box>
        <Button disabled={timer.timerOn} onClick={handleTimeSetter} variant="contained" size="large" color="error"
         sx={{ width: 120, height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
            <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
                {t('cancel')}
            </Typography>
        </Button>
    </Stack>
    }
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
        <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left'}}>{t('description')}:</Typography>
        </Box>
        <Box sx={{ width: '80%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
            <Input inputRef={descriptionInput} name="name" type="name" defaultValue={props.task.description} multiline placeholder={t('descriptionInput')} disableUnderline='true' sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
        </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
    <Box sx={{ width: '35%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('startDate')}:</Typography>
    </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker readOnly value={startValue} onChange={(newValue) => { setStartValue(newValue); }} renderInput={({ inputRef, inputProps, InputProps }) => (
        <Box sx={{ width: '35%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input disableUnderline='true' ref={inputRef} {...inputProps} style={{paddingLeft: '10%', width: '70%'}}/>
        {InputProps?.endAdornment}
    </Box>
    )} />
    </LocalizationProvider>
    <Box sx={{float: 'left', width: 100}}></Box>
    {/* <Box sx={{clear: 'both', height: 10}}></Box> */}
    <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('project')}:</Typography>
    </Box>
    <Box sx={{background: '#4786C6', borderRadius: 30, width: '40%', height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'center', color: 'white', width: '90%', paddingLeft: '5%'}} sx={{ align: 'center' }}>{props.project.name}</Typography>
    </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
    <Box sx={{ width: '35%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('dueDate')}:</Typography>
    </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker value={value} onChange={(newValue) => { setValue(newValue); }} renderInput={({ inputRef, inputProps, InputProps }) => (
        <Box sx={{ width: '35%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input inputRef={dueDateInput} ref={inputRef} {...inputProps} disableUnderline='true' defaultValue='03/04/2022' style={{paddingLeft: '10%', width: '70%'}}/>
        {InputProps?.endAdornment}
    </Box>
    )} />
    </LocalizationProvider>
    <Box sx={{float: 'left', width: 100}}></Box>
    <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>Status:</Typography>
    </Box>
    <Box sx={{background: '#4786C6', borderRadius: 30, width: '40%', height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'center', color: 'white', width: '90%', paddingLeft: '5%'}} sx={{ align: 'center' }}>{props.task.status}</Typography>
    </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
    <Box sx={{ width: '25%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left'}}>{t('assigned')}:</Typography>
    </Box>
    <Box sx={{width: '40%', float: 'left', borderRadius: '30px', display: 'flex'}}>
                {props.task!=null && members!=null ? (
                    <AddOneMember t={t} projectMembers={members} currentSelectedUser={props.task.assignees[0]} sendSelectedUser={sendSelectedMember}/>
                    ) : (<div></div>)}
    </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 20}}></Box>
    <Button type="submit" variant="contained" size="large" sx={{ width: 150, height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
        <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
        {t('submit')}
        </Typography>
    </Button>
    <Box sx={{margin: 30}}>
    </Box>
    </Container>
    </form>
    );
}

