const defalutState = {
    value : ''
}
export default (state = defalutState,action) =>{
    if(action.type === 'store_login_info'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.value = action.value;
        return newState
    }
    return state;
}