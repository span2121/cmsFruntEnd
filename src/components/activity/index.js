import { Button, Card, Input, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { CardBody, CardHeader } from 'reactstrap'
import AddActivities from '../activity/addActivities'
import Modal from '../common/modal'
import { activity } from '../../api'
import AppContext from '../contect'
import BootstrapTable from "react-bootstrap-table-next";
import { tableStyle } from '../util'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { fetchUserDetails } from '../../api'
import { useHistory } from 'react-router-dom'
import { roles } from '../util'
import StudentActivities from './StudnetActivities'
import moment from 'moment'
import { toast } from 'react-toastify'


const columns = (allTeachers) => [
    {
        dataField:"activity_title",
        text:"Title",
        sort:true
    },
    {
        dataField:"activity_details",
        text:"Details",
        sort:true
    },
    {
        dataField:"activity_type",
        text:"Type",
        sort:true
    },
    {
        dataField:"assigned_by",
        text:"Assigned By",
        formatter: (teacherId)  => getTeacherName(allTeachers, teacherId),
        sort:true
    },
    {
        dataField:"assigned_to",
        text:"Assigned To",
        formatter: (teacherId)  => getTeacherName(allTeachers, teacherId),
        sort:true
    },
    {
        dataField:"Schedule_date",
        text:"Start Date",
        formatter: (activity_startDate) => moment(activity_startDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField:"due_date",
        text:"End Date",
        formatter: (activity_endDate) => moment(activity_endDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField:"status",
        text:"Status",
        sort:true
    }
]

const getTeacherName = (allTeachers,teacherId) => {
    const teacher  =allTeachers.length > 0 && allTeachers.find(i => i.id === teacherId);
     if(teacher)
         return teacher.code
     return teacherId
 }

const Activity = () => {
const [showCreateActivity, setShowCreateActivity] = useState(false)
const { entity, API_PATH } = useContext(AppContext)
const [Activities, setActivities] = useState({})
const [filteredActivities, setFilteredActivities] = useState([])
const [searchText, setSearchText] = useState('')
const [allTeachers, setAllTeachers] = useState({})
const history = useHistory()
const onActivityAdded = () => {
    setShowCreateActivity(false)
}


useEffect(() => {
    fetchAllTeachers();
    getAllActivityDetails();
    
},[])

const fetchAllTeachers = () => {
    const teacherObject = {
        action:"GET_ALLTEACHERS",
        userId:entity.userId || null
    }
    fetchUserDetails(teacherObject, API_PATH)
    .then(res => {
        const teachers =  res.results[0].map(tch => {
            const data = {
                id: tch.teachers_id,  
                code:tch.teacher_code
            }
            return data
        })
        setAllTeachers(teachers)
    })
}

const filterData = (code) => {
    if(Activities.length > 0)
    {
        let allActivities = [...Activities]
        let filteredActivities = [] 
       allActivities.map(activity => {
               const teacherCode = allTeachers.find(t => t.id === activity.assigned_to )
                if(teacherCode && teacherCode.code.toLowerCase().includes(code.toLowerCase()))
                filteredActivities.push(activity)
        })
        if(!code)
        {
            setFilteredActivities(allActivities)
        }
        else
        setFilteredActivities(filteredActivities)
    }
}



const getAllActivityDetails = () => {
        const activityObject = {
            action :'GET_ACTIVITY'
        }
        activity(activityObject, API_PATH)
        .then(res => {
            setActivities(res.results[0])
            setFilteredActivities(res.results[0])
        })
        .catch(err => {
            console.log(err)
        })
}

const onActivityClicked = (event, rowObject, rowIndex) => {
    if (rowObject && rowObject.activity_id) {
        if(rowObject.assigned_to === entity?.userId || entity?.userRole === roles.HOD )
            history.push({pathname:'/ActivityDetails', state:rowObject})
        else
            toast.error("You are not autherizes to see the details")
    }
  }

    return(
        <React.Fragment>
           { entity.userRole === roles.student?
            <Card>
                <StudentActivities />
            </Card>
            :
            <div>
            <Card style={{padding:"6px"}}>
                <CardBody  style={{backgroundColor:"lightgray"}}>
                     <Typography style={{margin:"0.5em 0em 0em 0.5em", color:"1px solid black" }} variant="h4" gutterBottom>
                        Activities
                    <Button style={{margin:"5px", float:"right", padding:"3px"}} color="primary" onClick={() => setShowCreateActivity(true)} variant="contained" >
                        create Activity
                    </Button>
                    </Typography>
                </CardBody>
            </Card>
            <Card>
                <CardBody style={{cursor:"pointer"}}>
                <TextField
                    label="Search With Teacher code"  
                    onChange={(e) => filterData(e.target.value)}
                    InputProps={{  
                        endAdornment: (
                        <InputAdornment>
                            <IconButton>
                            <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />

                    { filteredActivities.length > 0 &&
                    <BootstrapTable
                    rowEvents={{
                        onClick: onActivityClicked
                    }}
                    bootstrap4
                    keyField="assetnotesId"
                    data={filteredActivities}
                    columns={columns(allTeachers)}
                    bordered={true}
                    classes={tableStyle}
                    headerClasses="bg-200 text-900 border-y border-200"
                />}
                </CardBody>
            </Card>
            </div>}
         { showCreateActivity ?  <Modal  close={() => setShowCreateActivity(false)}>
                                     <AddActivities close={() => setShowCreateActivity(false)} onActivityAdded={onActivityAdded} />
                                </Modal> : null}
        </React.Fragment>
    )
}

export default Activity;