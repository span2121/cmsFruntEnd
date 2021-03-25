import { Card, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import theme from '../helper/theme';
import moment from 'moment'
import AppContext from '../contect';
const StudentDetailsCard = ({personalDetails}) => {
  const { allTeachers } = useContext(AppContext)
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
    const classes = useStyles();
return <Container className="mt-2">
        <Card  style={{ padding: "1em", color: theme.colors.viewhed1, margin: "3em", minWidth:"30%", maxWidth:"90%" }}>
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
                      <Typography className={classes.detailsAlign}> {personalDetails?.first_name}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Branch :</Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.branch}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}> Code : </Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.code}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> SRN Number :</Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.USN_number}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>Gender : </Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.gender}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Email :</Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.email}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>DOB : </Typography>
                      <Typography className={classes.detailsAlign}> {  moment(personalDetails?.DOB).format("DD-MM-YYYY")}</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Phone no. :</Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.phone}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>Father Name : </Typography>
                      <Typography className={classes.detailsAlign}> { personalDetails?.father_name }</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Semister :</Typography>
                      <Typography className={classes.detailsAlign}> {personalDetails?.semister}</Typography>
                    </Col>
                </Row>
                <Row className={classes.rowStyle}>
                    <Col className={classes.rowStyle}>
                      <Typography className={classes.labelStyle}>Mother Name : </Typography>
                      <Typography className={classes.detailsAlign}> { personalDetails?.motner_name }</Typography>
                    </Col>
                    <Col className={classes.rowStyle}>
                    <Typography className={classes.labelStyle}> Instructor :</Typography>
                      <Typography className={classes.detailsAlign}> { allTeachers.find(t => t.teachers_id === personalDetails?.student_instructor)?.teacher_code }</Typography>
                    </Col>
                </Row>
                </div>
            </CardBody>
        </Card>
</Container> 
}
export default StudentDetailsCard;