import { Request, setToken } from "../services";
import { navigate } from "../actions/navigator";
import { Alert } from "react-native"

export const Join = (req) => async ( dispatch ) => {
  dispatch({type: "GET_CURRENT_CREATED_ROOM_INFO", data: req.roomData})
  return await Request('post',"visit_room/" + req.provider_id + "/" + req.patient_id, req)
  .then(async (res) => {
    if(res.apiKey){
      navigate('ChatRoom', res)
    }else{
      Alert.alert("Call Denied!",
      "Can't find created Room!",
      )
    }
  })
};

export const Create = (req) => async ( dispatch ) => {
  dispatch({type: "GET_CURRENT_CREATED_ROOM_INFO", data: req.roomData})
  return await Request('post',"create_room/" + req.appt_id)
  .then(async (res) => {
    if(res.apiKey){
      res.appt = req.appt;
      navigate('ChatRoom', res)
    }else{
      Alert.alert("Something Went wrong!",
      "Try again!",
      )
    }
  })
};


export const closedProviderCall = (req) => async (dispatch) => {
  return await Request('post',"api/closedprovidercall", {provider_id: req.provider_id, patient_id: req.patient_id, apptid: req.appt_id})
  .then( async (res) => {
  })
}

export const getChatRoomAllData = (req) => async(dispatch) => {
  return await Request('post',"api/getChatRoomAllData", req)
  .then( async (res) => {
    dispatch({type: "GET_ALL_CHATROOM_INFORMATION", data: res})
  })
}

export const noteSubmit = (req) => async(dispatch) => {
  return await Request('post',"api/noteSubmit", req)
  .then( async (res) => {
    if(res == 1)
    {
      alert("Successfully saved");
    }
    else
    {
      alert("Faild save. Please try again");
    }
    // dispatch({type: "GET_ALL_CHATROOM_INFORMATION", data: res})
  })
}