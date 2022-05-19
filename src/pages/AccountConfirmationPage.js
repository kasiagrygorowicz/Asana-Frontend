import {Link} from "react-router-dom";
import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import image5 from "./images/image5.png";
import unicorn from "./images/unicorn.png";
import Button from "@mui/material/Button";

const AccountConfirmationPage = (props, response) => {


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={3}>
                <h1>Your account has been activated</h1>
            </Grid>
            <Grid item xs={3}>
                <Link to="/login" style={{textDecoration:'none'}}>
                    <Button variant="contained" size="large">
                        {props.t('login')}
                    </Button>

                </Link>
            </Grid>

        </Grid>)

}

export default AccountConfirmationPage