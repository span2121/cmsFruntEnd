import React from 'react';
import InLineFieldContainer from '../common/inlineFieldContainer'
import { Typography, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    labelStyle: {
        margin: 'auto',
    },
    textFieldStyle: {
        width: '100%',
        '& input': {
            padding: '5px 14px !important',
        }
    },
}));

const SubjectField = ({ readOnly = false, title, setTitle, label, isMandatory, placeHolder }) => {
    const classes = useStyles()
    return (
        <InLineFieldContainer labelComponent={
            <Typography className={classes.labelStyle} >{label} <span style={{color:"red"}}>{ isMandatory ? "*" : "" }</span> </Typography>
        } fieldComponent={
            <TextField placeholder={placeHolder} className={classes.textFieldStyle} value={title} onChange={(event) => setTitle(event.target.value)} variant="outlined" />
        } />
    )
}

export default SubjectField