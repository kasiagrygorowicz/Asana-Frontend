import useFetch from "../hook/use-fetch";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import TeamCardSmall from "./TeamCardSmall";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";

const UserTeams =()=>{
    const { isLoading, error, sendRequest: fetchUserTeams } = useFetch();
    const [ userTeams, setUserTeams ] = useState([]);
    const authCtx = useContext(AuthContext);


    useEffect(()=>{
        const fetchUserTeamsHandler=(t)=>{
            let teams = []
            for (let team in t ){
                teams.push({
                    id: t[team].id,
                    name: t[team].name,
                })

            }

            setUserTeams(teams)
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/team/user/${userId}/teams`;
        const fetchUserTeamsRequest = {
            url: urlRequest
        };

        fetchUserTeams(fetchUserTeamsRequest, fetchUserTeamsHandler);

    },[fetchUserTeams])



    return (
        userTeams.map((team)=>(
            <Link to={`/team/${team.id}`} style={{textDecoration: 'none'}}>
                <TeamCardSmall title={team.name} id={team.id}/>
            </Link>
        ))
    );
}


export default UserTeams