import React, {useContext} from "react";
import {
  Typography,
  Box
} from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import {Link, useNavigate} from "react-router-dom";
import MySettingsIcon from "./SettingsIcon";
import useFetch from "../hook/use-fetch";
import VerticalBarContext from "../store/verticalbar-context";


function ProjectCard(props) {

    const {isLoading, error, sendRequest: deleteProjectRequest} = useFetch();
    const navigate = useNavigate();

    const verticalBarCtx = useContext(VerticalBarContext);
    const deleteProjectHandler = () => {

        const deleteProjectRequestContent = {
            url: `/project/${props?.id}`,
            method: "DELETE",
            body: null,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const handleDeleteTeam = (response) => {
            verticalBarCtx.updateKey++;
            navigate('/dashboard', {replace: true})
        }

        deleteProjectRequest(deleteProjectRequestContent, handleDeleteTeam);
    }


  return (
    <>
        <Box sx={{width: '105%', height: 193, background: props.cardColor, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30}}>
          <Box sx={{width: '100%', height: 30, color: '#FFFFFF'}}>
              <Box
                  sx={{paddingLeft: 20, height: 25, paddingTop: 5,display:'flex',justifyContent:'space-between',alignItems:'center', mx:1}}>
                  <Typography variant="h6" fontFamily="Sora"> {props.teamName} </Typography>
                  <MySettingsIcon deleteTeamHandler={deleteProjectHandler} id={props.id} isOwner={props.isOwner} link={"/editproject/"}/>
              </Box>
              <Box sx={{ width: '100%', height: 2, borderBottom: '2px solid white'}}></Box>
              <Box sx={{paddingLeft: 20, height: 25, paddingTop: 5}}>
                <Typography variant="h5" fontFamily="Sora"> {props.projectName}</Typography>
                <Typography fontFamily="Sora">{props.description}</Typography>
              </Box>
          </Box>
        </Box>
      {/*</Link>*/}



    </>

  );
}
export default ProjectCard;