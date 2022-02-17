import React from "react";
import {
  Typography,
  Box,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCardSmall from "./ProjectCardSmall";

function VerticalBar({t}) {
  return (
      <Box
        sx={{
          width: '15%',
          height: 770,
          background: '#195FA5',
          color: 'white',
          float: 'left',
          marginLeft: -25
        }}
      >
        <Box sx={{margin: 15, height: 20}}>
          <Typography variant="h5" fontFamily="Sora">{t('teams')}</Typography>
        </Box>
        <Box sx={{ width: '90%', height: 0, borderBottom: '2px solid white', marginLeft: '5%'}}></Box>
        <Box sx={{ width: '70%', margin: '10%', marginLeft: '15%'}}>
          <ProjectCardSmall title="Team A"/>
          <ProjectCardSmall title="Team B"/>
          <ProjectCardSmall title="Team C"/>
          <Link to="/addteam" style={{textDecoration: 'none'}}>
            <ProjectCardSmall title={t('addteam')} type="add"/>
          </Link>
        </Box>


        <Box sx={{margin: 15, height: 20}}>
          <Typography variant="h5" fontFamily="Sora">{t('recent')}</Typography>
        </Box>
        <Box sx={{ width: '90%', height: 0, borderBottom: '2px solid white', marginLeft: '5%'}}></Box>
        <Box sx={{ width: '70%', margin: '10%', marginLeft: '15%'}}>
          <Link to="/project/Project A" style={{textDecoration: 'none'}}>
          <ProjectCardSmall title="Project A"/>
          </Link>
          <Link to="/project/Project B" style={{textDecoration: 'none'}}>
          <ProjectCardSmall title="Project B"/>
          </Link>
          <Link to="/project/Project C" style={{textDecoration: 'none'}}>
          <ProjectCardSmall title="Project C"/>
          </Link>
          <Link to="/addproject" style={{textDecoration: 'none'}}>
            <ProjectCardSmall title={t('addproject')} type="add"/>
          </Link>
        </Box>
      </Box>
  );
}
export default VerticalBar;