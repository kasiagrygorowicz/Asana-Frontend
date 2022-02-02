import './Navbar.css'

import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button, MenuItem, Select, ListItemIcon, InputLabel, FormControl
} from "@material-ui/core";
import LanguageIcon from '@mui/icons-material/Language';
import {Link} from "react-router-dom";
import {fontFamily} from '@mui/system';


import {useTranslation} from "react-i18next";

function Navbar() {

    const [t, i18n] = useTranslation();

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
                </div>
                <div className="navbar-right">
                  <FormControl>

                                <LanguageIcon className='language ' sx={{alignSelf: 'center'}}/>

                    <Select>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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