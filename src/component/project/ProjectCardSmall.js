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


function ProjectCardSmall(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const {isLoading, error, sendRequest: deleteProjectRequest} = useFetch();

  const verticalBarCtx = useContext(VerticalBarContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProjectHandler = () => {


    const deleteProjectRequestContent = {
      url: `/project/${props.id}`,
      method: "DELETE",
      body: null,
      headers: {
        'Content-Type': 'application/json'

      }
    }

    const handleDeleteProject = (response) => {
      verticalBarCtx.updateKey++;
      navigate('/dashboard', {replace: true})
    }

    deleteProjectRequest(deleteProjectRequestContent, handleDeleteProject);

  }

  if(error){
    console.log(error)
  }

  return (
    <Box sx={{width: '100%', height: 32, background: '#4399EF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, marginTop: 10}}>
      <Box sx={{width: '95%', height: 20, color: '#FFFFFF'}}>
        <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5, display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{textDecoration: 'none', outline: "none", color: "white", width: "100%"}}>
            <Typography fontFamily="Sora" > {props.title} </Typography>
          </Box>
            {props.type == "add" &&
                <AddCircleOutlineIcon sx={{display: "flex", float: "right"}}/>
            }
            {props.type != "add" &&
<>
                <SettingsIcon
                    sx={{display: "flex", float: "right", marginRight: "5px"}}
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


              <MenuItem component={Link} to={`/editproject/${props.id}`}>
              Edit
              </MenuItem>
            {props?.isOwner &&
              <MenuItem onClick={deleteProjectHandler}>
              Delete
              </MenuItem>
            }
              </Menu>
</>
            }

        </Box>
      </Box>
    </Box>
  );
}
export default ProjectCardSmall;