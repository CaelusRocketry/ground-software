const buttonPressed = (state = false, action) => {
    switch(action.type) {
        case 'BUTTON_PRESSED':
            return !state;
        default:
            return state;
    }
}

export default buttonPressed;