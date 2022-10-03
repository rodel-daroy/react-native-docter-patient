import { Request, tokenCheck } from "../services";
import { getState, navigate, setNavigator, getNavigator } from "../actions/navigator";
import { Alert } from "react-native"
import { Actions } from 'react-native-router-flux';

export const getProviderAllSlots = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/getProviderAllSlots", {provider_id: getState().auth.user.id, date: req.currentDate, serviceType: req.serviceType, datePo: req.datePo, providerTimeZone: req.providerTimeZone})
    .then(async (res) => {
        dispatch({type: "GET_PROVIDER_ALL_SLOTS", data: res})
    })
};

export const setProviderScheduleSlots = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/setProviderScheduleSlots", {provider_id: getState().auth.user.id, date: req.currentDate, serviceType: req.serviceType, datePo: req.datePo, saveData: req.saveData, providerTimeZone: req.providerTimeZone})
    .then(async (res) => {
        dispatch({type: "GET_PROVIDER_ALL_SLOTS", data: res})
    })
};

export const setProviderSlotCheckAll = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/setProviderSlotCheckAll", {provider_id: getState().auth.user.id, date: req.currentDate, serviceType: req.serviceType, datePo: req.datePo, saveData: req.saveData, status: req.status, providerTimeZone: req.providerTimeZone})
    .then(async (res) => {
        dispatch({type: "GET_PROVIDER_ALL_SLOTS", data: res})
    })
};


export const getKnownLanguageData = (req) => async (dispatch) => {
    return await Request('post',"api/getKnownLanguageData", req)
    .then(async (res) => {
        dispatch({type: "GET_KNOWNLANGUAGE_DATA", data: res})
    })
}

export const getLicenseStates = (req) => async (dispatch) => {
    return await Request('post',"api/getLicenseStates", req)
    .then(async (res) => {
        dispatch({type: "GET_LICENSE_STATES_DATA", data: res})
    })
}

// get provider appointments
export const getProviderAppointments = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    var user = getState().auth.user;
    return await Request('post',"api/getProviderAppointments/" + user.id, req)
    .then(async (res) => {
        dispatch({type: "GET_PROVIDER_APPOINTENTS", data: res})
    })  
};


// provider Image Upload
export const providerImageUpload = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/providerImageUpload", req)
    .then(async (res) => {
        if(res) {
            Alert.alert("Image Upload Successfully!",
                "",
            )
        } else {
            Alert.alert("Something went wrong!",
                "Try again!",
            )
            return;
        }
        // dispatch({type: "GET_APPOINTMENTS", data: res})
    })  
};

// set provider available status
export const setProviderAvailable = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    req.provider_id = getState().auth.user.id;
    return await Request('post',"api/setProviderAvailable", req)
    .then(async (res) => {
        // dispatch({type: "GET_APPOINTMENTS", data: res})
    })  
};

// appointment cancel
export const cancelAppointment = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    req.provider_id = getState().auth.user.id;
    return await Request('post',"api/cancelAppointment", req)
    .then(async (res) => {
        // dispatch({ type: "LIST_LOAD", payload: res });
    })  
};

// appointment cancel
export const providerProfileUpdate = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    req.provider_id = getState().auth.user.id;
    return await Request('post',"api/providerProfileUpdate", req)
    .then(async (res) => {
        Alert.alert("Success!",
            "Your Profile has been updated successfully!",
        )
    })  
};

// Provider Change Password
export const changeProviderPassword = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    req.provider_id = getState().auth.user.id;
    // return;
    return await Request('post',"api/changeProviderPassword", req)
    .then(async (res) => {
        // if(res == "true") {
            Alert.alert("Notification",
                res,
            )
        // }
    })  
};

// Provider Change Password
export const sendSMS = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/sendProvidersms/" + req.id, req)
    .then(async (res) => {
        if(res === false) {
            Alert.alert('Notifications', 'Send SMS Failed! Try again!');
        } else {
            Alert.alert('Success!', 'You sent SMS Successfully!');
        }
    })  
};

// getBillingData
export const getBillingData = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/getBillingData/" + getState().auth.user.id + "/provider", req)
    .then(async (res) => {
        dispatch({type: "GET_PROVIDER_BILLING_TRANSACTION", data: res});
    })  
};


// getPatientNote
export const getPatientNote = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/getPatientNote", req)
    .then(async (res) => {
        dispatch({type: "GET_PATIENT_NOTE", data: res});
    })  
};

export const setFeatureApptToCurrentAppt = (req) => async (dispatch) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('ProviderLoginScreen');
        return;
    }
    return await Request('post',"api/setFeatureApptToCurrentAppt", req)
    .then(async (res) => {
        if(res == 1)
        {
            Actions.replace('ProviderDashboardScreen');
        }
    })  
}
