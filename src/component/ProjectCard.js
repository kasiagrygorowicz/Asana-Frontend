import React from "react";
import {
  Typography,
  Box
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';


function ProjectCard(props) {
  return (
    <Box sx={{width: '105%', height: 193, background: props.cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30}}>
    <Box sx={{width: '100%', height: 30, color: '#FFFFFF'}}>
        <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
            <Typography variant="h7" fontFamily="Sora"> {props.teamName} </Typography>
            <SettingsIcon sx={{display: "flex", float: "right", marginRight: 1.5}}/>
        </Box>
        <Box sx={{ width: '100%', height: 2, borderBottom: '2px solid white'}}></Box>
        <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
          <Typography variant="h5" fontFamily="Sora"> {props.projectName}</Typography>
          <Typography variant="h7" fontFamily="Sora">{props.description}</Typography>
        </Box>
    </Box>
    </Box>
  );
}
export default ProjectCard;