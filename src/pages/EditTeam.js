import React, {useEffect, useState} from 'react'
import {
    Container,
    Box,
    Typography,
    Input
} from "@material-ui/core";
import Button from "@mui/material/Button";
import {Link, useParams, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import Members from '../component/members/Members'
import useFetch from "../hook/use-fetch";
import EditTeamForm from '../component/team/EditTeamForm'

function EditTeam({t}) {
    const {isTeamLoading, isTeamError, sendRequest: fetchTeam} = useFetch();
    const [teamInfo, setTeamInfo] = useState(null);
    const {teamId} = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        const handleTeam = (response) => {
            setTeamInfo(response);
        }
        const fetchTeamRequest = {
            url: `/team/${teamId}`
        }

        fetchTeam(fetchTeamRequest, handleTeam);
    }, [fetchTeam, teamId])

    return (
        <Container maxWidth="xl" style={{marginLeft: '15%', maxWidth:'85%'}}>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{width: '75%', height: 700, alignItems: 'center', float: 'left', marginLeft: 50}}>
                <Box sx={{width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                    {teamInfo!=null ? (
                        <Typography variant="h3" fontFamily="Sora">{t('editteam') + ': "' + teamInfo?.name + '"'}</Typography>
                    ) : (<div></div>)}
                </Box>
                <Box sx={{width: '130%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
                <Box sx={{margin: 20}}></Box>
                <EditTeamForm t={t} teamInfo={teamInfo}/>
            </Box>
            <Box sx={{clear: 'both'}}></Box>
        </Container>
    );
}

export default EditTeam;