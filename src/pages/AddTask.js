import {
    Container,
    Box,
    Typography
  } from "@material-ui/core";
  import * as React from 'react';

import {useNavigate} from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from "react-router-dom";
import useFetch from "../hook/use-fetch";
import { useState, useEffect } from "react";
import AddTaskForm from "../component/task/AddTaskForm";

function AddTask({t}) {
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    const [ projectInfo, setProjectInfo ] = useState(null);
    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleProject = (response) => {
            const projectInfo = {
              id: response.id,
              name: response.name,
              category: response.category,
              description: response.description,
              members: response.members
            };
            setProjectInfo(projectInfo);
        }

        const fetchProjectRequest = {
            url: `/project/${projectId}`
        }

        fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject, projectId])

    return (
        <Container maxWidth="xl" style={{marginLeft:'15%', maxWidth:'85%'}}>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{ width: '75%', height: 750, alignItems: 'center', float: 'left', marginLeft: 50}}>
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('addtask')}</Typography>
            </Box>
            <Box sx={{ width: '130%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <AddTaskForm t={t} projectInfo={projectInfo}/>
            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddTask;