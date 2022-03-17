import {Link} from "react-router-dom";
import React from "react";
import './css/rainbow.css'



const AccountConfirmationPage =(props,response)=>{



    return(
    <div>
        <p>Your account has been activated</p>
        <Link to="/login" >
            {props.t('login')}
        </Link>
        <div className={"center"}>
            <ul >
                <li ></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>


            </ul>

        </div>



    </div>)

}

export default AccountConfirmationPage