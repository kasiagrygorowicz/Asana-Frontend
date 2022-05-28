import React, {useContext, useEffect, useState} from 'react'
import {
    Container,
    Box,
    Typography
  } from "@material-ui/core";
import Button from "@mui/material/Button";
import { IconButton } from "@material-ui/core";
import {Link, useParams, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useFetch from "../hook/use-fetch";
import ProjectTasks from "../component/task/ProjectTasks";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MoveDeadlines from '../component/task/MoveDeadlines';
import Unicorn from '../component/Unicorn';
import Stack from "@mui/material/Stack";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#E9ECEF',
        border: '4px solid #195FA5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 30
    },
}));

// TODO: dodać zapamiętywanie kolejności tasków
function Project({t}) {
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    const [ projectInfo, setProjectInfo ] = useState(null);
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [unicornStart, setUnicornStart] = useState(0);
    const [unicornKey, setUniocnKey] = useState();

    let [ isLoad, setIsLoad ] = useState(false);


    useEffect(() => {
        const handleProject = (response) => {
            const projectInfo = {
              id: response.id,
              name: response.name,
              category: response.category,
              description: response.description
            };
            setProjectInfo(projectInfo);
            setIsLoad(true)

        }

        const fetchProjectRequest = {
            url: `/project/${projectId}`
        }

        fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject, projectId])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const classes = useStyles();

    const startUnicorn = () => {
        setUnicornStart(1);
        setUniocnKey(Math.random)
    }

    return (
        <div>
        {projectInfo !== null ? (
            <div>
        <Container maxWidth="xl" style={{marginLeft:'15%', maxWidth:'95%'}}>
            <Unicorn start={unicornStart} key={unicornKey}/>
            <Box sx={{ alignSelf: 'left', marginBottom: '-1%'}}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{ width: '75%', alignItems: 'center', float: 'left', marginLeft: 50}}>

            {/*<Box sx={{ width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>*/}
                <Stack
                    direction="row"
                >
                    <Box sx={{ width: '72.5%', alignItems: 'end', float: 'left', marginTop: '2%'}}>
                        <Typography variant="h3" fontFamily="Sora">{projectInfo?.name}</Typography>
                    </Box>

                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    spacing={1}
                >

                    <Link to={`/addtask/${projectId}`}>
                        <Button variant="contained"
                                sx={{ width: 295, height: 50, borderRadius: 30, textTransform: 'none', float: 'right'}}>
                            <Typography style={{ fontSize: 24 }}>
                                {t('addtask')}
                            </Typography>
                            <AddCircleOutlineIcon sx={{width: 32, height: 32, marginLeft: 1}}/>
                        </Button>
                    </Link>

                    <div>
                        <Button onClick={handleOpen} variant="contained" color='secondary'
                                sx={{ width: 295, height: 50, borderRadius: 30, textTransform: 'none', float: 'right', marginBottom: '4%'}}>
                            <Typography style={{ fontSize: 24 }}>
                                {t('moveDeadlines')}
                            </Typography>
                        </Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <MoveDeadlines projectInfo={projectInfo}/>
                                </div>
                            </Fade>
                        </Modal>
                    </div>

                </Stack>

            {/*</Box>*/}
                </Stack>
            <Box sx={{ width: '109%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{ margin: 5}}></Box>

                <ProjectTasks t={t} projectInfo={projectInfo} unicornFun={startUnicorn}/>

             <Box sx={{ margin: 10}}></Box></Box>
        </Container>
        </div>

        ) : (<div></div>)}
        </div>
    );
  }
  export default Project;