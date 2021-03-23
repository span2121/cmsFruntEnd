import React, { useContext, useState, useEffect } from 'react';
import AppContext from './components/contect'
import PropTypes from 'prop-types';
import useStateWithLocalStorage from '../src/components/helper/useStateWithLocalStorage'
import { fetchUserDetails } from './api'

const Main = (props) => {

    const context = useContext(AppContext);
    const [entity, setEntity] = useStateWithLocalStorage('UserSession');
    //const [entity, setEntity] =  useState([]);
    const [attStudents, setAllStudents] = useState([]);
    const [allTeachers, setAllTeachers] = useState([])
    const [notifications, setNotifications] =([])
    const [activities, setActivities] = useState([]) // workload for teachers
    const [activityDetails, setActivityDetails] = useState([]); // workload for students assigned by teachers maintan status
    const { API_PATH }  = context
    const value = {
        ...context,
        entity,
        setEntity,
        attStudents,
        setAllStudents,
        notifications,
        setNotifications,
        activities,
        setActivities,
        activityDetails,
        setActivityDetails,
        allTeachers,
        setAllTeachers
    }
    useEffect(() => {
        fetchteacherStudentDetails()
    },[])

    const fetchteacherStudentDetails = async () => {
        const reqObject = {
            action : "GETALL",
            userId:entity.userId || null
        }
        fetchUserDetails(reqObject, API_PATH)
        .then(res => {
            setAllTeachers(res?.results?.[0])
            setAllStudents(res?.results?.[1])
        })
    }
    return <AppContext.Provider value={value}>{props.children} </AppContext.Provider>
};

Main.propTypes = { children: PropTypes.node};
export default Main;
