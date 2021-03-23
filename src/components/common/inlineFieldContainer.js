import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Col, Row } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    labelColumnStyle: {
        alignSelf: 'center'
    },
}));

const InLineFieldContainer = ({ labelComponent, fieldComponent, rowClass = 'mb-2', labelClass = '', fieldClass = '', labelColSpan = 4 }) => {
    const classes = useStyles()
    return (
        <Row className={rowClass}>
            <Col className={`${classes.labelColumnStyle} ${labelClass}`} sm={labelColSpan}>
                {labelComponent}
            </Col>
            <Col className={`${fieldClass}`}>
                {fieldComponent}
            </Col>
        </Row>
    )
}

export default InLineFieldContainer