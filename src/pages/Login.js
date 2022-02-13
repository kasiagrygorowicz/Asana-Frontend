import image1 from "./images/login_image1.png";
import image2 from "./images/login_image2.png";
import image3 from "./images/login_image3.png";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

function Login({t}) {
    return (
        <Container maxWidth='x1'>
            <Box sx={{ height: 20}}></Box>
            <Grid container direction="row" alignItems="left" sx={12} spacing={0}>
                <Grid item xs={7}>
                    <Grid
                    container
                    direction="column"
                    spacing={0}
                    alignItems="left">
                        <Grid item direction="row" xs={12}>
                                <Box sx={{alignItems: 'left', width: '100%', height: 380}}>
                                    <img src={image1} width={'100%'} height={370} style={{objectFit: 'cover'}} alt="Image 1"/>
                                </Box>
                        </Grid>
                        <Grid container direction="row">
                            <Grid item direction="row" xs={4}>
                                    <Box sx={{alignItems: 'left', width: '100%', height: 380}}>
                                        <img src={image2} width={'97%'} height={450} style={{objectFit: 'cover'}} alt="Image 2"/>
                                    </Box>
                            </Grid> 
                            <Grid item direction="row" xs={8}>
                                <Box sx={{alignItems: 'left', width: '100%', height: 380}}>
                                    <img src={image3} width={'100%'} height={450} style={{objectFit: 'cover'}} alt="Image 3"/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5} direction="row" alignItems="center" alignContent="center">
                    <Box height={'15%'}></Box>
                    <Typography variant="h2" fontFamily="Sora" align="center" alignSelf='center' height='100px' fontWeight="bold">{t('login')}</Typography>
                        <Grid
                        container
                        direction="column"
                        spacing={15}
                        alignItems="center">
                            <Grid item xs={5} direction="column" alignItems="left">
                                <Stack>
                                    <Stack direction="column">
                                    <Box sx={{ width: '100%', height: 70, alignItems: 'center', display: 'flex'}}>
                                        <Typography variant="h4" fontFamily="Sora">{t('signupPage.email')}</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                                        <Input name="email" type="email" placeholder={t('signupPage.email')} disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                    </Box>
                                    <Box sx={{ width: '100%', height: 70, alignItems: 'center', display: 'flex'}}>
                                        <Typography variant="h4" fontFamily="Sora">{t('signupPage.password')}</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                                        <Input name="password" type="password" placeholder="*********" disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                    </Box>
                                    <Box sx={{ height: 40}}></Box>
                                    <Button variant="contained" size="large" sx={{ width: 200, height: 60, fontSize: 24, alignSelf: 'center', borderRadius: 30}}>
                                        <Typography textTransform='none' sx={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                                            {t('login')}
                                        </Typography>
                                    </Button>
                                    <Box sx={{ height: 30}}></Box>
                                    <Box sx={{ width: '100%', height: 70, alignItems: 'center', textAlign: 'center'}}>
                                        <Typography variant="h7" fontFamily="Sora">{t('noAccountMsg')} </Typography>
                                         <Link to="/signup">
                                            <Typography variant="h7" fontFamily="Sora" color="#1A84EE" sx={{fontWeight: 'bold'}}> {t('signup')} </Typography>
                                         </Link>
                                    </Box>
                                    </Stack>
                                </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ height: 100}}></Box>
        </Container>
    );
  }
  export default Login;
  