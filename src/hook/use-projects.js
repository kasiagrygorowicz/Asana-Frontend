import {useState, useCallback, useContext, useEffect} from 'react';
import REST_PATH from "../api/rest_path";
import useFetch from "./use-fetch";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode";

const useUserProjects = () => {
    const { isLoading, error, sendRequest: fetchUserProjects } = useFetch();
    const [ userProjects, setUserProjects ] = useState([]);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const handleGetUserProjects = (projectsObj) => {
            const loadedUserProjects = [];
            for (const projectKey in projectsObj) {
                loadedUserProjects.push({
                    id: projectsObj[projectKey].id,
                    name: projectsObj[projectKey].name,
                    description: projectsObj[projectKey].description,
                    isOwner : projectsObj[projectKey].owner,
                    teamId : projectsObj[projectKey].teamId,
                    teamName : projectsObj[projectKey].teamName
                });
            }
            setUserProjects(loadedUserProjects);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/project/user/${userId}`;
        const fetchUserProjectsRequest = {
            url: urlRequest
        };

        fetchUserProjects(fetchUserProjectsRequest, handleGetUserProjects);
    }, [fetchUserProjects]);



    return {
        isLoading,
        error,
        userProjects,
        setUserProjects
    };
};

export default useUserProjects;