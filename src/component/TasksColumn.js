import {Box, Grid, Typography} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import React, {useState} from "react";
import Task from "./Task";

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
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '80%'
                            }}>{t(type.toLowerCase())}</Typography>
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