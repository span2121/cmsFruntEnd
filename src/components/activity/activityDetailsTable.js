import { Button, Card, Input, TextField, Typography } from '@material-ui/core'
import { useStaticState } from '@material-ui/pickers'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CardBody } from 'reactstrap'
import BootstrapTable from "react-bootstrap-table-next";
import AppContext from '../contect'
import { tableStyle } from '../util'
import { activity } from '../../api'
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ActivityDetailsTable = () => {
const [studentActivities, setStudentActivities] = useState([])
const { entity, API_PATH, allTeachers , attStudents } = useContext(AppContext)
const [editableActivity, setEditableActivity] = useState('')
const history = useHistory()
const activityData = history?.location?.state || ''
debugger
useEffect(() => {
        getAllActivityDetails();
    },[activityData])

    const getTeacherCode = teacherId => {
        const teacher  = allTeachers.find(tch => tch.teachers_id === teacherId )
        if(teacher)
        return teacher.teacher_code
    }

    const getStudentCode = (studentId) => {
        const student  = attStudents.find(std => std.id === studentId )
        if(student)
        return student.code
    }

const deleteSubActivity = (activityDetId) => {
        const subActivityObject = {
            action :'DELETE_ACTDETAILS',
            activityDetId,
            activityId: activityData?.activity_id || null
        }
        activity(subActivityObject, API_PATH)
        .then(res => {
            setStudentActivities(res.results[0])
        })
        .catch(err => {
            console.log(err)
            toast.error("failed to fetch details")
        })
}

const columns = [
    {
        dataField: "activity_detail_title",
        text: "Title",
        sort:true
    },
    {
        dataField: "activity_detail_details",
        text: "Details",
        sort:true
    },
    {
        dataField: "activity_type",
        text: "Type",
        sort:true
    },
    {
        dataField: "assigned_by",
        text: "Assigned By",
        formatter:getTeacherCode,
        sort:true
    },
    {
        dataField: "assigned_student_id",
        text: "Assigned To",
        formatter:getStudentCode,
        sort:true
    },
    {
        dataField: "schedule_date",
        text: "Start Date",
        formatter: (activity_startDate) => moment(activity_startDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField: "due_date",
        text: "End Date",
        formatter: (activity_EndDate) => moment(activity_EndDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField:"activity_det_priority",
        text: "Priority",
        sort:true
    },
    {
        dataField: "status",
        text: "Status",
        sort:true
    },
    {
        dataField: "activity_detail_id",
        text: "Delete",
        formatter : (id) => {
          return <DeleteIcon color="primary" style={{cursor:"pointer"}}  onClick={() => deleteSubActivity(id)}  />
        }
    },
    {
        dataField: "activity_detail_id",
        text: "Edit",
        formatter : (id, row) => {
          return <EditIcon color="primary" style={{cursor:"pointer"}} onClick={() => enabeleEditData(row)} />
        }
    }
]

const enabeleEditData = (row) => {
    setEditableActivity(row)
    const editableActivity = {...row, isEditable:true};
    history.push({pathname:'/assigntoStudents', state: {activityData, editableActivity}})
}
    const getAllActivityDetails = () => {
        const activityObject = {
            action :'GET_RELATEDACTDETAILS',
            activityId: activityData?.activity_id || null
        }
        activity(activityObject, API_PATH)
        .then(res => {
            setStudentActivities(res.results[0])
        })
        .catch(err => {
            console.log(err)
            toast.error("failed to fetch details")
        })
}
const teacherCode = getTeacherCode(activityData?.assigned_to)
return(
    <React.Fragment>
        <Card style={{padding:"5px"}}>
            <CardBody  style={{padding:"5px", margin:"5px", backgroundColor:"lightgray"}} >
                <Typography variant="h5" gutterBottom> Sub Activities Assigned to students 
                <Button color="danger" style={{ float:"right", margin:"3px", padding:"4px", color:"white", 
               backgroundColor:"indianred"}} onClick={() => history.push({pathname: '/activities'})} variant="contained" >Close</Button>
                <Button style={{ float:"right"}} color="primary" onClick={() => history.push({ pathname:'/assigntoStudents', state:{activityData} }) } variant="contained" >
                        Assign Sub Activity
                </Button>
                </Typography>
            </CardBody>
        </Card>
        <Card>
        <CardBody>
                    { studentActivities.length > 0 && attStudents.length > 0 &&
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

export default ActivityDetailsTable;