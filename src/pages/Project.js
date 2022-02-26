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


// TODO: dodać zapamiętywanie kolejności tasków
function Project({t}) {
    const { areTasksLoading, tasksError, sendRequest: fetchTasks } = useFetch();
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    const { isChangeTaskStatusLoading, changeTaskStatusError, sendRequest: fetchChangeTaskStatus } = useFetch();

    const [ projectInfo, setProjectInfo ] = useState(null);
    const [ tasks, setTasks ] = useState({ cards: {}, columns: {} });

    let { projectId } = useParams();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const handleProjectTasks = (tasksObj) => {
            const loadedTasks = [];
            for (const taskKey in tasksObj) {
                loadedTasks.push({
                    id: tasksObj[taskKey].id,
                    name: tasksObj[taskKey].name,
                    description: tasksObj[taskKey].description,
                    deadLine: tasksObj[taskKey].deadLine,
                    status: tasksObj[taskKey].status
                });
            }

            let tasksContent = {};
            for (let i = 0; i < loadedTasks.length; i++) {
              tasksContent[loadedTasks[i].id.toString()] = {
                  id: loadedTasks[i].id.toString(),
                  name: loadedTasks[i].name,
                  content: <TaskCard cardColor="#4F6C89" taskName={loadedTasks[i].name} date="18.04.2022"/>,
                  show: true
              }
            }
            const columnsContent =
            {
                'undone': {
                    id: 'undone',
                    cardIds: loadedTasks.filter(task => task.status === 'UNDONE').map(task => task.id.toString())
                },
                'inProgress': {
                    id: 'inProgress',
                    cardIds: loadedTasks.filter(task => task.status === 'DOING').map(task => task.id.toString())
                },
                'done': {
                    id: 'done',
                    cardIds: loadedTasks.filter(task => task.status === 'DONE').map(task => task.id.toString())
                }
            }

            setTasks({
                cards: tasksContent,
                columns: columnsContent
            });
        }

        const handleProject = (response) => {
            const projectName = response['name'];
            setProjectInfo(projectName);
        }

        const fetchTasksRequest = {
            url: `/project/task/all/${projectId}/details`,
            headers: {
                'Authorization': authCtx.requestToken
            }
        }
        const fetchProjectRequest = {
            url: `/project/${projectId}`,
            headers: {
                'Authorization': authCtx.requestToken
            }
        }

        fetchProject(fetchProjectRequest, handleProject);
        fetchTasks(fetchTasksRequest, handleProjectTasks);

    }, [fetchTasks, fetchProject]);

    const onDragEnd = result => {
        const {destination, source, draggableId, type} = result;
        if(!destination) {
            return;
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index)
        {
            return;
        }
        const start = tasks.columns[source.droppableId];
        const finish = tasks.columns[destination.droppableId];

        if(start === finish){
            const newCardIds = Array.from(start.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                cardIds: newCardIds
            };
            const newState = {
                ...tasks,
                columns: {
                    ...tasks.columns,
                    [newColumn.id]: newColumn
                }
            };
            setTasks(newState);
            return;
        }
        const startCardIds = Array.from(start.cardIds);
        startCardIds.splice(source.index, 1);

        const newStart = {
            ...start,
            cardIds: startCardIds
        };
        const finishCardIds = Array.from(finish.cardIds);
        finishCardIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            cardIds: finishCardIds
        };
        const newState = {
            ...tasks,
            columns: {
                ...tasks.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        const taskUpdatedStatus = mapTaskStatus(destination.droppableId);
        changeTaskStatus(draggableId, taskUpdatedStatus, newState);
        // Stan taska możemy zmienić tutaj, nowy stan taska to destination.droppableId, a stary source.droppableId
    };

    const mapTaskStatus = (taskStatus) => {
        if (taskStatus === 'inProgress') {
            return 'DOING';
        }
        return taskStatus;
    }

    const changeTaskStatus = (taskId, taskUpdatedStatus, updatedTasksState) => {
        const changeTaskStatusRequest = {
            url: `/project/task/edit/status/${taskId}`,
            method: 'PUT',
            body: {
                'updatedTask': taskUpdatedStatus
            },
            headers: {
                'Authorization': authCtx.requestToken,
                'Content-Type': 'application/json'
            }
        }
        fetchChangeTaskStatus(changeTaskStatusRequest);
        if (!changeTaskStatusError) {
            setTasks(updatedTasksState);
        }
    }

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
                <Typography variant="h3" fontFamily="Sora">{projectId}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{ margin: 5}}></Box>
            <GridViewIcon fontSize='medium' sx={{float: 'right'}}/>
            <FormatListBulletedIcon fontSize='medium' sx={{float: 'right'}}/>
            <Grid container alignItems="stretch" justifyContent="center">
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid item xs={4} >
                    <Box sx={{ width: '100%', height: 80, alignItems: 'center', display: 'flex', float: 'left', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t('undone')}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 450, display: 'flex', borderRight: '1px solid black'}}>
                            <Droppable droppableId="undone" direction="vertical" type="cards">
                                {provided => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} style={{width: '100%', height: '100%'}}>
                                        <Stack direction="column" alignItems="center" spacing={1} sx={{ width: '140%'}}>
                                        {tasks.columns['undone']?.cardIds.map((card, sequence) => (
                                            <Draggable draggableId={card} index={sequence} key={card}>
                                                {(provided, snapshot) => (
                                                    <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        {tasks.cards[card]?.show&&<div style={{width: 450}}>{tasks.cards[card]?.content}</div>}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </Stack>
                                    </div>
                                )}
                            </Droppable>
                    </Box>
                </Grid>

                <Grid item xs={4} >
                    <Box sx={{ width: '100%', height: 80, alignItems: 'center', display: 'flex', float: 'left', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t('inprogress')}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 450, display: 'flex', borderLeft: '1px solid black'}}>
                    <Droppable droppableId="inProgress" direction="vertical" type="cards">
                                {provided => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} style={{width: '100%', height: '100%'}}>
                                        <Stack direction="column" alignItems="center" spacing={1} sx={{ width: '140%'}}>
                                        {tasks.columns['inProgress']?.cardIds.map((card, sequence) => (
                                            <Draggable draggableId={card} index={sequence} key={card}>
                                                {(provided, snapshot) => (
                                                    <div style={{}}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        {tasks.cards[card]?.show&&<div style={{width: 450}}>{tasks.cards[card].content}</div>}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </Stack>
                                    </div>
                                )}
                            </Droppable>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Box sx={{ width: '100%', height: 80, alignItems: 'center', display: 'flex', float: 'left', borderBottom: '1px solid black'}}>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t('done')}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 450, display: 'flex', borderLeft: '1px solid black'}}>
                    <Droppable droppableId="done" direction="vertical" type="cards">
                                {provided => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} style={{width: '100%', height: '100%'}}>
                                        <Stack direction="column" alignItems="center" spacing={1} sx={{ width: '140%'}}>
                                        {tasks.columns['done']?.cardIds.map((card, sequence) => (
                                            <Draggable draggableId={card} index={sequence} key={card}>
                                                {(provided, snapshot) => (
                                                    <div style={{}}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        {tasks.cards[card]?.show&&<div style={{width: 450}}>{tasks.cards[card].content}</div>}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </Stack>
                                    </div>
                                )}
                            </Droppable>
                    </Box>
                </Grid>
                </DragDropContext>
            </Grid>
            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default Project;