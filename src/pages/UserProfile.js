import {
    Container,
    Grid,
    Box,
    Typography
} from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import {Link, useParams, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskCard from '../component/task/TaskCard'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from "@material-ui/core";
import ProjectCard from "../component/project/ProjectCard";

import useFetch from "../hook/use-fetch";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import {Alert} from "@mui/lab";


function UserProfile({t}) {
    let {userId} = useParams();
    const {isLoading, error, sendRequest: fetchUserDetails} = useFetch();
    const [userDetails, setUserDetails] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleGetUserDetails = (detailsObj) => {
            const details = [];
            details.push(detailsObj.id)
            details.push( detailsObj.email)
            details.push( detailsObj.name)
            const teams = []
            const projects = []
            for (const t in detailsObj.teams) {
                teams.push({
                    id: detailsObj.teams[t].id,
                    name: detailsObj.teams[t].name,
                    isOwner: detailsObj.teams[t].owner

                })
            }
            for (const p in detailsObj.projects) {
                projects.push({
                    id: detailsObj.projects[p].id,
                    name: detailsObj.projects[p].name,
                    description: detailsObj.projects[p].description,
                    isOwner: detailsObj.projects[p].owner
                })
            }

            setUserDetails(details)
            setProjects(projects)
            setTeams(teams)
        }


        const urlRequest = `/user/all/${userId}`;
        const fetchUserDetailsRequest = {
            url: urlRequest
        };

        fetchUserDetails(fetchUserDetailsRequest, handleGetUserDetails)


    }, [fetchUserDetails, userId])


    return (
        //todo poprawic cofanie
        <Box maxWidth="xl"

             sx={{
                 marginLeft:'15%',
                 marginRight:'5%',
                 display: 'flex',
                 flexDirection: 'column',
                 height:'100vh',
                 gap:20


             }}>
            <Box sx={{ alignSelf: 'left', marginLeft: '1.6%' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{width: '100%', alignItems: 'center', float: 'left', marginLeft: 50, marginRight:'0%'}}>
                <Box sx={{width: '100%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                    <Typography variant="h3" fontFamily="Sora">{userDetails[2]}</Typography>
                    <Box sx={{width: '100%',  height: 2, borderBottom: '2px solid black'}}></Box>
                </Box>

            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row',gap:30,marginLeft:'10%'}}>
                <Typography  variant="h4" fontFamily="Sora" style={{fontWeight: 600,fontSize:35}}>
                    Email:
                </Typography>
                <Box fontFamily="Sora" style={{fontWeight: 60, fontSize: 35, bgcolor:'orange'}}>
                    {userDetails[1]}
                </Box>

            </Box>


            <Box sx={{display: 'flex', flexDirection: 'row',gap:30,marginLeft:'10%'}}>
                <Typography variant="h4" fontFamily="Sora" style={{fontWeight: 600}}>{t('teams')}:</Typography>
                <Box sx={{alignItems: 'center', display: 'flex'}}>
                    <Stack direction="column">
                        {
                            teams.map(t => {
                                return (
                                    <Link to={'/team/' + t.id} style={{textDecoration: "none", color: 'black'}}>
                                        <Box sx={{width: 400, height: 45, alignItems: 'center', display: 'flex'}}>
                                            <ListItemIcon>
                                                <FiberManualRecordIcon/>
                                            </ListItemIcon>
                                            <Typography variant="h4" fontFamily="Sora" style={{
                                                fontWeight: 60,
                                                textAlign: 'left',
                                                fontSize: 35,
                                                width: 200
                                            }}>{t.name}</Typography>
                                        </Box>
                                    </Link>)
                            })
                        }

                    </Stack>
                </Box>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row',marginTop:10,gap:30,marginLeft:'10%', marginBottom:'50px'}}>
                <Typography variant="h4" fontFamily="Sora"
                            style={{fontWeight: 600}}>{t('projects')}:</Typography>

                <Grid container  spacing={5} >
                    {
                        projects.map(p => {
                            return (
                                <Grid item xs={4} >
                                    <ProjectCard t={t} cardColor="#4F6C89" id={p.id} projectName={p.name} isOwner={p.isOwner}
                                                 description={p.description}/>
                                </Grid>
                            )
                        })
                    }


                </Grid>


            </Box>
                {
                    error && <Alert severity="error">{error}</Alert>
                }


        </Box>
    );
}

export default UserProfile;