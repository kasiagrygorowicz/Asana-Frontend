import useUserProjects from "../../hook/use-projects";
import {Link} from "react-router-dom";
import ProjectCardSmall from "./ProjectCardSmall";
import React from "react";

const UserProjectsBar = () => {
    const { isLoading, error, userProjects, setUserProjects } = useUserProjects();

    return (
        userProjects.map((project) => (
            <Link to={`/project/${project.id}`} style={{textDecoration: 'none'}} key={project.id}>
                <ProjectCardSmall title={project.name} id={project.id} isOwner={project.isOwner}/>
            </Link>
        ))
    );
}

export default UserProjectsBar;