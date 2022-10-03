import axios from "axios";
import { Alert } from "react-native";
import {
  BACKEND_URL
} from "../../config";

let authTokens = '';
let Usertype = '';
let selectedProviderAppointmentData = {};
let intervalState = false;

export async function setToken (token, role) {
  authTokens = await token;
  Usertype = await role;
  return await authTokens
}

export const getToken = () => {
  return {
    authTokens: authTokens,
    Usertype: Usertype
  }
}

export const setSelectedProviderAppointmentData = (key, data) => {
  selectedProviderAppointmentData[key] = data;
}

export const getSelectedProviderAppointmentData = () => {
  return selectedProviderAppointmentData;
}

// for setInterval
export const setIntervalState = (state) => {
  intervalState = state
}

export const getIntervalState = () => {
  return intervalState;
}


export const Request = async (type, url, params) => {
  return new Promise((resolve, reject) => {
    _Request(type, url, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error)=>{
        Alert.alert('Network Error!', error)
        // reject(error);
      }); 
  });
};

export const _Request = async (type, url, params) => {
  const _axios = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type" : "application/json",
      "Authtoken" : authTokens,
      "TOKENCHECK": "1",
      "Usertype": Usertype
    },
  });

  return _axios[type](url, params);
}

export const validateEmail = async(email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const tokenCheck = () => {
  if(authTokens == '') {
    return false ;
  } else {
    return true ;
  }
}