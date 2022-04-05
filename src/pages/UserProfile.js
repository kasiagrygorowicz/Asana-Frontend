import {
    Container,
    Grid,
    Box,
    Typography
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskCard from '../component/task/TaskCard'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ListItemIcon from '@mui/material/ListItemIcon';
import ProjectCard from "../component/project/ProjectCard";


function UserProfile({t}) {
    let {userName} = useParams();

    return (
        <Container maxWidth="xl">
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/editteam/Team A'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{userName}</Typography>
            </Box>

            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>

            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>Email:</Typography>
            </Box>
            <Box sx={{ width: '25%', height: 80, alignItems: 'center', float: 'left', display: 'flex'}}>
                <Typography fontFamily="Sora" style={{fontWeight: 60, fontSize: 35,  textAlign: 'right', width: '80%'}}>example@mail.com</Typography>
            </Box>

            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('teams')}:</Typography>
            </Box>
            
            <Box sx={{ width: 500, height: 130, alignItems: 'center', display: 'flex'}}>
                <Stack direction="column" >
                    <Box sx={{ width: 400, height: 45, alignItems: 'center', display: 'flex'}}>
                        <ListItemIcon>
                            <FiberManualRecordIcon />
                        </ListItemIcon>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 60, textAlign: 'left', fontSize: 35, width: 200}}>Team A</Typography>
                    </Box>
                    <Box sx={{ width: 400, height: 45, alignItems: 'center', display: 'flex'}}>
                        <ListItemIcon>
                            <FiberManualRecordIcon />
                        </ListItemIcon>
                        <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 60, textAlign: 'left', fontSize: 35, width: 200}}>Team B </Typography>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projects')}:</Typography>
            </Box>
            <Box sx={{marginLeft: 250, width: '100%', height: 90, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Grid container spacing={10}>
                    <Grid item xs={3}>
                    <Link to="/project/Project A" style={{textDecoration: 'none'}}>
                        <ProjectCard cardColor="#4F6C89" teamName="Team A" projectName="Project A" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Link>
                    </Grid>
                    <Grid item xs={3}>
                    <Link to="/project/Project B" style={{textDecoration: 'none'}}>
                        <ProjectCard cardColor="#467AAE" teamName="Team B" projectName="Project B" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Link>
                    </Grid>
                    <Grid item xs={3}>
                    <Link to="/project/Project C" style={{textDecoration: 'none'}}>
                        <ProjectCard cardColor="#6396C8" teamName="Team A" projectName="Project C" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
}
export default UserProfile;