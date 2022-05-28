import {useCallback, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../store/auth-context";


export default function GlobalToolbox(props){
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const globalToolbox = useCallback((event) => {


        // P
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 80){
            navigate('/addproject/')
        }

        // T
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 84){
            navigate('/addteam/')
        }

        // M
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 77){
            navigate('/management/time')
        }

        // W
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 87){
            authCtx.logout()
        }

        // B
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 66){
            navigate(-1)
        }



    }, [authCtx, navigate]);


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