import React from "react";
import {
  Typography,
  Box
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from "react-router-dom";


function TeamCardSmall(props) {
  return (
    <Box sx={{width: '100%', height: 32, background: '#4399EF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, marginTop: 10}}>
    <Box sx={{width: '95%', height: 20, color: '#FFFFFF'}}>
    <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
        <Typography variant="h7" fontFamily="Sora"> {props.title} </Typography>
        {props.type == "add" &&
            <AddCircleOutlineIcon sx={{display: "flex", float: "right"}}/>
        }
        {props.type != "add" &&
        <Link to={"/editteam/" + props.title} style={{color:'white'}}>
            <SettingsIcon sx={{display: "flex", float: "right"}}/>
        </Link>
        }
    </Box>

    </Box>
    </Box>
  );
}
export default TeamCardSmall;