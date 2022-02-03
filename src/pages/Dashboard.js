import {
    Container,
    Box,
    Typography,
    Grid
  } from "@material-ui/core";
import ProjectCard from "../component/ProjectCard";
import VerticalBar from '../component/VerticalBar';

function Dashboard() {
    return (
        <Container maxWidth="x1">
            <VerticalBar />
            <Box sx={{ width: '100%', height: 120, alignItems: 'center', display: 'flex'}}>
                <Typography variant="h3" fontFamily="Sora">Your projects</Typography>
            </Box>
            <Box sx={{ width: '100%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 30}}>
                <Grid container spacing={10}>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#4F6C89" teamName="Team A" projectName="Project A" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#467AAE" teamName="Team B" projectName="Project B" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#6396C8" teamName="Team A" projectName="Project C" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#6396C8" teamName="Team B" projectName="Project D" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#4F6C89" teamName="Team A" projectName="Project E" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                    <Grid item xs={3}>
                        <ProjectCard cardColor="#467AAE" teamName="Team B" projectName="Project F" description="Some quick example of project description to build on the card title and make up the bulk of the card's content."/>
                    </Grid>
                </Grid>

            </Box>

            <Box sx={{height: 75}}></Box>
        </Container>
    );
  }
  export default Dashboard;