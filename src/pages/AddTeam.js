import {
    Container,
    Box,
    Typography,
    Input
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import VerticalBar from '../component/VerticalBar';
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddTeam() {
    return (
        <Container maxWidth="x1">
            <VerticalBar/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">Add team</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <Box sx={{ width: '15%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>Team name:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" placeholder="Enter team name" disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '15%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>Description:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" multiline placeholder="Write your description here" disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '15%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>Team members:</Typography>
            </Box>
            <Box sx={{ width: '43%', height: 80, alignItems: 'center', display: 'flex', float: 'left', marginLeft: 10}}>
                <Box sx={{ width: 60, height: 60, alignItems: 'center', display: 'flex', float: 'left', background: '#79DFC1', border: '3px solid black', margin: 15}}>
                    <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, width: 60, textAlign: 'center'}}>KG</Typography>
                </Box>
                <Box sx={{ width: 60, height: 60, alignItems: 'center', display: 'flex', float: 'left', background: '#EA868F', border: '3px solid black', margin: 15}}>
                    <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, width: 60, textAlign: 'center'}}>MN</Typography>
                </Box>
                <Box sx={{ width: 60, height: 60, alignItems: 'center', display: 'flex', float: 'left', background: '#FEB272', border: '3px solid black', margin: 15}}>
                    <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, width: 60, textAlign: 'center'}}>MW</Typography>
                </Box>
                <Box sx={{ width: 60, height: 60, alignItems: 'center', display: 'flex', float: 'left', background: '#6EA8FE', border: '3px solid black', margin: 15}}>
                    <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, width: 60, textAlign: 'center'}}>KF</Typography>
                </Box>
            </Box>
            <Button variant="contained" size="large" sx={{ width: 250, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginRight: 2}}/>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                    Add member
                </Typography>
            </Button>
            <Box sx={{clear: 'both', height: 20}}></Box>
            <Button variant="contained" size="large" sx={{ width: 250, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                    Submit
                </Typography>
            </Button>
            <Box sx={{margin: 30}}>
            </Box>
            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddTeam;