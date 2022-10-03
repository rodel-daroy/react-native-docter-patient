
import GetLocation from 'react-native-get-location'
import { Request, tokenCheck, getToken, getSelectedProviderAppointmentData, setSelectedProviderAppointmentData } from "../services";
import { getState, navigate, setNavigator, getNavigator } from "../actions/navigator";
import { STRIPE_API_KEY } from "../../config"
import { Alert } from "react-native"
import Axios from "axios";
import { Actions } from 'react-native-router-flux';

export const getPatientDetails = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/getPatientDetails", req)
    .then(async (res) => {
        dispatch({type: "GET_PATIENT_DETAILS_FROM_MEMBER", data: res})
    })
};

export const getServiceType = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/getServiceType", req)
    .then(async (res) => {
        dispatch({type: "GET_MEDICAL_TYPE", data: res})
    })
};

export const submitPatientData = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/submitPatientData", {parentMemberId: getState().auth.user.id, id: req.id, data: req.data})
    .then(async (res) => {
        setSelectedProviderAppointmentData('selectedPatientId', res);
    })
};


export const getReasonForVisitList = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/getReasonForVisitList", {serviceType: getSelectedProviderAppointmentData().serviceType})
    .then(async (res) => {
        dispatch({type: "GET_REASON_FOR_VISIT_LIST", data: res})
    })
};

export const getSymptomList = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/getSymptomList", req)
    .then(async (res) => {
        dispatch({type: "GET_SYMPTOM_DATA", data: res})
    })  
};
 
export const getMedicalCondition = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/getMedicalCondition", req)
    .then(async (res) => {
        dispatch({type: "GET_MEDICAL_CONDITION", data: res})
    })  
};



// medical Image
export const medicalRecordImage = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/medicalRecordImage", req)
    .then(async (res) => {
        setSelectedProviderAppointmentData('upload_medical_records', res);
    })  
};

export const getChooseDoctorInfo = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/getChooseDoctorInfo", {serviceType: getSelectedProviderAppointmentData().serviceType, memberId: getState().auth.user.id})
    .then(async (res) => {
        dispatch({type: "GET_CHOOSE_DOCTOR_INFO", data: res})
    })  
};

export const getAllProviders = (req) => async ( dispatch ) => {
    return await Request('post',"api/getChooseDoctorInfo", req)
    .then(async (res) => {
        dispatch({type: "GET_ALL_PROVIDER_INFOMATION", data: res})
    })  
};


export const getAllSlots = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    dispatch({type: "CLEAR_COUPON_INFO"});
    return await Request('post',"api/getAllSlots", {currentDate: req.currentDate, provider_id: getSelectedProviderAppointmentData().selectedProviderId, tz: getState().auth.user.tz})
    .then(async (res) => {
        dispatch({type: "GET_ALL_SLOTS", data: res})
    })  
};

export const checkCoupon = (req) => async ( dispatch, getState ) => {
    var user = getState().auth.user;
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }

    let req2 = {couponCode: req.couponCode, appointmentData: getSelectedProviderAppointmentData(), memberId: user.id};
    
    return await Request('post',"api/checkCoupon", req2)
    .then(async (res) => {
        setSelectedProviderAppointmentData('discountamount', res.discountamount);
        setSelectedProviderAppointmentData('return_status', res.return_status);
        setSelectedProviderAppointmentData('service_amount', res.service_amount);

        dispatch({type: "GET_CONPON_INFO", data: res});
    })  
};



export const saveAppointment = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    setSelectedProviderAppointmentData('memberId', getState().auth.user.id)
    var requestData = getSelectedProviderAppointmentData();
    var isFreeAppt = requestData.freeAppt;
    if(isFreeAppt !== true)
    {
        var cardDetails = {
            'card[number]': getSelectedProviderAppointmentData().cardNumber,
            'card[exp_month]': getSelectedProviderAppointmentData().expirationMonth,
            'card[exp_year]': getSelectedProviderAppointmentData().expirationYear,
            'card[cvc]': getSelectedProviderAppointmentData().cvc
        };
        var formBody = [];
        for (var property in cardDetails) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(cardDetails[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        await fetch('https://api.stripe.com/v1/tokens', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${STRIPE_API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
        })
        .then(response => response.json())
        .then(async function(responseJson) {
            requestData.stripeToken = responseJson.id;
            if(!responseJson.id) {
                Alert.alert("Incorrect card information!",
                    "Enter Correct card information",
                )
                return;
            }
            
            return await Request('post',"api/saveAppointment", {appointmentData: requestData})
            .then(async (res) => {
                if(res.status == "paymentFailed") {
                    Alert.alert("Payment Failed!",
                        "Enter Correct card information",
                    )
                    Actions.push('PaymentFailedScreen');
                } else if(res.status == "paymentSuccess") {
                    Alert.alert("Success!",
                        "Thanks for your visit. Please wait until your appointment time.",
                    )
                    setSelectedProviderAppointmentData('cardInfo', res.cardInfo);
                    Actions.push('PaymentSuccessScreen');
                } else if (res.status == 'wrong') {
                    Alert.alert("Oops!",
                        res.text,
                    )
                    return;
                } else {
                    
                }
                // dispatch({type: "GET_ALL_SLOTS", data: res})
            })  
        })
    }
    else
    {
        return await Request('post',"api/saveAppointment", {appointmentData: requestData})
        .then(async (res) => {
            if(res.status == "paymentFailed") {
                Alert.alert("Payment Failed!",
                    "Enter Correct card information",
                )
                Actions.push('PaymentFailedScreen');
            } else if(res.status == "paymentSuccess") {
                Alert.alert("Success!",
                    "Thanks for your visit. Please wait until your appointment time.",
                )
                setSelectedProviderAppointmentData('cardInfo', (res.cardInfo.length === 0 ? false : res.cardInfo));
                Actions.push('MemberFirstPageScreen');
            } else if (res.status == 'wrong') {
                Alert.alert("Oops!",
                    res.text,
                )
                return;
            } else {
                
            }
            // dispatch({type: "GET_ALL_SLOTS", data: res})
        })  
    }
};


// profile Update 
export const memberProfileUpdate = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    var user = getState().auth.user;
    return await Request('post',"api/memberProfileUpdate", {id: user.id, data: req.profileData})
    .then(async (res) => {
        if(res) {
            Alert.alert('Notifications', 'Update success!');
        } else {
            Alert.alert('Notifications', 'Update Failed! Try again!')
        }
    })  
};

export const getMemberData = (req) => async (dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    var user = getState().auth.user;
    return await Request('post',"api/getMemberData", {id: user.id})
    .then(async (res) => {
        dispatch({type: "GET_CURRENT_MEMBER_DATA", data: res})
    })
}

// member change password
export const memberChangePassword = (req) => async (dispatch, getState) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    var user = getState().auth.user;
    return await Request('post',"api/memberChangePassword", {id: user.id, newPassword: req.newPassword, oldPassword: req.oldPassword})
    .then(async (res) => {
        alert(res);
    })
}

// getAppointments
export const getAppointments = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    var user = getState().auth.user;
    return await Request('post',"api/getAppointments/" + user.id, req)
    .then(async (res) => {
        dispatch({type: "GET_APPOINTMENTS", data: res})
    })  
};


// member Image Upload
export const memberImageUpload = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/memberImageUpload", req)
    .then(async (res) => {
        if(res == '1') {
            alert('Image Upload Successfully!');
        }
    })  
};

// Patient Image Upload
export const patientImageUpload = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/patientImageUpload", req)
    .then(async (res) => {
        if(res == '1') {
            alert('Image Upload Successfully!');
        }
        // dispatch({type: "GET_APPOINTMENTS", data: res})
    })  
};

export const setRateForProvider = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/setRateForProvider", req)
    .then(async (res) => {
        if(res == 1) {
            Alert.alert(
                'Notification',
                'Thanks For your Feedback',
                [
                  {
                    text: 'Ok',
                  },
                  {
                    text: 'Go Dashboard',
                    onPress: () => Actions.push('MemberFirstPageScreen'),
                    style: 'cancel'
                  },
                ],
            );
        } else {
            Alert.alert(
                'Something Went Wrong!',
                'Please Try again!',
            );
        }
    })  
};

// get Location Info
export const getLocationInfomation = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location.latitude + ',' + location.longitude + '&radius=2000&types=pharmacy&key=AIzaSyC43Vq6HE4utKI3j-_GXcRbtiRxGWFI28I';
        Axios.post(url).then(function(response){
            var data = {};
            data.location = location;
            data.data = response.data.results;
            dispatch({type: "GET_MY_LOCATION_PHARMACY_DATA", data: data})
        })
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
};

// getPreferred Pharmacy
export const getPreferredPharmacy = (req) => async(dispatch, getState) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    var member_id = getState().auth.user.id;
    var patient_id = getSelectedProviderAppointmentData().selectedPatientId;
    return await Request('post',"api/getPreferredPharmacy", {patient_id: patient_id, member_id: member_id})
    .then(async (res) => {
        dispatch({type: 'GET_PREFERRED_PHARMACY', data: res})
    })   
}

export const setPreferredPharmacy = (req) => async(dispatch, getState) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    req.member_id = getState().auth.user.id;
    var patient_id = getSelectedProviderAppointmentData().selectedPatientId;
    req.patient_id = patient_id;
    return await Request('post',"api/setPreferredPharmacy", req)
    .then(async (res) => {
        alert('Success!');
    })
}

// get Patient Image
export const getPatientImage = (req) => async(dispatch, getState) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    var patient_id = getSelectedProviderAppointmentData().selectedPatientId;
    return await Request('post',"api/getPatientImage", {patient_id: patient_id})
    .then(async (res) => {
        dispatch({type: "GET_PATIENT_IMAGE_DATA", data: res})
    })
}

// patient Milti Image Upload
export const patientStatusImageUpload = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/patientStatusImageUpload", req)
    .then(async (res) => {
        // console.log(res);
    })  
};
export const patientFileRemove = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/patientFileRemove", req)
    .then(async (res) => {
    })  
};

// patient Milti Image Save
export const patientRecordSaveAllImages = (req) => async ( dispatch ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');
        Actions.replace('LoginScreen');
        return;
    }
    return await Request('post',"api/patientRecordSaveAllImages", req)
    .then(async (res) => {
        if(res) {
            Alert.alert('Success!', 'Record Image Uploaded Successfully!');
        } else {
            Alert.alert('Unknown Error!', res);
        }
    })  
};


// member billing transactions
export const getBillingData = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('ProviderLoginScreen');
        return;
    }

    return await Request('post',"api/getBillingData/" + getSelectedProviderAppointmentData().selectedPatientId + "/member", req)
    .then(async (res) => {
        dispatch({type: "GET_MEMBER_BILLING_TRANSACTION", data: res});
    })  
};

export const updateNewPhone = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('LoginScreen');
        return;
    }

    return await Request('post',"api/update_new_phone", req)
    .then(async (res) => {
        dispatch({type: "UPDAET_NEW_PHONE", data: res});
    })  
};

export const checkOtp = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('LoginScreen');
        return;
    }

    return await Request('post',"api/check_otp", req)
    .then(async (res) => {
        let a = new Date();
        if(res != 1)
        {
            alert("Invalid verify code. please try again.");
        }
        
        dispatch({type: "CHECKED_OTP", data: a.getTime()});
    })  
};

export const sendOtp = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('LoginScreen');
        return;
    }

    return await Request('post',"api/send_otp", req)
    .then(async (res) => {
        let a = new Date();
        dispatch({type: "SEND_OTP", data: a.getTime()});
        return;
        if(res == 1)
        {
            dispatch({type: "SEND_OTP", data: res});
        }
        else
        {
            if(req.to == 0)
            {
                alert("Invalid email.")
            }
            else
            {
                alert("Invalid phone number");
            }
            dispatch({type: "SEND_OTP", data: res});
        }
    })  
};

export const updateOtp = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('LoginScreen');
        return;
    }

    return await Request('post',"api/update_otp", req)
    .then(async (res) => {
        let a = new Date();
        if(res == 1)
        {
            Actions.replace('MemberFirstPageScreen');
        }
        else
        {
            dispatch({type: "CHECKED_OTP", data: a.getTime()});
            alert("Invalid verify code. please try again.");
        }
    })  
};

// Member Clear dispatch
export const clearDispatch = (req) => async ( dispatch, getState ) => {
    if(tokenCheck() == false) {
        setNavigator(getNavigator(), 'firstPage');  
        Actions.replace('ProviderLoginScreen');
        return;
    }

    dispatch({ type: "LIST_LOAD", payload: null });
    dispatch({type: "GET_PATIENT_DETAILS_FROM_MEMBER", data: null})
};


