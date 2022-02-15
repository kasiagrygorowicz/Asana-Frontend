import React from "react";
import {useTranslation} from "react-i18next";
import {
  Typography,
  Box
} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LoopIcon from '@mui/icons-material/Loop';

function TaskCard(props) {
    const t = useTranslation()[0]
    return (
        <Box sx={{width: '55%', height: 75, background: props.cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, marginTop: 20}}>
        <Box sx={{width: '95%', height: 75, color: '#FFFFFF'}}>
        <Stack direction="column">
            <Stack direction="row">
                <Box sx={{paddingLeft: 30, height: 35, paddingTop: 5, width: '80%'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 'bold'}}> {props.taskName} </Typography>
                </Box>
                <SettingsIcon sx={{display: "flex", float: "right", marginRight: 0.5, marginTop: 1}}/>
            </Stack>
            <Stack direction="row">
                <Box sx={{paddingLeft: 30, height: 25, paddingTop: 3, width: '90%'}}>
                <Typography variant="h7" fontFamily="Sora">{t('dueDate')}: {props.date}</Typography>
                {props.taskType != "done" && props.taskType != "inprogress" &&
                    <CloseRoundedIcon sx={{display: "flex", float: "right", marginRight: 0.5, color: "#FF4153"}}/>
                }
                {props.taskType == "inprogress" &&
                    <LoopIcon sx={{display: "flex", float: "right", marginRight: 0.5, color: "#FFD350"}}/>
                }
                {props.taskType == "done" &&
                    <CheckCircleOutlineIcon sx={{display: "flex", float: "right", marginRight: 0.5, color: "#1ADC46"}}/>
                }
                </Box>
            </Stack>
        </Stack>
        </Box>
        </Box>
      );
  }
  export default TaskCard;