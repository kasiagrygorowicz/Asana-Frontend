import {
    Container,
    Box,
    Typography,
    Grid
  } from "@material-ui/core";
import ProjectCard from "../component/ProjectCard";
import VerticalBar from '../component/VerticalBar';
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddProject() {
    return (
        <Container maxWidth="x1">
            <VerticalBar/>
            <Box sx={{ width: '75%', height: 800, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">Add project</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 30}}>
            </Box>
            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddProject;