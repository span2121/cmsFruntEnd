import React from 'react'
import DropDownWithLoadingMsg from './dropDownwithLoadingMsg'
export const priorityTypes = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
}
const priorityOptions = Object.values(priorityTypes)
const PriorityDropDown = ({ priorityValue, setPriorityValue }) => {
    
    return (
                <DropDownWithLoadingMsg
                    placeHolder={'Select Activity Type'} options={priorityOptions}
                    value={priorityValue || ''}
                    setValue={setPriorityValue} isLoading={false}
                    disabled={false}
                    renderOptionComponent={
                        (type, index) => {
                            return <option key={index} id={type}>{type}</option>
                        }
                    }
                />
            )
}

export default PriorityDropDown