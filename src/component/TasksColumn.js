import {Box, Grid, Typography} from "@material-ui/core";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TaskPopUp from "./TaskPopUp";

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

const TasksColumn = ({t, tasks, type}) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Grid item xs={4}>
            <Box sx={{
                width: '100%',
                height: 80,
                alignItems: 'center',
                display: 'flex',
                float: 'left',
                borderRight: type !== 'DONE' ? '1px solid black' : 'none',
                borderBottom: '1px solid black'
            }}>
                <Typography variant="h4" fontFamily="Sora"
                            style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t(type.toLowerCase())}</Typography>
            </Box>
            <Box sx={{width: '100%', height: 500, display: 'flex', borderRight: type !== 'DONE' ? '1px solid black' : 'none'}}>
                <Droppable droppableId={type} direction="vertical" type="cards">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}
                             style={{width: '100%', height: '100%', marginLeft: '20%'}}>
                            <Stack direction="column" alignItems="center" spacing={1} sx={{width: '100%'}}>
                            <div>
                                {tasks.columns[type]?.cardIds.map((card, sequence) => (
                                    <div>
                                    <Draggable draggableId={card} index={sequence} key={card}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick = {handleOpen}
                                            >
                                                {tasks.cards[card]?.show &&
                                                <div style={{width: 450}}>{tasks.cards[card]?.content}</div>}
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
                                ))}
                                {provided.placeholder}
                                </div>
                            </Stack>
                        </div>
                    )}
                </Droppable>
            </Box>
        </Grid>
    );
}

export default TasksColumn;