import React, { useState } from 'react'
import { Card, Container } from '@material-ui/core';
import { GetFields } from '../registerStudennt/personalDetails'
import { CardBody, Col, Row } from 'reactstrap';
import { branches } from '../util'

const fields = [
    [{ id:1, label:"Maximum Qualification", type: "text", value:"" },{id:2, label:"Subject Assigned", type:"text",value:""}],
[{ id:3, label:"Percentage Obtained", type:"text", value:"" }, {id:4, label:"Address", type:"text", value:"" }],
[{ id:5, label:"Degree Collage Name", type:"text", value:"" }, { id:7, label:"Year of Passout", type:"text", value:"" }],
[{ id:9, label:"Designation", type:"Dropdown", options:["Teacher", "Placement Officer", "HOD"], value:"" },
{ id:11, label:"Branch", type:"Dropdown", options: branches, value:"" }],
]

const TeacherEducationDetails = ({ setTeacherEduDetails }) => {
const [teacherEducationDetails, setTeacherEducationDetails] = useState(fields)
const handleChange = (event, label) => {
    const details = [...teacherEducationDetails];
  const newData =  details.map(std=> {
      let personalDetails =  std.map(per =>{
           if(per.label === label)
           {
               per.value = event.target.value;
               return per;
           }
       return per
       })
       return personalDetails
   })
   setTeacherEducationDetails(newData)
   setTeacherEduDetails(newData)
 };
return(
    <Container className='container p-8'>
    <Card className="mt-3">
        <CardBody>
            <div>
                {teacherEducationDetails && branches &&  <GetFields handleChange={handleChange} enteredDetails={teacherEducationDetails}  />}
            </div>
        </CardBody>
    </Card>
</Container>
)

}
export default TeacherEducationDetails;