import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap'
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../contect';
import { activity } from '../../api'
import { statusOptions } from '../util'
import BootstrapTable from "react-bootstrap-table-next";
import { tableStyle } from '../util'
import moment from 'moment'
import { Typography } from '@material-ui/core';
const StudentActivities = () => {
const {entity, API_PATH, allTeachers} = useContext(AppContext)
const [studentActivities, setStudentActivities] = useState({})


const gatStatus = (status) => {
    if(status === statusOptions['0'] ) return statusOptions['1']
    else  return statusOptions['2']
    }

const updateActivityDet = (row) => {   
    const activityObject = {
        action:"UPDATE_ACTIVITYDET",
        activityDetId: row.activity_detail_id,
        status:gatStatus(row.status)
    }
    activity(activityObject, API_PATH)
    .then(res => {
        const temparray = [...studentActivities]
        const activities = temparray.map(act => {
            if(act.activity_detail_id === row.activity_detail_id)
            {
                let activity = act;
                activity.status = gatStatus(row.status)
                return activity
            }
            else
                return act;
        })
        setStudentActivities(activities)
    })
    .catch(err => {
        toast.error("Failed to update the status")
    })

}

const GetButton = ({ status, row }) => {
    return <Button disabled={status === statusOptions[2] } onClick={() => updateActivityDet(row)}
     style={{padding:"3px", backgroundColor: status === statusOptions[2] ? "green" : "blue", color:"white", cursor:"pointer"}} >{status}</Button>;
}

const getTeacherCode = teacherId => {
    const teacher  = allTeachers.find(tch => tch.teachers_id === teacherId )
    if(teacher)
        return teacher.teacher_code
    return teacherId
}

const columns = [
    {
        dataField:"activity_detail_title",
        text:"Title",
        sort:true
    },
    {
        dataField:"activity_detail_details",
        text:"Details",
        sort:true
    },
    {
        dataField:"activity_type",
        text:"Activity Type",
        sort:true
    },
    {
        dataField: "assigned_by",
        text: "Assigned By",
        formatter:getTeacherCode,
        sort:true
    },
    {
        dataField: "schedule_date",
        text: "Start Date",
        formatter: (circular_startDate) => moment(circular_startDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField: "due_date",
        text: "End Date",
        formatter: (endDate) => moment(endDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField:"status",
        text: "Status",
        formatter: (status, row) => {
          return  <GetButton status={status} row={row} />
        },
        sort:true
    }
]

useEffect(() => {
    fetchStudentsActivities()
},[])
   
const fetchStudentsActivities = async () => {
    const activityObject = {
        action:"GET_ACTIVITYDETAILS",
        assignedTo: entity.userId
    }
    activity(activityObject, API_PATH)
    .then(res => {
        setStudentActivities(res.results[0])
    })
    .catch(err => {
        console.log(err)
    })
}

    return(
        <React.Fragment>
            <Card style={{padding:"5px"}}>
                <CardHeader style={{padding:"5px", margin:"5px", backgroundColor:"lightgray"}}>
                    <Typography style={{margin:"0.5em 0em 0em 1em", color:"1px solid black" }} variant="h4" gutterBottom>
                        Activities
                    </Typography>
                </CardHeader>
                <CardBody>
                    { studentActivities.length > 0 && allTeachers.length > 0  &&
                        <BootstrapTable
                        bootstrap4
                        keyField="assetnotesId"
                        data={studentActivities}
                        columns={columns}
                        bordered={true}
                        style={{width:"100%"}}
                        classes={tableStyle}
                        headerClasses="bg-200 text-900 border-y border-200"
                    />}
                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default StudentActivities;