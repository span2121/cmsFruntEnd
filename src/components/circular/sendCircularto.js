import React from 'react'
import DropDownWithLoadingMsg from '../common/dropDownwithLoadingMsg'
export const circulartoTypes = {
    ALL: 'All',
    STUDENTS: 'Students',
    TEACHERS: 'Teachers'
}
const circulartoOptions = Object.values(circulartoTypes)
const CirculartoDropDown = ({ selectedUser, setSelectedUser }) => {
    
    return (
                <DropDownWithLoadingMsg
                    placeHolder={'Select Type'} options={circulartoOptions}
                    value={selectedUser || ''}
                    setValue={setSelectedUser} isLoading={false}
                    disabled={false}
                    renderOptionComponent={
                        (type, index) => {
                            return <option key={index} id={type}>{type}</option>
                        }
                    }
                />
            )
}

export default CirculartoDropDown