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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    select: {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  });

function AddProject() {
    const classes = useStyles()
    return (
        <Container maxWidth="x1">
            <VerticalBar/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">Add project</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <Box sx={{ width: '15%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>Project name:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" placeholder="Enter project name" disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: 20}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '15%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>Team:</Typography>
            </Box>
            <Box sx={{background: '#4786C6', borderRadius: 30, width: '20%',height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
            <FormControl style={{marginLeft: '5%', width: '90%', background: '#4786C6', borderRadius: 30, disableUnderline: 'true'}}>
            <Select disableUnderline={true} defaultValue={1} style={{color: 'white'}} className={classes.select} inputProps={{
                classes: {
                    icon: classes.icon,
                    root: classes.root,
                },
            }}>
                <MenuItem value={1}>Team A</MenuItem>
                <MenuItem value={2}>Team B</MenuItem>
                <MenuItem value={3}>Team C</MenuItem>
            </Select>
            </FormControl>
            </Box>
            <Box sx={{ width: '8%', height: 80, marginLeft: '5%', alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>Private:</Typography>
            </Box>
            <Box sx={{ width: '4%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Checkbox style={{transform: "scale(1.25)", color: "#195FA5"}}/>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '15%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>Description:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" multiline placeholder="Write your description here" disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: 20}} rows={4}></Input>
            </Box>
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
  export default AddProject;