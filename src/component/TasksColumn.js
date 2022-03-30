import {Box, Grid, Popover, Typography} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import React, {useState} from "react";
import Task from "./Task";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import {AccessTime} from "@mui/icons-material";


function TimeIconPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div >
            <AccessTime onClick={handleClick}/>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </div>
    );
}





const TasksColumn = ({t, tasks, type}) => {
    return (
        <Grid item xs={4}>
            <Box sx={{
                width: '100%',
                height: 80,
                float: 'left',
                borderRight: type !== 'DONE' ? '1px solid black' : 'none',
                borderBottom: '1px solid black',
                display: 'flex',
                flexDirection: 'row',
                alignItems :'center',
                justifyContent :'center'

                // bgcolor:'blue'
            }}>


                <Typography variant="h4" fontFamily="Sora"
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                // width: '60%',
                                marginRight:'5px'
                            }}>{t(type.toLowerCase())}
                </Typography>
                <TimeIconPopover/>



            </Box>
            <Box sx={{
                width: '100%',
                height: 500,
                display: 'flex',
                borderRight: type !== 'DONE' ? '1px solid black' : 'none'
            }}>
                <Droppable droppableId={type} direction="vertical" type="cards">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}
                             style={{width: '100%', height: '100%', marginLeft: '20%'}}>
                            <Stack direction="column" alignItems="center" spacing={1} sx={{width: '100%'}}>
                                <div>
                                    {tasks.columns[type]?.cardIds.map((card, sequence) => (
                                        <Task
                                            cardId={card}
                                            tasks={tasks}
                                            sequence={sequence}
                                            key={card}
                                        />
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