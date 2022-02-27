import React, {useContext, useState} from "react";
import {
    Typography,
    Box, Menu, MenuItem
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from "react-router-dom";
import AuthContext from "../store/auth-context";
import useFetch from "../hook/use-fetch";


function TeamCardSmall(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const authCtx = useContext(AuthContext);
    const { isLoading, error, sendRequest: deleteTeamRequest } = useFetch();

    const handleDeleteTeam = (response) => {



    }


    const deleteTeamHandler=()=>{


        const deleteTeamRequestContent = {
            url: `/team/delete/${props.id}`,
            method: "DELETE",
            body :null,
            headers: {
                'Authorization': authCtx.requestToken,
                'Content-Type': 'application/json'

            }
        }

        deleteTeamRequest(deleteTeamRequestContent, handleDeleteTeam);

    }

    return (
        <Box sx={{
            width: '100%',
            height: 32,
            background: '#4399EF',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: 30,
            marginTop: 10
        }}>
            <Box sx={{width: '95%', height: 20, color: '#FFFFFF'}}>
                <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
                    <Typography variant="h7" fontFamily="Sora"> {props.title} </Typography>
                    {props.type == "add" &&
                        <AddCircleOutlineIcon sx={{display: "flex", float: "right"}}/>

                    }

                    {props.type !== "add" &&
                        <SettingsIcon
                            sx={{display: "flex", float: "right", marginRight: "5px"}}
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        />
                    }

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{horizontal: 'left', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                            <MenuItem component={Link} to={"/editproject/" + props.title}>
                            Edit
                            </MenuItem>
                            <MenuItem component={Link} to={"/editproject/" + props.title}>
                                Add new member
                            </MenuItem>
                            <MenuItem component={Link} to={"/editproject/" + props.title} onClick={deleteTeamHandler}>
                                Delete
                            </MenuItem>
                    </Menu>


                </Box>

            </Box>
        </Box>
);
}
export default TeamCardSmall;