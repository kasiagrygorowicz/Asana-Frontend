import {useCallback, useEffect} from "react";
import globalToolbox from "./globalToolbox";
import {useNavigate} from "react-router-dom";


export default function GlobalToolbox(props){
    const navigate = useNavigate();

    const globalToolbox = useCallback((event) => {

        if(event.ctrlKey === true && event.keyCode === 80){
            console.log('Redirecting to creating new project')
            navigate('/addproject/')
        }

        if(event.ctrlKey === true && event.keyCode === 84){
            console.log('Redirecting to creating new team')
            navigate('/addteam/')
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