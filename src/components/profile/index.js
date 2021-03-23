import { Card, CardHeader, Container, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../contect';
import theme from '../helper/theme';
import StudentDetailsCard from './studentDetailsCard'
import { fetchUserDetails } from '../../api'
import StudentAcademicsTable from './studentAcademicsTable'
import TeacherDetailsCard from './teacherDetailCard'
import StudentsTable from './studentsTable'
const Profile = () => {
const [personalDetails, setPersonalDetails] = useState({});
const [educationalDetails, setEducationalDetails] = useState({});
const [allStudents, setAllStudents] = useState({})
const { entity, API_PATH } = useContext(AppContext)
    const fetchDetails = () => {
       const detailsObject = {
           action: entity.userRole === 1 ?  "GET_STUDENT": "GET_ALLSTUDENTS",
           userId: entity.userId || null,
           role:entity.userRole || null
       }
       fetchUserDetails(detailsObject, API_PATH)
       .then(res => {
           if(entity.userRole === 1)
           {
            setPersonalDetails(res.results[0][0])
            setEducationalDetails(res.results[1])
           }
           else
           {
            console.log(res.results[0])
            setPersonalDetails(res.results[0][0])
            setAllStudents(res.results[1])
           }
       })
    }

    useEffect(() => {
        fetchDetails();
    }, [entity])
return <Container className="mt-2">
    {entity.userRole === 1 ?
    <div>
       <StudentDetailsCard personalDetails={personalDetails}  />
      { educationalDetails.length >=1 && <StudentAcademicsTable educationalDetails ={educationalDetails} code={personalDetails.code} />}
      </div> :<div>
          <TeacherDetailsCard teacherDetails={personalDetails} />
         { allStudents.length >= 1 && <StudentsTable allStudents={allStudents} />}
      </div>
    }
    </Container> 
}
export default Profile;