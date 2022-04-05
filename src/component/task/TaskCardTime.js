import React from "react";
import {
  Typography,
  Box
} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LoopIcon from '@mui/icons-material/Loop';

function TaskCardTime(props) {

    const seconds = <span>{("0" + Math.floor(props.time % 60)).slice(-2)}</span>;
    const minutes = <span>{("0" + Math.floor(props.time / 60 % 60)).slice(-2)}</span>;
    const hours = <span>{("0" + Math.floor(props.time / 3600)).slice(-2)}</span>;

    return (
        <Box sx={{width: '20%', height: 100, background: props.cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, marginTop: 20}}>
        <Box sx={{width: '95%', height: 80, color: '#FFFFFF'}}>
        <Stack direction="column">
            <Stack direction="row">
                <Box sx={{paddingLeft: 30, height: 35, paddingTop: 7.5, width: '75%'}}>
                <Typography variant="h5" fontFamily="Sora" noWrap="true" style={{fontWeight: 'bold', overflow: 'hidden' }}> {props.taskName} </Typography>
                </Box>
            </Stack>
                <Box sx={{paddingLeft: 30, height: 0, width: '90%'}}>
                </Box>
            <Stack direction="row">
                <Box sx={{paddingLeft: 15}}>
                <Box sx={{ width: '110%', height: '65%', alignItems: 'center', float: 'left', background: '#17A2B8', borderRadius: '30px', margin: 10, display: 'flex' }}>
                    <Typography variant="h6" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'left', width: '80%', paddingLeft: '10%'}}>
                        {hours}:{minutes}:{seconds}
                    </Typography>
                </Box>
                </Box>
                <Box sx={{marginLeft: '35%', height: 40, marginTop: 15}}>
                {props.taskType !== "DONE" && props.taskType !== "DOING" &&
                    <CloseRoundedIcon sx={{display: "flex", float: "right", marginRight: 1, color: "#FF4153"}}/>
                }
                {props.taskType === "DOING" &&
                    <LoopIcon sx={{display: "flex", float: "right", marginRight: 1, color: "#FFD350"}}/>
                }
                {props.taskType === "DONE" &&
                    <CheckCircleOutlineIcon sx={{display: "flex", float: "right", marginRight: 1, color: "#1ADC46"}}/>
                }
                </Box>
                {/* <Box sx={{ height: 40, alignItems: 'center', display: 'flex', float: 'right',
                        border: '3px solid white', borderRadius: 5, background: "#17A2B8"}}>
                    <Typography fontFamily="Sora" style={{fontWeight: 600, fontSize: 36, lineHeight: 1.2, width: '75%', color: 'black', margin: 9.5}}>+</Typography>
                </Box> */}
                <Box sx={{ width: '100%', height: 40, alignItems: 'center', display: 'flex', float: 'right', borderRadius: 5}}>
                </Box>
            </Stack>
        </Stack>
        </Box>
        </Box>
      );
  }
  export default TaskCardTime;