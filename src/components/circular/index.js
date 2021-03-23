import { Card, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../contect'
import CreateCirculars from './createCircular'
import { circular } from '../../api'
import { tableStyle } from '../util'
import Modal from '../common/modal';
import BootstrapTable from "react-bootstrap-table-next";
import ButtonIcon from '../common/buttonIcon'
import { Fragment } from 'react'
import moment from 'moment'
import {roles} from '../util'
import { CardBody } from 'reactstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const columns = (deleteCircular, EditCircular) => [
    {
        dataField:"circular_title",
        text:"Title",
        sort:true
    },
    {
        dataField: "circular_detail",
        text: "Details",
        sort:true
    },
    {
        dataField: "circular_startDate",
        text: "Start Date",
        formatter: (circular_startDate) => moment(circular_startDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField: "circular_endDate",
        text: "End Date",
        formatter: (endDate) => moment(endDate).format("DD-MM-YYYY"),
        sort:true
    },
    {
        dataField: "circular_url",
        text: "Attachment",
        formatter : (circular_url) => {
          return circular_url? <a href={circular_url} target="_blank" alt="No URL found">View</a> : null
        },
        sort:true
    },
    {
        dataField: "circular_id",
        text: "Delete",
        formatter : (id) => {
          return <DeleteIcon color="primary" style={{cursor:"pointer"}} onClick={() => deleteCircular(id)} />
        }   
    },
    {
        dataField: "circular_id",
        text: "Edit",
        formatter : (id, row) => {
          return <EditIcon color="primary" style={{cursor:"pointer"}} onClick={() => EditCircular(id, row)} />
        }
    }
]

const Circulars = () => {
    const [showCreateCircular, setShowCreateCircular] = useState(false)
    const { entity, API_PATH } = useContext(AppContext)
    const [circulars, setCirculars] = useState({})
    const [selectedCircular, setSelectedCircular] = useState({})

const EditCircular = (id, row) => {
    setSelectedCircular(row)
    setShowCreateCircular(true)
}

const deleteCircular = (circularId) => {
    const Obj =  {
        action : "DELETE_CIRCULAR",
        circularId
    }
    circular(Obj, API_PATH)
    .then(res => {
        const allCirculars = circulars.filter(c => c.circular_id != circularId)
        setCirculars(allCirculars)
    })
    .catch(err => {
        console.log(err);
    })
}

const getRelatedCirculars = () => {
    const circularObject = {
        action:"GET_CIRCULARS",
        circulartoRole:entity.userRole
    }
    circular(circularObject, API_PATH)
    .then(res => {
        setCirculars(res.results)
    })
    .catch(err => {
        console.log(err);
    })
}

    useEffect(() => {
        getRelatedCirculars()
    },[entity])
const handleOnCircularAdded = () => {
    getRelatedCirculars()
    setShowCreateCircular(false)
}
console.log(showCreateCircular)
    return (
       
     <React.Fragment >
         <Card style={{padding:"5px"}}>
             <CardBody style={{backgroundColor:"lightgray"}}>
              <Typography style={{margin:"0.5em 0em 0em 1em", color:"1px solid black" }} variant="h4" gutterBottom >
                     Circulars
            {entity.userRole != roles.student && <ButtonIcon icon="plus" className="mr-2 mt-1"  style={{float:"right", padding:"6px", cursor:"pointer" }} 
             transform="shrink-3 down-2" color="primary" size="sm"
                 onClick={() => {setShowCreateCircular(true);setSelectedCircular({})}}>
                 Create Circular
             </ButtonIcon>}
             </Typography>
             </CardBody>
         </Card>
        
        { circulars.length > 0 &&
            <BootstrapTable
            bootstrap4
            keyField="assetnotesId"
            data={circulars}
            columns={columns(deleteCircular, EditCircular)}
            bordered={true}
            style={{width:"100%"}}
            classes={tableStyle}
            headerClasses="bg-200 text-900 border-y border-200"
        />}
     { showCreateCircular ?  (<Modal showCloseSymbol={false}  close={() => setShowCreateCircular(false)}>
                                     <CreateCirculars selectedCircular={selectedCircular} close={() => setShowCreateCircular(false)} onCircularAdded={handleOnCircularAdded} />
                            </Modal>) : null}
       </React.Fragment>
    )
}
export default Circulars