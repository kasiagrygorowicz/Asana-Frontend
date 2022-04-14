import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
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




export default function AddOneMemeber({t, projectMembers, sendSelectedUser, currentSelectedUser}) {

    const [value, setValue] = React.useState([]);

    const theme = createTheme({
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: '30px',
                minHeight: 60,
                minWidth: 300
              }
            }
          }
        }
      });

    return (
        <div>
        <ThemeProvider theme={theme}>
        <Autocomplete
            id="size-small-outlined"
            size="small"
            onChange={(event, newValue) => {
                if(newValue != null){
                    setValue(newValue)
                }
            }}
            defaultValue={currentSelectedUser}
            options={projectMembers}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => (
            <TextField {...params} sx={{ input: { color: 'black', marginLeft: 1.5 }, width: '100%' }}  placeholder={t('addmember')} />
        )}
        />
        </ThemeProvider>  
        {sendSelectedUser(value)}
        </div>
    );
}
