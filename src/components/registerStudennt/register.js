import React, {useContext, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalDetails from './personalDetails'
import EducationalDetails from './educationalDetails'
import SetPassword from './setPassword';
import { useHistory } from 'react-router-dom';
import { registerAPI } from '../../api'
import { dateFormat } from '../util'
import moment from 'moment'
import { toast } from 'react-toastify';
import AppContext from '../contect';
import { roles } from '../util'
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
    return ['personal informations', 'Educational details', 'set Password'];
  }
  
  const getparameters = (allDetails, confirmPassword, BirthDate) => {
    const getValue = (label) => {
      return allDetails.find(i=> i.label===label)?.value
    }
   const studentObject = {
    action:'STUDENT_REGISTER' , regCode :  getValue('Student Code'), usnNumber :  getValue('USN Number'), firstName :  getValue('First Name'), 
    lastName :  getValue('Last Name'), fatherName :  getValue('Father Name'), motherName :  getValue('Mother Name'), email :  getValue('Email Id'),  
    phoneNo :  getValue('Phone No.'), emergencyNo :  getValue('Emergency Contact'), branch :  getValue('Branch'), instructor :  getValue('Instructor'),
    gender :  getValue('Gender'), DOB : BirthDate?  moment(BirthDate)?.format(dateFormat) || null : null , matrixPercentage :  getValue('10th'), puPercentage :  getValue('PUC'), 
    password :  confirmPassword, role : roles.student , address :  getValue('Address'), totalPercentage :  getValue('Total Percenatge'), 
    semister :  getValue('Semister')
   }
   return studentObject;
  }


  
