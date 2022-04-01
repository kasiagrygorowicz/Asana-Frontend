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
import MySettingsIcon from "../component/SettingsIcon";


function Team({t}) {
    const {isTeamLoading, isTeamError, sendRequest: fetchTeam} = useFetch();
    const [teamInfo, setTeamInfo] = useState(null);
    const {teamId} = useParams();


    const navigate = useNavigate();

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
        <Container maxWidth="xl" style={{marginLeft: '15%'}}>
            <Box sx={{width: '75%', alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
                <Box sx={{width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                    <Typography variant="h3" fontFamily="Sora">{teamInfo?.name}</Typography>
                </Box>

                <Box>
                   <MySettingsIcon deleteTeamHandler={deleteTeamHandler} id={teamInfo?.id} isOwner={teamInfo?.isOwner} link={"/editteam/"}/>
                </Box>
                <Box sx={{width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
                <Box sx={{margin: 5}}></Box>

                <Box sx={{clear: 'both', height: 50}}></Box>
                <Box sx={{width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                    <Typography variant="h5" fontFamily="Sora"
                                style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('members')}:</Typography>
                </Box>
                <Members members={teamInfo?.members}/>
                <Box sx={{clear: 'both', height: 35}}></Box>
                <Box sx={{width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                    <Typography variant="h5" fontFamily="Sora" style={{
                        fontWeight: 600,
                        textAlign: 'right',
                        width: '80%'
                    }}>{t('projects')}:</Typography>
                </Box>
                <Box sx={{marginLeft: 200, marginBottom: 20, alignItems: 'center'}}>
                    <Grid container spacing={5}
                          sx={{marginLeft: 200, marginBottom: 20, alignItems: 'center'}}>
                        {

                            teamInfo?.projects.map(p => {
                                console.log(teamInfo.isOwner)
                                return (<Grid item xs={4}>
                                    <ProjectCard cardColor="#4F6C89" teamName={teamInfo.name} projectName={p.name} isOwner={p.owner}
                                                 description={p.description} id={p.id}/>

                                </Grid>)

                            })

                        }


                    </Grid>
                </Box>
            </Box>
            // <Box sx={{clear: 'both'}}></Box>
        </Container>
    );
}

export default Team