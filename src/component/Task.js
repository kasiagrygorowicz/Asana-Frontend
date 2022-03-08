import {Draggable} from "react-beautiful-dnd";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TaskPopUp from "./TaskPopUp";
import React, {cloneElement, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../hook/use-fetch";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#E9ECEF',
        border: '4px solid #195FA5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 30
    },
}));

const Task = ({cardId, sequence, tasks}) => {
    const SECOND = 1000;

    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(tasks.cards[cardId].content.props.totalTime);
    const [lastTimerOffTime, setLastTimerOffTime] = useState(time); // do obliczenia czasu, ktory trzeba dodac do czasu zadania w bazie danych
    const [timerOn, setTimerOn] = useState(false);

    const { isTaskLoading, taskLoadingError, sendRequest: fetchTask } = useFetch();
    const { isTimeUpdated, timeUpdateError, sendRequest: fetchAddTime } = useFetch();

    const [ taskInfo, setTaskInfo ] = useState(null);

    useEffect(() => {
        const handleTask = (response) => {
            setTaskInfo(response);
        }
        const fetchTaskRequest = {
            url: `/project/task/${cardId}`
        }

        fetchTask(fetchTaskRequest, handleTask);
    }, [fetchTask, cardId])

    console.log(lastTimerOffTime);

    useEffect(() => {
        let interval = null;
        setLastTimerOffTime(time);
        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + SECOND / 1000);
            }, SECOND);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [timerOn]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const classes = useStyles();

    const getTaskCard = () => {
        const TaskCard = addPropToTaskCard();
        return TaskCard;
    }

    const handleTimer = () => {
        if (timerOn) {
            setTimerOn(false);
            const timeToAdd = time - lastTimerOffTime;
            const fetchAddTimeRequest = {
                url: `/project/task/${cardId}/time/add`,
                method: 'PUT',
                body: {
                    'timeToAdd': timeToAdd
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetchAddTime(fetchAddTimeRequest);
        } else {
            setTimerOn(true);
        }
    }

    const addPropToTaskCard = () => {
        const TaskCard = tasks.cards[cardId].content;
        return cloneElement(TaskCard, {time: time, handleTimer: handleTimer});
    }

    return (
        <div>
            <Draggable draggableId={cardId} index={sequence} key={cardId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={handleOpen}
                    >
                        <div style={{width: 450}}>{getTaskCard()}</div>
                    </div>
                )}
            </Draggable>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <TaskPopUp task={taskInfo}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Task;