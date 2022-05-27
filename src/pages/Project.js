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


    useEffect(() => {
        const handleProject = (response) => {
            const projectInfo = {
              id: response.id,
              name: response.name,
              category: response.category,
              description: response.description
            };
            setProjectInfo(projectInfo);
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
        <Container maxWidth="xl" style={{marginLeft:'15%'}}>
            <Unicorn start={unicornStart} key={unicornKey}/>
            <Box sx={{ alignSelf: 'left' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
            </Box>
            <Box sx={{ width: '75%', height: 700, alignItems: 'center', float: 'left', marginLeft: 50}}>
                {/* <Link to='/dashboard'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link> */}
            
            <Box sx={{ width: '95%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Link to={`/addtask/${projectId}`}>
                <Button variant="contained"
                sx={{ width: 250, height: 50, alignSelf: 'end', borderRadius: 30, textTransform: 'none', float: 'right', marginTop: 2}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('addtask')}
                </Typography>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginLeft: 2}}/> 
            </Button>
            </Link>

            <div>
            <Button onClick={handleOpen} variant="contained" color='secondary'
             sx={{ width: 250, height: 50, alignSelf: 'end', borderRadius: 30, textTransform: 'none', float: 'right', marginTop: 2, marginRight: 1}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
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

                <Typography variant="h3" fontFamily="Sora">{projectInfo?.name}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{ margin: 10}}></Box>

                <ProjectTasks t={t} projectInfo={projectInfo} unicornFun={startUnicorn}/>

            </Box>
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default Project;