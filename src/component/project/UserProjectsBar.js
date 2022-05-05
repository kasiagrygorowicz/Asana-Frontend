import useUserProjects from "../../hook/use-projects";
import {Link} from "react-router-dom";
import ProjectCardSmall from "./ProjectCardSmall";
import React from "react";

const UserProjectsBar = ({t}) => {
    const { isLoading, error, userProjects, setUserProjects } = useUserProjects();

    return (
        userProjects.map((project) => (
                <ProjectCardSmall key={project.id} projectName={project.name} projectId={project.id} isOwner={project.isOwner} t={t}/>
        ))
    );
}

export default UserProjectsBar;