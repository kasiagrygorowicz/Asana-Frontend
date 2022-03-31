import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Box, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoopIcon from "@mui/icons-material/Loop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";

const TimeManagement = () => {
    return(
        <Container>
            <Typography>Time Management</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: 'flex-start',
                gap: 3
            }}>
                <Typography>Project A</Typography>
                <Typography>69h : 21m : 37s</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: 'space-evenly',
                gap: 3,
                flexWrap: "wrap"
            }}>
                <Box sx={{width: '60%', height: 130, background: "red", boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, marginTop: 20}}>
                    <Box sx={{width: '95%', height: 120, color: '#FFFFFF'}}>
                        <Stack direction="column">
                            <Stack direction="row">
                                <Box sx={{paddingLeft: 30, height: 35, paddingTop: 7.5, width: '75%'}}>
                                    <Typography variant="h5" fontFamily="Sora" noWrap="true" style={{fontWeight: 'bold', overflow: 'hidden' }}>Task A</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row">
                                <Box sx={{paddingLeft: 30, height: 40, width: '90%', marginTop: 15}}>
                                    {/*{props.taskType !== "DONE" && props.taskType !== "DOING" &&*/}
                                    {/*<CloseRoundedIcon sx={{display: "flex", float: "right", marginRight: 1, color: "#FF4153"}}/>*/}
                                    {/*}*/}
                                    {/*{props.taskType === "DOING" &&*/}
                                    {/*<LoopIcon sx={{display: "flex", float: "right", marginRight: 1, color: "#FFD350"}}/>*/}
                                    {/*}*/}
                                    {/*{props.taskType === "DONE" &&*/}
                                    <CheckCircleOutlineIcon sx={{display: "flex", float: "right", marginRight: 1, color: "#1ADC46"}}/>
                                    {/*}*/}
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

            </Box>
        </Container>
    );
}

export default TimeManagement;