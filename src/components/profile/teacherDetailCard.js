import { Card, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import theme from '../helper/theme';
import moment from 'moment'
const useStyles = makeStyles(themes => ({
    detailsAlign : {
        color: theme.colors.viewText, 
        marginLeft:"2em", 
        fontSize:"1.3em",
    },
    labelStyle : {
      color: theme.colors.viewhed1, 
      marginLeft:"2em", 
      fontSize:"1.3em",
    },
    rowStyle : {
        display:"flex", margin:"0.5em",
        width:"80%",
        justifyContent:"space-between",
        whiteSpace:"pre-wrap"
    }
}))

const TeacherDetailsCard = ({teacherDetails}) => {
    const classes = useStyles();
    return(
        <Container className="mt-2">
        <Card  style={{ padding: "1em", color: theme.colors.viewText, margin: "3em", minWidth:"30%", maxWidth:"90%" }}>
            <CardBody>
                <h3 style={{
                                padding: "0", textAlign: "center", margin: "0", color: 'white',
                                borderBottom: "2px solid #979797",
                                background: theme.colors.viewText,
                                borderRadius: theme.size.btnRadiusWhenHover
                            }}>
                    Details
                </h3>
                <div>
                    
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}> Name :</Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.first_name}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Branch :</Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.branch}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}> Code : </Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.teacher_code}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Assigned Subject </Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.sub_assigned}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>Gender : </Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.gender}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Email :</Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.email}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>DOB : </Typography>
                      <Typography className={classes.detailsAlign}> {  moment(teacherDetails?.DOB).format("DD-MM-YYYY")}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Phone no. :</Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.phone}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>Father Name : </Typography>
                      <Typography className={classes.detailsAlign}> { teacherDetails?.father_name }</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Qualification :</Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.qualification}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>Mother Name : </Typography>
                      <Typography className={classes.detailsAlign}> { teacherDetails?.motner_name }</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Address :</Typography>
                      <Typography className={classes.detailsAlign}> {teacherDetails?.permanent_address}</Typography>
                    </Col>
                </Row>
                </div>
            </CardBody>
        </Card>
</Container> 
    )
}
export default TeacherDetailsCard;