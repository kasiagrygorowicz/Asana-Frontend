import {
    Container,
    Box,
    Typography,
    Grid
  } from "@material-ui/core";
import {Link, useNavigate} from "react-router-dom";
import ProjectCard from "../component/ProjectCard";
import VerticalBar from '../component/VerticalBar';
import UserProjects from "../component/UserProjects";
import useFetch from "../hook/use-fetch";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode";
import UserTeams from "../component/UserTeams";

function Dashboard({t}) {


    return (
        <Container maxWidth="x1">
            <VerticalBar t={t}/>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
            <Box sx={{ width: '80%', height: 80, alignItems: 'center'}}>
                <Typography variant="h3" fontFamily="Sora">{t('dashboardtitle')}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 30}}>
               <UserProjects t={t}/>
            </Box>

            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default Dashboard;