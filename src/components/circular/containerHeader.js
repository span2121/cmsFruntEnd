import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Row } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    headerStyle: {
        margin: 'auto',
        padding: '1rem'
    },
}));
const ContainerHeader = ({ children, customClassName }) => {
    const classes = useStyles()
    return (
        <Row>
            <h5 className={`${classes.headerStyle} ${customClassName}`} >{children}</h5>
        </Row>
    )
}

export default ContainerHeader
