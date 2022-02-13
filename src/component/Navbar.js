import './Navbar.css'

import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button, MenuItem, Select, FormControl
} from "@material-ui/core";
import LanguageIcon from '@mui/icons-material/Language';
import {Link} from "react-router-dom";


import {useTranslation} from "react-i18next";

function Navbar() {

    const [t, i18n] = useTranslation();

    const selectLanguageHandler =(e)=>{
        i18n.changeLanguage(e.target.value)
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
                    {/* Visible only when user is logged in tbd*/}
                    <Link to="/dashboard" className="navbar-link">
                        {t('dashboard')}
                    </Link>
                </div>
                <div className="navbar-right">
                  <FormControl>

                                <LanguageIcon className='language ' sx={{alignSelf: 'center'}}/>

                    <Select onChange={selectLanguageHandler}>
                        <MenuItem value={'pl'}>Polski</MenuItem>
                        <MenuItem value={'en'}>English</MenuItem>
                    </Select>
                  </FormControl>
                    <Button style={{
                        color: 'white',
                        marginRight: '10px',
                        paddingLeft: '14px',
                        borderLeft: '2px solid white',
                        borderRadius: '0px'
                    }}>
                        <Link to="/login" className='login'>
                            {t('login')}
                        </Link>
                    </Button>
                    <Button color="primary" variant="contained"
                            style={{color: 'white', borderRadius: '20px', backgroundColor: '#195FA5'}}>
                        <Link to="/signup" className='signup'>
                            {t('signup')}
                        </Link>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;