import React, { useState } from 'react'
import { Card, TextField } from '@material-ui/core';
import { CardBody, Col, Row } from 'reactstrap';
import { Label } from 'react-bootstrap';

const SetPassword = ({confirmPassword, setConfirmPassword }) => {
const [password, setPassword] = useState('')
const [verify, setVerify] = useState('')

const checkMAtching = () => {
    password === verify? setConfirmPassword(password) : setConfirmPassword("")
 }   
  return(
        <div className="Container">
            <Card style={{marginBottom:"1em", textAlign:"center"}}>
                <CardBody>
                    <Label style={{margin:"1em", fontWeight:"bold"}} >Note:</Label>
                    <Label style={{color:"seagreen"}}>Password field should contain minimum 8 charecters, start with capitcal letter and it should be alphaNumeric value EX: <span style={{color:"blue"}}>Support@123</span> </Label>
                </CardBody>
            </Card>
            <Row style={{display:"flex", justifyContent:"space-around" }}>
                <Col style={{marginLeft:"380px"}}>
                <TextField value={password} label="Password" onBlur={checkMAtching} onChange={(e) => setPassword(e.target.value) } />
                </Col>
                <Col>
                <TextField value={verify} label="Confirm password" onBlur={checkMAtching} onChange={(e) => {
                    setVerify(e.target.value)}
                    } />
                </Col>
            </Row>
        </div>
    );
}
export default SetPassword;