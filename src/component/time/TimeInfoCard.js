import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const TimeInfoCard = ({header, content}) => {
    return (
        <Card sx={{
            width: "350px",
            height: "220px"
        }}>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
                paddingTop: "50px"
            }}>
                {/*<AssignmentIcon sx={{*/}
                {/*    alignSelf: "center",*/}
                {/*    fontSize: "150px",*/}
                {/*    color: "#2196f3"*/}
                {/*}}/>*/}
                <Typography variant="h3">
                    {header}
                </Typography>
                <Typography sx={{
                    fontSize: "24px",
                    color: "#2196f3",
                    marginTop: "15px"
                }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TimeInfoCard;