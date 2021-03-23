import React from 'react'
import DropDownWithLoadingMsg from './dropDownwithLoadingMsg'
import { makeStyles } from '@material-ui/core';

export const activityTypes = {
    SPORTS: 'Sports',
    ANNUAL_DAY: 'Annual Day',
    EXAMS: 'Exams',


}

const activityTypeOptions = Object.values(activityTypes)

const useStyles = makeStyles(theme => ({
    selectStyle: {
        '-moz-appearance': 'none',
        '-webkit-appearance': 'none',
        ' appearance': 'none'
    }
}));

const ActivityType = ({ activityType, setActivityType }) => {
    const classes = useStyles()
    return (
        <DropDownWithLoadingMsg
            customClass={classes.selectStyle}
            placeHolder={'Select Activity Type'} options={activityTypeOptions}
            value={activityType || ''}
            setValue={setActivityType} isLoading={false}
            disabled={false}
            renderOptionComponent={
                (type, index) => {
                    return <option key={index} id={type}>{type}</option>
                }
            }
        />
    )
}

export default ActivityType