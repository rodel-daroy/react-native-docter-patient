import React from 'react';
import { Header } from 'native-base';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createTransition, SlideDown } from 'react-native-transition';
import { Actions } from 'react-native-router-flux';

import Logo from "../../../assets/logo.png";
import { getState, navigate, setNavigator, getProviderServiceType } from '../../../redux/actions/navigator';
import { logOut } from "../../../redux/actions/authActions"
import { getToken, setIntervalState } from "../../../redux/services/index"
import { clearDispatch } from "../../../redux/actions/memberActions"

const Transition = createTransition(SlideDown);

export class Headers extends React.Component{
  constructor(props){
    super(props);
  }

  state = {
    openMenu: false,
    openMemberMenu: false,
    openProviderMenu: false,
    openProviderScheduleMenu: false
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  openMenu = () => {
    this.setState({openMenu: true})
  }
  
  closeMenu = () => {
    this.setState({openMenu: false})
  }

  setMemerMenuState = () => {
    this.setState({openMemberMenu: !this.state.openMemberMenu, openProviderMenu: false})
  }

  setProviderScheduleMenuState = () => {
    this.setState({openProviderScheduleMenu: !this.state.openProviderScheduleMenu})
  }

  setProviderMenuState = () => {
    this.setState({openProviderMenu: !this.state.openProviderMenu, openMemberMenu: false})
  }

  gotoPage = (url) => {
    this.setState({openMenu: false})
    if(url == "AppointmentTodayScreen") {
      this.props.clearDispatch();
      Actions.reset('AppointmentTodayScreen');
    } else {
      Actions.replace(url);
    }
    // Actions.replace('url');
  }

  signOut = () => {
    setIntervalState(false)
    setNavigator(this.props.navigation, 'firstPage')
    this.props.logOut();
    if(getToken().Usertype == "member"){
      Actions.reset('LoginScreen')
    }
    else if(getToken().Usertype == "provider"){
      Actions.reset('ProviderLoginScreen')
    }
  }

  returnComponent = () => {
    if(getState() == "firstPage"){
      return (
        <View style = {styles.menuView}>
          <ScrollView>
            <TouchableOpacity onPress={()=> this.gotoPage('HomeScreen')}>
              <View style={styles.profileItemBox}>
                <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                <Text style={styles.profileItemText}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.gotoPage('WhatCanWeDoScreen')}>
              <View style={styles.profileItemBox}>
                <FontAwesome name = "comments" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                <Text style={styles.profileItemText}>What we can do</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setMemerMenuState()}>
              <View style={styles.profileItemBox}>
                {this.state.openMemberMenu ? (<FontAwesome name = "chevron-up" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>) : (<FontAwesome name = "chevron-down" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>)}
                <Text style={styles.profileItemText}>Member</Text>
              </View>
              {this.state.openMemberMenu ? (
                <View style = {styles.subMenuView}>
                  <TouchableOpacity onPress={()=> this.gotoPage('HowitWorksScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>How it works</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.gotoPage('WhatWeTreatScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>What We Treat</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.gotoPage('SecondOptionScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>2nd Option</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.gotoPage('PatientBenefitsScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>Patient Benefits</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                ) : (null)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setProviderMenuState()}>
              <View style={styles.profileItemBox}>
                {this.state.openProviderMenu ? (<FontAwesome name = "chevron-up" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>) : (<FontAwesome name = "chevron-down" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>)}
                <Text style={styles.profileItemText}>Provider</Text>
              </View>
              {this.state.openProviderMenu ? (
                <View style = {styles.subMenuView}>
                  <TouchableOpacity onPress={()=> this.gotoPage('ProviderBenefitsScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>Provider Benefits</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.gotoPage('OurProvidersScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>Our Providers</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.gotoPage('ProviderLoginScreen')}>
                    <View style={styles.profileItemSubMenuBox}>
                      <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                      <Text style={styles.profileItemText}>Become a Provider</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                ) : (null)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.gotoPage('LoginScreen')}>
              <View style={styles.profileItemBox}>
                <FontAwesome name = "sign-in" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                <Text style={styles.profileItemText}>Register/Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.gotoPage('ContactScreen')}>
              <View style={[styles.profileItemBox, {borderBottomWidth: 0}]}>
                <FontAwesome name = "phone" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                <Text style={styles.profileItemText}>Contact US</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )
    } else if (getState() == "secondPage") {
      return (
        <View style = {styles.menuView}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={()=> this.gotoPage('AppointmentTodayScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Dashboard</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('BookedAppointmentScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "list-ul" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Booked Appointments</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('PreviousAppointmentScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "list-ul" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Previous Appointments</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={()=> this.gotoPage('MyPhotoScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "camera" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Photo</Text>
                </View>
              </TouchableOpacity> */}
            </View>
            <View style = {{marginTop: 60}}>
              <TouchableOpacity onPress={()=> this.gotoPage('ProfileScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "user" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('ChangePasswordScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "key" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Change Password</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.signOut()}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "sign-out" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Sign out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    } else if(getState() == "thirdPage") {
      return (
        <View style = {styles.menuView}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={()=> this.gotoPage('AppointmentTodayScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Dashboard</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('MedicalHistoriesScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "history" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Medical History</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('MedicalReportsScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "stethoscope" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Medical Reports</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('PatientImageScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "camera" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Patient Photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('PreferredPharmacyScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "medkit" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Preferred Pharmacy</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('PaymentScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "paypal" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Billing/Payment</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style = {{marginTop: 60}}>
              <TouchableOpacity onPress={()=> this.gotoPage('ProfileScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "user" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('ChangePasswordScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "key" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Change Password</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.signOut()}>
                <View style={[styles.profileItemBox, {borderBottomWidth: 0}]}>
                  <FontAwesome name = "sign-out" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Sign out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )
    } else if (getState() == "providerPage"){
      return (
        <View style = {styles.menuView}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={()=> this.gotoPage('ProviderDashboardScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "home" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Dashboard</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setProviderScheduleMenuState()}>
                <View style={styles.profileItemBox}>
                  {this.state.openProviderScheduleMenu ? (<FontAwesome name = "chevron-up" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>) : (<FontAwesome name = "chevron-down" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>)}
                  <Text style={styles.profileItemText}>My Schedule</Text>
                </View>
                {this.state.openProviderScheduleMenu ? (
                  <View style = {styles.subMenuView}>
                    {
                      (() => {
                        if(getProviderServiceType() == '1') {
                          return(
                            <TouchableOpacity onPress={()=> this.gotoPage('ProviderGeneralHealthScreen')}>
                              <View style={styles.profileItemSubMenuBox}>
                                <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                                <Text style={styles.profileItemText}>General Health</Text>
                              </View>
                            </TouchableOpacity>      
                          )
                        } else if(getProviderServiceType() == "2") {
                          return (
                            <TouchableOpacity onPress={()=> this.gotoPage('Provider2ndOptionScreen')}>
                              <View style={styles.profileItemSubMenuBox}>
                                <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                                <Text style={styles.profileItemText}>2nd Option</Text>
                              </View>
                            </TouchableOpacity>
                          )
                        } else {
                          return (
                            <>
                              <TouchableOpacity onPress={()=> this.gotoPage('ProviderGeneralHealthScreen')}>
                                <View style={styles.profileItemSubMenuBox}>
                                  <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                                  <Text style={styles.profileItemText}>General Health</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={()=> this.gotoPage('Provider2ndOptionScreen')}>
                                <View style={styles.profileItemSubMenuBox}>
                                  <FontAwesome name = "dot-circle-o" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                                  <Text style={styles.profileItemText}>2nd Option</Text>
                                </View>
                              </TouchableOpacity>
                            </>
                          )
                        }
                      })()
                    }
                  </View>
                  ) : (null)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('ProviderBookedAppointmentScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "table" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Booked Appointments</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('ProviderPreviousAppointmentScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "table" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Previous Appointments</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('ProviderBillingTransactionScreen')}>
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
              <TouchableOpacity onPress={()=> this.gotoPage('ProviderProfileScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "user" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>My Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.gotoPage('ProviderChangePasswordScreen')}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "key" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Change Password</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.signOut()}>
                <View style={styles.profileItemBox}>
                  <FontAwesome name = "sign-out" size = {LAYOUT.window.width * 0.05} style = {styles.iconStyle}></FontAwesome>
                  <Text style={styles.profileItemText}>Sign out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )
    }
  }

  render(){
    return(
      <View style={styles.header}>
        <View style = {{display: "flex", flexDirection: "row"}}>
          <View style={styles.headerLeft}>
            <Image source={Logo} style={styles.image} style={{height: LAYOUT.window.height * 0.076, width: LAYOUT.window.width * 0.46}} />
          </View>
          {/* <TouchableOpacity style={styles.headerRight} onPress = {()=>this.props.navigation.openDrawer()}> */}
          {this.state.openMenu ? (
            <TouchableOpacity style={styles.headerRight} onPress = {() => this.closeMenu()}>
              <FontAwesome name="close" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.headerRight} onPress = {() => this.openMenu()}>
              <FontAwesome name="menu" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor} />
            </TouchableOpacity>
          )}
        </View>
        {this.state.openMenu ? (
          this.returnComponent()
        ) : (
          null
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    logOut, clearDispatch
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)


const styles = StyleSheet.create({
  header:{
    backgroundColor: COLOR.mainColor,
    width: LAYOUT.window.width * 0.96,
    marginLeft: LAYOUT.window.width * 0.02,
    // display: "flex",
    // flexDirection: "row",
    padding:10,
    position: "absolute",
    // height: 400,
    zIndex: 999999
  },
  headerBackground:{
    width:LAYOUT.window.width,
    flexDirection:'row',
    // borderBottomRightRadius:LAYOUT.window.width*0.06,
    // borderBottomLeftRadius:LAYOUT.window.width*0.06,
    alignItems:'center',
  },
  headerTitle:{
    fontSize:LAYOUT.fontSize5,
    color:COLOR.whiteColor,
    fontWeight:'600',
    alignItems:'center',
    justifyContent:'center'
  },
  headerLeft:{
    width:LAYOUT.window.width*0.8,
    // alignItems:'center',
    justifyContent: "center",
    textAlign: "left",
  },
  headerRight:{
    // flexDirection:'row', 
    width:LAYOUT.window.width*0.2, 
    justifyContent:'center',
    textAlign: "right",
    // margin:"auto"
  },
  headerList:{
    height:LAYOUT.window.height*0.07,
    paddingLeft:LAYOUT.window.width*0.04,
    borderBottomWidth:3,
    borderBottomColor:'#F2F2F2',
    alignItems:'center',
    flexDirection:'row',
  },
  menuView: {
    // position: "absolute",
    // top: LAYOUT.window.height*0.095,
    maxHeight: LAYOUT.window.height*0.8,
    width: '100%',
    marginTop: 30,
    // height: 300,
    // backgroundColor: "red",
    borderRadius: 20,
    borderColor: '#143b50',
    borderWidth: 1,
  },
  profileItemBox:{
    width:'100%', 
    // height:LAYOUT.window.height*0.048,
    // marginVertical:LAYOUT.window.height*0.01,
    alignItems:'center',
    flexDirection:'row',
    padding: LAYOUT.window.height*0.02,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#143b50'
    // justifyContent: "center"
  },
  profileItemText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.03
  },
  iconStyle: {
    color: "white",
    marginRight: 15
  },
  profileItemSubMenuBox: {
    width:'100%', 
    // height:LAYOUT.window.height*0.048,
    // marginVertical:LAYOUT.window.height*0.01,
    alignItems:'center',
    flexDirection:'row',
    padding: LAYOUT.window.height*0.02,
    paddingLeft: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#143b50'
  },
  subMenuView: {
    width: '100%', 
    // backgroundColor: "red"
  }
})
