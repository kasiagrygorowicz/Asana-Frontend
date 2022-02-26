import useFetch from "../hook/use-fetch";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import TeamCardSmall from "./TeamCardSmall";
import jwt_decode from "jwt-decode";

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
            url: urlRequest,
            headers: {
                'Authorization': authCtx.requestToken
            }
        };

        fetchUserTeams(fetchUserTeamsRequest, fetchUserTeamsHandler);

    },[fetchUserTeams])



    return <div>

        {
            userTeams.map((team)=>(
                <TeamCardSmall title={team.name}/>
            ))
        }


    </div>


}


export default UserTeams