import {useCallback, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";


export default function TeamToolbox(props){
    const navigate = useNavigate();
    const {teamId} = useParams()


    const globalToolbox = useCallback((event) => {


        // K
        if(event.ctrlKey === true && event.altKey === true && event.keyCode === 75){
            console.log('Redirecting to editing current team')
            console.log(teamId)
            navigate(`/editteam/${teamId}`)
        }


    }, [navigate, teamId]);


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