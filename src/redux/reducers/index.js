import { combineReducers } from "redux"
import authReducer from "./auth"
import chatRoomReducer from "./chatroom"
import appointmentReducer from "./home"
import memberReducer from "./member"
import providerReducer from './provider'

const rootReducer = combineReducers({
    auth: authReducer,
    chatroom: chatRoomReducer,
    appointments: appointmentReducer,
    member: memberReducer,
    provider: providerReducer
})

export default rootReducer