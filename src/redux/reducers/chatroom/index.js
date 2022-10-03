var initdata = {
    room_info : null,
    created_room_info: null,
    all_appointment_info: null
}
const chatRoomReducer = (state = initdata, action) => {
    switch (action.type) {
        case "CREATE_ROOM": {
            return { ...state, room_info: action.payload }
        }
        case "GET_CURRENT_CREATED_ROOM_INFO": {
            return { ...state, created_room_info: action.data}
        }
        case "GET_ALL_CHATROOM_INFORMATION": {
            return { ...state, all_appointment_info: action.data}
        }
        default: {
            return state
        }
    }
}
export default chatRoomReducer
