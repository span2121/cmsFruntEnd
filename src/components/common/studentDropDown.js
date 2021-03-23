import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../contect'
import DropDownWithLoadingMsg from './dropDownwithLoadingMsg'
import { fetchUserDetails } from '../../api'

const StudentsDropDown = ({ assignTo, setAssignedTo }) => {
    const [students, setStudents] = useState('')
    const { entity, API_PATH } = useContext(AppContext) 
    useEffect(() => {
        fetchAllStudents();
    },[])

    const fetchAllStudents = () => {
            const teacherObject = {
                action:"GET_ALLSTUDENTS",
                userId:entity.userId || null,
                role:4
            }
            fetchUserDetails(teacherObject, API_PATH)
            .then(res => {
                    setStudents(res.results[1])
            })
    }
    let teacherOptions = students.length >0 &&  students?.map(std => {
        const data = {
            id: std.id,  
            value:std.code
        }
        return data
    })

    return (    students.length > 0 &&
                <DropDownWithLoadingMsg
                    placeHolder={'Select Student to Assign'} options={teacherOptions}
                    value={assignTo || ''}
                    setValue={setAssignedTo} isLoading={false}
                    disabled={false}
                    renderOptionComponent={
                        (type, index) => {
                            return <option key={index} value={type.id} >{type.value}</option>
                        }
                    }
                />
            )
}

export default StudentsDropDown