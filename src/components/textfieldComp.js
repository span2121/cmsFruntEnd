import React from 'react';
import { TextField } from '@material-ui/core';

const TextFieldComp = ({value, label, handleChange={handleChange}, size, style}) => {
        return(
            <TextField  style={style} value={value} onChange={(e) => handleChange(e, label) } size={size} label={label}   />
        );
}

export default TextFieldComp;