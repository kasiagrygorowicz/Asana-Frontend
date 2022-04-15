import {Box, Checkbox, FormControl, Input, MenuItem, Select, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import {useContext, useEffect, useRef, useState} from "react";
import useFetch from "../../hook/use-fetch";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode"
import VerticalBarContext from "../../store/verticalbar-context";
import AddTeamsAndMembers from "./AddTeamsAndMembers.js";

const useStyles = makeStyles({
    select: {
        "& .MuiSvgIcon-root": {
            color: "white",
        },
    },
});

const AddProjectForm = ({t}) => {
    const projectNameInput = useRef();
    const descriptionInput = useRef();
    const { isLoading, error, sendRequest: addProjectRequest } = useFetch();
    
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const verticalBarCtx = useContext(VerticalBarContext);

    const [ teams, setTeams ] = useState(null);
    const [ users, setUsers] = useState(null)
    const [ selectedTeams, setSelectedTeams ] = useState([]);
    const [ selectedUsers, setSelectedUsers] = useState([])
    const { areTeamsLoading, teamsError, sendRequest: fetchUserTeams } = useFetch();
    const { isMembersLoading, membersError, sendRequest: fetchUsers } = useFetch();

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

    useEffect(() => {});

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredProjectName = projectNameInput.current.value;
        const enteredProjectDescription = descriptionInput.current.value;
        const category = "IT";

        const handleAddProject = (response) => {
            const projectId = response['id'];
            const createdProjectAddress = `/project/${projectId}`;
            verticalBarCtx.updateKey++;
            navigate(createdProjectAddress, { replace: true })
        }

        const addProjectRequestContent = {
            url: "/project",
            method: "POST",
            body: {
                'name': enteredProjectName,
                'category': category,
                'description': enteredProjectDescription
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        addProjectRequest(addProjectRequestContent, handleAddProject);
    }

    const sendSelectedUsersAndTeams = (sendSelectedUsers, sendSelectedTeams) => {
        // let sU =[];
        // let sT =[];

        // for(let i = 0; i < sendSelectedUsers.length; i++){
        //     sU.push(sendSelectedUsers.id)
        // }
        // for(let i = 0; i < sendSelectedTeams.length; i++){
        //     sT.push(sendSelectedTeams.id)
        // }

        // setSelectedUsers(sU);
        // setSelectedTeams(sT);
    };

    const classes = useStyles();
    return (
        <form onSubmit={submitHandler}>
        <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('projectName')}:</Typography>
    </Box>
    <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input inputRef={projectNameInput} name="name" type="name" placeholder={t('projectNameInput')} disableUnderline={true} sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
    </Box>
    <Box sx={{clear: 'both', height: 10}}></Box>
    <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
        <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
    </Box>
    <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
        <Input inputRef={descriptionInput} name="name" type="name" multiline placeholder={t('descriptionInput')} disableUnderline={true} sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
    </Box>
    <Box sx={{clear: 'both', height: 10}}></Box>

    {users!=null && teams!=null ? 
        <AddTeamsAndMembers t={t} users={users} teams={teams} sendSelectedUsersAndTeams={sendSelectedUsersAndTeams}/>
        :  (<div></div>)}
    
    {/* {console.log("użytkowników jest= " + users?.length)}
    {console.log("teamów jest= " + teams?.length)} */}

    


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

export default AddProjectForm;