import image1 from "./images/login_image1.png";
import image2 from "./images/login_image2.png";
import image3 from "./images/login_image3.png";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LoginForm from "../component/LoginForm";

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
                        <LoginForm t={t}/>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ height: 100}}></Box>
        </Container>
    );
  }
  export default Login;
  