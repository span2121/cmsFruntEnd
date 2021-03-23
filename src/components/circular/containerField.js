import React from 'react'
import InLineFieldContainer from '../common/inlineFieldContainer'
import { Typography, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    labelStyle: {
        margin: 'auto',
    },
    textFieldStyle: {
        width: '100%',
        '& textarea': {
            padding: '5px !important',
            color: 'black'
        }
    },
}));

const ContentField = ({ readOnly, content, setContent, placeholder, label }) => {
    const classes = useStyles()
    return (
        <InLineFieldContainer labelComponent={
            <Typography className={classes.labelStyle} >{label}</Typography>
        } fieldComponent={
            <TextField disabled={readOnly} multiline rows={4} placeholder={placeholder} className={classes.textFieldStyle} value={content} onChange={(event) => setContent(event.target.value)} variant="outlined" />
        } />
    )
}

export default ContentField