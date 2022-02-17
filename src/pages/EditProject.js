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
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Member from '../component/Member'

const useStyles = makeStyles({
    select: {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  });

function EditProject({t}) {
    const classes = useStyles();
    let { projectName } = useParams();
    return (
        <Container maxWidth="x1">
            <VerticalBar t={t}/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('editproject') + ': "' + projectName + '"'}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projectName')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" value={projectName} placeholder={t('projectNameInput')} disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('team')}:</Typography>
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
            <Box sx={{ width: '10%', height: 80, marginLeft: '5%', alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>{t('private')}:</Typography>
            </Box>
            <Box sx={{ width: '4%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Checkbox style={{transform: "scale(1.25)", color: "#195FA5"}}/>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" multiline placeholder={t('descriptionInput')} disableUnderline='true' sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('members')}:</Typography>
            </Box>
            <Box sx={{ width: '43%', height: 80, alignItems: 'center', display: 'flex', float: 'left', marginLeft: 10}}>
                <Member color="#79DFC1" initials='KG' fullname="Katarzyna Grygorowicz" email="example@mail.com"></Member>
                <Member color="#EA868F" initials='MN' fullname="Marek Nowakowski" email="example@mail.com"></Member>
                <Member color="#FEB272" initials='MW' fullname="Michał Wójcik" email="example@mail.com"></Member>
                <Member color='#6EA8FE' initials='KF' fullname="Kamil Frączek" email="example@mail.com"></Member>
            </Box>
            <Button variant="contained" size="large" sx={{ width: 265, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginRight: 2}}/>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('addmember')}
                </Typography>
            </Button>
            <Box sx={{clear: 'both', height: 20}}></Box>
            <Button variant="contained" size="large" sx={{ width: 250, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                {t('submit')}
                </Typography>
            </Button>
            <Box sx={{margin: 30}}>
            </Box>
            </Box>  
            
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default EditProject;