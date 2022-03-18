import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useFetch from "../hook/use-fetch";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode"
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Alarm } from "@mui/icons-material";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';




export default function AddMemeber({t, membersRef}) {

    const [ users, setUsers ] = useState(membersRef);
    const { isMembersLoading, membersError, sendRequest: fetchMembers } = useFetch();    
    
    useEffect(() => {
        const handleGetUsers = (usersObj) => {
            const loadedUsers = [];
            for (const usersKey in usersObj) {
                loadedUsers.push({ 
                    id: usersObj[usersKey].id, 
                    name: usersObj[usersKey].name,
                    email: usersObj[usersKey].email });
            }
            setUsers(loadedUsers);
        }

        const urlRequest = `/user/all`;
        const fetchUsersRequest = {
            url: urlRequest
        };

        fetchMembers(fetchUsersRequest, handleGetUsers);
    }, [fetchMembers]);

    
    const fixedOptions = [];
    const tmp = [];
    const [value, setValue] = React.useState(tmp);



    return (
            <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={value}
                onChange={(event, newValue) => {
                    setValue([
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                    ])
                    membersRef = value
                    alert(membersRef.length);
                }}
                options={users}
                getOptionLabel={(option) => option.email}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                    <Chip
                        label={option.email}
                        {...getTagProps({ index })}
                        disabled={fixedOptions.indexOf(option) !== -1}
                    />
                    ))
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} sx={{ input: { color: 'black' }, width: '112%' }} placeholder="Favorites" />
                )}
            />
    );
}
