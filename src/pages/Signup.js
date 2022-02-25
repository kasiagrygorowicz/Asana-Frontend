import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {Checkbox} from '@material-ui/core';
import {Trans} from 'react-i18next'
import useFetch from "../hook/use-fetch";
import {useContext, useRef, useState} from "react";
import AuthContext from "../store/auth-context";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/lab";


function Signup({t}) {

    const {isLoading, error, sendRequest: registerRequest} = useFetch();
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const nameRef = useRef()
    const termsRef = useRef()
    const [errorMessage, setErrorMessage] = useState(null)
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();


    const handleRegistration = (response) => {
        // authCtx.login(response['access_token'])
        navigate('/login', {replace: true})
    }

    const submitHandler = (e) => {
        e.preventDefault()


        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        const name = nameRef.current.value


        const registerRequestContent = {
            url: "/registration",
            method: "POST",
            body: {
                'email': email,
                'password': password,
                'name': name
            },
            headers: {
                'Content-Type': 'application/json'

            }
        };

        try{
            setErrorMessage(null)
            if (email.trim().length == 0 || password.trim().length  == 0 || name.trim().length  == 0|| confirmPassword.trim().length == 0) {
                throw new Error("Fields cannot be empty")
            }

            if (!(password == confirmPassword)) {
              throw new Error("Passwords don't match")
            }

            if(!termsRef.current.checked){
                throw new Error("You need to accept terms and conditions to register new account")
            }

            registerRequest(registerRequestContent, handleRegistration);

        }catch(e){
            setErrorMessage(e.message)
        }


    }


    return (
        <Container maxWidth='xl'>
            <Box sx={{height: 50}}></Box>
            <Stack direction="column">
                <Typography variant="h2" fontFamily="Sora" align="center" alignSelf='center' height='100px'
                            fontWeight="bold">{t('signup')}</Typography>
            </Stack>
            <Grid
                container
                direction="column"
                spacing={15}
                alignItems="center">
                <Grid item xs={12} spacing={12} direction="row">
                    <form onSubmit={submitHandler}>
                        <Stack direction="row" spacing={6}>
                            <Stack direction="column">
                                <Box sx={{width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.username')}</Typography>
                                </Box>


                                <Box sx={{
                                    width: 400,
                                    height: 60,
                                    alignItems: 'center',
                                    display: 'flex',
                                    background: '#DEE2E6',
                                    borderRadius: '30px'
                                }}>
                                    <Input inputRef={nameRef} name="name" type="text"
                                           placeholder={t('signupPage.username')} disableUnderline='true'
                                           sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.email')}</Typography>
                                </Box>
                                <Box sx={{
                                    width: 400,
                                    height: 60,
                                    alignItems: 'center',
                                    display: 'flex',
                                    background: '#DEE2E6',
                                    borderRadius: '30px'
                                }}>
                                    <Input inputRef={emailRef} name="email" type="email"
                                           placeholder={t('signupPage.email')} disableUnderline='true'
                                           sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4" fontFamily="Sora">{t('signupPage.password')}</Typography>
                                </Box>
                                <Box sx={{
                                    width: 400,
                                    height: 60,
                                    alignItems: 'center',
                                    display: 'flex',
                                    background: '#DEE2E6',
                                    borderRadius: '30px'
                                }}>
                                    <Input inputRef={passwordRef} name="password" type="password"
                                           placeholder="*********" disableUnderline='true'
                                           sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>
                                <Box sx={{width: 400, height: 70, alignItems: 'center', display: 'flex'}}>
                                    <Typography variant="h4"
                                                fontFamily="Sora">{t('signupPage.confirmPassword')}</Typography>
                                </Box>
                                <Box sx={{
                                    width: 400,
                                    height: 60,
                                    alignItems: 'center',
                                    display: 'flex',
                                    background: '#DEE2E6',
                                    borderRadius: '30px'
                                }}>
                                    <Input inputRef={confirmPasswordRef} name="confirmPassword" type="password"
                                           placeholder="*********" disableUnderline='true'
                                           sx={{width: 350, align: 'center', marginLeft: '20px'}}></Input>
                                </Box>

                                {(errorMessage && <Alert severity="error">{errorMessage}</Alert>)
                                    ||
                                    ( error && <Alert severity="error">{error}</Alert>)
                                }


                                <Box sx={{width: 400, height: 80, alignItems: 'center', display: 'flex'}}>
                                    <Checkbox inputRef={termsRef} style={{color: "#195FA5"}}></Checkbox>
                                    <Typography fontFamily="Sora" fontSize="12px"><Trans
                                        i18nKey="signupPage.terms"/>.</Typography>
                                </Box>
                                <Button type="submit" variant="contained" size="large" sx={{
                                    width: 250,
                                    height: 60,
                                    fontSize: 24,
                                    alignSelf: 'center',
                                    borderRadius: 30
                                }}>
                                    <Typography textTransform='none'
                                                sx={{fontSize: 24, alignSelf: 'center', fontWeight: 'bold'}}>
                                        {t('signup')}
                                    </Typography>
                                </Button>


                                <Box sx={{height: 40}}></Box>
                            </Stack>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
            <Box sx={{height: 60}}></Box>
        </Container>
    );
}

export default Signup;
