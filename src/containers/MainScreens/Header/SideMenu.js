import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Button, Body, Right, Switch, Item } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';

import Logo from "../../../assets/logo.png"
import { COLOR, LAYOUT } from '../../../constants/index';
import { navigate, getState } from '../../../redux/actions/navigator'



class SideMenu extends Component {
  constructor(props) {
    super(props)
  }
  state = {
      
  }
  
  render () {
    if(getState() == "firstPage"){
      return (
        <View style={styles.container}>
          {/* <View
            colors={COLOR.mainColor}
            style={styles.bottom}> */}
          <TouchableOpacity style = {{width: "100%", padding: LAYOUT.window.width * 0.1, paddingBottom: 0}} onPress={()=> Actions.push('HomeScreen')}>
            <Image source={Logo}  style={styles.SideMenuLogo} resizeMode='contain'/>
          </TouchableOpacity>
          <View style={{width:'100%', padding: 0, paddingLeft: LAYOUT.window.width * 0.1}}>
            <ScrollView>
              <View>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('HomeScreen')}>
                  <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('WhatCanWeDoScreen')}>
                  <FontAwesome name = "comments" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>What we can do</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('MemberScreen')}>
                  <FontAwesome name = "user-secret" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Member</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ProviderScreen')}>
                  <FontAwesome name = "user-md" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Provider</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('LoginScreen')}>
                  <FontAwesome name = "sign-in" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Register/Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ContactScreen')}>
                  <FontAwesome name = "phone" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Contact US</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
    else if(getState() == "secondPage"){
      return (
        <View style={styles.container}>
          <TouchableOpacity style = {{width: "100%", padding: LAYOUT.window.width * 0.1, paddingBottom: 0}} onPress={()=> Actions.push('HomeScreen')}>
            <Image source={Logo}  style={styles.SideMenuLogo} resizeMode='contain'/>
          </TouchableOpacity>
          <View style={{width:'100%',  padding: 0, paddingLeft: LAYOUT.window.width * 0.1}}>
            <ScrollView>
              <View>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('AppointmentTodayScreen')}>
                  <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('BookedAppointmentScreen')}>
                  <FontAwesome name = "list-ul" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Booked Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('PreviousAppointmentScreen')}>
                  <FontAwesome name = "list-ul" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Previous Appointments</Text>
                </TouchableOpacity>
              </View>
              <View style = {{marginTop: 60}}>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ProfileScreen')}>
                  <FontAwesome name = "user" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ChangePasswordScreen')}>
                  <FontAwesome name = "key" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('LoginScreen')}>
                  <FontAwesome name = "sign-out" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
    else if(getState() == "thirdPage"){
      return (
        <View style={styles.container}>
          <TouchableOpacity style = {{width: "100%", padding: LAYOUT.window.width * 0.1, paddingBottom: 0}}  onPress={()=> Actions.push('HomeScreen')}>
            <Image source={Logo}  style={styles.SideMenuLogo} resizeMode='contain'/>
          </TouchableOpacity>
          <View style={{width:'100%', padding: 0, paddingLeft: LAYOUT.window.width * 0.1}}>
            <ScrollView>
              <View>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('AppointmentTodayScreen')}>
                  <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('MedicalHistoriesScreen')}>
                  <FontAwesome name = "history" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Medical History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('MedicalReportsScreen')}>
                  <FontAwesome name = "stethoscope" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Medical Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('MyPhotoScreen')}>
                  <FontAwesome name = "camera" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('PreferredPharmacyScreen')}>
                  <FontAwesome name = "medkit" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Preferred Pharmacy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('PaymentScreen')}>
                  <FontAwesome name = "paypal" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Billing/Payment</Text>
                </TouchableOpacity>
              </View>
              <View style = {{marginTop: 60}}>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ProfileScreen')}>
                  <FontAwesome name = "user" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ChangePasswordScreen')}>
                  <FontAwesome name = "key" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('LoginScreen')}>
                  <FontAwesome name = "sign-out" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    } else if (getState() == "providerPage"){
      return (
        <View style={styles.container}>
          <TouchableOpacity style = {{width: "100%", padding: LAYOUT.window.width * 0.1, paddingBottom: 0}}  onPress={()=> Actions.push('HomeScreen')}>
            <Image source={Logo}  style={styles.SideMenuLogo} resizeMode='contain'/>
          </TouchableOpacity>
          <View style={{width:'100%', padding: 0, paddingLeft: LAYOUT.window.width * 0.1}}>
            <ScrollView>
              <View>
                <TouchableOpacity onPress={()=> this.gotoPage('Dashboard')}>
                  <View style={styles.profileItemBox}>
                    <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                    <Text style={styles.profileItemText}>Home</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.gotoPage('LoginScreen')}>
                  <View style={styles.profileItemBox}>
                    <FontAwesome name = "table" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                    <Text style={styles.profileItemText}>Booked Appointments</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.gotoPage('LoginScreen')}>
                  <View style={styles.profileItemBox}>
                    <FontAwesome name = "table" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                    <Text style={styles.profileItemText}>Previous Appointments</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.gotoPage('LoginScreen')}>
                  <View style={styles.profileItemBox}>
                    <FontAwesome name = "credit-card-alt" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                    <Text style={styles.profileItemText}>Billing/Transactions</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.gotoPage('ProviderPhotoScreen')}>
                  <View style={[styles.profileItemBox, {borderBottomWidth: 0}]}>
                    <FontAwesome name = "picture-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                    <Text style={styles.profileItemText}>My Phoyo</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style = {{marginTop: 60}}>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ProfileScreen')}>
                  <FontAwesome name = "user" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('ChangePasswordScreen')}>
                  <FontAwesome name = "key" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemBox} onPress={()=> Actions.push('LoginScreen')}>
                  <FontAwesome name = "sign-out" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container : {
    flex:1,
    width:LAYOUT.window.width*0.7,
    backgroundColor: COLOR.mainColor
  },
  content:{
    height:LAYOUT.window.height*0.905,
    alignItems:'center'
  },
  profileBox:{
    width:LAYOUT.window.width*0.9,
    height:LAYOUT.window.height*0.135,
    marginHorizontal:LAYOUT.window.width*0.05,
    marginVertical:LAYOUT.window.height*0.04,
    paddingHorizontal:LAYOUT.window.width*0.05,
    borderRadius:LAYOUT.window.height*0.015,
    alignItems:'center',
    flexDirection:'row',
    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5, 
    shadowRadius: 10,
    elevation:3,
  },
  userNameText:{
    color:COLOR.green2Color,
    fontSize:LAYOUT.window.width*0.04,
    fontWeight:'700'
  },
  userIDText:{
    color:COLOR.grey1Color,
    fontSize:LAYOUT.window.width*0.025,
    fontWeight:'600'
  },
  profileTextBox:{
    paddingHorizontal:LAYOUT.window.width*0.03,
  },  
  modal:{
    width:'100%',
    height:'100%',
    position:'absolute'
  },
  bottom:{
    width:'100%',
    height:LAYOUT.window.height,
    position:'absolute',
    zIndex:10,
    bottom:0,
    alignItems:'center',
    paddingHorizontal:LAYOUT.window.width*0.05,
    paddingVertical:LAYOUT.window.height*0.04,
  },
  avatarImage:{
    width:LAYOUT.window.width*0.15,
    height:LAYOUT.window.width*0.15,
    resizeMode:'cover'
  },
  profileItemBox:{
    width:'100%', 
    height:LAYOUT.window.height*0.048,
    marginVertical:LAYOUT.window.height*0.01,
    alignItems:'center',
    flexDirection:'row',
    // justifyContent: "center"
  },
  profileItemText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.03
  },
  logoutButtonIcon:{
    marginHorizontal:LAYOUT.window.width*0.04,
    textAlign:'center',
    color:COLOR.whiteColor
  },
  logoutButtonText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.03,
  },
  SideMenuLogo: { 
    // marginVertical:LAYOUT.window.height*0.03, 
    width: '100%',
    
    // margin: LAYOUT.window.width * 0.05, 
    height: LAYOUT.window.width*0.3,
    borderRadius:120,
    justifyContent: "center",
    alignItems: "center",
    // textAlign: "center"
  },
  iconStyle: {
    color: "white",
    marginRight: 15
  }
})

// SideMenu.propTypes = {
//   navigation: PropTypes.object
// };


// const mapStateToProps = (state) => ({
//   user:state.auth.user
// })

// const mapDispatchToProps = {
//   logOut
// }

export default SideMenu

