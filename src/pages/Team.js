import React, {useEffect, useState, useContext} from 'react'
import {Box, Container, Grid, Menu, MenuItem, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Members from '../component/Members';
import ProjectCard from '../component/ProjectCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import useFetch from "../hook/use-fetch";
import VerticalBarContext from '../store/verticalbar-context';


function Team({t}) {
    const { isTeamLoading, isTeamError, sendRequest: fetchTeam } = useFetch();
    const [ teamInfo, setTeamInfo ] = useState(null);
    const { teamId } = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const verticalBarCtx = useContext(VerticalBarContext);

    useEffect(() => {
        const handleTeam = (response) => {
            setTeamInfo(response);
        }
        const fetchTeamRequest = {
            url: `/team/${teamId}`
        }

        fetchTeam(fetchTeamRequest, handleTeam);
    }, [fetchTeam, teamId])

    const {isLoading, error, sendRequest: deleteTeamRequest} = useFetch();
    const deleteTeamHandler = () => {

        const deleteTeamRequestContent = {
            url: `/team/delete/${teamId}`,
            method: "DELETE",
            body: null,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const handleDeleteTeam = (response) => {
            verticalBarCtx.updateKey++;
            navigate('/dashboard', {replace: true})
        }

        deleteTeamRequest(deleteTeamRequestContent, handleDeleteTeam);
    }
    
    return (
        <Container maxWidth="xl">
        <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
            <Link to='/dashboard'>
                <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
            </Link>
            <Box sx={{ width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{teamInfo?.name}</Typography>
            </Box>

            <Box>
            <SettingsIcon 
                sx={{position: 'absolute', right: open ? 117 : 100, top: 120, width: 32, height: 32}} 
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            />
            
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{horizontal: 'left', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem component={Link} to={"/editteam/" + teamId}>
                    Edit
                </MenuItem>
                <MenuItem onClick={deleteTeamHandler}>
                    Delete
                </MenuItem>
            </Menu>

            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{ margin: 5}}></Box>
            <Box sx={{ width: '12%', height: 80, alignItems: 'center', display: 'flex'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
            </Box>
            <Box sx={{ width: '80%', height: 120, alignItems: 'center', display: 'flex', marginLeft: '5%'}}>
                <Box sx={{ width: 20, height: 120, borderLeft: '2px solid', borderColor: '#4399EF'}}></Box>
                <Box sx={{ width: '90%', height: 250, alignItems: 'center', display: 'flex'}}>
                    <Typography variant="h6" fontFamily="Sora">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod purus dolor, ac ullamcorper massa consectetur et. Cras malesuada tincidunt lorem eget accumsan. Aliquam erat volutpat. Praesent convallis consequat felis, nec ullamcorper justo aliquam non.</Typography>
                </Box>
            </Box>
            <Box sx={{clear: 'both', height: 50}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('members')}:</Typography>
            </Box>
            <Members members={teamInfo?.members}/>
            <Box sx={{clear: 'both', height: 35}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projects')}:</Typography>
            </Box>
            <Box sx={{marginLeft: 250, width: '100%', height: 90, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Grid container spacing={10}>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#4F6C89" teamName="Team A" projectName="Project A" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#467AAE" teamName="Team B" projectName="Project B" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#6396C8" teamName="Team A" projectName="Project C" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        <Box sx={{clear:'both'}}></Box>
        </Container>
    );
}

export default Team