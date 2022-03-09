import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {Grid} from "@material-ui/core";
import {DragDropContext} from "react-beautiful-dnd";
import React, {cloneElement, useContext, useEffect, useState} from "react";
import useFetch from "../hook/use-fetch";
import {useParams} from "react-router-dom";
import TaskCard from "./TaskCard";
import TasksColumn from "./TasksColumn";

const ProjectTasks = ({t, projectInfo}) => {
    const { areTasksLoading, tasksError, sendRequest: fetchTasks } = useFetch();
    const { isChangeTaskStatusLoading, changeTaskStatusError, sendRequest: fetchChangeTaskStatus } = useFetch();

    const [ tasks, setTasks ] = useState({ cards: {}, columns: {} });
    const [ timerOnInfoState, setTimerOnInfoState ] = useState(false);
    const [ timeInfoState, setTimeInfoState ] = useState(0);

    let { projectId } = useParams();

    useEffect(() => {
        const handleProjectTasks = (tasksObj) => {
            const loadedTasks = [];
            for (const taskKey in tasksObj) {
                loadedTasks.push({
                    id: tasksObj[taskKey].id,
                    name: tasksObj[taskKey].name,
                    description: tasksObj[taskKey].description,
                    deadLine: tasksObj[taskKey].deadLine,
                    status: tasksObj[taskKey].status,
                    totalTime: tasksObj[taskKey].totalTime
                });
            }

            let tasksContent = {};
            for (let i = 0; i < loadedTasks.length; i++) {
                const taskStatus = loadedTasks[i].status;
                const taskColor = getTaskColor(taskStatus);

                tasksContent[loadedTasks[i].id.toString()] = {
                    id: loadedTasks[i].id.toString(),
                    name: loadedTasks[i].name,
                    content: <TaskCard key={loadedTasks[i].id}
                                       cardColor={taskColor}
                                       totalTime={loadedTasks[i].totalTime}
                                       taskName={loadedTasks[i].name}
                                       taskType={taskStatus}
                                       date="18.04.2022"/>,
                    show: true
                }
            }
            const columnsContent =
                {
                    'UNDONE': {
                        id: 'UNDONE',
                        cardIds: loadedTasks.filter(task => task.status === 'UNDONE').map(task => task.id.toString())
                    },
                    'DOING': {
                        id: 'DOING',
                        cardIds: loadedTasks.filter(task => task.status === 'DOING').map(task => task.id.toString())
                    },
                    'DONE': {
                        id: 'DONE',
                        cardIds: loadedTasks.filter(task => task.status === 'DONE').map(task => task.id.toString())
                    }
                }

            setTasks({
                cards: tasksContent,
                columns: columnsContent
            });
        }

        const fetchTasksRequest = {
            url: `/project/task/all/${projectId}/details`
        }

        fetchTasks(fetchTasksRequest, handleProjectTasks);

    }, [fetchTasks, projectId]);

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
        const taskUpdatedStatus = destination.droppableId;

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


        // Zmiana wyglądu taska
        const draggedTask = tasks.cards[draggableId];
        const newTaskStatus = finish.id;
        console.log(tasks.cards[draggableId]);
        draggedTask.content = <TaskCard
                                        key={draggableId}
                                        cardColor={getTaskColor(newTaskStatus)}
                                        taskName={draggedTask.name}
                                        taskType={newTaskStatus}
                                        date="18.04.2022"
                                        handleTimerClick={handleTimerClick}
                                        timerOnInfo={timerOnInfoState}
                                        totalTime={timeInfoState}
        />;

        // Aktualizacja stanu tasków
        const newState = {
            ...tasks,
            columns: {
                ...tasks.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        changeTaskStatus(draggableId, taskUpdatedStatus, newState);
    };

    const handleTimerClick = (props) => {
        const TaskCard = props.tasks.cards[props.cardId].content;
        let propsToAdd = {
            time: props.time
        }
        return cloneElement(TaskCard, propsToAdd);
    }

    const changeTaskStatus = (taskId, taskUpdatedStatus, updatedTasksState) => {
        const changeTaskStatusRequest = {
            url: `/project/task/edit/status/${taskId}`,
            method: 'PUT',
            body: {
                'updatedTask': taskUpdatedStatus
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetchChangeTaskStatus(changeTaskStatusRequest);
        if (!changeTaskStatusError) {
            setTasks(updatedTasksState);
        }
    }

    const getTimerOnInfo = (timerOn, time) => {
        setTimerOnInfoState(timerOn);
        setTimeInfoState(time);
    }

    return (
        <>
            <GridViewIcon fontSize='medium' sx={{float: 'right'}}/>
            <FormatListBulletedIcon fontSize='medium' sx={{float: 'right'}}/>
            <Grid container alignItems="stretch" justifyContent="center">
                <DragDropContext onDragEnd={onDragEnd}>
                    <TasksColumn t={t} tasks={tasks} informProjectTasks={getTimerOnInfo} type='UNDONE'/>
                    <TasksColumn t={t} tasks={tasks} informProjectTasks={getTimerOnInfo} type='DOING'/>
                    <TasksColumn t={t} tasks={tasks} informProjectTasks={getTimerOnInfo} type='DONE'/>
                </DragDropContext>
            </Grid>
        </>
    );
}

export default ProjectTasks;