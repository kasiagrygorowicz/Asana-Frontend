import React, {useContext, useEffect, useReducer, useState} from 'react'
import {
    Container,
    Grid,
    Box,
    Typography
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import VerticalBar from '../component/VerticalBar';
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskCard from '../component/TaskCard'
import {
    DragDropContext,
    Droppable,
    Draggable
  } from 'react-beautiful-dnd';
import useFetch from "../hook/use-fetch";
import AuthContext from "../store/auth-context";
import ProjectTasks from "../component/ProjectTasks";


// TODO: dodać zapamiętywanie kolejności tasków
function Project({t}) {
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    const [ projectInfo, setProjectInfo ] = useState(null);
    const { projectId } = useParams();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const handleProject = (response) => {
            const projectInfo = {
              id: response.id,
              name: response.name,
              category: response.category,
              description: response.description
            };
            setProjectInfo(projectInfo);
        }

        const fetchProjectRequest = {
            url: `/project/${projectId}`,
            headers: {
                'Authorization': authCtx.requestToken
            }
        }

        fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject, projectId])


    return (
        <Container maxWidth="x1">
            <VerticalBar t={t}/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Link to='/addtask'>
                <Button variant="contained" sx={{ width: 270, height: 50, alignSelf: 'end', borderRadius: 30, textTransform: 'none', float: 'right', marginTop: 2}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('addtask')}
                </Typography>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginLeft: 2}}/> 
            </Button>
                </Link>
                <Typography variant="h3" fontFamily="Sora">{projectInfo?.name}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{ margin: 5}}></Box>

                <ProjectTasks t={t} projectInfo={projectInfo}/>

            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default Project;