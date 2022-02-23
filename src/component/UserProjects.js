import {Grid, MenuItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard";
import useFetch from "../hook/use-fetch";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode";

const UserProjects = ({t}) => {
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
                    description: projectsObj[projectKey].description
                });
            }
            setUserProjects(loadedUserProjects);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/project/user/${userId}`;
        const fetchUserProjectsRequest = {
            url: urlRequest,
            headers: {
                'Authorization': authCtx.requestToken,
                'Content-Type': 'application/json'
            }
        };

        fetchUserProjects(fetchUserProjectsRequest, handleGetUserProjects);
    }, [fetchUserProjects]);

    let projectsToDisplay = userProjects.map((project) => (
        <Grid item xs={3}>
            <Link to={`/project/${project.id}`} style={{textDecoration: 'none'}}>
                <ProjectCard cardColor="#4F6C89" teamName="Team A" projectName={project.name} description={project.description} />
            </Link>
        </Grid>
    ));

    return (
        <Grid container spacing={10}>
            {projectsToDisplay}
        </Grid>
    );
}

export default UserProjects;