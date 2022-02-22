import {
    Container,
    Box,
    Typography,
    Input,
    Select,
    MenuItem,
    FormControl,
    Checkbox
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import VerticalBar from '../component/VerticalBar';
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddProjectForm from "../component/AddProjectForm";



function AddProject({t}) {
    return (
        <Container maxWidth="x1">
            <VerticalBar t={t}/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('addproject')}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <AddProjectForm t={t}/>
            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddProject;