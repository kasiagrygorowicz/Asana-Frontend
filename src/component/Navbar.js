import './Navbar.css'

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "react-router-dom";
import { fontFamily } from '@mui/system';


function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar className='navbar-container'>
        <Typography variant="h4" className="navbar-title">
          Mr. Project
        </Typography>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/features" className="navbar-link">
              Features
            </Link>
            <Link to="/pricing" className="navbar-link">
              Pricing
            </Link>
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </div>
          <div className="navbar-right"> 
            <LanguageIcon className='language' />
            <Button style={{color: 'white', marginRight: '10px', paddingLeft: '14px', borderLeft: '2px solid white', borderRadius: '0px'}}>
               Log in 
            </Button>
            <Button color="primary" variant="contained" style={{color: 'white', borderRadius: '20px', backgroundColor: '#195FA5'}}> Sign up </Button>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;