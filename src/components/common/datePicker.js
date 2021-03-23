import React from 'react'
import { makeStyles } from '@material-ui/core';
import Datetime from 'react-datetime';
import {dateFormat} from '../util'
const useStyles = makeStyles(theme => ({
    datePickerStyle: {
        '& input': {
            backgroundColor: 'white !important'
        }
    },
}));

const DatePicker = ({ inputProps = { disabled: false }, dateFormat = {dateFormat}, timeFormat = false, value, defaultValue, onChange, ...rest }) => {
    const classes = useStyles()
    return (
        <Datetime
            className={classes.datePickerStyle}
            inputProps={inputProps}
            dateFormat={dateFormat}
            timeFormat={timeFormat} value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            {...rest}
        />
    )
}

export default DatePicker