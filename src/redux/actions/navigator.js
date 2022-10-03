import { NavigationActions } from 'react-navigation';

let navigator;
let sideState;
let providerServiceType = "";
export function setNavigator(nav, state, availability_service) {
  navigator = nav;
  sideState = state;
  providerServiceType = availability_service;
}

export function getNavigator(){
  return navigator;
}

export function getProviderServiceType() {
  return providerServiceType;
}

export function navigate(e, params = {}) {
    if (navigator) {
        const navigateAction = NavigationActions.navigate({
            routeName: e,
            params: params,
        });
        navigator.dispatch(navigateAction);
    }
}

export function getState(){
    if(sideState){
        return sideState;
    }
}

export function goBack() {
  if (navigator) {
    navigator.goBack();
  }
}