import React, {useContext} from "react";
import {Box, Typography,} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCardSmall from "./project/ProjectCardSmall";
import TeamCardSmall from "./team/TeamCardSmall";
import UserTeams from "./team/UserTeams";
import UserProjectsBar from "./project/UserProjectsBar";
import VerticalBarContext from "../store/verticalbar-context";
import Container from "@mui/material/Container";

function VerticalBar({t}) {
    const context = useContext(VerticalBarContext)

    return (
        <Box fluid
            key={context.updateKey}
            sx={{
                width: '15%',
                height: '100%',
                position: 'absolute',
                background: '#195FA5',
                color: 'white',
                float: 'left',
                display:'flex',
                flexDirection: 'column',

            }}
        >
            <Box sx={{margin: 15, height: 20}}>
                <Typography variant="h5" fontFamily="Sora">{t('teams')}</Typography>
            </Box>
            <Box sx={{width: '90%', height: 0, borderBottom: '2px solid white', marginLeft: '5%'}}></Box>
            <Box sx={{width: '70%', margin: '10%', marginLeft: '15%'}}>
                <UserTeams/>
                <Link to="/addteam" style={{textDecoration: 'none'}}>
                    <TeamCardSmall title={t('addteam')} type="add"/>
                </Link>
            </Box>

            <Box sx={{margin: 15, height: 20}}>
                <Typography variant="h5" fontFamily="Sora">{t('recent')}</Typography>
            </Box>
            <Box sx={{width: '90%', height: 0, borderBottom: '2px solid white', marginLeft: '5%'}}></Box>
            <Box sx={{width: '70%', margin: '10%', marginLeft: '15%'}}>
                <UserProjectsBar/>
                <Link to="/addproject" style={{textDecoration: 'none'}}>
                    <ProjectCardSmall title={t('addproject')} type="add"/>
                </Link>
            </Box>
        </Box>

    );
}

export default VerticalBar;