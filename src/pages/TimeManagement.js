import Container from "@mui/material/Container";
import {Box, Typography} from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TaskCardTime from "../component/task/TaskCardTime";

const TimeManagement = () =>{
    return(
        <Container maxWidth={false} sx={{
            display: "flex",
            flexDirection: "column",
            padding: "50px",
            marginLeft: "17%",
            width: "80%",
        }}>
            {/*<Box width="100%" height="20px" borderBottom="1px solid black">*/}
            <Typography color="text.secondary" variant="h3" sx={{
               alignSelf: "flex-start"
            }}>My Projects Times</Typography>
            {/*</Box>*/}
            <Box sx={{
                border: "1px solid #90a4ae",
                boxSizing: "border-box",
                boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                padding: "30px",
                paddingTop: "10px",
                marginTop: "30px",
                width: "60%"
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
                        <Typography sx={{ color: "#2196f3", fontSize: "36px" }}>Project A</Typography>
                        <Typography sx={{ color: "#2196f3", fontSize: "16px"}}>69h : 21m : 37s</Typography>
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
                    <TaskCardTime
                        taskName="task1"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={2154}
                    />

                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                </Box>
            </Box>
            <Box sx={{
                border: "1px solid #90a4ae",
                boxSizing: "border-box",
                boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                padding: "30px",
                paddingTop: "10px",
                marginTop: "30px",
                width: "60%"
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
                        <Typography sx={{ color: "#2196f3", fontSize: "36px" }}>Project A</Typography>
                        <Typography sx={{ color: "#2196f3", fontSize: "16px"}}>69h : 21m : 37s</Typography>
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
                    <TaskCardTime
                        taskName="task1"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={2154}
                    />

                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                </Box>
            </Box>
            <Box sx={{
                border: "1px solid #90a4ae",
                boxSizing: "border-box",
                boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                padding: "30px",
                paddingTop: "10px",
                marginTop: "30px",
                width: "60%"
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
                        <Typography sx={{ color: "#2196f3", fontSize: "36px" }}>Project A</Typography>
                        <Typography sx={{ color: "#2196f3", fontSize: "16px"}}>69h : 21m : 37s</Typography>
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
                    <TaskCardTime
                        taskName="task1"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={2154}
                    />

                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                    <TaskCardTime
                        taskName="task2"
                        taskType="done"
                        cardColor="#4F6C89"
                        time={245}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default TimeManagement;