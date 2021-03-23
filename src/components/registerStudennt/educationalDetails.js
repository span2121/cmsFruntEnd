import { Card, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import TextFieldComp from '../textfieldComp'

const education = [ 
    [{id:1, label:"10th", type:"text", value:"" },{ id:2, label:"PUC", type:"text", value:"" }],
    [{ id:3, label:"1st sem", type:"text", value:"" },{ id:4, label:"2nd sem", type:"text", value:"" }],
    [{ id:5, label:"3rd sem", type:"text", value:"" },{ id:6, label:"4th sem", type:"text", value:"" }],
    [{ id:7, label:"5th sem", type:"text", value:"" },{ id:8, label:"6th sem", type:"text", value:"" }],
    [{ id:9, label:"7th sem", type:"text", value:"" },{ id:10, label:"8th sem", type:"text", value:"" }],
    [{ id:11, label:"Total Percenatge", type:"text", value:"" },{ id:12, label:"Address", type:"text", value:"" }]
]
 

const EducationalDetails = ({ setStudentEduDetails }) => {
const [educationalDetails, seteducationalDetails] = useState(education);

const handleChange = (event, label) => {
    const details = [...educationalDetails];
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
   seteducationalDetails(newData)
   if(setStudentEduDetails)
        setStudentEduDetails(newData)
 };

 return(
    <React.Fragment>
        <Container>
            <Card>
                <CardBody>
          { educationalDetails.map((det) => {
                return(
                    <div style={{display:"flex",justifyContent:"space-around", marginLeft:"130px"}}>
                        <Col>
                        <TextFieldComp handleChange={handleChange} value={det[0]?.value} style={{marginLeft:"55px", minWidth:"250px", marginTop:"7px"}} size="medium" label={det[0]?.label} />
                        </Col>
                        <Col>
                        <TextFieldComp handleChange={handleChange} value={det[1]?.value} style={{marginLeft:"55px", minWidth:"250px", marginTop:"7px"}} size="medium" label={det[1]?.label} />
                        </Col>
                    </div>
                )
            })}
            </CardBody>
            </Card>
        </Container>
    </React.Fragment>
)


}
export default EducationalDetails;