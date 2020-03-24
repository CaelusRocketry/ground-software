import React from 'react';
import { useDispatch } from 'react-redux';
import { buttonStatus } from './../store/actions/index.js';

function Button() {
    const dispatch = useDispatch();
    //const isPressed = useSelector(state => state.buttonPressed);
    return (
        <button onClick={() => dispatch(buttonStatus(true))}>Press Me</button>
    );
};

export default Button;