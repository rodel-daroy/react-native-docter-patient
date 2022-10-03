var initdata = {
    patientData : null,
    type: null,
    reasonForVisitList: null,
    symptomData: null,
    medicalCondition: null,
    chooseDoctorInfo: null,
    appointmentList: null,
    slots: null,
    currentMemberData: null,
    pharmacyData: null,
    getPreferredPharmacy: null,
    patientImage: null,
    providerBillingTransiction: null,
    allProviderInfomation: null,
    checked: 0,
    sent: 0,
    couponForAppt: null
}
const memberReducer = (state = initdata, action) => {
    switch (action.type) {
        case "GET_PATIENT_DETAILS_FROM_MEMBER": {
            return { ...state, patientData: action.data }
        }
        case "GET_MEDICAL_TYPE": {
            return { ...state, type: action.data}
        }
        case "GET_REASON_FOR_VISIT_LIST": {
            return { ...state, reasonForVisitList: action.data}
        }
        case "GET_SYMPTOM_DATA": {
            return { ...state, symptomData: action.data}
        }
        case "GET_MEDICAL_CONDITION": {
            return { ...state, medicalCondition: action.data}
        }
        case "GET_CHOOSE_DOCTOR_INFO": {
            return { ...state, chooseDoctorInfo: action.data}
        }
        case "GET_ALL_SLOTS": {
            return { ...state, slots: action.data}
        }
        case "GET_APPOINTMENTS": {
            return { ...state, appointmentList: action.data}
        }
        case "GET_CURRENT_MEMBER_DATA": {
            return { ...state, currentMemberData: action.data}
        }
        case "GET_MY_LOCATION_PHARMACY_DATA": {
            return { ...state, pharmacyData: action.data}
        }
        case "GET_PREFERRED_PHARMACY": {
            return { ...state, getPreferredPharmacy: action.data}
        }
        case "GET_PATIENT_IMAGE_DATA": {
            return { ...state, patientImage: action.data}
        }
        case "GET_MEMBER_BILLING_TRANSACTION": {
            return { ...state, providerBillingTransiction: action.data }
        }
        case "GET_ALL_PROVIDER_INFOMATION": {
            return { ...state, allProviderInfomation: action.data }
        }
        case "SEND_OTP": {
            return { ...state, sent: action.data }
        }
        case "CHECKED_OTP": {
            return { ...state, checked: action.data }
        }
        case "GET_CONPON_INFO": {
            return { ...state, couponForAppt: action.data}
        }
        case "CLEAR_COUPON_INFO": {
            return { ...state, couponForAppt: null}
        }
        default: {
            return state
        }
    }
}
export default memberReducer
