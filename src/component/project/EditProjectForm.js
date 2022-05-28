import {Box, Checkbox, FormControl, Input, MenuItem, Select, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import {useContext, useEffect, useRef, useState} from "react";
import useFetch from "../../hook/use-fetch";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode"
import EditMembers from "../EditMembers";
import VerticalBarContext from "../../store/verticalbar-context";
import AddTeamsAndMembers from "./AddTeamsAndMembers.js";


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
    const { isLoadingT, errorT, sendRequest: fetchOnlyTeams } = useFetch();
    const [ onlyTeamsInProject, setOnlyTeamsInProject ] = useState([]);
    const [ teams, setTeams ] = useState([]);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const verticalBarCtx = useContext(VerticalBarContext)
    const [f, setF] = useState(false);
    const [ selectedTeams, setSelectedTeams ] = useState([]);
    const [ selectedUsers, setSelectedUsers] = useState([])


    useEffect(() => {
        const handleGetUserTeams = (teamsObj) => {
            const loadedUserTeams = [];
            for (const teamKey in teamsObj) {
                loadedUserTeams.push({ 
                    id: teamsObj[teamKey].id,
                    name: teamsObj[teamKey].name,
                    members: teamsObj[teamKey].members
                });
            }
            setTeams(loadedUserTeams);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/team`;
        const fetchUserTeamsRequest = {
            url: urlRequest
        };

        fetchUserTeams(fetchUserTeamsRequest, handleGetUserTeams);

    }, [fetchUserTeams]);

    useEffect(() => {
        const handleGetOnlyTeamsInProject = (onlyTeamsObject) => {
            const tmpOnlyTeams = [];
            for (let i = 0; i < onlyTeamsObject.length; i++) {
                tmpOnlyTeams.push({
                    id: onlyTeamsObject[i].id,
                    name: onlyTeamsObject[i].name,
                    members: onlyTeamsObject[i].members
                });
            }
            setOnlyTeamsInProject({t: tmpOnlyTeams});
            setF(true);
        }

        const userId = jwt_decode(authCtx.authToken).id;
        const urlRequest = `/project/${projectId}/teams`
        const fetchOnlyTeamsRequest = {
            url: urlRequest
        };

        fetchOnlyTeams(fetchOnlyTeamsRequest, handleGetOnlyTeamsInProject);
    },[fetchOnlyTeams]);


    const [ users, setUsers ] = useState([]);
    const { isUsersLoading, usersError, sendRequest: fetchUsers } = useFetch();


    useEffect(() => {
        const userId = jwt_decode(authCtx.authToken).id;

        const handleGetUsers = (usersObj) => {
            const loadedUsers = [];
            const loadedUsers_1 = [];
            for (const usersKey in usersObj) {
                loadedUsers.push({ 
                    id: usersObj[usersKey].id, 
                    name: usersObj[usersKey].name,
                    email: usersObj[usersKey].email });
            }
            for(let i = 0; i < loadedUsers.length; i++){
                if(loadedUsers[i].id !== userId){
                    loadedUsers_1.push(loadedUsers[i]);
                }
            }
            setUsers(loadedUsers_1);
        }

        const urlRequest = `/user/all`;
        const fetchUsersRequest = {
            url: urlRequest
        };
        
        fetchUsers(fetchUsersRequest, handleGetUsers);
    }, [fetchUsers]);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredProjectName = projectNameInput.current.value;
        const enteredProjectDescription = descriptionInput.current.value;
        const category = "IT";
        const userId = jwt_decode(authCtx.authToken).id;

        const members = []
        for(let i = 0; i < selectedUsers.length; i++){
            members.push(selectedUsers[i].id)
        }

        const handleEditProject = (response) => {
            let createdProjectAddress = `/project/${projectId}`;
            if(!members.includes(userId)){
                createdProjectAddress= `/dashboard`;
            } 
            verticalBarCtx.updateKey++;
            navigate(createdProjectAddress, { replace: true })
        }

        const editProjectRequestContent = {
            url: "/project/" + projectId,
            method: "PUT",
            body: {
                'name': enteredProjectName,
                'category': category,
                'description': enteredProjectDescription,
                'projectTeamsToAdd': selectedTeams,
                'membersToAdd': selectedUsers
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        editProjectRequest(editProjectRequestContent, handleEditProject);
    }

    const sendSelectedUsersAndTeams = (sendSelectedUsers, sendSelectedTeams) => {
        let sU =[];
        let sT =[];

        for(let i = 0; i < sendSelectedUsers.length; i++){
            sU.push({"memberId": sendSelectedUsers[i].id})
        }
        for(let i = 0; i < sendSelectedTeams.length; i++){
            sT.push({"teamId": sendSelectedTeams[i].id})
        }

        setSelectedUsers(sU);
        setSelectedTeams(sT);
    };


    return (
        <div>
        {projectInfo !== null ? (
        <div>
        <form onSubmit={submitHandler}>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projectName')}:</Typography>
            </Box>
            <Box sx={{ width: '44.5%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" inputRef={projectNameInput} defaultValue={projectInfo?.name} key={projectInfo?.name} placeholder={t('projectNameInput')} disableUnderline={true} sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
            </Box>
            <Box sx={{ width: '44.5%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="description" inputRef={descriptionInput} defaultValue={projectInfo?.description} multiline placeholder={t('descriptionInput')} disableUnderline={true} sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            {users.length !== 0 && teams.length !== 0 && projectInfo !== null ? 
                <AddTeamsAndMembers t={t} users={users} teams={teams} currentTeams={onlyTeamsInProject?.t} currentMembers={projectInfo?.members} sendSelectedUsersAndTeams={sendSelectedUsersAndTeams}/>
                :  (<div></div>)}
            <Box sx={{clear: 'both', height: 20}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}> 
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Button type="submit" variant="contained" size="large" sx={{ width: 190, height: 59, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                    <Typography style={{ fontSize: 22, alignSelf: 'center', fontWeight: 'bold' }}>
                        {t('submit')}
                    </Typography>
                </Button>
            </Box>

        </form>
        </div>
    ) : (<div></div>)}
    </div>
        );
    }
                
export default EditProjectForm;