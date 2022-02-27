import {useParams} from "react-router-dom";

const Team =(props)=>{
    let { teamName } = useParams();
return <div>
    team -> {teamName}
</div>

}

export default Team