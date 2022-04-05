import {Popover, Typography} from "@material-ui/core";
import {AccessTime} from "@mui/icons-material";
import {useSelector} from "react-redux";
import React, {useState, useEffect} from "react";

const TimeIconPopover = ({tasks, type}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let [ totalTime, setTotalTime ] = useState();

    const timer = useSelector((state) => state.timer)

    useEffect(() => {
        // Calculate new summary time for all cards of given type
        totalTime = 0
        let taskTime = 0
        tasks.columns[type]?.cardIds.map(card => {
            taskTime = timer.find(e => e.id == tasks.cards[card].content.props?.timer.id).time
            if(taskTime)
                totalTime+=taskTime
        })
        setTotalTime(totalTime)
    });

    const seconds = <span>{("0" + Math.floor(totalTime % 60)).slice(-2)}</span>;
    const minutes = <span>{("0" + Math.floor(totalTime / 60 % 60)).slice(-2)}</span>;
    const hours = <span>{("0" + Math.floor(totalTime / 3600)).slice(-2)}</span>;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div >
            <AccessTime onClick={handleClick}/>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{padding: 50}}
            >
                <Typography variant="h5" fontFamily="Sora"
                            style={{
                                textAlign: 'center',
                                margin:'5px',
                                marginLeft: '15px',
                                marginRight: '15px'}}>
                        {hours}:{minutes}:{seconds}
                </Typography>
            </Popover>
        </div>
    );
}

export default TimeIconPopover;