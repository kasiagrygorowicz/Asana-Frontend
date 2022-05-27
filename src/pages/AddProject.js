import {
    Container,
    Box,
    Typography
  } from "@material-ui/core";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddProjectForm from "../component/project/AddProjectForm";
import { IconButton } from "@material-ui/core";



function AddProject({t}) {
    const navigate = useNavigate();
    return (
        <Container maxWidth="xl" style={{marginLeft:'15%', maxWidth:'85%'}}>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginLeft: 50 }}>
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('addproject')}</Typography>
            </Box>
            <Box sx={{ width: '130%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <AddProjectForm t={t}/>
            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddProject;