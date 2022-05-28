import {
    Box,
    Typography,
    Input,
    Container
  } from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import React from 'react';
import { Stack } from "@mui/material";
import useFetch from "../../hook/use-fetch";
import {useContext, useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";

export default function MoveDeadlines(props) {
    const navigate = useNavigate();
    
    const { isLoadingPostpone, errorPostpone, sendRequest: postponeDeadlinesRequest } = useFetch();

    const daysInput = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const postponeDays = daysInput.current.value;
        const postponeSeconds = postponeDays * 24 * 3600;

        const postponeDeadlineRequestContent = {
            url: `/project/task/postponedeadlines/${props.projectInfo.id}`,
            method: "PUT",
            body: {
                time: postponeSeconds
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        postponeDeadlinesRequest(postponeDeadlineRequestContent, navigate(0));
    }

    const t = useTranslation()[0]

    return (
    <form onSubmit={submitHandler}>
    <Container maxWidth='xl'>
        <Typography id="modal-modal-title" variant="h4" component="h2" style={{fontWeight: 600}}>
        {props.projectInfo?.name}
        </Typography>
        <Box sx={{clear: 'both', height: 20}}></Box>
        <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0}
        >
            <Box sx={{ width: '65%', height: 60, alignItems: 'center', display: 'flex' }}>
            <Typography variant="h4" fontFamily="Sora" style={{ textAlign: 'left'}}>{t('moveDeadlines')} {t('by')}: [{t('days')}]</Typography>
            </Box>
            <Box sx={{ width: '35%', height: 60, alignItems: 'center', background: '#ABB5BE', borderRadius: '30px', display: 'flex' }}>
                <Input inputRef={daysInput} name="day" type="number" defaultValue='7' disableUnderline='true' inputProps={{min: 0, max: 9999}} autoFocus={true}
                    sx={{ align: 'center'}} style={{paddingLeft: '20%', width: '85%', fontSize: 36, fontFamily: "Sora", textAlign: 'center'}}></Input>
            </Box>
        </Stack>
        
        <Box sx={{clear: 'both', height: 20}}></Box>
        <Button type="submit" variant="contained" size="large" 
        sx={{ width: '35%', height: 50, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
            <Typography style={{ fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>
            {t('submit')}
            </Typography>
        </Button>
    </Container>
    </form>
    );
}

