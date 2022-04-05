import Container from "@mui/material/Container";
import {Box, Typography} from "@mui/material";
import React from "react";
import ProjectTaskTime from '../component/task/ProjectTasksTime'

const TimeManagement = () => {
    return(
        <Container maxWidth="xl">
            <Box sx={{ width: '84.75%', float: 'left', marginTop: 5, marginLeft: 5.75}}>
            
                <Box sx={{ width: '100%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                    <Typography variant="h3" fontFamily="Sora">{'Manage your time'}</Typography>
                </Box>
                <Box sx={{ width: '128%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
                <ProjectTaskTime/>
                <ProjectTaskTime/>
            </Box>    
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
}

export default TimeManagement;