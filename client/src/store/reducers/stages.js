const nextStage = (state = 0, action) => {
    switch (action.type) {
        case "CURRENT_STAGE":
            return state+1;
        default:
            return state;
    } 
};

export default nextStage;