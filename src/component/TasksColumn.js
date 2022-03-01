import {Box, Grid, Typography} from "@material-ui/core";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import React from "react";

const TasksColumn = ({t, tasks, type}) => {


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
                                {tasks.columns[type]?.cardIds.map((card, sequence) => (
                                    <Draggable draggableId={card} index={sequence} key={card}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {tasks.cards[card]?.show &&
                                                <div style={{width: 450}}>{tasks.cards[card]?.content}</div>}
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
    );
}

export default TasksColumn;