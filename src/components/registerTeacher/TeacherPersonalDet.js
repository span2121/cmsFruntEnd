import React, { useState } from 'react'
import { CardBody, Col, Row } from 'reactstrap';
import TextFieldComp from '../textfieldComp'
import { branches, gender } from '../util'
import { Card, Container } from '@material-ui/core';
import { GetFields } from '../registerStudennt/personalDetails'
import DatePickers from '../registerStudennt/helper/DatePicker'
import { Label } from 'react-bootstrap';

const fields = [
    [{ id:1, label:"Teacher Code", type: "text", value:"" },{id:2, label:"First Name", type:"text",value:""}],
    [{ id:3, label:"Adhar Number", type:"text", value:"" }, {id:4, label:"Last Name", type:"text", value:"" }],
    [{ id:5, label:"Email Id", type:"text", value:"" }, { id:6, label: "Father Name", type:"text", value:"" }],
    [{ id:7, label:"Phone No.", type:"text", value:"" },{ id:8, label: "Mother Name", type:"text", value:"" }],
    [{ id:8, label:"Age", type:"text", value:"" }, { id:9, label:"Emergency Contact", type:"text", value:"" }],
    [{ id:10, label:"Subject", type:"Dropdown", options:["Subject1", "Subject2", "Subject3"], value:"" },
         {  id:11, label:"Gender", type:"Dropdown", options:gender, value:"" }]
]

const TeacherPersonalDetails = ({ BirthDate, setBirthDate, setTeacherPersonalDetail }) => {
    
    const [teacherPersonalDetails, setTeacherPersonalDetails] = useState(fields)
    const handleChange = (event, label) => {
        const details = [...teacherPersonalDetails];
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
       setTeacherPersonalDetails(newData)
       setTeacherPersonalDetail(newData)
     };
    return(
        <Container className='container p-8'>
            <Card className="mt-3">
                <CardBody>
                    <div>
                        {teacherPersonalDetails && <GetFields handleChange={handleChange} enteredDetails={teacherPersonalDetails}  />}
                        <Row style={{marginLeft:"65px", marginTop:"10px", marginLeft:"13em"}}>
                            <Col>
                                <Label>Date of Birth</Label>
                            </Col>
                            <Col className={'pr-5 ml-5'}>
                            <DatePickers 
                            inputProps ={{ disabled:false}}
                            dateFormat="DD-MM-YYYY"
                            timeFormat={false} value={BirthDate}
                            defaultValue={BirthDate}
                            onChange={setBirthDate}
                            />
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
        </Container>
    )

}

export default TeacherPersonalDetails;