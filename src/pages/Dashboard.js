import {Box, Container, Typography} from "@material-ui/core";
import UserProjects from "../component/project/UserProjects";

function Dashboard({t}) {


    return (
        <Container maxWidth="xl"  style={{marginLeft:'15%'}}>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
            <Box sx={{ width: '80%', height: 80, alignItems: 'center'}}>
                <Typography variant="h3" fontFamily="Sora">{t('dashboardtitle')}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 30}}>
               <UserProjects t={t}/>
            </Box>

            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default Dashboard;