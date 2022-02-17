import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function Home({t}) {
    const navigate = useNavigate();
    return(
        <Container maxWidth='xl'>
            <Box sx={{ width: 568, height: 300, alignItems: 'center', display: 'flex'}}>
                <Typography variant="h2" fontFamily="Sora">{t('homePage.title')}</Typography>
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
                            <Typography variant="h3" fontFamily="Sora">{t('homePage.subtitle')}</Typography>
                        </Box>
                        <Box sx={{ width: 580, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Box sx={{ width: 20, height: 200, borderLeft: '2px solid', borderColor: '#4399EF'}}></Box>
                            <Box sx={{ width: 540, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">{t('homePage.subtitleMsg')}</Typography>
                        </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item>
                <Stack direction="row" spacing={6}>
                    <Stack direction="column">
                        <Box sx={{ width: 580, height: 100, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h3" fontFamily="Sora">{t('homePage.subtitle2')}</Typography>
                        </Box>
                        <Box sx={{ width: 580, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Box sx={{ width: 20, height: 260, borderLeft: '2px solid', borderColor: '#4399EF'}}></Box>
                            <Box sx={{ width: 540, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">{t('homePage.subtitleMsg2')}</Typography>
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
                            <Typography variant="h3" fontFamily="Sora">{t('homePage.subtitle3')}</Typography>
                        </Box>
                        <Box sx={{ width: 580, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Box sx={{ width: 20, height: 260, borderLeft: '2px solid', borderColor: '#4399EF'}}></Box>
                            <Box sx={{ width: 540, height: 250, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">{t('homePage.subtitleMsg3')}</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
                <Stack direction="column">
                    <Box sx={{ height: 125}}></Box>
                    <Box sx={{ width: 1300, height: 75, textAlign: 'center', alignSelf: 'center'}}>
                        <Typography variant="h3" fontFamily="Sora">{t('homePage.join')}</Typography>
                    </Box>
                    <Box sx={{ width: 850, height: 150,  alignItems: 'center', display: 'flex', textAlign: 'center', alignSelf: 'center', borderTop: '2px solid', borderColor: '#4399EF'}}>
                        <Typography variant="h4" fontFamily="Sora">{t('homePage.joinMsg')}</Typography>
                    </Box>
                    <Box sx={{ height: 25}}></Box>
                    <Button variant="contained" size="large" onClick={() => {navigate("/signup");}} 
                    sx={{ width: 250, height: 60, fontSize: 24, alignSelf: 'center', borderRadius: 30}}>
                        <Typography textTransform='none' sx={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                        {t('signup')}
                        </Typography>
                    </Button>
                </Stack>
        </Grid>
        <Box sx={{height: 50}}></Box>
    </Container>
    );
  }
  export default Home;