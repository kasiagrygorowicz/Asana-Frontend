import useFetch from "./use-fetch";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode";

const useUserTeams = () => {
    const { isLoading, error, sendRequest: fetchUserTeams } = useFetch();
    const [ userTeams, setUserTeams ] = useState([]);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const handleGetUserTeams = (teamsObj) => {
            const loadedUserTeams = [];
            for (const teamKey in teamsObj) {
                loadedUserTeams.push({
                    id: teamsObj[teamKey].id,
                    name: teamsObj[teamKey].name,
                    isOwner : teamsObj[teamKey].owner
                });
            }
            setUserTeams(loadedUserTeams);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/team/user/${userId}/teams`;
        const fetchUserTeamsRequest = {
            url: urlRequest
        };

        fetchUserTeams(fetchUserTeamsRequest, handleGetUserTeams);
    }, [fetchUserTeams]);



    return {
        isLoading,
        error,
        userTeams,
        setUserTeams
    };
};

export default useUserTeams;