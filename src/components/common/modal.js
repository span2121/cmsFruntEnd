import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'fixed',
    left: '0px',
    top: '0px',
    zIndex: 2000,
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#000000D8',
    display: 'flow-root',
    justifyContent: 'center',
    textAlign: 'center'
  },
  modalContent: {
    margin: 'auto',
    border: 'solid 1px',
    backgroundColor: '#fCfCfC',
    width: '65%',
    borderRadius: '10px'
  },
  closeIcon: {
    margin: '1rem'
  }
}));

const Modal = props => {
  const classes = useStyles();
  let { close, showCloseSymbol = true } = props;
  return (
    <div className={classes.modal}>
      <Box style={props.style} className={classes.modalContent}>
        <Box textAlign="Right">
          {showCloseSymbol && <CloseIcon className={classes.closeIcon} onClick={() => close()} />}
        </Box>
        {props.children}
      </Box>
    </div>
  );
};

export default Modal;
