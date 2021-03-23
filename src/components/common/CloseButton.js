import React from 'react'
import { Button } from 'reactstrap';

const CloseButton = ({ onCancelClick, additionStyles = {} }) => {
    return (
        <Button color="danger" className={'mt-3 ml-2 d-block'} style={{ ...additionStyles, width: 'fit-content' }} onClick={onCancelClick} >Close</Button>
    )
}

export default CloseButton
