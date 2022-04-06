import Container from "@mui/material/Container";
import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from 'react'
import TaskCardTime from "../component/time/TaskCardTime";
import useUserProjects from "../hook/use-projects";
import useFetch from "../hook/use-fetch";
import TimeInfoCard from "../component/time/TimeInfoCard";



const TimeManagement = () =>{
    const { isProjectLoading, projectError, sendRequest: fetchProject } = useFetch();
    let [ projectsInfo, setProjectsInfo ] = useState([]);

    useEffect(() => {
            const handleProject = (response) => {
                setProjectsInfo(response);
            }
    
            const fetchProjectRequest = {
                url: `/project/all/time`
            }
    
            fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject])

    let seconds, minutes, hours;
    let projectsToDisplay = projectsInfo.map((project) => (
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
                        <Typography sx={{ color: "#2196f3", fontSize: "36px" }}>{project.projectName}</Typography>
                        <Typography sx={{ color: "#2196f3", fontSize: "16px"}}>
                            <span>{("0" + Math.floor(project.totalTimeOnProject / 3600)).slice(-2)}</span>h : 
                            <span>{("0" + Math.floor(project.totalTimeOnProject / 60 % 60)).slice(-2)}</span>m : 
                            <span>{("0" + Math.floor(project.totalTimeOnProject % 60)).slice(-2)}</span>s
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
                    {
                        project.timeOnTaskList.map((task) => (
                            <TaskCardTime
                            taskName={task.taskName}
                            taskType={task.taskStatus}
                            cardColor="#4F6C89"
                            time={task.timeSpent}
                            />
                        ))
                    }
                </Box>
            </Box>
    ));

    return(
        <Container maxWidth={false} sx={{
            display: "flex",
            flexDirection: "column",
            padding: "50px",
            marginLeft: "25%",
            width: "60%",
        }}>
            {/*<Box width="100%" height="20px" borderBottom="1px solid black">*/}
            <Typography color="text.secondary" variant="h2" sx={{
               alignSelf: "center"
            }}>Time Management</Typography>
            <Typography color="text.secondary" variant="h5" sx={{
                alignSelf: "center",
                margin: "40px 10px 0",
                letterSpacing: "0.1em"
            }}>Summary</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px"
            }}>
                <TimeInfoCard header={"Total time"} content={"24h:32m:48s"}/>
                <TimeInfoCard header={"Week average"} content={"5h:12m:16s"}/>
                <TimeInfoCard header={"Done tasks"} content={"8h:21m:32s"}/>
            </Box>
            <Typography color="text.secondary" variant="h5" sx={{
                alignSelf: "center",
                margin: "80px",
                marginBottom: "15px",
                letterSpacing: "0.1em"
            }}>Your projects</Typography>
            {/*</Box>*/}
            {projectsToDisplay}
            
        </Container>
    );
}

export default TimeManagement;