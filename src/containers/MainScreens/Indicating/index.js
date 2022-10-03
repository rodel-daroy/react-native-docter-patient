import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Colors} from './color';

const height_max = 30;
const delta = 0.1;

export default class Indicating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alpha1: 0.5,
      alpha2: 1,
      alpha3: 1.5,
      alpha4: 2,
      alpha5: 2.5,
      height1: 0,
      height2: 0,
      height3: 0,
      height4: 0,
      height5: 0,
    };
  }

  startLoading() {
    this.timer = setInterval(async () => {
      this.setState({
        alpha1: this.state.alpha1 + delta,
        alpha2: this.state.alpha2 + delta,
        alpha3: this.state.alpha3 + delta,
        alpha4: this.state.alpha4 + delta,
        alpha5: this.state.alpha5 + delta,
        height1: height_max + Math.sin(this.state.alpha1) * height_max,
        height2: height_max + Math.sin(this.state.alpha2) * height_max,
        height3: height_max + Math.sin(this.state.alpha3) * height_max,
        height4: height_max + Math.sin(this.state.alpha4) * height_max,
        height5: height_max + Math.sin(this.state.alpha5) * height_max,
      });
    }, 20);
  }

  componentDidMount() {
    this.startLoading();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('indicator is end');
  }

  render() {
    return (
      <>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            flex: 1,
            backgroundColor: Colors.color_white,
          }}>
          <View
            style={{
              width: 100,
              height: 60,
              marginBottom: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 10,
                height: this.state.height1,
                backgroundColor: Colors.color_header,
              }}
            />
            <View
              style={{
                width: 10,

                height: this.state.height2,
                backgroundColor: Colors.color_header,
              }}
            />
            <View
              style={{
                width: 10,
                height: this.state.height3,
                backgroundColor: Colors.color_header,
              }}
            />
            <View
              style={{
                width: 10,
                height: this.state.height4,
                backgroundColor: Colors.color_header,
              }}
            />
            <View
              style={{
                width: 10,
                height: this.state.height5,
                backgroundColor: Colors.color_header,
              }}
            />
          </View>
          <Text style={{fontSize: 20, color: Colors.color_header}}>
            Loading...
          </Text>
        </View>
      </>
    );
  }
}
