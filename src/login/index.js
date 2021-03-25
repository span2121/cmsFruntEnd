import React, { useContext, useState } from "react";
import {Form, Label} from "react-bootstrap";
import { Button, TextField, InputLabel, FormControl, Card, Box, DialogTitle} from '@material-ui/core';
import "./Login.css";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Input, CardBody } from 'reactstrap';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { loginApi } from '../api/index'
import AppContext from '../components/contect'
import { toast } from "react-toastify";
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { useStaticState } from "@material-ui/pickers";

const Login = () =>  {
  const [email, setEmail] = useState("");
  const { entity, setEntity} = useContext(AppContext)
  const [open, setOpen] = React.useState(false);
  const [isloginFailed, setisLoginFailed] = useState(false)
  const  { API_PATH } = useContext(AppContext)
 // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const history = useHistory();
  function validateForm() {
    return email.length > 0 && values.password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const validateLogin = async ( ) => {
    var ValidPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/);
    var validEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!validEmail.test(email))
    {
      toast.error("enter valid email")
      return;
    }
    if(!ValidPassword.test(values.password))
    {
      toast.error("Please enter valid password");
      setisLoginFailed(true)
      return;
    }

   const loginObject = {
    action:"LOGIN",
    loginMail: email,
    loginPassword:values.password,
    }
    await loginApi(loginObject,API_PATH)
    .then(res=> {
     if(res.results)
     {
      toast.success("Heartly Welcome")
      setEntity(res.results[0][0])
      history.push('/profile')
     }
      else
        toast.error("Failed to login")
    })
    .catch(err => {
      console.log(err)
      toast.error("Failed to login")
    })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SimpleDialog = (props) => {
    const { onClose, open } = props;
    return(
      <Dialog variant="outlined" onClose={onClose} aria-labelledby="simple-dialog-title" open={open} >
          <DialogTitle id="simple-dialog-title">
              <HowToRegIcon variant="Filled" color="primary" fontSize="default" />  REGISTER AS
          </DialogTitle>
          <Button color="primary" variant="outlined" onClick={() => history.push('/TeacherRegister')} > teacher</Button>
          <Button color="primary" variant="outlined" onClick={() => history.push('/StudentRegister')} >
            Student</Button>
      </Dialog>
    )
  }


  return (
    <React.Fragment>
      <Container style={{width:"100%"}} >
        <Card>
          <CardBody>
            <div style={{display:"flex", background:"lavenderblush" }}>
            <div style={{width:"63%"}} > 
              <img width="96%" style={{textAlign:"left", float:'left'}} height="93%" src="https://www.thamehub.co.uk/wp-content/uploads/2019/08/LORD.jpg" alt="image"/>
              {/* <img width="96%" style={{textAlign:"left", float:'left'}} height="93%" src="https://cache.careers360.mobi/media/presets/720X480/colleges/social-media/media-gallery/1220/2018/6/19/Reva-University-Bangalore-Campus1.jpg" alt="image"/> */}
            </div>
            <div className="Login">
            <div>
              <Button onClick={()=> setOpen(true) } style={{position:"fixed", right:"35px", top:"50px", backgroundColor:"steelblue"}} color="primary" variant="contained" >Register</Button>
              <SimpleDialog open={open} onClose={handleClose} />
            </div>
            <br/>
            <Form  onSubmit={handleSubmit}>
              <Col style={{minWidth:"max-content"}}>
              <Row>
              <h1>Login Here  </h1>
              </Row>
              <Row >
              <TextField size="small" style={{marginBottom:"0.7rem"}} autoFocus onChange={(e) => setEmail(e.target.value)}  label="Email" variant="outlined" />
              </Row>
              <Row>
              <TextField size="small" style={{marginBottom:"0.7rem"}} type={values.showPassword ? 'text' : 'password'}  onChange={handleChange('password')}  label="Password" variant="outlined" 
              /> 
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </Row>
           { isloginFailed && 
           <div>
            <Row style={{color:"red"}} >
              <Label>Password should contain mimimum 8 charecters,</Label>
            </Row>
            <Row style={{color:"red", marginBottom:'5px'}}>
            <Label>starts with Capital letter and alphanumeric value</Label>
            </Row>
           </div> }
              <Button color="primary"  style={{marginLeft:"85px"}} onClick={validateLogin} variant="contained" block size="small" type="submit" disabled={!validateForm()}>
                Login
              </Button >
              </Col>
            </Form>
          </div>
          </div>
           </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
}
export default Login