import {Draggable} from "react-beautiful-dnd";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TaskPopUp from "./TaskPopUp";
import React, {cloneElement, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

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

const Task = ({card, sequence, tasks}) => {
    const SECOND = 1000;

    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(tasks.cards[card].content.props.totalTime);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;
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

    const addPropToTaskCard = () => {
        const TaskCard = tasks.cards[card].content;
        return cloneElement(TaskCard, {time: time, timerOn: timerOn, setTimerOn: setTimerOn});
    }

    return (
        <div>
            <Draggable draggableId={card} index={sequence} key={card}>
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
                        <TaskPopUp taskId={card}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Task;