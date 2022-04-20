import {Box, Checkbox, FormControl, Input, MenuItem, Select, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useFetch from "../../hook/use-fetch";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode"
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Alarm } from "@mui/icons-material";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from "@mui/material/styles";




export default function AddTeamsAndMembers({t, users, teams, sendSelectedUsersAndTeams}) {

    const fixedOptions1= [];
    const fixedOptions2 = [];
    const [valueUsers, setValueUsers] = React.useState([]);
    const [valueTeams, setValueTeams] = React.useState([]);

    const [optionUsers, setOptionUsers] = React.useState(users);
    const [optionTeams, setOptionTeams] = React.useState(teams);

    const [f, setF] = React.useState(true)

    const theme = createTheme({
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: '30px',
                minHeight: 60
              }
            }
          }
        }
      });

    const updateUsers = () => {
      console.log("start update users______________")
      const usersFromTeams = [];

      for(let i = 0; i < valueTeams.length; i++ ){
        for(let j = 0; j < valueTeams[i].members.length; j++){
          console.log(valueTeams[i].members[j]);
          usersFromTeams.push(valueTeams[i].members[j]);
        }
      };
      // console.log("users from teams" );
      // console.log(usersFromTeams);


      const newListUsers = [];
      const newListOptionsUsers = [];
      

      for(let j = 0; j < valueUsers.length; j++){
        let flag = true;
        for(let i = 0; i < usersFromTeams.length; i++){
          if(valueUsers[j].id === usersFromTeams[i].id){
            flag = false;
          }
        }
        if(flag === true){
          newListUsers.push(valueUsers[j]);
        }
      }

      console.log("ile opcji: " + optionUsers.length)

      for(let j = 0; j < users.length; j++){
        let flag = false;
        for(let i = 0; i < usersFromTeams.length; i++){
          if(users[j].id === usersFromTeams[i].id){
            flag = true;
          }
        }
        if(flag === false){
          newListOptionsUsers.push(users[j]);
        }
      }

      console.log("nowi do ustawienia = " );
      console.log(newListUsers);
      console.log("obecni = " );
      console.log(valueUsers);
      const tet = [];
      console.log(tet);


      setValueUsers(newListUsers);
      setOptionUsers(newListOptionsUsers);
    }

    useEffect(() => {
      if(f){
        updateUsers();
        setF(false)
      } 

      if(!f){
        setF(true)
      } 

      sendSelectedUsersAndTeams(valueUsers, valueTeams)
    }, [valueUsers, valueTeams]);



    return (
        <div>
        {/* {updateUsers()} */}
        <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('teams')}:</Typography>
        </Box>
        <Box sx={{ width: '40%', float: 'left', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <ThemeProvider theme={theme}>
            <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={valueTeams}
                onChange={(event, newValue) => {
                    setValueTeams([
                    ...newValue.filter((option) => fixedOptions1.indexOf(option) === -1),
                    ])
                }}
                options={optionTeams}
                getOptionLabel={(option) => option.name}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                    <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        disabled={fixedOptions1.indexOf(option) !== -1}
                    />
                    ))
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} sx={{ input: { color: 'black', marginLeft: 1.5 }, width: '112%' }}  placeholder={t('addteam')}/>
                )}
            /> 
        </ThemeProvider>  
        </Box>

        <Box sx={{clear: 'both', height: 10}}></Box>

        <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projectMembers')}:</Typography>
        </Box>
        <Box sx={{ width: '40%', float: 'left', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <ThemeProvider theme={theme}>
            <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={valueUsers}
                noOptionsText={t('noUsersAvailable')}
                onChange={(event, newValue) => {
                    setValueUsers([
                    ...newValue.filter((option) => fixedOptions2.indexOf(option) === -1),
                    ])
                }}
                options={optionUsers}
                getOptionLabel={(option) => option.email}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                    <Chip
                        label={option.email}
                        {...getTagProps({ index })}
                        disabled={fixedOptions2.indexOf(option) !== -1}
                    />
                    ))
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} sx={{ input: { color: 'black', marginLeft: 1.5 }, width: '112%' }}  placeholder={t('addmember')}/>
                )}
            /> 
        </ThemeProvider>  
        </Box>
        </div>
    );
}
