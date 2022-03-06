import {
    Container,
    Box,
    Typography
  } from "@material-ui/core";
  import * as React from 'react';

import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddTaskForm from "../component/AddTaskForm";

function AddTask({t}) {
    return (
        <Container maxWidth="x1">
            <Box sx={{ width: '75%', height: 750, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('addtask')}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <AddTaskForm t={t}/>
            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddTask;