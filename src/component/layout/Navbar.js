import './Navbar.css'

import React, {useContext} from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button, MenuItem, Select, FormControl
} from "@material-ui/core";
import LanguageIcon from '@mui/icons-material/Language';
import {Link} from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {useTranslation} from "react-i18next";
import AuthContext from "../../store/auth-context";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    select: {
        "& .MuiSvgIcon-root": {
            color: "white",
        },
    },
});

function Navbar() {
    const classes = useStyles();
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const [t, i18n] = useTranslation();

    const selectLanguageHandler =(e)=>{
        i18n.changeLanguage(e.target.value)
    }

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <AppBar position="static">
            <Toolbar className='navbar-container'>
                <Typography variant="h4" className="navbar-title">
                    Mr. Project
                </Typography>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        {t('home')}

                    </Link>
                    <Link to="/features" className="navbar-link">
                        {t('features')}
                    </Link>
                    <Link to="/pricing" className="navbar-link">
                        {t('pricing')}
                    </Link>
                    <Link to="/about" className="navbar-link">
                        {t('about')}
                    </Link>
                    {isLoggedIn &&
                    <Link to="/dashboard" className="navbar-link">
                        {t('dashboard')}
                    </Link>
                    }
                </div>
                <div className="navbar-right">
                  <FormControl style={{top: isLoggedIn ? 21 : 0, borderRight: '2px solid white', borderRadius: '0px'}}>
                    <LanguageIcon sx={{alignSelf: 'center', left: -30, position: 'absolute', top: '10%'}}/>
                    <Select onChange={selectLanguageHandler} disableUnderline={true} value={t('lang')} style={{color: 'white'}} className={classes.select}>
                        <MenuItem value={'pl'}>Polski</MenuItem>
                        <MenuItem value={'en'}>English</MenuItem>
                    </Select>
                  </FormControl>
                    {!isLoggedIn &&
                        <Button style={{
                            color: 'white',
                            marginRight: '10px',
                            paddingLeft: '14px'
                        }}>
                            <Link to="/login" className='login'>
                                {t('login')}
                            </Link>
                        </Button>
                    }
                    {!isLoggedIn &&
                        <Button color="primary" variant="contained"
                        style={{color: 'white', borderRadius: '20px', backgroundColor: '#195FA5'}}>
                            <Link to="/signup" className='signup'>
                                {t('signup')}
                            </Link>
                        </Button>
                    }
                    {isLoggedIn &&
                    <Button onClick={logoutHandler} sx={{float: 'left'}} style={{color: 'white', top: -15}}>
                        <LogoutIcon/>
                    </Button>
                    }
                    {isLoggedIn &&
                        <Link to="/account" sx={{float: 'left'}} style={{color: 'white'}}>
                            <AccountCircleIcon sx={{width: 40, height: 40, marginTop: 2}}/>
                        </Link>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;