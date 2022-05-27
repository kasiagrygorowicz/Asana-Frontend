import React, {useState, useContext} from "react";
import {
  Typography,
  Box, MenuItem, Menu
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link, useNavigate} from "react-router-dom";
import useFetch from "../../hook/use-fetch";
import VerticalBarContext from "../../store/verticalbar-context";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode";


function ProjectCardSmall({t, projectId, description, projectName, teamName, isOwner, cardColor, type}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const {isLeaveLoading, isLeaveError, sendRequest: leaveProjectRequest} = useFetch();
  const authCtx = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
  };

  let handleProjectClick = (e) => {
    if(open) {
      e.preventDefault();
    }
    if(type == "add") {
      e.preventDefault();
      navigate("/addproject", {replace: true})
    }
    if(type == "time") {
      e.preventDefault();
      navigate("/management/time", {replace: true})
    }
  }

  const {isLoading, error, sendRequest: deleteProjectRequest} = useFetch();

  const verticalBarCtx = useContext(VerticalBarContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProjectHandler = () => {


    const deleteProjectRequestContent = {
      url: `/project/${projectId}`,
      method: "DELETE",
      body: null,
      headers: {
        'Content-Type': 'application/json'

      }
    }

    const handleDeleteProject = (response) => {
      verticalBarCtx.updateKey++;
      if(window.location.pathname == `/project/${projectId}`) {
          navigate(-1)
      }
      else {
          window.location.reload(false);
      }
    }

    deleteProjectRequest(deleteProjectRequestContent, handleDeleteProject);

  }

  const leaveProjectHandler = () => {
    const userId = jwt_decode(authCtx.authToken).id;
    const leaveProjectRequestContent = {
        url: `/project/${projectId}/leave/${userId}`,
        method: "DELETE",
        body: null,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const handleLeaveProject = (response) => {
        verticalBarCtx.updateKey++;
        navigate(`/dashboard`, {replace: true})
        window.location.reload(false);
    }

    leaveProjectRequest(leaveProjectRequestContent, handleLeaveProject);
}

  if(error){
    console.log(error)
  }

  return (
    <Link to={`/project/${projectId}`} style={{textDecoration: 'none'}} key={projectId} onClick={handleProjectClick}>
    <Box sx={{width: '100%', height: 32, background: cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, marginTop: 10}}>
      <Box sx={{width: '95%', height: 20, color: '#FFFFFF'}}>
        <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5, display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{textDecoration: 'none', outline: "none", color: "white", width: "85%"}}>
            <Typography noWrap={true} fontFamily="Sora" > {projectName} </Typography>
          </Box>
            {type == "add" &&
                <AddCircleOutlineIcon sx={{display: "flex", float: "right"}}/>
            }
            {type == "time" &&
                <AccessTimeFilledIcon sx={{display: "flex", float: "right"}}/>
            }
            {type != "add" && type != "time" &&
<>
                <SettingsIcon
                    sx={{display: "flex", float: "right"}}
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                />

              <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{horizontal: 'left', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >

            {!isOwner &&
              <MenuItem onClick={leaveProjectHandler}>
                {t('leave')}
              </MenuItem>
            }
            {isOwner &&
            <>
              <MenuItem component={Link} to={`/editproject/${projectId}`}>
                {t('edit')}
              </MenuItem>
              <MenuItem component={Link} to={`/project/${projectId}/management`}>
                {t('manage')}
              </MenuItem>
              <MenuItem onClick={deleteProjectHandler}>
                {t('delete')}
              </MenuItem>
            </>
            }
              </Menu>
</>
            }

        </Box>
      </Box>
    </Box>
    </Link>
  );
}
export default ProjectCardSmall;