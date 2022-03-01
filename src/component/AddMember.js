import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useContext, useEffect, useState, useRef} from "react";
import jwt_decode from "jwt-decode";
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



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

export default function AddMemeber({t}) {

    const emailRef = useRef();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    const users = ["kamx9", "kasia@gmail.com", "wow.fwerfe", "rwe/@dgreag.pl", "122345543.e213"];

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
                    <Box sx={{ width: '100%', height: 50, alignItems: 'center'}}>
                        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '100%'}}>{t('addmember')}</Typography>
                    </Box>
                    <Box sx={{ width: 400, height: 60, background: '#ABB5BE', borderRadius: '30px', display: 'flex' }}>
                        <Input inputRef={emailRef} name="name" type="name" placeholder={t('enterEmail')} disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '100%'}}></Input>
                    </Box>
                    <Box sx={{clear: 'both', height: 20}}></Box>
                    <Box sx={{ width: '100%', height: 300, alignItems: 'center',background: '#CED4DA', borderRadius: '30px', display: 'flex' }}>

                    </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

