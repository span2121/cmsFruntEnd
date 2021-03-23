import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { RemoveCircleOutlineRounded } from '@material-ui/icons';
import DropDownWithLoadingMsg from './dropdownWithLoading'

const useStyles = makeStyles(theme => ({
  headerStyle: {
      margin: 'auto',
      padding: '1rem'
  },
  labelStyle: {
      margin: 'auto',
  },
   labelColumnStyle: {
      alignSelf: 'center'
  },
  textFieldStyle: {
      width: '100%',
      '& input': {
          padding: '5px !important',
      }
  },
}));
const DropDownField = ({ handleChange , label, value, options , id }) => {
  const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const useStyles = makeStyles((theme) => ({
        button: {
          display: 'block',
          marginTop: theme.spacing(2),
        },
        formControl: {
          margin: theme.spacing(1),
          minWidth: 250,
          marginLeft:"54px"
        },
        dropDropdownContainer: {
          width: '100%',
          maxWidth: '300px',
          "& :nth-child(1)": {
              width: '100px'
          },
          "& :nth-child(2)": {
              marginLeft: '10px'
          }
      }
      }));

      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
      const classes = useStyles();
      if(!id) 
          return null;
      return (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id={id}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              multiple = {false}
              value={value || ""}
              onChange={(e) => handleChange(e, label)}
            >
                {options?.length> 0 && options?.map((name) => {
                    return  <MenuItem value={name} name={id} >{name}</MenuItem>
                })}
            </Select>
                    {/* <DropDownWithLoadingMsg
        placeHolder={label}
          options={options}
          customClass={classes.dropDropdownContainer}
          value={value || ''}
          setValue={handleChange} isLoading={loading}
          label={label}
          renderOptionComponent={
            (data, index) => {
                return <option key={index} value={data} id={data}>{data}</option>
            }
        }
        /> */}
          </FormControl>
      );
}

export default DropDownField;
