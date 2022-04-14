import {
    Box,
    Typography,
    Input
  } from "@material-ui/core";
import * as React from 'react';
import {useContext, useRef, useState} from "react";
import Button from "@mui/material/Button";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import useFetch from "../../hook/use-fetch";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import AddOneMemeber from "../members/AddOneMember";

function AddTaskForm({t, projectInfo}) {
    const taskNameInput = useRef();
    const dueDateInput = useRef();
    const descriptionInput = useRef();
    const { isLoading, error, sendRequest: addTaskRequest } = useFetch();
    const navigate = useNavigate();
    const [ selectedUser, setSelectedUser ] = useState();


    const submitHandler = (event) => {
        event.preventDefault();
        const enteredTaskName = taskNameInput.current.value;
        const enteredDueDate = dueDateInput.current.value;
        const enteredTaskDescription = descriptionInput.current.value;
        const startDate = new Date();
        const startDateJSON = startDate.toJSON();

        const deadlineDate = enteredDueDate.split("/");
        const month = deadlineDate[0];
        const day = deadlineDate[1];
        const year = deadlineDate[2];

        const jsonDate = year + "-" + month + "-" + day + "T18:25:43.511Z"

        const createdProjectAddress = `/project/${projectInfo.id}`;

        const addTaskRequestContent = {
            url: "/project/task/add",
            method: "POST",
            body: {
                'projectId': projectInfo.id,
                'name': enteredTaskName,
                'description': enteredTaskDescription,
                'startDate': startDateJSON,
                "deadLine" : jsonDate,
                "priority" : "MEDIUM",
                "status": "UNDONE",
                "assigneeId": selectedUser.id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log("członka email = " + selectedUser.email + " | id = " + selectedUser.id)
        addTaskRequest(addTaskRequestContent, navigate(createdProjectAddress, { replace: true }));
    }

    const sendSelectedUser = (selected) => {
        setSelectedUser(selected);
    };

    const [value, setValue] = React.useState(null);
    return (
        <form onSubmit={submitHandler}>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('taskName')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input inputRef={taskNameInput} name="name" type="name" placeholder={t('taskNameInput')} disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('dueDate')}:</Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker value={value} onChange={(newValue) => { setValue(newValue); }} renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ width: '15%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input inputRef={dueDateInput} ref={inputRef} {...inputProps} disableUnderline='true' style={{paddingLeft: '10%', width: '70%'}}/>
                {InputProps?.endAdornment}
            </Box>
            )} />
            </LocalizationProvider>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('project')}:</Typography>
            </Box>
            <Box sx={{background: '#4786C6', borderRadius: 30, width: '20%',height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'center', color: 'white', width: '90%', paddingLeft: '5%'}} sx={{ align: 'center' }}>{projectInfo?.name}</Typography>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input inputRef={descriptionInput} name="name" type="name" multiline placeholder={t('descriptionInput')} disableUnderline='true' sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('assigned')}:</Typography>
            </Box>
            <Box sx={{width: '40%', float: 'left', borderRadius: '30px', margin: 10, display: 'flex'}}>
                {projectInfo!=null ? (
                    <AddOneMemeber t={t} projectMembers={projectInfo.members} sendSelectedUser={sendSelectedUser}/>
                    ) : (<div></div>)}
            </Box>
            <Box sx={{clear: 'both', height: 20}}></Box>
            <Button type="submit" variant="contained" size="large" sx={{ width: 250, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                {t('submit')}
                </Typography>
            </Button>
            <Box sx={{margin: 30}}>
            </Box>
        </form>
    );
  }
  export default AddTaskForm;