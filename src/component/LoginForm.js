import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useContext, useRef} from "react";
import useFetch from "../hook/use-fetch";
import AuthContext from "../store/auth-context";

const LoginForm = ({t}) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const { isLoading, error, sendRequest: loginRequest } = useFetch();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const handleLogin = (response) => {
            authCtx.login(response['access_token'])
            navigate('/', { replace: true })
        }

        const loginRequestContent = {
            url: "/login",
            method: "POST",
            body: {
                'username': enteredEmail,
                'password': enteredPassword
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        loginRequest(loginRequestContent, handleLogin);
    }

    let errorMessage;
    if (error) {
        if (error === 'Something went wrong.') {
            errorMessage = <p>{"Incorrect login or password, try again."}</p>
        } else {
            errorMessage = <p>{error}</p>
        }
    }

    return (
        <Grid item xs={5} direction="column" alignItems="left">
            <form onSubmit={submitHandler}>
                <Stack>
                    <Stack direction="column">
                        <Box sx={{ width: '100%', height: 70, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">{t('signupPage.email')}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                            <Input inputRef={emailInputRef} name="email" type="email" placeholder={t('signupPage.email')} disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}} />
                        </Box>
                        <Box sx={{ width: '100%', height: 70, alignItems: 'center', display: 'flex'}}>
                            <Typography variant="h4" fontFamily="Sora">{t('signupPage.password')}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 60, alignItems: 'center', display: 'flex', background: '#DEE2E6', borderRadius: '30px' }}>
                            <Input inputRef={passwordInputRef} name="password" type="password" placeholder="*********" disableUnderline='true' sx={{width: 350, align: 'center', marginLeft: '20px'}} />
                        </Box>
                        {error && <Box>{errorMessage}</Box>}
                        <Box sx={{ height: 40}}></Box>
                        <Button type="submit" variant="contained" size="large" sx={{ width: 200, height: 60, fontSize: 24, alignSelf: 'center', borderRadius: 30}}>
                            <Typography textTransform='none' sx={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                                {t('login')}
                            </Typography>
                        </Button>
                        <Box sx={{ height: 30}}></Box>
                        <Box sx={{ width: '100%', height: 70, alignItems: 'center', textAlign: 'center'}}>
                            <Typography variant="h6" fontFamily="Sora">{t('noAccountMsg')} </Typography>
                            <Link to="/signup">
                                <Typography fontFamily="Sora" color="#1A84EE" sx={{fontWeight: 'bold'}}> {t('signup')} </Typography>
                            </Link>
                        </Box>
                    </Stack>
                </Stack>
            </form>
        </Grid>
    );
}

export default LoginForm;