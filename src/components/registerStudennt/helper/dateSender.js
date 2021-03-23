import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DateSender = ( { setSelectedDate, selectedDate}) => {

    return(
        
        <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date picker dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={setSelectedDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    )
}
export default DateSender;