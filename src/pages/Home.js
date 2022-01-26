import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function Home() {
    return(
        <Container maxWidth='xl'>
            <Box sx={{ width: 568, height: 300, alignItems: 'center', display: 'flex'}}>
                <Typography variant="h2" fontFamily="Sora">Rebuild your project creation.</Typography>
            </Box>
        <Grid
        container
        direction="column"
        spacing={15}
        alignItems="left">
            <Grid item xs={12} spacing={12} direction="row">
                <Stack direction="row" spacing={6}>
                    <Box sx={{ width: 780, height: 350, alignItems: 'center', display: 'flex'}}>
                        <img src={image5} width={780} height={350} alt="Image 7"/>
                    </Box>
                    <Stack direction="column">
                        <Box sx={{ width: 580, height: 100, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h3" fontFamily="Sora">Manage easier</Typography>
                        </Box>
                        <Box sx={{ width: 580, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Box sx={{ width: 20, height: 175, borderLeft: '2px solid blue'}}></Box>
                            <Box sx={{ width: 540, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">Simplicity of usage is a priority along with ease of managing project goals and tasks.</Typography>
                        </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item>
                <Stack direction="row" spacing={6}>
                    <Stack direction="column">
                        <Box sx={{ width: 580, height: 100, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h3" fontFamily="Sora">Plan faster</Typography>
                        </Box>
                        <Box sx={{ width: 580, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Box sx={{ width: 20, height: 200, borderLeft: '2px solid blue'}}></Box>
                            <Box sx={{ width: 540, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">Time is valuable during development so we have put emphasis on optimising certain features to speed up your production.</Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Box sx={{ width: 780, height: 350, alignItems: 'center', display: 'flex'}}>
                        <img src={image7} width={780} height={350} alt="Image 7"/>
                    </Box>
                </Stack>
            </Grid>
            <Grid item>
                <Stack direction="row" spacing={6}>
                    <Box sx={{ width: 780, height: 350, display: 'flex'}}>
                        <img src={image6} width={780} height={350} alt="Image 6"/>
                    </Box>
                    <Stack direction="column">
                        <Box sx={{ width: 580, height: 100, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h3" fontFamily="Sora">Work together</Typography>
                        </Box>
                        <Box sx={{ width: 580, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Box sx={{ width: 20, height: 200, borderLeft: '2px solid blue'}}></Box>
                            <Box sx={{ width: 540, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">Mr. Project will enable you to easily share tasks with co-workers and consult each other. Together, you will achieve your future milestones.</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
                <Stack direction="column">
                    <Box sx={{ height: 125}}></Box>
                    <Box sx={{ width: 900, height: 75, textAlign: 'center', alignSelf: 'center'}}>
                        <Typography variant="h3" fontFamily="Sora">Join us for new growth opportunities</Typography>
                    </Box>
                    <Box sx={{ width: 700, height: 150,  alignItems: 'center', display: 'flex', textAlign: 'center', alignSelf: 'center', borderTop: '2px solid blue'}}>
                        <Typography variant="h4" fontFamily="Sora">Discover a new side of planning with Mr. Project and let him rebuild your way of designing.</Typography>
                    </Box>
                    <Button variant="contained" size="large" sx={{ width: 200, height: 60, fontSize: 24, alignSelf: 'center', borderRadius: 30}}>Sign up</Button>
                </Stack>
        </Grid>
        <Box sx={{height: 75}}></Box>
    </Container>
    );
  }
  export default Home;