import { Card } from '@material-ui/core'
import { CardBody } from 'reactstrap'
import React, { useState, useContext, useEffect } from 'react'
import InLineFieldContainer from '../common/inlineFieldContainer'
import { Container, Col, Row } from 'reactstrap';
import { Typography, makeStyles, TextField } from '@material-ui/core';
import AppContext from '../contect'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { dateFormat, viewDateFormat } from '../util'
import CloseButton from '../common/CloseButton'
import { Button } from 'reactstrap';
import ContainerHeader from '../circular/containerHeader'
import SubjectField from '../circular/subjectFiels'
import ContentField from '../circular/containerField'
import PriorityDropDown from '../common/priorityDropdown'
import ActivityType from '../common/activityDropDown'
import DatePicker from '../common/datePicker'
import TeachersDropDown  from '../common/teachersDropDown'
import { toast } from 'react-toastify'
import { activity } from '../../api'
const useStyles = makeStyles(theme => ({
    headerStyle: {
        margin: 'auto',
        padding: '1rem'
    },
    labelStyle: {
        margin: 'auto',
    },
    dropDropdownContainer: {
        width: '100%',
        maxWidth: '300px',
        "& :nth-child(1)": {
            width: '100px'
        },
        "& :nth-child(2)": {
            marginLeft: '10px'
        }
    },
    labelColumnStyle: {
        alignSelf: 'center'
    },
    textFieldStyle: {
        width: '100%',
        '& input': {
            padding: '5px !important',
        }
    },
}));


const AddActivities = ({ close, onActivityAdded }) => {
    const classes = useStyles()
    const [circularType, setCircularType] = useState('')
    const [title, setTitle] = useState('')
    const [assignTo, setAssignedTo] = useState('')
    const [content, setContent] = useState('')
    const [readyOnDate, setReadyOnDate] = useState()
    const [expiryDate, setExpiryDate] = useState()
    const [priority, setPriority] = useState('MEDIUM')
    const { API_PATH, entity } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const parameters = useParams();

    useEffect(() => {
        const currentMoment = moment();
        const aWeekAfterCurrentMoment = (moment()).add(7, 'days')
        setReadyOnDate(currentMoment)
        setExpiryDate(aWeekAfterCurrentMoment)
    }, [])

    const onSubmit = async () => {

        if (!title || title.trim() === '') {
            toast.error('Title is required');
            return;
        }
        else if (!assignTo) {
            toast.error('Select a teacher to assign ');
            return;
        }
        else if (!readyOnDate) {
            toast.error('Ready On Date is required');
            return;
        }
        else if (!expiryDate) {
            toast.error('Expiry Date is required');
            return;
        }
        else if (expiryDate.diff(readyOnDate, 'day') < 0) {
            toast.error('Expiry Date is lesser than Ready On Date');
            return;
        }
        else if(!circularType)
        {
            toast.error('Activity Type is required');
            return;
        }

        const createActivityObject = {
            action:'CREATE_ACTIVITY',
            title:title,
            details:content,
            assignedTo:assignTo,
            scheduleDate:moment(readyOnDate).format(dateFormat),
            dueDate:moment(expiryDate).format(dateFormat),
            activityType:circularType,
            status:1,
            priority:priority,
            assignedBy:entity.userId
        }
        setLoading(true)
        await activity(createActivityObject, API_PATH)
            .then(() => {
                setLoading(false)
                onActivityAdded();
            })
            .catch(() => {
                setLoading(false)
                toast("Creating Activity was unsuccessful")
            })
    }

    return(
       <Container className={'pb-1 px-md-5 px-xl-8'} style={{overflow:"scroll"}} >
            <div className='d-flex justify-content-end'>
                <Button className={'mt-3'} disable={loading ? 1 : 0}  onClick={onSubmit} color="primary" type="submit">
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
                <CloseButton onCancelClick={close} />
            </div>
                <CardBody>
                <ContainerHeader customClassName={classes.headerStyle}>Add Activity</ContainerHeader>
                <SubjectField title={title} setTitle={setTitle} label="Title :"  isMandatory placeHolder={'Enter the Activity Title'} />
                <ContentField content={content} label={"Details :"} setContent={setContent} placeholder={'Enter the Activity Details'} />
                <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Ready On Date :</Typography>
            } fieldComponent={
                <DatePicker
                    inputProps={{ readOnly: true }}
                    dateFormat={viewDateFormat}
                    timeFormat={false}
                    value={readyOnDate}
                    onChange={setReadyOnDate}
                />
            } />
            <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Expiry Date :</Typography>
            } fieldComponent={
                <DatePicker
                    inputProps={{ readOnly: true }}
                    dateFormat={viewDateFormat}
                    timeFormat={false}
                    value={expiryDate}
                    onChange={setExpiryDate}
                />
            } />
                <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Type :</Typography>
            } fieldComponent={
                <ActivityType activityType={circularType} setActivityType={setCircularType} />
            } /> 
             <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Priority :</Typography>
            } fieldComponent={
                <PriorityDropDown priorityValue={priority} setPriorityValue={setPriority} />
            } />
             <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Assign To :</Typography>
            } fieldComponent={
                <TeachersDropDown assignTo={assignTo} setAssignedTo={setAssignedTo}/>
            } />
                </CardBody>
        </Container>
    )
}

export default AddActivities;