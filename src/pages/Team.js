import React, {useEffect, useState, useContext} from 'react'
import {Box, Container, Grid, Menu, MenuItem, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@material-ui/core';
import Members from '../component/members/Members';
import ProjectCard from '../component/project/ProjectCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import useFetch from "../hook/use-fetch";
import VerticalBarContext from '../store/verticalbar-context';
import jwt_decode from "jwt-decode";
import AuthContext from '../store/auth-context';

function Team({t}) {
    const {isTeamLoading, isTeamError, sendRequest: fetchTeam} = useFetch();
    const [teamInfo, setTeamInfo] = useState(null);
    const {teamId} = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const authCtx = useContext(AuthContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const {isLeaveLoading, leaveError, sendRequest: leaveTeamRequest} = useFetch();
    
    const leaveTeamHandler = () => {
        const userId = jwt_decode(authCtx.authToken).id;
        const leaveTeamRequestContent = {
            url: `/team/${teamId}/leave/${userId}`,
            method: "DELETE",
            body: null,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const handleLeaveTeam = (response) => {
            verticalBarCtx.updateKey++;
            navigate('/dashboard', {replace: true})
        }

        deleteTeamRequest(leaveTeamRequestContent, handleLeaveTeam);
    }


    return (
        <Container maxWidth="xl" style={{marginLeft: '15%', maxWidth:'85%'}}>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{width: '75%', alignItems: 'center', float: 'left', marginLeft: 50}}>
                <Box sx={{width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                    <Typography variant="h3" fontFamily="Sora">{teamInfo?.name}</Typography>
                </Box>

                <Box>
                    <SettingsIcon
                        sx={{display: "flex", float: "right", marginRight: "5px", width: 48, height: 48, top: 50, right: 100, position: 'absolute'}}
                        onClick={handleClick}
                        size="small"
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
                        {!teamInfo?.isOwner &&
                            <MenuItem onClick={leaveTeamHandler}>
                                {t("leave")}
                            </MenuItem>
                        }
                        {teamInfo?.isOwner &&
                            <>
                            <MenuItem component={Link} to={`/editteam/${teamId}`}>
                                {t("edit")}
                            </MenuItem>
                            <MenuItem onClick={deleteTeamHandler}>
                                {t("delete")}
                            </MenuItem>
                            </>
                        }
                    </Menu>
                </Box>
                <Box sx={{width: '130%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
                <Box sx={{margin: 5}}></Box>

                {teamInfo!=null ? (
                <div>
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
                <Box sx={{marginLeft: '18%', marginBottom: 20, alignItems: 'center'}}>
                    <Grid container spacing={5}
                          sx={{marginLeft: 200, marginBottom: 20, alignItems: 'center'}}>
                        {
                            teamInfo?.projects.map(p => {
                                console.log(teamInfo.isOwner)
                                return (<Grid item xs={4}>
                                    <ProjectCard cardColor="#4F6C89" teamName={teamInfo.name} teamId={teamId} projectName={p.name} isOwner={p.owner}
                                                 description={p.description} id={p.id} t={t} projectId={p.id}/>
                                </Grid>)
                            })
                        }
                    </Grid>
                </Box>
                </div>
                ) : (<div></div>)}
            </Box>
            <Box sx={{clear: 'both'}}></Box>
        </Container>
    );
}

export default Team