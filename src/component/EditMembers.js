import useFetch from "../hook/use-fetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from "@mui/material/styles";




export default function EditMembers({t, users, sendSelectedUsers, teamInfoMembers}) {

    const fixedOptions = [];
    const [value, setValue] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const {isTeamLoading, isTeamError, sendRequest: fetchTeam} = useFetch();
    const {teamId} = useParams();



    useEffect(() => {
        setIsLoading(true);
        const t = [];

        for(let i = 0; i < teamInfoMembers.length; i++){
            for(let j = 0; j < users.length; j++){
                if(teamInfoMembers[i].id === users[j].id){
                    t.push(users[j])
                    break
                }
            }
        }
        setValue(t);

    }, [fetchTeam, teamId])

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

    return (
        <div>
        <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('members')}:</Typography>
        </Box>
        <Box sx={{ width: '40%', float: 'left', borderRadius: '30px', margin: 1, display: 'flex' }}>
        {isLoading ?  (
            
            
            <ThemeProvider theme={theme}>
                <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={value}
                onChange={(event, newValue) => {
                    setValue([
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                    ])
                }}
                options={users}
                getOptionLabel={(option) => option.name}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                    <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        disabled={fixedOptions.indexOf(option) !== -1}
                    />
                    ))
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} sx={{ input: { color: 'black',  marginLeft: 1.5  }, width: '112%' }}  placeholder={t('addmember')}/>
                )}
                /> 
            </ThemeProvider> 
            
        ) : (
        <div></div>   ) }
        </Box> 
        {sendSelectedUsers(value)}
        </div>
        
    );
}
