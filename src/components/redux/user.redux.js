/**redux的actions */
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'


/**初始状态 */
const initState = {
    loginInfo:""
}

/** reducer */
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...action.loginInfo }
        case LOAD_DATA:
            return { ...action.loginInfo }
        default:
            return state
    }
}//reducer

