import Container from "@mui/material/Container";
import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from 'react'
import TaskCardTime from "../component/time/TaskCardTime";
import useFetch from "../hook/use-fetch";
import TimeInfoCard from "../component/time/TimeInfoCard";
import { useParams } from "react-router-dom";



const ProjectManagement = ({t}) =>{
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    let [ projectInfo, setProjectInfo ] = useState([]);
    let [ totalTime, setTotalTime ] = useState();
    let [ avgTaskTime, setAvgTaskTime ] = useState();
    let [ doneTasksTime, setDoneTasksTime ] = useState();
    const { projectId } = useParams();

    const calcualteTime = (response) => {
        totalTime = 0;
        doneTasksTime = 0;
        let taskCount = 0;

        console.log(response);

            response.timeOnTaskList.forEach((task) => {
                if(task.taskStatus == "DONE"){
                    doneTasksTime += task.timeSpent;
                }
            });
            taskCount += projectInfo.timeOnTaskList.length;

        setTotalTime(totalTime);
        setAvgTaskTime(totalTime/taskCount);
        setDoneTasksTime(doneTasksTime);
    }

    useEffect(() => {
            const handleProject = (response) => {
                setProjectInfo(response);
                calcualteTime(response);
                console.log(response)
            }
    
            const fetchProjectRequest = {
                url: `/project/${projectId}`
            }
    
            fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject])

    let seconds, minutes, hours;

    return(
        <Container maxWidth={false} sx={{
            display: "flex",
            flexDirection: "column",
            padding: "50px",
            marginLeft: "25%",
            width: "60%",
        }}>
            {/*<Box width="100%" height="20px" borderBottom="1px solid black">*/}
            <Typography color="text.secondary" variant="h2" sx={{ alignSelf: "center" }}>
                Project Management
            </Typography>
            <Typography color="text.secondary" variant="h5" sx={{
                alignSelf: "center",
                margin: "40px 10px 0",
                letterSpacing: "0.1em"
            }}>
                Summary
            </Typography>
            <Box sx={{borderTop: "3px solid #DEE2E6", width: '20%', marginLeft: '22.5%', marginTop: -2}}></Box>
            <Box sx={{borderTop: "3px solid #DEE2E6", width: '20%', marginLeft: '57.5%', marginTop: -0.25}}></Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px"
            }}>
                <TimeInfoCard header={"Total time"} content={
                    <>
                        <span>{("0" + Math.floor(totalTime / 3600)).slice(-2)}</span>h:
                        <span>{("0" + Math.floor(totalTime / 60 % 60)).slice(-2)}</span>m:
                        <span>{("0" + Math.floor(totalTime % 60)).slice(-2)}</span>s
                    </>
                }/>
                <TimeInfoCard header={"Task average"} content={
                    <>
                    <span>{("0" + Math.floor(avgTaskTime / 3600)).slice(-2)}</span>h:
                    <span>{("0" + Math.floor(avgTaskTime / 60 % 60)).slice(-2)}</span>m:
                    <span>{("0" + Math.floor(avgTaskTime % 60)).slice(-2)}</span>s
                    </>
                }/>
                <TimeInfoCard header={"Done tasks"} content={
                    <>
                    <span>{("0" + Math.floor(doneTasksTime / 3600)).slice(-2)}</span>h:
                    <span>{("0" + Math.floor(doneTasksTime / 60 % 60)).slice(-2)}</span>m:
                    <span>{("0" + Math.floor(doneTasksTime % 60)).slice(-2)}</span>s
                </>
                }/>
            </Box>

            <Box sx={{
                border: "1px solid #ADB5BD",
                boxSizing: "border-box",
                boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                padding: "30px",
                paddingBottom: "10px",
                paddingTop: "10px",
                marginTop: "30px",
                width: "100%"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    gap: 3
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography sx={{
                            fontSize: "36px",
                            color: "#495057"
                        }}>Project: </Typography>
                        <Typography sx={{fontSize: "16px"}}>Total time spent:</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography sx={{ color: "#2196f3", fontSize: "36px" }}>{projectInfo.name}</Typography>
                        <Typography sx={{ color: "#2196f3", fontSize: "16px"}}>
                            <span>{("0" + Math.floor(projectInfo.totalTimeOnProject / 3600)).slice(-2)}</span>h:
                            <span>{("0" + Math.floor(projectInfo.totalTimeOnProject / 60 % 60)).slice(-2)}</span>m:
                            <span>{("0" + Math.floor(projectInfo.totalTimeOnProject % 60)).slice(-2)}</span>s
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'flex-start',
                    gap: 4,
                    flexWrap: "wrap",
                    borderTop: "1px solid #DEE2E6",
                    marginTop: "15px",
                    padding: "15px 0"
                }}>

                </Box>
            </Box>
            
        </Container>
    );
}

export default ProjectManagement;