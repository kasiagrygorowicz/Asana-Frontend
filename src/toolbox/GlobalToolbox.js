import {useCallback, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../store/auth-context";


export default function GlobalToolbox(props){
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const globalToolbox = useCallback((event) => {

        if(event.ctrlKey === true && event.keyCode === 80){
            navigate('/addproject/')
        }

        if(event.ctrlKey === true && event.keyCode === 84){
            navigate('/addteam/')
        }

        if(event.ctrlKey === true && event.keyCode === 78){
            console.log('Redirecting to creating new task')
            navigate(`/addtask`)
        }

        if(event.ctrlKey === true && event.keyCode === 77){
            navigate('/management/time')
        }

        if(event.ctrlKey === true && event.keyCode === 87){
            authCtx.logout()
        }



    }, []);


    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', globalToolbox);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', globalToolbox);
        };
    }, [globalToolbox]);

    return <>{props.children}</>
}