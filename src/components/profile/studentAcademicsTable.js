import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Card, Container, Typography } from '@material-ui/core';
import { tableStyle }  from '../util'
import theme from '../helper/theme';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableHeader : {
        fontWeight:'bold',
        textAlignLast:"center"
    },
    tableCell :{
        textAlignLast:"center"
    }
    
  });

const columns = ["Student Code","Class", "Percentage"];
const StudentAcademicsTable = ({ educationalDetails, code }) => {
    const classes = useStyles();
    return(
<React.Fragment>
    <Container>
    <Card>
            <Typography  style={{
                                padding: "0", textAlign: "center", margin: "0", color: 'white',
                                borderBottom: "2px solid #979797",
                                background: theme.colors.viewText,
                                borderRadius: theme.size.btnRadiusWhenHover
                            }} variant="h5" gutterBottom>
                Academic Details
            </Typography>
     <TableContainer component={Paper}>
      <Table className={tableStyle} aria-label="simple table">
        <TableHead className="bg-200 text-900">
          <TableRow>
            <TableCell className={classes.tableHeader} > CODE</TableCell>
            <TableCell className={classes.tableHeader}   align="right">CLASS</TableCell>
            <TableCell className={classes.tableHeader}   align="right">PERCENTAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {educationalDetails.map((row, index) => (
            <TableRow style={{ border: "1px solid black" }} key={index}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                    {code}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">{row.class}</TableCell>
              <TableCell className={classes.tableCell} align="right">{row.percentage_obtained}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Card>
            </Container>
        </React.Fragment>
    );
}
 
export default StudentAcademicsTable;