const Register = () => {
    const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [studentPersonalDetails, setStudentPersonalDetails] = useState({});
  const [studentEduDetails, setStudentEduDetails] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [BirthDate, setBirthDate] = useState(moment.now())
  const {allTeachers, API_PATH } = useContext(AppContext)
  const steps = getSteps();
  const history = useHistory()
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return allTeachers?.length > 0 && <PersonalDetails setStudentPersonalDetails={setStudentPersonalDetails} BirthDate={BirthDate} setBirthDate={setBirthDate} />
      case 1:
        return  <EducationalDetails setStudentEduDetails={setStudentEduDetails} />
      case 2:
        return <SetPassword confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
      default:
        return 'Unknown stepIndex';
    }
  }

  const getEdicationDetailsObject = (allDetails) => {
    const getValue = (label) => {
      return allDetails.find(i=> i.label===label)?.value
    }
    const percentages = {
      action:"ADD_PERCENTAGE", matrix: getValue('10th'), puc:getValue('PUC'), 
      sem1:getValue('1st sem'), sem2:getValue('2nd sem'), sem3: getValue('3rd sem'),
      sem4:getValue('4th sem'), sem5:getValue('5th sem'), sem6:getValue('6th sem'),
      sem7:getValue('7th sem'), sem8:getValue('8th sem')
    };
    return percentages;
  }

  const ValidateEducationDetails = (eduObject) => {
    const { matrix, puc, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8} = eduObject
    let isInError = 0
    if(matrix)
    {
      if(isNaN(matrix))
     {
        toast.error(" matrix percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(puc)
    {
      if(isNaN(puc))
     {
        toast.error(" puc percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem1)
    {
      if(isNaN(sem1))
     {
        toast.error(" sem1 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem2)
    {
      if(isNaN(sem2))
     {
        toast.error(" sem2 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem3)
    {
      if(isNaN(sem3))
     {
        toast.error(" sem3 percentage shoild be in numbers only")
        isInError = 1;
      }
    } 
    if(sem4)
    {
      if(isNaN(sem4))
     {
        toast.error(" sem4 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem5)
    {
      if(isNaN(sem5))
     {
        toast.error(" sem5 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem6)
    {
      if(isNaN(sem6))
     {
        toast.error(" sem6 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem7)
    {
      if(isNaN(sem7))
     {
        toast.error(" sem7 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(sem8)
    {
      if(isNaN(sem8))
     {
        toast.error(" sem8 percentage shoild be in numbers only")
        isInError = 1;
      }
    }
    if(isInError === 1)
      return null;
    else
      return eduObject
  }

  const verifyDetails = (personalDetails, validEmail) => {
    let {regCode, usnNumber, firstName, lastName, email, phoneNo, branch, totalPercentage} = personalDetails
    if(!regCode)
      toast.error("Student Code is required")
    if(!usnNumber)
      toast.error("USN Number is required")
    if(!firstName)
      toast.error("First Name is required")
    if(!lastName)
      toast.error("Last Name is required")
      if(!email)
      toast.error("Email is required")
      if(!phoneNo)
      toast.error("Phone No. is required")
      else if(isNaN(phoneNo))
        toast.error("Phone number should be number only")
      if(!branch)
      toast.error("Branch is required")
      if(totalPercentage)
      {
        if(isNaN(totalPercentage))
          {
            toast.error("Total Persentage should be number only")
            return null
          }
      }
      if(!validEmail.test(email))
      {
        toast.error("Please enter valid email")
        return null;
      }
    if(!regCode || !usnNumber || !firstName || !lastName || !email || !phoneNo || !branch || isNaN(phoneNo))
    {
      return null
    }
    else
    return personalDetails
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
      let  allStudentDetails = [...studentEduDetails, ...studentPersonalDetails ]
      let allDetails = []
      for(let i=0; i< allStudentDetails.length; i++)
      {
        allDetails = allDetails.concat(...allStudentDetails[i])
      }
    let personalDetails = getparameters(allDetails, confirmPassword, BirthDate)
      if(!validEmail.test(personalDetails.email))
      {
        toast.error("Please enter valid email")
        return;
      }
    personalDetails.instructor = allTeachers.find(t => t.teacher_code === personalDetails.instructor)?.teachers_id
     const RegisterObject = verifyDetails(personalDetails, validEmail );
      if(!RegisterObject)
        return
     await registerAPI(RegisterObject, API_PATH)
     .then( async res => {
        let educationDetObject = getEdicationDetailsObject(allDetails)
        const validDate = ValidateEducationDetails(educationDetObject)
        if(!validDate) return ;
        educationDetObject.studentId = res.results.id
        await registerAPI(educationDetObject, API_PATH, '/percentage')
        .then(res => {
          if(res)
          {
            toast.success("Student Successfully Registered")
             history.push('/login')
          }
        })
        .catch(err => {
          console.log(err)
        })
        })
        .catch(err => {
          console.log(err)
        })
    }
   else{
     if(activeStep === 0)
     {
       if(!(studentPersonalDetails?.length > 1))
       {
          toast.error("please enter personal details")
          return;
       }
      const personal = [...studentPersonalDetails]
       let allDetails = []
      for(let i=0; i< personal.length; i++)
      {
        allDetails = allDetails.concat(...personal[i])
      }
      let personalDetsParams = getparameters(allDetails, confirmPassword, BirthDate)
      personalDetsParams.instructor = allTeachers.find(t => t.teacher_code === personalDetsParams.instructor)?.teachers_id
      const RegisterObject = verifyDetails(personalDetsParams, validEmail);
      if(!RegisterObject)
        return
      else
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
     } else if(activeStep === 1)
     {
      const educational = [...studentEduDetails]
      let eduDetails = []
     for(let i=0; i< educational.length; i++)
     {
      eduDetails = eduDetails.concat(...educational[i])
     }
     let educationDetObject = getEdicationDetailsObject(eduDetails)
     const validDate = ValidateEducationDetails(educationDetObject)
     if(!validDate) return ;
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
        <div>
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>        
           <div className="d-flex justify-content-end m-3">
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
          </div>
        </div>
    </div>
  </div>
  );

}

export default Register;