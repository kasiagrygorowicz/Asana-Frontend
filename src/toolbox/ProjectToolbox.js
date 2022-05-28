import {useCallback, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";


export default function ProjectToolbox(props){
    const navigate = useNavigate();
    const {projectId} = useParams()


    const globalToolbox = useCallback((event) => {


        // K
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 75){
            console.log('Redirecting to editing current project')
            navigate(`/editproject/${projectId}`)
        }

        // I
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 73){
            console.log('Redirecting to creating new task')
            navigate(`/addtask/${projectId}`)
        }


    }, [navigate, projectId]);


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