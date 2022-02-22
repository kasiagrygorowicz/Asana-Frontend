import {
    Container,
    Grid,
    Box,
    Typography
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import VerticalBar from '../component/VerticalBar';
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskCard from '../component/TaskCard'

function Project({t}) {
    let { projectId } = useParams();
    return (
        <Container maxWidth="x1">
            <VerticalBar t={t}/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Link to='/addtask'>
                <Button variant="contained" sx={{ width: 270, height: 50, alignSelf: 'end', borderRadius: 30, textTransform: 'none', float: 'right', marginTop: 2}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('addtask')}
                </Typography>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginLeft: 2}}/> 
            </Button>
                </Link>
                <Typography variant="h3" fontFamily="Sora">{projectId}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{ margin: 5}}></Box>
            <GridViewIcon fontSize='medium' sx={{float: 'right'}}/>
            <FormatListBulletedIcon fontSize='medium' sx={{float: 'right'}}/>
            <Grid container alignItems="stretch" justifyContent="center">
                <Grid item xs={4} >
                    <Box sx={{ width: '100%', height: 80, alignItems: 'center', display: 'flex', float: 'left', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t('undone')}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 450, display: 'flex', borderRight: '1px solid black'}}>
                        <Stack direction="column" alignItems="center" spacing={3} sx={{ width: '100%'}}>
                        <TaskCard cardColor="#4F6C89" taskName="Task A" date="18.04.2022"/>
                        <TaskCard cardColor="#4F6C89" taskName="Task D" date="01.03.2022"/>
                        <TaskCard cardColor="#4F6C89" taskName="Task G" date="11.05.2022"/>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Box sx={{ width: '100%', height: 80, alignItems: 'center', display: 'flex', float: 'left', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t('inprogress')}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 450, display: 'flex', borderLeft: '1px solid black'}}>
                        <Stack direction="column" alignItems="center" spacing={3} sx={{ width: '100%'}}>
                        <TaskCard cardColor="#467AAE" taskName="Task B" taskType="inprogress" date="28.03.2022"/>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Box sx={{ width: '100%', height: 80, alignItems: 'center', display: 'flex', float: 'left', borderBottom: '1px solid black'}}>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 'bold', textAlign: 'center', width: '80%'}}>{t('done')}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 450, display: 'flex', borderLeft: '1px solid black'}}>
                        {/* <Box sx={{width: '20%', height: 450}}></Box> */}
                        <Stack direction="column" alignItems="center" spacing={3} sx={{ width: '100%'}}>
                        <TaskCard cardColor="#4F6C89" taskName="Task C" taskType="done" date="28.03.2022"/>
                        <TaskCard cardColor="#4F6C89" taskName="Task E" taskType="done" date="14.03.2022"/>
                        <TaskCard cardColor="#4F6C89" taskName="Task F" taskType="done" date="17.02.2022"/>
                        <TaskCard cardColor="#4F6C89" taskName="Task H" taskType="done" date="05.04.2022"/>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default Project;