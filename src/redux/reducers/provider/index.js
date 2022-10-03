import { act } from "react-test-renderer"

var initdata = {
    providerSlots: null,
    license_states: null,
    providerAppointments: null,
    providerBillingTransiction: null,
    note: null
}
const providerReducer = (state = initdata, action) => {
    switch (action.type) {
        case "GET_PROVIDER_ALL_SLOTS": {
            return { ...state, providerSlots: action.data }
        }
        case "GET_KNOWNLANGUAGE_DATA": {
            return { ...state, knownLanguage: action.data }
        }
        case "GET_LICENSE_STATES_DATA": {
            return { ...state, license_states: action.data }
        }
        case "GET_PROVIDER_APPOINTENTS": {
            return { ...state, providerAppointments: action.data }
        }
        case "GET_PROVIDER_BILLING_TRANSACTION": {
            return { ...state, providerBillingTransiction: action.data }
        }
        case "GET_PATIENT_NOTE": {
            return {...state, note: action.data}
        }
        default: {
            return state
        }
    }
}
export default providerReducer
