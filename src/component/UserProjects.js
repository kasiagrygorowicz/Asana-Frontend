import {Grid, MenuItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard";
import useFetch from "../hook/use-fetch";
import {useContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import useUserProjects from "../hook/use-projects";

const UserProjects = ({t}) => {

    const { isLoading, error, userProjects, setUserProjects } = useUserProjects();

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