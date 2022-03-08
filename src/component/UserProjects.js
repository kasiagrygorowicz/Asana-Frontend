import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard";
import useUserProjects from "../hook/use-projects";

const UserProjects = ({t}) => {

    const { isLoading, error, userProjects, setUserProjects } = useUserProjects();

    let projectsToDisplay = userProjects.map((project) => (
        <Grid item xs={3}>
            <Link to={`/project/${project.id}`} style={{textDecoration: 'none'}}>
                <ProjectCard cardColor="#4F6C89" teamName="Team A" projectName={project.name} description={project.description} projectId={project.id} />
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