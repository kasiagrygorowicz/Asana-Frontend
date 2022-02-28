import {Link} from "react-router-dom";
import React from "react";

const AccountConfirmationPage =(props,response)=>{
    return(
    <div>
        <p>Your account has been activated</p>
        <Link to="/login" >
            {props.t('login')}
        </Link>

    </div>)

}

export default AccountConfirmationPage