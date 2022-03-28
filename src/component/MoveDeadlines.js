import {
    Box,
    Typography,
    Input,
    Container
  } from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import React from 'react';

export default function MoveDeadlines(props) {
    // const navigate = useNavigate();
    
    // const { isLoadingEdit, errorEdit, sendRequest: editTaskRequest } = useFetch();

    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     const deadlineDate = enteredDueDate.split("/");
    //     const month = deadlineDate[0];
    //     const day = deadlineDate[1];
    //     const year = deadlineDate[2];

    //     const jsonDate = year + "-" + month + "-" + day + "T18:25:43.511Z"
    //     // const createdProjectAddress = `/project/${projectId}`;

    //     const editTaskRequestContent = {
    //         url: `/project/task/edit/${props.task.id}`,
    //         method: "PUT",
    //         body: {
    //             'name': enteredTaskName,
    //             'description': enteredTaskDescription,
    //             "startDate": props.task.startDate,
    //             "deadLine": jsonDate,
    //             "priority": props.task.priority,
    //             "status": props.task.status,
    //             "totalTime": props.task.totalTime
    //         },
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     editTaskRequest(editTaskRequestContent, navigate(0));
    // }

    const t = useTranslation()[0]
    // const [startValue, setStartValue] = React.useState(new Date(props.task.startDate));
    // const [value, setValue] = React.useState(new Date(props.task.deadLine));

    return (
    // <form onSubmit={submitHandler}>
    <Container maxWidth='xl'>
        <Typography id="modal-modal-title" variant="h4" component="h2">
        {t('moveDeadlines')}, {props.projectInfo?.name}
        </Typography>
    </Container>
    // </form>
    );
}

