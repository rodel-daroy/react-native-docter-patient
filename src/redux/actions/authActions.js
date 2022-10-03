import { Request, setToken } from "../services";
import { navigate } from "../actions/navigator";
import { Alert } from "react-native"
import { Actions } from 'react-native-router-flux';

export const ProviderLogin = (req) => async ( dispatch ) => {
  return await Request('post',"providerLoginCheck", req)
  .then(async (res) => {
    if(res.token){
      if(await setToken(res.token, 'provider')){
        res.role='provider';
        dispatch({ type: "AUTHTOKEN", payload: res.token });
        dispatch({ type: "LOGIN", payload: res });
        Actions.replace('ProviderFirstPageScreen');
      }else{
        alert('setToken error.')
      }
    }else{
      Alert.alert("Login Failed!",
            "Incorrect email and password",
      )
    }
  })
};

export const MemberLogin = (req) => async ( dispatch ) => {
  return await Request('post',"memberLogin", req)
  .then(async (res) => {
    if(res.token){
      await setToken(res.token, 'member');
      res.role='member';
      dispatch({ type: "AUTHTOKEN", payload: res.token });
      dispatch({ type: "LOGIN", payload: res });
      if(res.active == 0)
      {
        Actions.replace('MemberVerifyPageScreen', {member: res});
      }
      else
      {
        Actions.replace('MemberFirstPageScreen');
      }
    }else{
      Alert.alert("Login Failed!",
            "Incorrect email and password",
      )
    }
  })
};

export const MemberRegister = (req) => async ( dispatch ) => {
  // return;
  return await Request('post',"checkEmailId", req)
  .then(async (res) => {
    if(res == 1){
      return await Request('post',"memberRegister", req)
      .then(async (res) => {
        if(res != 0){
          dispatch({ type: "MEMBER_REGISTER_RESULT" })
          if(res.token){
            await setToken(res.token);
            dispatch({ type: "AUTHTOKEN", payload: res.token });
            dispatch({ type: "LOGIN", payload: res });
          }else{
          }
          Alert.alert("Congratulations!",
            "Register Successfully! Please wait until Admin approve your request. Thanks.",
          );

          Actions.replace('LoginScreen');
        } else {
          Alert.alert("Oops!",
            "Something went wrong! Try again!",
          )
        }
      })
    } else {
      Alert.alert("Register Failed!",
      "Duplicate Email Address!",
      )
    }
  })
};

export const logOut = () => async ( dispatch ) => {
  setToken('', '');
  return dispatch({type:"LOGOUT"});
};


export const providerRegisterFunc = (req) => async ( dispatch ) => {
  return await Request('post', 'checkProviderEmailId', req)
  .then(async (res) => {
      if(res == 1) {
        req.currentDate = new Date().getTime() / 1000;
        return await Request('post', 'providerRegister', req)
        .then(async (res) => {
          Alert.alert("Congratulations!",
            "Register Successfully! Please wait until Admin approve your request. Thanks.",
          );
          Actions.replace('ProviderLoginScreen');
        })
      } else {
        Alert.alert("Register Failed!",
        "Duplicate Email Address!",
      )
      }
  })
}


export const forgotPassword = (req) => async() => {
  return await Request('post', 'api/forgotPassword', req).then(async (res) => {
    if(res == "1") {
      alert("We've sent new Password to your email. Please check in your email.");
    } else {
      alert("This email doesn't exist Email Address.");
    }
  })
}

export const getCityAndStateFromZipcode = (req) => async(dispatch) => {
  return await Request('post', 'api/getZipcodeStates', req).then(async (res) => {
    return dispatch({type: "GETCITYANDSTATEBYZIPCODE", payload: res});
  })
}