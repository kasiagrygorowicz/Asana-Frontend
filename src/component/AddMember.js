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



const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#E9ECEF',
        border: '4px solid #195FA5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 30
    },
}));

function AddMemeber({t, membersRef}) {

    const emailInput = useRef();
    const [ users, setUsers ] = useState([]);
    const [ searchingUsers, setSearchingUsers] = useState([]);
    const [ updateKey, setUpdateKey] = useState(Math.random());
    const navigate = useNavigate();
    const { isMembersLoading, membersError, sendRequest: fetchMembers } = useFetch();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    
    
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

    
    const searchingHandler = () =>{
        let searchingEmail = emailInput.current.value;
        let tmp = [];
        
        

        for(let i = 0; i < users.length; i++){
            if(users[i].email.indexOf(searchingEmail) !== -1){
                tmp.push(users[i])
            }
        }

        tmp.sort(function(a, b){
            if(a.email < b.email) { return -1; }
            if(a.email > b.email) { return 1; }
            return 0;
        })

        let x = 5
        if(tmp.length <= 5){
            x = tmp.length
        }

        while(searchingUsers.length > 0) {
            searchingUsers.pop();
        }
        for(let i = 0; i < x; i++){
            searchingUsers.push(tmp[i]);
        }
        setSearchingUsers(searchingUsers);
        setUpdateKey(Math.random);
    };



    return (
        <div>
            <Button variant="contained" size="large" onClick={handleOpen} sx={{ width: 265, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'left'}}>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginRight: 2}}/>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('addmember')}
                </Typography>
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                    <Box sx={{ width: '100%', height: '50', alignItems: 'center'}}>
                        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '100%'}}>{t('addmember')}</Typography>
                    </Box>
                    
                    <Box sx={{ width: 300, height: 60, background: '#ABB5BE', borderRadius: '30px', display: 'flex' , float: 'left'}}>
                        <Input inputRef={emailInput} name="name" type="name" placeholder={t('enterEmail')} disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '100%'}}></Input>
                    </Box>
                    
                    <Box sx={{ width: 5, height: 60, display: 'flex' , float: 'left'}}>
                    </Box>

                    <Button  onClick={() => searchingHandler()}  variant="contained" size="large" sx={{ width: 140, height: 60, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                        <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                            {t('search')}
                        </Typography>
                    </Button>

                    <Box sx={{clear: 'both', height: 20}}></Box>
                    <Box sx={{ width: 400, height: '100%', alignItems: 'center',background: '#CED4DA', borderRadius: '30px'}} key={updateKey}>
                    {searchingUsers.map((user) => (
                        <><Box sx={{ width: '100%', height: 20, borderRadius: '30px', display: 'block', float: 'left', marginLeft: 1 }}>
                            <Typography style={{ fontSize: 24, alignSelf: 'top', float: 'left'}}>
                                {user.email}
                            </Typography>
                            <Button onClick={() => membersRef.push(user.id)} variant="contained" size="large" sx={{ width: 40, height: 30, borderRadius: 30, textTransform: 'none', float: 'left', position: 'relative', left: 125 }}>
                                <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                                    +
                                </Typography>
                            </Button>
                        </Box>
                        <Box sx={{ width: '100%', height: 30, display: 'flex', float: 'left' }}>
                        </Box></>
                    ))}
                        
                    </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default AddMemeber;