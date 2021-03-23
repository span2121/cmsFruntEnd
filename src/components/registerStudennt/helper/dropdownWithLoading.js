import React from 'react';
import { Input } from 'reactstrap';

const DropDownWithLoadingMsg = ({ placeHolder, options, value, setValue, isLoading, customClass, renderOptionComponent, label, disabled}) => {
    return (
        <Input color="primary"  disabled={disabled}  name={"assist"} type="select" className={customClass} value={value} onChange={(e) => {
            setValue(e, label)
        }}>
            {isLoading === false ?
                <React.Fragment>
                    <option  value="" >{placeHolder}</option>
                    {
                        options && options.length > 0 && options.map((optionData, index) => renderOptionComponent(optionData, index))
                    }
                </React.Fragment>
                :
                <option  value="" disabled>Loading...</option>
            }
        </Input >
    )
}
export default DropDownWithLoadingMsg