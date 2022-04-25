import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard";
import useUserProjects from "../../hook/use-projects";

const UserProjects = ({t}) => {

    const { isLoading, error, userProjects, setUserProjects } = useUserProjects();

    let projectsToDisplay = userProjects.map((project) => (

        <Grid item xs={3} key={project.id}>
            <ProjectCard cardColor="#4F6C89"
                         isOwner={project.isOwner} teamName={project.teamName}
                         projectName={project.name} description={project.description} projectId={project.id} t={t} />
        </Grid>
    ));

    return (
        <Grid container spacing={10}>
            {projectsToDisplay}
        </Grid>
    );
}

export default UserProjects;