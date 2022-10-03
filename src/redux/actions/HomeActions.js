import { Request, setToken } from "../services";
import { Alert } from "react-native"
import { getState } from "./navigator";

export const ListLoad = (req) => async ( dispatch, getState ) => {
  var user = getState().auth.user;
  var role = (user.role == "member" ? "patient" : "provider");
  return await Request('post',"api/"+role+"_appointments/" + user.id, req)
  .then(async (res) => {
    if(res){
      dispatch({ type: "LIST_LOAD", payload: res });
    }else{
      Alert.alert("Something Went wrong!",
      "Try again!",
      )
    }
  })
};

export const getAppointmentsNumber = (req) => async (dispatch, getState) => {
  var user = getState().auth.user;
  return await Request('post', 'api/getAppointmentsNumber/' + user.id + '/' + user.role, req)
  .then(async (res) => {
    if(res)
    {
      dispatch({type: "APPOINTS_NUMBER", payload: res});
    }
    else{

    }
  })
}

