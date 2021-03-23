import React from 'react'
import { makeStyles } from '@material-ui/core';
import Datetime from 'react-datetime';
import {dateFormat} from '../../util'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles(theme => ({
    datePickerStyle: {
        '& input': {
            backgroundColor: 'white !important'
        }
    },
}));

const DatePickers = ({ inputProps = { disabled: false }, dateFormat = {dateFormat}, timeFormat = false, value, defaultValue, onChange, ...rest }) => {
    const classes = useStyles()
    return (
        <DatePicker selected={value} onChange={onChange} />
    )
}

export default DatePickers