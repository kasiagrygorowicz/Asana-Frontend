import React from "react";
import {
  Typography,
  Box,
} from "@material-ui/core";
import ProjectCardSmall from "./ProjectCardSmall";

function VerticalBar() {
  return (
      <Box
        sx={{
          width: '15%',
          height: 820,
          background: '#195FA5',
          color: 'white',
          float: 'left'
        }}
      >
        <Box sx={{margin: 15, height: 20}}>
          <Typography variant="h5" fontFamily="Sora">Teams</Typography>
        </Box>
        <Box sx={{ width: '90%', height: 0, borderBottom: '2px solid white', marginLeft: '5%'}}></Box>
        <Box sx={{ width: '70%', margin: '10%', marginLeft: '15%'}}>
          <ProjectCardSmall title="Team A"/>
          <ProjectCardSmall title="Team B"/>
          <ProjectCardSmall title="Team C"/>
          <ProjectCardSmall title="Add team" type="add"/>
        </Box>


        <Box sx={{margin: 15, height: 20}}>
          <Typography variant="h5" fontFamily="Sora">Recent projects</Typography>
        </Box>
        <Box sx={{ width: '90%', height: 0, borderBottom: '2px solid white', marginLeft: '5%'}}></Box>
        <Box sx={{ width: '70%', margin: '10%', marginLeft: '15%'}}>
          <ProjectCardSmall title="Project A"/>
          <ProjectCardSmall title="Project B"/>
          <ProjectCardSmall title="Project C"/>
          <ProjectCardSmall title="Add project" type="add"/>
        </Box>
      </Box>
  );
}
export default VerticalBar;