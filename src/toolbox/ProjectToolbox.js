import {useCallback, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";


export default function ProjectToolbox(props){
    const navigate = useNavigate();
    const {projectId} = useParams()


    const globalToolbox = useCallback((event) => {


        if(event.ctrlKey === true && event.keyCode === 69){
            console.log('Redirecting to editing current project')
            navigate(`/editproject/${projectId}`)
        }

        if(event.ctrlKey === true && event.keyCode === 78){
            console.log('Redirecting to creating new task')
            navigate(`/addtask/${projectId}`)
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