import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../contect'
import DropDownWithLoadingMsg from './dropDownwithLoadingMsg'
import { fetchUserDetails } from '../../api'

const TeachersDropDown = ({ assignTo, setAssignedTo }) => {
    const [teachers, setTeachers] = useState('')
    const { entity, API_PATH } = useContext(AppContext) 
    useEffect(() => {
        fetchAllTeachers();
    },[])

    const fetchAllTeachers = () => {
            const teacherObject = {
                action:"GET_ALLTEACHERS",
                userId:entity.userId || null
            }
            fetchUserDetails(teacherObject, API_PATH)
            .then(res => {
                    setTeachers(res.results[0])
            })
    }
    let teacherOptions = teachers.length >0 &&  teachers?.map(tch => {
        const data = {
            id: tch.teachers_id,  
            value:tch.teacher_code
        }
        return data
    })

    return (    teachers.length > 0 &&
                <DropDownWithLoadingMsg
                    placeHolder={'Select a  Teacher'} options={teacherOptions}
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

export default TeachersDropDown