import React, {useContext, useState} from "react";
import {
    Typography,
    Box, Menu, MenuItem
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import {Link, useNavigate} from "react-router-dom";
import useFetch from "../../hook/use-fetch";
import VerticalBarContext from "../../store/verticalbar-context";


function ProjectCard(props) {

    const {isLoading, error, sendRequest: deleteProjectRequest} = useFetch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    let handleProjectClick = (e) => {
        if(open) {
            e.preventDefault();
        }
    }

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const verticalBarCtx = useContext(VerticalBarContext);
    const deleteProjectHandler = () => {

        const deleteProjectRequestContent = {
            url: `/project/${props?.projectId}`,
            method: "DELETE",
            body: null,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const handleDeleteProject = (response) => {
            verticalBarCtx.updateKey++;
            navigate(`/dashboard`, {replace: true})
            window.location.reload(false);
        }

        deleteProjectRequest(deleteProjectRequestContent, handleDeleteProject);
    }


  return (
    <>
    <Link to={`/project/${props.projectId}`} style={{textDecoration: 'none'}} key={props.projectId} onClick={handleProjectClick}>
        <Box sx={{width: '105%', height: 193, background: props.cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30}}>
          <Box sx={{width: '100%', height: 30, color: '#FFFFFF'}}>
              <Box
                  sx={{paddingLeft: 20, height: 25, paddingTop: 5,display:'flex',justifyContent:'space-between',alignItems:'center', mx:1}}>
                  <Typography noWrap={true} variant="h6" fontFamily="Sora"> {props.teamName} </Typography>
                  <Link to={`/dashboard`}>
                  <SettingsIcon
                      sx={{display: "flex", float: "right", marginRight: "5px", color:'white'}}
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                  />
                  </Link>
                  <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      transformOrigin={{horizontal: 'left', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >


                          <MenuItem component={Link} to={`/editproject/${props.projectId}`}>
                              Edit
                          </MenuItem>
                      {props?.isOwner &&
                          <MenuItem onClick={deleteProjectHandler}>
                              Delete
                          </MenuItem>
                      }
                  </Menu>
              </Box>


              <Box sx={{ width: '100%', height: 2, borderBottom: '2px solid white'}}></Box>
              
              <Box sx={{paddingLeft: 20, height: '100%', paddingTop: 5,color:'white'}}>
                <Typography noWrap={true} variant="h5" fontFamily="Sora"> {props.projectName}</Typography>
                <Typography fontFamily="Sora">{props.description}</Typography>
              </Box>
              
          </Box>
        </Box>
    </Link>
    </>

  );
}
export default ProjectCard;