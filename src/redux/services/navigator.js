import { NavigationActions } from 'react-navigation';

let navigator;
export function setNavigator(nav) {
  navigator = nav;
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

export function goBack() {
  if (navigator) {
    navigator.goBack();
  }
}