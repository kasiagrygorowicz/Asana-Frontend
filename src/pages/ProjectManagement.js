import Container from "@mui/material/Container";
import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from 'react'
import TaskCardTime from "../component/time/TaskCardTime";
import useFetch from "../hook/use-fetch";
import TimeInfoCard from "../component/time/TimeInfoCard";
import { useParams } from "react-router-dom";
import TimeIndication from "../component/time/TimeIndication"



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

        response.forEach((project) => {
            totalTime += project.totalTimeOnProject;
            project.timeOnTaskList.forEach((task) => {
                if(task.taskStatus == "DONE"){
                    doneTasksTime += task.timeSpent;
                }
            });
            taskCount += project.timeOnTaskList.length;
        });

        avgTaskTime = 0;
        if(totalTime > 0 && taskCount > 0)
        {
            avgTaskTime = totalTime/taskCount;
        }

        setTotalTime(totalTime);
        setAvgTaskTime(avgTaskTime);
        setDoneTasksTime(doneTasksTime);
    }

    useEffect(() => {
            const handleProject = (response) => {
                setProjectInfo(response);
                calcualteTime(response);
                console.log(response)
            }
    
            const fetchProjectRequest = {
                url: `/project/${projectId}/owner/time`
            }
    
            fetchProject(fetchProjectRequest, handleProject);
    }, [fetchProject])

    let membersToDisplay = projectInfo.map((project) => (
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
                    }}>
                        {
                        t('user')
                        }: 
                    </Typography>
                    <Typography sx={{fontSize: "16px"}}>{t('timeSpent')}</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography sx={{ color: "#2196f3", fontSize: "36px" }}>{project.projectName}</Typography>
                    <Typography sx={{ color: "#2196f3", fontSize: "16px"}}>
                        <TimeIndication time={project.totalTimeOnProject} />
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
            <Typography color="text.secondary" variant="h2" sx={{ alignSelf: "center" }}>
                {t('projectManagement')}
            </Typography>
            <Typography color="text.secondary" variant="h5" sx={{
                alignSelf: "center",
                margin: "40px 10px 0",
                letterSpacing: "0.1em"
            }}>
                {t('summary')}
            </Typography>
            <Box sx={{borderTop: "3px solid #DEE2E6", width: '20%', marginLeft: '22.5%', marginTop: -2}}></Box>
            <Box sx={{borderTop: "3px solid #DEE2E6", width: '20%', marginLeft: '57.5%', marginTop: -0.25}}></Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px"
            }}>
                <TimeInfoCard header={t('totalTime')} content={
                    <TimeIndication time={totalTime} />
                }/>
                <TimeInfoCard header={t('taskAvg')} content={
                    <TimeIndication time={avgTaskTime} />
                }/>
                <TimeInfoCard header={t('doneTasks')} content={
                    <TimeIndication time={doneTasksTime} />
                }/>
            </Box>
            {membersToDisplay}
        </Container>
    );
}

export default ProjectManagement;