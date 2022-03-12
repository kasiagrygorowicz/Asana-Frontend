import React from "react";
import {
  Box
} from "@material-ui/core";
import Member from '../component/Member';
import randomColor from "randomcolor";


function Members(props) {
  return (
    <Box sx={{ width: '43%', height: 80, alignItems: 'center', display: 'flex', float: 'left', marginLeft: 10}}>
        {props.members?.map((member)=>(
            <Member color={randomColor()} initials={member.name.split(" ").map((n)=>n[0])} fullname={member.name} email={member.email} key={member.id}></Member>
        ))}
    </Box>
  );
}
export default Members;