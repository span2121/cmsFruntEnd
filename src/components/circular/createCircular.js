import React, { useState, useContext, useEffect } from 'react'
import InLineFieldContainer from '../common/inlineFieldContainer'
import { Container, Col, Row } from 'reactstrap';
import { Typography, makeStyles, TextField } from '@material-ui/core';
import AppContext from '../contect'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { dateFormat } from '../util'
import CloseButton from '../common/CloseButton'
import { Button } from 'reactstrap';
import PriorityDropDown from '../common/priorityDropdown'
import CirculartoDropDown from './sendCircularto'
import DatePicker from '../common/datePicker'
import SubjectField from './subjectFiels'
import ContainerHeader from './containerHeader'
import ContentField from './containerField'
import { toast } from 'react-toastify';
import { circular } from '../../api'
import {roles } from '../util'

const circulartoContext = {
    0:"All",
    1:"Students",
    2:"Teachers"
}
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


const CreateCircular = ({ close, onCircularAdded, selectedCircular }) => {
    const classes = useStyles()
    const [title, setTitle] = useState('')
    const [attachmentURL, setAttachmentURL] = useState(null)
    const [content, setContent] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const [readyOnDate, setReadyOnDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const { API_PATH, entity } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const parameters = useParams();

    useEffect(() => {
        const currentMoment = moment();
        const aWeekAfterCurrentMoment = (moment()).add(7, 'days')
        setReadyOnDate(currentMoment)
        setExpiryDate(aWeekAfterCurrentMoment)
    }, [])

    useEffect(() => {
        if(selectedCircular?.circular_id)
        {
            setTitle(selectedCircular.circular_title)
            setContent(selectedCircular.circular_detail || '')
            setReadyOnDate(moment(selectedCircular.circular_startDate))
            setExpiryDate(moment(selectedCircular.circular_endDate))
            setSelectedUser(circulartoContext[selectedCircular.circular_to_role])
            setAttachmentURL(selectedCircular.circular_url || '' )
        }
    },[])

    const getCirculartoCode = () => {
        if(selectedUser === "All") return 0;
        if(selectedUser === "Students") return 1;
        if(selectedUser === "Teachers") return 2;
    }
    const onSubmit = async () => {

        if (!title || title.trim() === '') {
            toast.error('Title is required');
            return;
        }
        else if (!selectedUser) {
            toast.error('Select a Type to send ');
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

        const circularnObject = {
            action: selectedCircular?.circular_id? "UPDATE_CIRCULAR" : 'CREATE_CIRCULAR',
            circularDetail: content,
            circularTitle: title,
            circulartoRole:getCirculartoCode(), // 0-> All, 1-> students, 2-> teachers
            attachmentURL:attachmentURL,
            startDate:readyOnDate?.format(dateFormat) || '',
            EndDate:expiryDate?.format(dateFormat) || '',
            circularId:selectedCircular?.circular_id || ''
        }
        setLoading(true)
        await circular(circularnObject, API_PATH)
            .then((res) => {
                console.log(res)
                setLoading(false)
                onCircularAdded()
            })
            .catch(() => {
                setLoading(false)
                toast("Creating Circular was unsuccessful")
            })

    }

    return(
        <Container className={'pb-3 px-lg-5 px-xl-11'} style={{overflow:"scroll"}} >
            <div className='d-flex justify-content-end'>
                <Button  style={{cursor:"pointer"}} className={'mt-3'} disable={loading ? 1 : 0} onClick={onSubmit} color="primary" type="submit">
                    {loading ? 'Loading...' : selectedCircular?.circular_id? "Update" : 'Submit'}
                </Button>
                <CloseButton style={{cursor:"pointer"}} onCancelClick={close} />
            </div>
            <ContainerHeader customClassName={classes.headerStyle}>Add Circular</ContainerHeader>
            <SubjectField title={title} setTitle={setTitle} label="Title"  isMandatory placeHolder={'Enter the Circular title'} />
            <ContentField content={content} label="Content" setContent={setContent} placeholder={'Enter the Circular content'} />
            <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Ready On Date</Typography>
            } fieldComponent={
                <DatePicker
                    inputProps={{ readOnly: true }}
                    dateFormat={dateFormat}
                    timeFormat={false}
                    value={readyOnDate}
                    onChange={setReadyOnDate}
                />
            } />
            <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Expiry Date</Typography>
            } fieldComponent={
                <DatePicker
                    inputProps={{ readOnly: true }}
                    dateFormat={dateFormat}
                    timeFormat={false}
                    value={expiryDate}
                    onChange={setExpiryDate}
                />
            } />
            <SubjectField title={attachmentURL} setTitle={setAttachmentURL} label="Attachment URL" placeHolder={"Enter the Attachment URL"} />
              <InLineFieldContainer labelComponent={
                <Typography className={classes.labelStyle} >Send to <span style={{ color: 'red' }}>*</span></Typography>
            } fieldComponent={
                <CirculartoDropDown selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            } />
           
        </Container>
    )
}
export default CreateCircular