import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TeacherPersonalDetails from './TeacherPersonalDet'
import TeacherEducationDetails from './teacherEducationDetails'
import { registerAPI } from '../../api'
import AppContext from '../contect';
import SetPassword from '../registerStudennt/setPassword';
import { toast } from 'react-toastify';
import moment from 'moment';
import { dateFormat, roles } from '../util'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
        margin:"1em",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return ['Personal Informations', 'Graduation Details', 'Set Password'];
  }

  const getparameters = (allDetails, confirmPassword, BirthDate ) => {
    const getValue = (label) => {
      return allDetails.find(i=> i.label===label)?.value
    }
   const studentObject = {
    action:'TEACHER_REGISTER' , regCode :  getValue('Teacher Code'), firstName :  getValue('First Name'), 
    lastName :  getValue('Last Name'), fatherName :  getValue('Father Name'), motherName :  getValue('Mother Name'), email :  getValue('Email Id'),  
    phoneNo :  getValue('Phone No.'), emergencyNo :  getValue('Emergency Contact'), adharNo :  getValue('Adhar Number'), age :  getValue('Age'),
    gender :  getValue('Gender'), subject :  getValue('Subject'),  
    password :  confirmPassword, role : roles[getValue('Designation')] , address :  getValue('Address'), maxQualification: getValue('Maximum Qualification'),
    subAssigned:getValue('Subject Assigned'), degreeClgName :  getValue('Degree Collage Name'),YOP :  getValue('Year of Passout'), 
    degreePercentage: getValue('Percentage Obtained'), branch :getValue('Branch'),
    DOB : BirthDate?  moment(BirthDate)?.format(dateFormat) || null : null
   }
   return studentObject;
  }
  
const TeacherRegister = () => {
    const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { API_PATH } = useContext(AppContext)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [teacherPersonalDetails, setTeacherPersonalDetails] = useState({});
  const [teacherEduDetails, setTeacherEduDetails] = useState({})
  const [BirthDate, setBirthDate] = useState(moment.now())
  const history = useHistory();
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <TeacherPersonalDetails  BirthDate={BirthDate} setBirthDate={setBirthDate}  setTeacherPersonalDetail={setTeacherPersonalDetails} />
      case 1:
        return <TeacherEducationDetails setTeacherEduDetails={setTeacherEduDetails} />
      case 2:
        return <SetPassword confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
      default:
        return 'Unknown stepIndex';
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

    const validateTeacherPersonalDetails = (teacherDetails, validEmail) => {
      const {regCode, firstName, lastName, email, phoneNo } = teacherDetails;
        if(!regCode) toast.error("Teacher Code is required")
        if(!firstName) toast.error("First Name is required")
        if(!lastName) toast.error("Last Name is required")
        if(!email) toast.error("Email is required")
        if(!phoneNo) toast.error("Phone Number is required")
        if(!validEmail.test(email))
        {
          toast.error("Please enter valid email")
          return null;
        }
        if(isNaN(phoneNo))
        {
          toast.error("Phone number should contain numbers only")
          return null;
        }
        if(!regCode, !firstName, !lastName, !email, !phoneNo) return null
        else return teacherDetails
    }

    const validateGraduationDetails = ( teacherDetails ) => {
      const { address, role, branch } = teacherDetails;
      if(!address) toast.error("Address is required")
      if(!role) toast.error("Please select the role of the teacher")
      if(!branch) toast.error("Please select the Branch")
      if(!address || !role || !branch) return null
      else return teacherDetails
    }

  const handleNext = async () => {
    var ValidPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/);    
    var validEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(activeStep === steps.length - 1)
    {
      if(!confirmPassword)
      {
        toast.error("Please confirm currect password")
        return;
      }
      else if(!ValidPassword.test(confirmPassword))
      {
        toast.error("Please enter password in currect format")
        return;
      }
      let  allStudentDetails = [...teacherEduDetails, ...teacherPersonalDetails ]
      let allDetails = []
      for(let i=0; i< allStudentDetails.length; i++)
      {
        allDetails = allDetails.concat(...allStudentDetails[i])
      }
     const RegisterObject = getparameters(allDetails, confirmPassword, BirthDate )
     await registerAPI(RegisterObject, API_PATH)
     .then(res => {
       if(res)
          toast.success("Teacher Successfully Registered");
          history.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
   else{
     if(activeStep === 0)
     {
      if(!(teacherPersonalDetails.length > 0))
      {
        toast.error("Please enter Personal details")
        return;
      }
      let  PersonalDetails = [...teacherPersonalDetails ]
      let allDetails = []
      for(let i=0; i< PersonalDetails.length; i++)
      {
        allDetails = allDetails.concat(...PersonalDetails[i])
      }
     const RegisterObject = getparameters(allDetails, confirmPassword, BirthDate )
     const isvalidData = validateTeacherPersonalDetails(RegisterObject, validEmail)
     console.log({isvalidData})
     if(!isvalidData)   
     return;
      else setActiveStep((prevActiveStep) => prevActiveStep + 1);
     }
     else if(activeStep === 1)
     {
       if(!(teacherEduDetails.length > 0))
       {
         toast.error("Please enter Graduation details")
         return;
       }
      let  graduationDetails = [...teacherEduDetails ]
      let allDetails = []
      for(let i=0; i< graduationDetails.length; i++)
      {
        allDetails = allDetails.concat(...graduationDetails[i])
      }
     const RegisterObject = getparameters(allDetails, confirmPassword, BirthDate )
     const isvalidData = validateGraduationDetails(RegisterObject, validEmail)
      if(!isvalidData)
        return;
     else setActiveStep((prevActiveStep) => prevActiveStep + 1);
     }
   }
  };

  return(
    <div className={classes.root}>
        <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                color="primary"
                variant="contained"
              >
                Back
        </Button>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <div>
      {(
        <div>
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          <div className="d-flex justify-content-end m-3">
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
  );

}

export default TeacherRegister