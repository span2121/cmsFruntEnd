import React, { useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { tableStyle } from '../util'
import "bootstrap/dist/css/bootstrap.min.css";
import theme from '../helper/theme';
import { Card, Container, Typography, TextField } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const StudentsTable = ({ allStudents }) => {
  const [filteredStudents, setFilteredStudents] = useState(allStudents)
    console.log(allStudents)
    const columns = [
        {
          dataField: "code",
          text: "Code",
          sort:true
        },
        {
          dataField: "first_name",
          text: "Name",
          sort:true
        },
        {
            dataField: "USN_number",
            text: "USN No.",
            sort:true
        },
        {
          dataField: "branch",
          text: "Branch",
          sort:true,
          width:50
        },
        {
            dataField: "email",
            text: "Email",
            sort:true,
            width:200,
            classes: 'border-9 align-middle',
            headerClasses: 'border-0',
          },
          {
            dataField: "father_name",
            text: "Father",
            sort:true
          },
          {
            dataField: "motner_name",
            text: "Mother",
            sort:true
          },
          {
            dataField: "phone",
            text: "Phone",
            sort:true
          },
          {
            dataField: "semister",
            text: "Semister",
            sort:true
          },
          {
            dataField: "total_percentage",
            text: "Aggregate",
            sort:true
          }
      ];

      const filterStudents = (studentCode) => {
        if(allStudents.length > 0)
      {
        let allActivities = [...allStudents]
        let filteredStudents = [] 
        filteredStudents = allStudents.filter(std => std.code.toLowerCase().includes(studentCode.toLowerCase()))
        if(!studentCode)
        {
          setFilteredStudents(allStudents)
        }
        else
        setFilteredStudents(filteredStudents)
    }
      }
    return(
      <Container>
        <Card>
        <TextField 
                    label="Search With Students code"  
                    onChange={(e) => filterStudents(e.target.value)}
                    InputProps={{  
                        endAdornment: (
                        <InputAdornment>
                            <IconButton>
                            <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
             <Typography  style={{
                                padding: "0", textAlign: "center", margin: "0", color: 'white',
                                borderBottom: "2px solid #979797",
                                background: theme.colors.viewText,
                                borderRadius: theme.size.btnRadiusWhenHover
                            }} variant="h5" gutterBottom>
                Student Details
            </Typography>
            <div style={{ padding: "20px", width:"100%", margin:"0px" }}>
              <BootstrapTable 
              bootstrap4
              keyField="assetnotesId"
              data={filteredStudents}
              columns={columns}
              bordered={true}
              style={{width:"100%"}}
              classes={tableStyle}
              headerClasses="bg-200 text-900 border-y border-200"
              />
           </div>
        </Card>
      </Container>
       
    )
}
export default StudentsTable;