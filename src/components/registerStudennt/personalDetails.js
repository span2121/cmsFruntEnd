import React, { Fragment, useContext, useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import TextFieldComp from '../textfieldComp'
import DropDownField from '../registerStudennt/helper/dropdownField'
import { branches, gender, dateFormat, GetTeachersCode } from '../util'
import { Card, Container } from '@material-ui/core';
import DatePickers from './helper/DatePicker'
import moment from 'moment'
import { Label } from 'react-bootstrap';
import AppContext from '../contect';
const Semister=[1,2,3,4,5,6,7,8]
let fields = () => [
   [{ id:1, label:"Student Code", type: "text", value:"" },{id:2, label:"First Name", type:"text",value:""}],
   [{ id:3, label:"USN Number", type:"text", value:"" }, {id:4, label:"Last Name", type:"text", value:"" }],
   [{ id:5, label:"Email Id", type:"text", value:"" }, { id:6, label: "Father Name", type:"text", value:"" }],
   [{ id:7, label:"Phone No.", type:"text", value:"" },{ id:8, label: "Mother Name", type:"text", value:"" }],
   [{ id:9, label:"Adhar number", type:"text", value:"" }, { id:10, label:"Emergency Contact", type:"text", value:"" }],
   [{ id:11, label:"Instructor", type:"Dropdown", options:GetTeachersCode(), value:"" },
        {  id:12, label:"Gender", type:"Dropdown", options:gender, value:"" }],
        [{ id:13, label:"Branch", type:"Dropdown", options: branches, value:"" },{ id:14, label:"Semister", type:"Dropdown", options: Semister, value:"" }]
]

export const GetFields = ({enteredDetails , handleChange}) => {
   return ( enteredDetails.map((item) => {
        return (
                <div style={{display:"flex",justifyContent:"space-around", marginLeft:"130px"}}>
                    <Col>
                    {item[0]?.type === "text" ? <TextFieldComp handleChange={handleChange} style={{marginLeft:"55px", minWidth:"250px"}} value={item[0]?.value}  size="medium" label={item[0]?.label} />
                    : <DropDownField handleChange={handleChange} value={item[0]?.value} id={item[0]?.id} options={item[0]?.options} style={{width:"130%"}} size="medium" label={item[0]?.label} /> } 
                    </Col>
                    <Col>
                    {item[1]?.type === "text" ? <TextFieldComp style={{marginLeft:"55px", minWidth:"250px"}} handleChange={handleChange} value={item[1]?.value} size="medium" label={item[1]?.label} />
                    : <DropDownField handleChange={handleChange} value={item[1]?.value} id={item[1]?.id}  options={item[1]?.options} style={{width:"130%"}} size="medium" label={item[1]?.label} /> } 
                    </Col>
                </div>
        );}))
}

const PersonalDetails = ({ BirthDate, setStudentPersonalDetails, setBirthDate }) => {
    const [enteredDetails, setEnteredDetails] = useState(fields)
    const handleChange = (event, label) => {
        const details = [...enteredDetails];
      const newData =  details.map(std=> {
          let personalDetails =  std?.map(per =>{
               if(per?.label === label)
               {
                   per.value = event.target.value;
                   return per;
               }
           return per
           })
           return personalDetails
       })
       setEnteredDetails(newData)
       if(setStudentPersonalDetails)
            setStudentPersonalDetails(newData)
     };
     
return(
    <Container className='container p-8'>
            <Card className="mt-3 p-3">
            <CardBody>
                <div>{branches && enteredDetails.length > 0 && <GetFields handleChange={handleChange} enteredDetails={enteredDetails} /> }
                            <Row style={{marginLeft:"65px", marginTop:"10px",  marginLeft:"13em"}}>
                                <Col>
                                 <Label>Date of Birth</Label>
                                </Col>
                                <Col className={'pr-5 ml-5'}>
                            <DatePickers 
                            style={{marginLeft:"80px"}}
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
export default PersonalDetails;