import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {Box, Grid, Typography} from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import React, {useContext, useEffect, useState} from "react";
import useFetch from "../hook/use-fetch";
import {useParams} from "react-router-dom";
import AuthContext from "../store/auth-context";
import TaskCard from "./TaskCard";
import TasksColumn from "./TasksColumn";

const ProjectTasks = ({t, projectInfo}) => {
    const { areTasksLoading, tasksError, sendRequest: fetchTasks } = useFetch();
    const { isChangeTaskStatusLoading, changeTaskStatusError, sendRequest: fetchChangeTaskStatus } = useFetch();

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
                const taskStatus = loadedTasks[i].status;
                const taskColor = getTaskColor(taskStatus);

                tasksContent[loadedTasks[i].id.toString()] = {
                    id: loadedTasks[i].id.toString(),
                    name: loadedTasks[i].name,
                    content: <TaskCard cardColor={taskColor} taskName={loadedTasks[i].name} date="18.04.2022"/>,
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

        const fetchTasksRequest = {
            url: `/project/task/all/${projectId}/details`,
            headers: {
                'Authorization': authCtx.requestToken
            }
        }

        fetchTasks(fetchTasksRequest, handleProjectTasks);

    }, [fetchTasks]);

    const getTaskColor = (taskStatus) => {
        if (taskStatus === 'UNDONE' || taskStatus === 'DONE') {
            return '#4F6C89';
        } else {
            return '#467AAE';
        }
    }

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
        const taskUpdatedStatus = mapTaskStatus(destination.droppableId);

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

        const draggedTask = tasks.cards[draggableId];
        const newTaskStatus = finish.id.toUpperCase();
        draggedTask.content = <TaskCard cardColor={getTaskColor(newTaskStatus)} taskName={draggedTask.name} date="18.04.2022"/>;

        const newState = {
            ...tasks,
            columns: {
                ...tasks.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

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
        <>
            <GridViewIcon fontSize='medium' sx={{float: 'right'}}/>
            <FormatListBulletedIcon fontSize='medium' sx={{float: 'right'}}/>
            <Grid container alignItems="stretch" justifyContent="center">
                <DragDropContext onDragEnd={onDragEnd}>
                    <TasksColumn t={t} tasks={tasks} type='undone'/>
                    <TasksColumn t={t} tasks={tasks} type='inProgress'/>
                    <TasksColumn t={t} tasks={tasks} type='done'/>
                </DragDropContext>
            </Grid>
        </>
    );
}

export default ProjectTasks;