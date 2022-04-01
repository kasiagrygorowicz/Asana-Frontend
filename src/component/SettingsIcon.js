import React, {useState} from "react";
import {Menu, MenuItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

export default function MySettingsIcon(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(props.id)

    return <>
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

        <MenuItem component={Link} to={props?.link + props?.id}>
            Add new member
        </MenuItem>
        {props?.isOwner &&
            <MenuItem component={Link} to={props?.link + props?.id}>
                Edit
            </MenuItem>
        }
        {props?.isOwner &&
            <MenuItem onClick={props?.deleteTeamHandler}>
                Delete
            </MenuItem>
        }
    </Menu>
    </>
}