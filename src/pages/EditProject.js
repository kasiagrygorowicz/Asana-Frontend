import React, {useContext, useEffect, useState} from "react"
import {
    Container,
    Box,
    Typography,
  } from "@material-ui/core";
import useFetch from "../hook/use-fetch";
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import EditProjectForm from '../component/project/EditProjectForm'

const useStyles = makeStyles({
    select: {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  });

function EditProject({t}) {
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    const [ projectInfo, setProjectInfo ] = useState(null);
    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleProject = (response) => {
            const projectInfo = {
              id: response.id,
              name: response.name,
              category: response.category,
              description: response.description,
              members: response.members
            };
            setProjectInfo(projectInfo);
        }

        const fetchProjectRequest = {
            url: `/project/${projectId}`
        }

        fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject, projectId])

    const classes = useStyles();

    return (
        <Container maxWidth="xl" style={{marginLeft:'15%'}}>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginLeft: 50}}>
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('editproject') + ': "' + projectInfo?.name + '"'}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <EditProjectForm t={t} projectInfo={projectInfo} />
            </Box>    
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default EditProject;