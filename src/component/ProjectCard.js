import React from "react";
import {
  Typography,
  Box
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";


function ProjectCard(props) {
  return (
    <>
      <Link to={`/project/${props.projectId}`} style={{textDecoration: 'none'}}>
        <Box sx={{width: '105%', height: 193, background: props.cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30}}>
          <Box sx={{width: '100%', height: 30, color: '#FFFFFF'}}>
              <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
                  <Typography variant="h6" fontFamily="Sora"> {props.teamName} </Typography>

              </Box>
              <Box sx={{ width: '100%', height: 2, borderBottom: '2px solid white'}}></Box>
              <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
                <Typography variant="h5" fontFamily="Sora"> {props.projectName}</Typography>
                <Typography fontFamily="Sora">{props.description}</Typography>
              </Box>
          </Box>
        </Box>
      </Link>
      <Link to={"/editproject/" + props.projectId} style={{color:'white'}}>
        <SettingsIcon sx={{display: "flex", float: "right", top: -188, position: 'relative' }}/>
      </Link>
    </>

  );
}
export default ProjectCard;