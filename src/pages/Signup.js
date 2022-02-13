import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Checkbox } from '@material-ui/core';

function Signup({t}) {
          return (
            <Container maxWidth='xl'>
                <Box sx={{ height: 50}}></Box>
                <Stack direction="column">
                    <Typography variant="h2" fontFamily="Sora" align="center" alignSelf='center' height='100px' fontWeight="bold">{t('signup')}</Typography>
                </Stack>
                <Grid
                container
                direction="column"
                spacing={15}
                alignItems="center">
                    <Grid item xs={12} spacing={12} direction="row">
                        <Stack direction="row" spacing={6}>
                            <Stack direction="column">
                                <Box sx={{ width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.username')}</Typography>
                                </Box>
                                <Box sx={{ width: 400, height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                                    <Input name="email" type="email" placeholder={t('signupPage.username')} disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{ width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.email')}</Typography>
                                </Box>
                                <Box sx={{ width: 400, height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                                    <Input name="email" type="email" placeholder={t('signupPage.email')} disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{ width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.password')}</Typography>
                                </Box>
                                <Box sx={{ width: 400, height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                                    <Input name="password" type="password" placeholder="*********" disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{ width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.confirmPassword')}</Typography>
                                </Box>
                                <Box sx={{ width: 400, height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                                    <Input name="password" type="password" placeholder="*********" disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{ width: 400, height: 80, alignItems: 'center', display: 'flex'}}>
                                    <Checkbox style ={{ color: "#195FA5" }}></Checkbox>
                                    <Typography fontFamily="Sora" fontSize="12px">I have read and accept <b>Terms of use</b>, <b>Privacy Policy</b> and <b>Cookie Terms</b>.</Typography>
                                </Box>
                                <Button variant="contained" size="large" sx={{ width: 200, height: 60, fontSize: 24, alignSelf: 'center', borderRadius: 30}}>
                                    <Typography textTransform='none' sx={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                                        {t('signup')}
                                    </Typography>
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            <Box sx={{height: 60}}></Box>
            </Container>
          );
      }

  export default Signup;
