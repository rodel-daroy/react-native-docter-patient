import React from 'react';
import Store from './src/redux/Store';
import Router from './src/Router';
import { Provider } from 'react-redux';
import AnimatedSplash from "react-native-animated-splash-screen";
import Loading from "./src/assets/loading.gif"
// import Loading from "./src/containers/MainScreens/Indicating";

class App extends React.Component{
  state = {
    isLoaded: false
  }
  async componentDidMount() {
    let me = this;
    setTimeout(function () {
      me.setState({ isLoaded: true })
    }, 500);
  }
  render(){
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={Loading}
        // backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
        // customComponent={Loading}
      >
        <Provider store={Store}>
          <Router />
        </Provider>
      </AnimatedSplash>
    );
  }
}

export default App;
