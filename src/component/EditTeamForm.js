import {Box, Checkbox, FormControl, Input, MenuItem, Select, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import {useContext, useEffect, useRef, useState} from "react";
import useFetch from "../hook/use-fetch";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../store/auth-context";
import VerticalBarContext from "../store/verticalbar-context";
import jwt_decode from "jwt-decode"
import EditMembers from "./EditMembers";

const useStyles = makeStyles({
    select: {
        "& .MuiSvgIcon-root": {
            color: "white",
        },
    },
});

const EditTeamForm = ({t, teamInfo}) => {
    const teamNameInput = useRef();

    const membersRef = useRef([]);
    const { teamId } = useParams();
    const { isLoading, error, sendRequest: editTeamRequest } = useFetch();
    const { isMembersLoading, membersError, sendRequest: fetchMembers } = useFetch();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const verticalBarCtx = useContext(VerticalBarContext);
    const [ users, setUsers ] = useState([]);
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const [ currentUsers, setCurrentUsers ] = useState([]);


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

            const tmpUsers = [];
            for( let i = 0; i < teamInfo?.members.length; i++){
                tmpUsers.push({
                    id: usersObj[i].id, 
                    name: usersObj[i].name,
                    email: usersObj[i].email });
            }
            setCurrentUsers(tmpUsers);
            console.log('tmpUsers = '+tmpUsers.length)
        }

        const urlRequest = `/user/all`;
        const fetchUsersRequest = {
            url: urlRequest
        };
        fetchMembers(fetchUsersRequest, handleGetUsers);
    }, [fetchMembers]);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredTeamName = teamNameInput.current.value;

        const members = []

        for(let i = 0; i < selectedUsers.length; i++){
            members.push(selectedUsers[i].id)
        }
        const handleEditProject = (response) => {
            const createTeamAdress = `/team/${teamId}`;
            verticalBarCtx.updateKey++;
            navigate(createTeamAdress, { replace: true })
        }

        const addProjectRequestContent = {
            url: "/team/" + teamId,
            method: "PUT",
            body: {
                'name': enteredTeamName
                //'members': selectedUsers
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        editTeamRequest(addProjectRequestContent, handleEditProject);
    }

    const sendSelectedUsers = (selected) => {
        console.log('ilu jest nowych członków: ' + selected.length);
        setSelectedUsers(selected);
    };

    const classes = useStyles();
    return (
        <form onSubmit={submitHandler}>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('teamName')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" inputRef={teamNameInput} defaultValue={teamInfo?.name} key={teamInfo?.name} placeholder={t('teamNameInput')} disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>

            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('members')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', float: 'left', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <EditMembers t={t}  users={users} currentMembers={currentUsers} sendSelectedUsers={sendSelectedUsers}/>
            </Box>
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
                
export default EditTeamForm;