import {
    Box,
    Typography,
    Input,
    Select,
    MenuItem,
    FormControl
  } from "@material-ui/core";
import * as React from 'react';
import {useContext, useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import useFetch from "../hook/use-fetch";
import {useNavigate} from "react-router-dom";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode"

const useStyles = makeStyles({
    select: {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  });

function AddTaskForm({t}) {
    const taskNameInput = useRef();
    const dueDateInput = useRef();
    const descriptionInput = useRef();
    const { isLoading, error, sendRequest: addTaskRequest } = useFetch();
    const { areProjectsLoading, projectsError, sendRequest: fetchUserProjects } = useFetch();
    const [ userProjects, setUserProjects ] = useState([]);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const handleGetUserProjects = (projectsObj) => {
            const loadedUserProjects = [];
            for (const projectKey in projectsObj) {
                loadedUserProjects.push({ id: projectsObj[projectKey].id, name: projectsObj[projectKey].name });
            }
            setUserProjects(loadedUserProjects);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/project/user/${userId}`;
        const fetchUserProjectsRequest = {
            url: urlRequest,
            headers: {
                'Authorization': authCtx.requestToken
            }
        };

        fetchUserProjects(fetchUserProjectsRequest, handleGetUserProjects);
    }, [fetchUserProjects]);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredTaskName = taskNameInput.current.value;
        const enteredDueDate = dueDateInput.value;
        // const projectId = project.id;
        const enteredTaskDescription = descriptionInput.current.value;

        // const handleAddTask = (response) => {
        //     const projectId = response['projectId'];
        //     const createdProjectAddress = `/project/${projectId}`;
        //     alert(projectId);
        //     navigate(createdProjectAddress, { replace: true })
        // }

        const addTaskRequestContent = {
            url: "/project/task/add",
            method: "POST",
            body: {
                'projectId': 1,
                'name': enteredTaskName,
                'description': enteredTaskDescription,
                'startDate': "2012-04-23T18:25:43.511Z",
                "deadLine" : "2012-08-23T18:25:43.511Z",
                "priority" : "MEDIUM",
                "status": "UNDONE"
            },
            headers: {
                'Authorization': authCtx.requestToken,
                'Content-Type': 'application/json'
            }
        };

        addTaskRequest(addTaskRequestContent, navigate(-1));
    }

    let projectsToDisplay = userProjects.map((project) => (
        <MenuItem value={project.id}>{project.name}</MenuItem>
    ));

    const [value, setValue] = React.useState(null);
    const classes = useStyles();
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
            <FormControl style={{marginLeft: '5%', width: '90%', background: '#4786C6', borderRadius: 30, disableUnderline: 'true'}}>
            <Select disableUnderline={true} defaultValue={1} style={{color: 'white'}} className={classes.select} inputProps={{
                classes: {
                    icon: classes.icon,
                    root: classes.root,
                },
            }}>
                {projectsToDisplay}
            </Select>
            </FormControl>
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
            <Button variant="contained" size="large" sx={{ width: 300, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none'}}>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginRight: 2}}/>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('assignedAdd')}
                </Typography>
            </Button>
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