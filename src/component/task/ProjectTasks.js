import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {Grid, Box} from "@material-ui/core";
import {DragDropContext} from "react-beautiful-dnd";
import React, {useContext, useEffect, useState} from "react";
import useFetch from "../../hook/use-fetch";
import {useParams} from "react-router-dom";
import TaskCard from "./TaskCard";
import TasksColumn from "./TasksColumn";
import {useDispatch, useSelector} from "react-redux";
import {timerActions} from "../../store/timer";
import {assigneeActions} from "../../store/assignee";
import member from "../members/Member";
import randomColor from "randomcolor";

const ProjectTasks = ({t, projectInfo, unicornFun}) => {
    const dispatch = useDispatch();

    const { areTasksLoading, tasksError, sendRequest: fetchTasks } = useFetch();
    const { isChangeTaskStatusLoading, changeTaskStatusError, sendRequest: fetchChangeTaskStatus } = useFetch();

    const timers = useSelector((state) => state.timer);
    const [ tasks, setTasks ] = useState({ cards: {}, columns: {} });

    let { projectId } = useParams();

    const [ isStart, setIsStart ] = useState(true);

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
                    totalTime: tasksObj[taskKey].totalTime,
                    assignees: tasksObj[taskKey].assignees
                });
            }

            let tasksContent = {};
            for (let i = 0; i < loadedTasks.length; i++) {
                const taskStatus = loadedTasks[i].status;
                const taskColor = getTaskColor(taskStatus);
                const taskDateJSON = loadedTasks[i].deadLine;
                const firstSplit = taskDateJSON.split("T");
                const dateSplit = firstSplit[0].split("-");
                const taskDate = dateSplit[2] + "." + dateSplit[1] + "." + dateSplit[0];
                // console.log(loadedTasks[i].assignees);

                const taskTimer = {
                    id: loadedTasks[i].id,
                    timerOn: false,
                    time: loadedTasks[i].totalTime,
                    lastTimerOffTime: loadedTasks[i].totalTime
                }

                const assigneeMember = loadedTasks[i].assignees[0] ?? undefined;

                if (assigneeMember !== undefined) {
                    const assignee = {
                        taskId: loadedTasks[i].id,
                        memberId: assigneeMember.id,
                        memberName: assigneeMember.name,
                        memberEmail: assigneeMember.email,
                        randomColor: randomColor()
                    }
                    dispatch(assigneeActions.addAssignee(assignee));
                }

                dispatch(timerActions.addTimer(taskTimer));

                tasksContent[loadedTasks[i].id.toString()] = {
                    id: loadedTasks[i].id.toString(),
                    name: loadedTasks[i].name,
                    content: <TaskCard
                                       id={loadedTasks[i].id}
                                       key={loadedTasks[i].id}
                                       timer={taskTimer}
                                       cardColor={taskColor}
                                       totalTime={loadedTasks[i].totalTime}
                                       taskName={loadedTasks[i].name}
                                       taskType={taskStatus}
                                       date={taskDate}
                                       assingnee={loadedTasks[i].assignees[0] ?? undefined}
                    />,
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

    const areAllTaskIsCompleted = () => {
        if(tasks.columns.DOING.cardIds.length === 0 && tasks.columns.UNDONE.cardIds.length === 0){
            if(!isStart) {
                unicornFun();
            }
        }
    }

    const onDragEnd = result => {
        setIsStart(false);
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
        draggedTask.content = <TaskCard
                                  key={draggableId}
                                  id={parseInt(draggableId)}
                                  cardColor={getTaskColor(newTaskStatus)}
                                  taskName={draggedTask.name}
                                  taskType={newTaskStatus}
                                  date={draggedTask.content.props.date}
                                  totalTime={draggedTask.content.props.totalTime}
                                  timer={draggedTask.content.props.timer}
                                  // assignee={draggedTask.content.props.assignee}

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

    useEffect(() => {
        if(!isStart) {
            areAllTaskIsCompleted();
        }
    }, [tasks]);

    return (
        <>
            <Grid container alignItems="stretch" justifyContent="center">
                <DragDropContext onDragEnd={onDragEnd}>
                    <TasksColumn t={t} tasks={tasks} type='UNDONE' key='UNDONE'/>
                    <TasksColumn t={t} tasks={tasks} type='DOING' key='DOING'/>
                    <TasksColumn t={t} tasks={tasks} type='DONE' key='DONE'/>
                </DragDropContext>
            </Grid>
        </>
    );
}

export default ProjectTasks;