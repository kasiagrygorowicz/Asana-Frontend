import {Box, Grid, Typography} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import React from "react";
import Task from "./Task";
import TimeIconPopover from "../TimeIconPopover"


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
                <TimeIconPopover tasks={tasks} type={type}/>
            </Box>
            <Box sx={{
                width: '100%',
                height: '300%',
                display: 'flex',
                borderRight: type !== 'DONE' ? '1px solid black' : 'none'
            }}>
                <Droppable droppableId={type} direction="vertical" type="cards">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}
                             style={{width: '100%', height: '100%', marginLeft: '18%'}}>
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