import {
    Box,
    Typography,
    Input,
    Container
  } from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useContext, useEffect, useState, useRef} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react';
import { color } from "@mui/system";
import AuthContext from "../store/auth-context";
import useFetch from "../hook/use-fetch";
import {useParams} from "react-router-dom";

export default function TaskPopUp({taskId}) {

    const t = useTranslation()[0]
    const [value, setValue] = React.useState(new Date('2022-03-04T21:11:54'));
    const task = taskId;
    return (
        <Container maxWidth='xl'>
    <Box sx={{ width: '70%', height: 80, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input /*inputRef={taskNameInput}*/ name="name" type="name" defaultValue='Task Name' placeholder={t('taskNameInput')} disableUnderline='true' 
        sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%', fontSize: 36, fontWeight: 600}}></Input>
    </Box>
    <Button /*type="submit"*/ variant="contained" size="large" color='error' sx={{ width: 150, height: 40, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
        <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
        {t('delete')}
        </Typography>
    </Button>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
        <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left'}}>{t('description')}:</Typography>
        </Box>
        <Box sx={{ width: '80%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
            <Input /*inputRef={descriptionInput}*/ name="name" type="name" defaultValue='Description' multiline placeholder={t('descriptionInput')} disableUnderline='true' sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
        </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
    <Box sx={{ width: '35%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('startDate')}:</Typography>
    </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker readOnly value={value} onChange={(newValue) => { setValue(newValue); }} renderInput={({  InputProps }) => (
        <Box sx={{ width: '35%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input /*inputRef={startInput}*/ disableUnderline='true' value='03/01/2022' style={{paddingLeft: '10%', width: '70%'}}/>
        {InputProps?.endAdornment}
    </Box>
    )} />
    </LocalizationProvider>
    <Box sx={{float: 'left', width: 100}}></Box>
    {/* <Box sx={{clear: 'both', height: 10}}></Box> */}
    <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('project')}:</Typography>
    </Box>
    <Box sx={{background: '#4786C6', borderRadius: 30, width: '40%', height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'center', color: 'white', width: '90%', paddingLeft: '5%'}} sx={{ align: 'center' }}>Project A</Typography>
    </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
    <Box sx={{ width: '35%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>{t('dueDate')}:</Typography>
    </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker value={value} onChange={(newValue) => { setValue(newValue); }} renderInput={({ inputRef, inputProps, InputProps }) => (
        <Box sx={{ width: '35%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input /*inputRef={dueDateInput}*/ ref={inputRef} {...inputProps} disableUnderline='true' defaultValue='03/04/2022' style={{paddingLeft: '10%', width: '70%'}}/>
        {InputProps?.endAdornment}
    </Box>
    )} />
    </LocalizationProvider>
    <Box sx={{float: 'left', width: 100}}></Box>
    <Box sx={{ width: '20%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%'}}>Status:</Typography>
    </Box>
    <Box sx={{background: '#4786C6', borderRadius: 30, width: '40%', height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'center', color: 'white', width: '90%', paddingLeft: '5%'}} sx={{ align: 'center' }}>{t('undone')}</Typography>
    </Box>
    </Stack>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={0}
    >
    <Box sx={{ width: '25%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left'}}>{t('assigned')}:</Typography>
    </Box>
    <Button variant="contained" size="large" sx={{ width: 300, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none'}}>
        <AddCircleOutlineIcon sx={{width: 32, height: 32, marginRight: 2}}/>
        <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
        {t('assignedAdd')}
        </Typography>
    </Button>
    </Stack>
    <Box sx={{clear: 'both', height: 20}}></Box>
    <Button /*type="submit"*/ variant="contained" size="large" sx={{ width: 150, height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
        <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
        {t('submit')}
        </Typography>
    </Button>
    <Box sx={{margin: 30}}>
    </Box>
    </Container>
    );
}

