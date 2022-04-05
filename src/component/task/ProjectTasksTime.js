import React from 'react';
import {
  Typography,
  Box
} from "@material-ui/core";
import TaskCardTime from './TaskCardTime'


function ProjectTaskTime(props) {

  return (
        <Box sx={{ width: '120%', display: 'flex', float: 'left', borderBottom: '2px solid black'}} >
                <Typography variant="h4" fontFamily="Sora" style={{width: 500, textAlign: 'left', margin: 5}}> Project name </Typography>
                <Box sx={{width: '200%', alignItems: 'center', display: 'flex', marginLeft: -210, marginTop: 40, paddingBottom: 20}}>
                    <TaskCardTime
                        taskName="task1"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={2154}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                </Box>
        </Box>
  );
}

export default ProjectTaskTime;