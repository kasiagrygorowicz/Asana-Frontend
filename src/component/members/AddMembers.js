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




export default function AddMembers({t, users, sendSelectedUsers}) {

    const fixedOptions = [];
    const [value, setValue] = React.useState([]);

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
                    <TextField {...params} sx={{ input: { color: 'black', marginLeft: 1.5 }, width: '112%' }}  placeholder={t('addmember')}/>
                )}
            /> 
        </ThemeProvider>  
        {sendSelectedUsers(value)}
        </div>
    );
}
