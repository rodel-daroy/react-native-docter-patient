var initdata = {
    user : null ,
    authToken : null, 
}
const authReducer = (state = initdata, action) => {
    switch (action.type) {
        case "LOGIN": {
            return { ...state, user: action.payload }
        }
        case "AUTHTOKEN": {
            return { ...state, authToken: action.payload }
        }
        case "LOGOUT": {
            return { ...state, authToken: null }
        }
        case "GETCITYANDSTATEBYZIPCODE": {
            return { ...state, cityAndState: action.payload}
        }
        default: {
            return state
        }
    }
}
export default authReducer
