import {Box, Checkbox, FormControl, Input, MenuItem, Select, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import {useContext, useEffect, useRef, useState} from "react";
import useFetch from "../hook/use-fetch";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../store/auth-context";
import jwt_decode from "jwt-decode"
import Members from '../component/Members'
import AddMemeber from "./AddMember";
import VerticalBarContext from "../store/verticalbar-context";

const useStyles = makeStyles({
    select: {
        "& .MuiSvgIcon-root": {
            color: "white",
        },
    },
});

const EditProjectForm = ({t, projectInfo}) => {
    const projectNameInput = useRef();
    const descriptionInput = useRef();
    const membersRef = useRef([]);
    const { projectId } = useParams();
    const { isLoading, error, sendRequest: editProjectRequest } = useFetch();
    const { areTeamsLoading, teamsError, sendRequest: fetchUserTeams } = useFetch();
    const [ userTeams, setUserTeams ] = useState([]);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const verticalBarCtx = useContext(VerticalBarContext)

    useEffect(() => {
        const handleGetUserTeams = (teamsObj) => {
            const loadedUserTeams = [];
            for (const teamKey in teamsObj) {
                loadedUserTeams.push({ id: teamsObj[teamKey].id, name: teamsObj[teamKey].name });
            }
            setUserTeams(loadedUserTeams);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/team/user/${userId}/teams`;
        const fetchUserTeamsRequest = {
            url: urlRequest
        };

        fetchUserTeams(fetchUserTeamsRequest, handleGetUserTeams);
    }, [fetchUserTeams]);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredProjectName = projectNameInput.current.value;
        const enteredProjectDescription = descriptionInput.current.value;
        const category = "IT";

        const handleEditProject = (response) => {
            const createdProjectAddress = `/project/${projectId}`;
            verticalBarCtx.updateKey++;
            navigate(createdProjectAddress, { replace: true })
        }

        const editProjectRequestContent = {
            url: "/project/" + projectId,
            method: "PUT",
            body: {
                'name': enteredProjectName,
                'category': category,
                'description': enteredProjectDescription
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        editProjectRequest(editProjectRequestContent, handleEditProject);
    }

    let teamsToDisplay = userTeams.map((team) => (
        <MenuItem value={team.id} key={team.id}>{team.name}</MenuItem>
    ));

    const classes = useStyles();
    return (
        <form onSubmit={submitHandler}>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projectName')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" inputRef={projectNameInput} defaultValue={projectInfo?.name} key={projectInfo?.name} placeholder={t('projectNameInput')} disableUnderline={true} sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('team')}:</Typography>
            </Box>
            <Box sx={{background: '#4786C6', borderRadius: 30, width: '20%',height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
            <FormControl style={{marginLeft: '5%', width: '90%', background: '#4786C6', borderRadius: 30, disableUnderline: true}}>
            <Select disableUnderline={true} defaultValue={1} style={{color: 'white'}} className={classes.select} inputProps={{
                classes: {
                    icon: classes.icon,
                    root: classes.root,
                },
            }}>
                {teamsToDisplay}
            </Select>
            </FormControl>
            </Box>
            <Box sx={{ width: '10%', height: 80, marginLeft: '5%', alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600}}>{t('private')}:</Typography>
            </Box>
            <Box sx={{ width: '4%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Checkbox style={{transform: "scale(1.25)", color: "#195FA5"}}/>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="description" inputRef={descriptionInput} defaultValue={projectInfo?.description} multiline placeholder={t('descriptionInput')} disableUnderline={true} sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('members')}:</Typography>
            </Box>
            {console.log(projectInfo)},
            <Members members={projectInfo?.members}/>
            <AddMemeber t={t} membersRef={membersRef}/>
            <Box sx={{clear: 'both', height: 20}}></Box>
            <Button type="submit" variant="contained" size="large" sx={{ width: 250, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                {t('submit')}
                </Typography>
            </Button>
            <Box sx={{margin: 30}}>
            </Box>
        </form>
        );
    }
                
export default EditProjectForm;