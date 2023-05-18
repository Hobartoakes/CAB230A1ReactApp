import React from 'react'
import { useDispatch } from 'react-redux';
import { enable } from '../redux/Store';
import CloseButton from 'react-bootstrap/CloseButton';



function Popup(props) {
  const dispatch = useDispatch();
  return (props.trigger) ? (
    <div className='popup'>
      <CloseButton className='btn-close' onClick={() => dispatch(enable())}></CloseButton>
      { props.children }
    </div>
  ) : "";
}

export default Popup