import React, { useState } from 'react';
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import {
  Typography,
  Box
} from "@material-ui/core";
import {Link} from "react-router-dom";
import ChangeHistoryTwoToneIcon from '@mui/icons-material/ChangeHistoryTwoTone';


function Member(props) {
const t = useTranslation()[0]
const l = "/userprofile/" + props?.id;
const [isHovering, setHovering] = useState(false);

const HoverInfo = () => {
    return (
        <Box sx={{ width: 350, height: 100, alignItems: 'center', border: '5px solid #195FA5', background: '#BACFE4', margin: 15, borderRadius: 30, position: 'absolute', marginTop: 110}}>
            <ChangeHistoryTwoToneIcon fontSize='large' sx={{position:'absolute', color: '#195FA5', top: '-40%', left: '2%', width: 48, height: 48}} />
            <Box sx={{ width: 60, height: 60, alignItems: 'center', display: 'flex', float: 'left', background: props.color, border: '3px solid black', margin: 15}} >
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, width: 60, textAlign: 'center', color: 'black'}}> { props.initials } </Typography>
            </Box>
            <Typography fontFamily="Sora" style={{fontWeight: 600, fontSize: 21 , lineHeight: 1.2, marginTop: 10, width: '75%', color: 'black'}}>{props.fullname}</Typography>
            <Typography fontFamily="Sora" style={{fontWeight: 400, fontSize: 14, color: 'black'}}>{props.email}</Typography>
        </Box>           
    );
};

  return (
      <div onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <Box sx={{ width: props.size, height: props.size, alignItems: 'center', display: 'flex', float: 'left', background: props.color, border: '3px solid black', margin: 15, borderRadius: 30}} >
            <Link to={l} style={{textDecoration: 'none', color: 'black'}}>
            <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, width: props.size, textAlign: 'center'}}> { props.initials } </Typography>
            </Link>
        </Box>
        {isHovering && <HoverInfo/>}
      </div>
  );
}

export default Member;