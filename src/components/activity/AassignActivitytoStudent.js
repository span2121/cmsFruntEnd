import React, { useState, useContext, useRef, useEffect } from 'react'
import {Card, CardBody, Button, Input, FormGroup, Form, Label, Row, Col, CustomInput} from 'reactstrap'
import ButtonIcon from "../common/buttonIcon";
import {Container, makeStyles, Typography} from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useStaticState } from '@material-ui/pickers';
import DatePicker from '../common/datePicker'
import { dateFormat} from '../util'
import AppContext from '../contect';
import moment from 'moment'
import PriorityDropDown from '../common/priorityDropdown'
import StudentsDropDown from '../common/studentDropDown'
import ActivityType from '../common/activityDropDown'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { activity } from '../../api'
import { toast } from 'react-toastify';


const useStyles = makeStyles(theme => ({
    clickableLabel: {
        cursor: 'pointer',
        '&:hover': {
            color: '#007efff2'
        }
    },
    buttonStyles: {
        width: 'fit-content'
    },
    actionButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& button:not(:last-child)': {
            marginRight: '5px',
        }
    }
}));
const currentDate = moment()

const AssignActivityToStudent = (props) => {
    const history = useHistory();
    const [selectedUser, setSelectedUser] = useState('')
    const [startDate, setStartDate] = useState(currentDate)
    const [activityType, setActivityType] = useState('')
    const [dueDate, setDueDate] = useState(currentDate)
    const {API_PATH, entity} = useContext(AppContext)
    const [details, setDetails] = useState('')
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('MEDIUM')
    const [woStatus, setWOStatus] = useState('Open')
    const [editableActivityDetId, setEditableActivityDetId] = useState('')
    const inputRef = useRef();
const classes = useStyles();
const activityDate = history?.location?.state.activityData || ''
const editableActivity = history?.location?.state.editableActivity || ''
debugger
useEffect(() => {
    setActivityType(activityDate.activity_type)
},[])

useEffect(() => {
    if(editableActivity?.isEditable)
    {
        setEditableActivityDetId(editableActivity.activity_detail_id)
        setSelectedUser(editableActivity.assigned_student_id)
        setStartDate(moment(editableActivity.schedule_date))
        setActivityType(editableActivity.activity_type)
        setDueDate(moment(editableActivity.due_date))
        setDetails(editableActivity.activity_detail_details)
        setTitle(editableActivity.activity_detail_title)
        setPriority(editableActivity.activity_det_priority)
    }
    else
    {
        setEditableActivityDetId('')
        setSelectedUser('')
        setStartDate(currentDate)
        setDueDate(currentDate)
        setDetails('')
        setTitle('')
        setPriority('MEDIUM')
    }
},[])
const createSubActivity = () => {

    if (!title || title.trim() === '') {
        toast.error('Title is required');
        return;
    }
    else if (!selectedUser) {
        toast.error('Select a Student to assign ');
        return;
    }
    else if (!startDate) {
        toast.error('Start Date is required');
        return;
    }
    else if (!dueDate) {
        toast.error('End Date is required');
        return;
    }
    else if (dueDate.diff(startDate, 'day') < 0) {
        toast.error('Expiry Date is lesser than Ready On Date');
        return;
    }
    else if(!activityType)
    {
        toast.error('Activity Type is required');
        return;
    }

    const subactivityObject = {
        action : editableActivityDetId? "UPDATE_DETAILS" : "CREATE_ACTDETAILS",
        activityId:activityDate.activity_id,
        title,
        details,
        assignedTo:selectedUser,
        scheduleDate:moment(startDate).format(dateFormat),
        dueDate : moment(dueDate).format(dateFormat),
        activityType,
        assignedBy: activityDate.assigned_to,
        priority:priority,
        activityDetId:editableActivityDetId
    }
    activity(subactivityObject, API_PATH)
    .then(res => {
        history.push({pathname:'/ActivityDetails', state:activityDate})
    })
}

    return(
        <React.Fragment>
            <Container className="container p-2">
            <Card>
                <CardBody style={{padding:"5px"}}>
                     <Row  style={{padding:"5px", margin:"5px", backgroundColor:"lightgray"}} className="justify-content-between align-items-center">
                            <Col md>
                                <h5 className="mb-2 mb-md-0">Assign to Students</h5>
                            </Col>
                            <Col xs="auto">
                                <ButtonIcon
                                    icon={'save'}
                                    className="mr-2"
                                     className={`m-1 ${classes.buttonStyles}`}
                                    color="primary" size="sm"
                                    onClick={createSubActivity}
                                   
                                >
                                    {editableActivityDetId ? 'UPDATE' : 'CREATE'}
                                </ButtonIcon>
                                <ButtonIcon className="m-1" color="danger" size="sm" icon={'door-open'}
                                    onClick={() => history.push({pathname:'/ActivityDetails', state:activityDate}) }>Close</ButtonIcon>
                            </Col>
                        </Row>
                </CardBody>
            </Card>
            <Form onSubmit={() => {
                }}>
                    <Row noGutters className={'mt-3'}>
                        <Col lg={8} className="pr-lg-2 mb-3">
                            <Card className="h-lg-100" style={{padding:"5px"}}>
                                <Typography variant="h5" gutterBottom > Activity Details
                                </Typography>

                                <CardBody className="py-0">
                                    <FormGroup>
                                    <Label>ACTIVITY TITLE <span style={{color: 'red'}}>*</span></Label>
                                        <Input
                                            placeholder={'Enter your sub Activity Title'}
                                            value={title}
                                            innerRef={inputRef}
                                            onChange={e => setTitle(e.target.value)}
                                            type="input"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>WHAT WORK SHOULD BE DONE?</Label>
                                        <Input
                                            placeholder={'Activity in detaile'}
                                            value={details}
                                            onChange={e => setDetails(e.target.value)}
                                            type="textarea"
                                            rows="4"
                                            cols="50"
                                            style={{resize: 'none'}}
                                        />
                                    </FormGroup>
                                  
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormGroup>
                                                <Label>START DATE</Label>
                                                <DatePicker
                                                    dateFormat={dateFormat}
                                                    timeFormat={false}
                                                    value={startDate}
                                                    defaultValue={startDate}
                                                    onChange={setStartDate}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-6">
                                            <FormGroup>
                                                <Label>Due DATE</Label>
                                                <DatePicker
                                                    dateFormat={dateFormat}
                                                    timeFormat={false}
                                                    value={dueDate}
                                                    defaultValue={dueDate}
                                                    onChange={setDueDate}
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4} className="pl-lg-2 mb-3">
                            <Card style={{padding:"5px"}} className="mb-3">
                                <CardBody>
                                    <FormGroup>
                                    <Label>ASSIGNED TO <span style={{color: 'red'}}>*</span></Label>
                                    <StudentsDropDown 
                                        assignTo={selectedUser}
                                        setAssignedTo={setSelectedUser}
                                    />
                                    </FormGroup>
                                    {props?.isEditable && <div className="row">
                                        <div className="col-sm-12">
                                            <FormGroup>
                                                <Label> STATUS</Label>
                                                {/* <StatusDropdown woStatus={woStatus} setWOStatus={setWOStatus}/> */}
                                        </FormGroup>
                                        </div>
                                    </div>}
                                </CardBody>
                            </Card>
                            <Card style={{padding:"5px"}} className="mb-3">
                                <CardBody>
                                    <FormGroup>
                                    <Label>Activity Type</Label>
                                    <ActivityType 
                                        activityType={activityType}
                                        setActivityType={setActivityType}
                                        disabeled={true}
                                    />
                                    </FormGroup>
                                </CardBody>
                            </Card>
                            <Card style={{padding:"5px"}}>
                                <CardBody>
                                     <FormGroup>
                                        <Label>PRIORITY</Label>
                                        <PriorityDropDown priorityValue={priority}
                                                               setPriorityValue={setPriority}/>
                                         </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default AssignActivityToStudent