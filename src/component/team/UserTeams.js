import useFetch from "../../hook/use-fetch";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import TeamCardSmall from "./TeamCardSmall";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";
import useUserProjects from "../../hook/use-projects";
import useUserTeams from "../../hook/use-teams";

const UserTeams =()=>{

    const { isLoading, error, userTeams, setUserTeams } = useUserTeams();

    return (

        userTeams.map((team)=>(
                <TeamCardSmall title={team.name} id={team.id} isOwner={team.isOwner}/>
        ))

    );
}


export default UserTeams