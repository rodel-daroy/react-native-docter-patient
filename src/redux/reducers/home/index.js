var initdata = {
    list : null ,
    bookedAppointments: 0,
    previousAppointments: 0
}
const appointmentReducer = (state = initdata, action) => {
    switch (action.type) {
        case "LIST_LOAD": {
            return { ...state, list: action.payload }
        }
        case "APPOINTS_NUMBER": {
            return { ...state, bookedAppointments: action.payload.booked, previousAppointments: action.payload.previous}
        }
        default: {
            return state
        }
    }
}
export default appointmentReducer
