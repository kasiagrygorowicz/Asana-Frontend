import React, {useState} from 'react'
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


function Project({t}) {
    const [initialState, setinitialState] = useState({
        // Przy pobieraniu danych załadować tutaj taski
        cards: {
            card1: {
                id: 'card1',
                title: 'A',
                content: <TaskCard cardColor="#4F6C89" taskName="Task A" date="18.04.2022"/>,
                show: true
            },
            card2: {
                id: 'card2',
                title: 'B',
                content: <TaskCard cardColor="#467AAE" taskName="Task B" taskType="inprogress" date="28.03.2022"/>,
                show: true
            },
            card3:  {
                id: 'card3',
                title: 'C',
                content: <TaskCard cardColor="#4F6C89" taskName="Task C" taskType="done" date="28.03.2022"/>,
                show: true
            },
            card4:  {
                id: 'card4',
                title: 'D',
                content: <TaskCard cardColor="#4F6C89" taskName="Task D" date="01.03.2022"/>,
                show: true
            },
            card5: {
                id: 'card5',
                title: 'E',
                content: <TaskCard cardColor="#4F6C89" taskName="Task E" taskType="done" date="14.03.2022"/>,
                show: true
            },
            card6: {
                id: 'card6',
                title: 'F',
                content: <TaskCard cardColor="#4F6C89" taskName="Task F" taskType="done" date="17.02.2022"/>,
                show: true
            },
            card7: {
                id: 'card7',
                title: 'G',
                content: <TaskCard cardColor="#4F6C89" taskName="Task G" date="11.05.2022"/>,
                show: true
            },
            card8: {
                id: 'card8',
                title: 'H',
                content: <TaskCard cardColor="#4F6C89" taskName="Task H" taskType="done" date="05.04.2022"/>,
                show: true
            }
        },
        // Wpisać do cardIds karty w zależności od ich stanu
        columns: {
            'undone': {
                id: 'undone',
                cardIds: ['card1', 'card4', 'card7']
            },
            'inprogress': {
                id: 'inprogress',
                cardIds: ['card2']
            },
            'done': {
                id: 'done',
                cardIds: ['card3', 'card5', 'card6', 'card8']
            }
        },
    })
    
    const onDragEnd = result => {
        const {destination, source, draggableId, type} = result;
        if(!destination) {
            return;
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index)
        {
            return;
        }
        const start = initialState.columns[source.droppableId];
        const finish = initialState.columns[destination.droppableId];
    
        if(start === finish){
            const newCardIds = Array.from(start.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                cardIds: newCardIds
            };
            const newState = {
                ...initialState,
                columns: {
                    ...initialState.columns,
                    [newColumn.id]: newColumn
                }
            };
            setinitialState(newState);
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
            ...initialState,
            columns: {
                ...initialState.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        setinitialState(newState);
        // Stan taska możemy zmienić tutaj, nowy stan taska to destination.droppableId, a stary source.droppableId
    };
    let { projectId } = useParams();
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
                                        {initialState.columns['undone'].cardIds.map((card, sequence) => (
                                            <Draggable draggableId={card} index={sequence} key={card}>
                                                {(provided, snapshot) => (
                                                    <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        {initialState.cards[card].show&&<div style={{width: 450}}>{initialState.cards[card].content}</div>}
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
                    <Droppable droppableId="inprogress" direction="vertical" type="cards">
                                {provided => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} style={{width: '100%', height: '100%'}}>
                                        <Stack direction="column" alignItems="center" spacing={1} sx={{ width: '140%'}}>
                                        {initialState.columns['inprogress'].cardIds.map((card, sequence) => (
                                            <Draggable draggableId={card} index={sequence} key={card}>
                                                {(provided, snapshot) => (
                                                    <div style={{}}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        {initialState.cards[card].show&&<div style={{width: 450}}>{initialState.cards[card].content}</div>}
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
                                        {initialState.columns['done'].cardIds.map((card, sequence) => (
                                            <Draggable draggableId={card} index={sequence} key={card}>
                                                {(provided, snapshot) => (
                                                    <div style={{}}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        {initialState.cards[card].show&&<div style={{width: 450}}>{initialState.cards[card].content}</div>}
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