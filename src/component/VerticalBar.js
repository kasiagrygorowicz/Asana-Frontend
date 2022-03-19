import React, {useContext} from "react";
import {Box, Typography,} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCardSmall from "./ProjectCardSmall";
import TeamCardSmall from "./TeamCardSmall";
import UserTeams from "./UserTeams";
import UserProjectsBar from "./UserProjectsBar";
import VerticalBarContext from "../store/verticalbar-context";

function VerticalBar({t}) {
    const context = useContext(VerticalBarContext)

    return (
        <Box
            key={context.updateKey}
            sx={{
                width: '15%',
                height: 770,
                background: '#195FA5',
                color: 'white',
                float: 'left'
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