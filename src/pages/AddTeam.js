import {
    Container,
    Box,
    Typography,
    Input
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import { IconButton } from "@material-ui/core";
import AddMemebers from "../component/members/AddMembers";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useContext, useRef, useEffect, useState} from "react";
import useFetch from "../hook/use-fetch";
import React from 'react';
import VerticalBarContext from "../store/verticalbar-context";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode";

function AddTeam({t}) {

    const teamNameRef = useRef();
    const [ users, setUsers ] = useState([]);
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const navigate = useNavigate();
    const { isLoading, error, sendRequest: addTeamRequest } = useFetch();
    const { isMembersLoading, membersError, sendRequest: fetchMembers } = useFetch();
    
    const verticalBarCtx = useContext(VerticalBarContext);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const userId = jwt_decode(authCtx.authToken).id;

        const handleGetUsers = (usersObj) => {
            const loadedUsers = [];
            const loadedUsers_1 = [];
            for (const usersKey in usersObj) {
                loadedUsers.push({ 
                    id: usersObj[usersKey].id, 
                    name: usersObj[usersKey].name,
                    email: usersObj[usersKey].email });
            }
            for(let i = 0; i < loadedUsers.length; i++){
                if(loadedUsers[i].id !== userId){
                    loadedUsers_1.push(loadedUsers[i]);
                }
            }
            setUsers(loadedUsers_1);
        }

        const urlRequest = `/user/all`;
        const fetchUsersRequest = {
            url: urlRequest
        };
        fetchMembers(fetchUsersRequest, handleGetUsers);
    }, [fetchMembers]);


    const submitHandler =(event)=>{
        const members = []

        for(let i = 0; i < selectedUsers.length; i++){
            members.push(selectedUsers[i].id)
        }

        event.preventDefault();
        const name = teamNameRef.current.value
        

        const addTeamHandler = (response) => {
            const id = response['id'] // do reposnse doda?? id w backendzie
            const teamURL = `/dashboard`;
            verticalBarCtx.updateKey++;
            navigate(teamURL,{replace:true})
        }

        const addTeamRequestContent = {
            url: "/team/add",
            method: "POST",
            body: {
                'name': name,
                'members': members
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        addTeamRequest(addTeamRequestContent, addTeamHandler);
    }

    const sendSelectedUsers = (selected) => {
        console.log('ilu jest nowych cz??onk??w: ' + selected.length);
        setSelectedUsers(selected);
    };

    return (
        <Container maxWidth="xl" style={{marginLeft:'15%', maxWidth:'85%'}}>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginLeft: 50}}>
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('addteam')}</Typography>
            </Box>
            <Box sx={{ width: '130%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>

            <form onSubmit={submitHandler}>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('teamName')}:</Typography>
            </Box>
            <Box sx={{ width: '44.5%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input inputRef={teamNameRef} name="name" type="name" placeholder={t('teamNameInput')} disableUnderline={true} sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 20}}></Box>            
            <AddMemebers t={t} users={users} sendSelectedUsers={sendSelectedUsers}/>
            <Box sx={{clear: 'both', height: 20}}></Box>

            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
            </Box>
            
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Button type="submit" variant="contained" size="large" sx={{ width: 190, height: 59, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                    <Typography style={{ fontSize: 22, alignSelf: 'center', fontWeight: 'bold' }}>
                        {t('submit')}
                    </Typography>
            </Button>
            </Box>

            <Box sx={{margin: 30}}>
            </Box>
                </form >
            </Box>  
            <Box sx={{clear:'both'}}></Box>

        </Container>
    );
  }
  export default AddTeam;