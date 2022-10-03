import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity , StatusBar  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import { Container} from 'native-base';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';
import HeadStyle from "./HeadStyle"


export class MainMenu extends React.Component{
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render(){
    return(
      <Container style={HeadStyle.container}>
        {/* <ImageBackground source={Background} style={HeadStyle.backgroundImage}> */}

        <View style={HeadStyle.header}>
          <View style={HeadStyle.headerLeft}>
            {/* <Image source={Logo} style={HeadStyle.image} style={{height: "80%", width: '60%'}} /> */}
          </View>
          <TouchableOpacity style={HeadStyle.headerLeft} onPress = {() => Actions.pop()}>
            <FontAwesome name="arrow-left" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor} />
          </TouchableOpacity>
        </View>
        <ScrollView>
            <View style = {HeadStyle.MainView}>
                <TouchableOpacity style = {HeadStyle.ListItems}>
                    <Text style = {HeadStyle.ListItemText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {HeadStyle.ListItems}>
                    <Text style = {HeadStyle.ListItemText}>What we can do</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {HeadStyle.ListItems}>
                    <Text style = {HeadStyle.ListItemText}>Member</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {HeadStyle.ListItems}>
                    <Text style = {HeadStyle.ListItemText}>Provider</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {HeadStyle.ListItems}>
                    <Text style = {HeadStyle.ListItemText}>Register/Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {HeadStyle.ListItems}>
                    <Text style = {HeadStyle.ListItemText}>Contact US</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </Container>
    )
  }
}

export default MainMenu
