import React from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity , StatusBar, Image, ScrollView, Switch, Linking, Alert } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container } from 'native-base';
import Modal from "react-native-modal"
import Textarea from "react-native-textarea"
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/ProviderFooter";
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import Patient from "../../../assets/patient.png"
import { ListLoad } from '../../../redux/actions/HomeActions';
import { logOut } from '../../../redux/actions/authActions';
import { Join, Create, closedProviderCall } from '../../../redux/actions/ChatRoomActions';
import { setProviderAvailable, cancelAppointment, sendSMS } from "../../../redux/actions/providerActions"
import Collapse from "./appointmentPatientInfo/patientInfoCollaps"
import { BACKEND_URL } from "../../../config"
import Indecate from "../Indicating"

export class ProviderDashboard extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'providerPage')
    }

    state = {
        switchIsEnabled: this.props.user.available == '1' ? true : false,
        list: null,
        isModalVisible: false,
        selectedRoomInfo: null,
        smsMessage: "",
        smsModal: false,
        selectedAppointmentId: ""
    }

    
    toggleModal = (item) => {
        if(item !== "") {
            this.setState({selectedRoomInfo: item, isModalVisible: !this.state.isModalVisible});
        } else {
            this.setState({isModalVisible: !this.state.isModalVisible});
        }
    };

    toggleModal2 = (item) => {
        if(item !== "") {
            var message = "Dear, "+item.patientFirstName + ' ' + item.patientLastName + "\nYou have an appointment with " + item.providerFirstName + ' ' + item.providerLastName + ". Doctor is available now please login to your account. \n\n  Best Regards \n  https://eClinicforyou.com";
            this.setState({smsModal: !this.state.smsModal, smsMessage: message, selectedAppointmentId: item.id});
        } else {
            var message = "";
            this.setState({smsModal: !this.state.smsModal, smsMessage: message});
        }
        // this.sendSMS(item.id)
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'providerPage', this.props.user.availability_service);
        this.props.ListLoad();
    }

    componentDidUpdate(Pprops){
        // setNavigator(this.props.navigation, 'providerPage');
        if(Pprops.list !== this.props.list){
            if(this.props.list.list){
                this.setState({list:this.props.list.list});
            }
        }
    }
    
    Action(item,param){
        this.props.Create({appt_id:item.id, roomData: item, appt: item});
    }
    changeSwitchValue = () => {
        this.props.setProviderAvailable({available: !this.state.switchIsEnabled})
        this.setState({switchIsEnabled: !this.state.switchIsEnabled})
    }

    cancelAppointment = (appointment_id, cancelId) =>  {
        var cancelName = "";
        if(cancelId == "1") {
            cancelName = "complete";
        } else if(cancelId == "2") {
            cancelName = "cancel";
        } else {
            cancelName = "no show";
        }
        Alert.alert(
            "Are you sure?",
            "Do you really " + cancelName + " this appointment?",
            [
                {
                    text: "Yes", 
                    onPress: () => this.cancelAppointmentOK(appointment_id, cancelId)
                },
                {
                    text: "No",
                }
            ] 
        )
        // this.props.cancelAppointment({id: appointment_id, reason: cancelId})
    }

    cancelAppointmentOK = (appointment_id, cancelId) => {
        var array = [];
        for(var i = 0; i < this.state.list.length; i ++) {
            if(this.state.list[i].id !== appointment_id) {
                array.push(this.state.list[i]);
            }
        }
        this.setState({list: array})
        this.props.cancelAppointment({id: appointment_id, reason: cancelId})
    }

    ePrescriptions = () => {
        Linking.openURL("https://ayva.bravadohealth.com/#!/login").catch(err => console.error("Couldn't load page", err));
    }

    sendSMS = () => {
        this.setState({smsModal: !this.state.smsModal})
        this.props.sendSMS({id: this.state.selectedAppointmentId});
    }

    render(){
        const list = this.state.list;
        const { role } = this.props.user ? this.props.user : "";
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Provider Appointments"}
                    backURL = {"ProviderFirstPageScreen"}
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}>
                    {/* <Text style={MainStyles.HeaderText}>Provider Dashboard</Text> */}
                </View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        <View style = {MainStyles.switchViewStyle}>
                            <Text>{this.state.switchIsEnabled ? "Online" : "Offline"}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.switchIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.changeSwitchValue()}
                                value={this.state.switchIsEnabled}
                            />
                            <TouchableOpacity style = {{marginBottom: 0, padding: 10, backgroundColor: COLOR.mainColor, borderRadius:5}} onPress = {() => this.ePrescriptions()} >
                                <Text style = {{color: "white"}}>e-Prescriptions</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            list ? list.length > 0 ? list.map((item, key)=>{
                                var param = 'Create';
                                return(
                                    <Animatable.View style = {MainStyles.callViewStyle1} key={key}   delay = {key * 150}  duration = {900} animation = "zoomInUp">
                                        <View style = {{flexDirection: "row"}}>
                                            <View style = {{width: LAYOUT.window.width * 0.07}}>
                                                {item.call_type == "Video Call" ? (
                                                    <FontAwesome name = "video-camera" size = {LAYOUT.window.width * 0.05} style = {{color: COLOR.mainColor, marginBottom: 20}} />
                                                ) : (
                                                    <FontAwesome name = "volume-up" size = {LAYOUT.window.width * 0.05} style = {{color: COLOR.mainColor, marginBottom: 20}} />
                                                )}
                                                <FontAwesome name = "clock-o" color = {"#6bf33f"} size = {LAYOUT.window.width * 0.05} style = {{marginBottom: 20}} />
                                                <Text>{item.service_id == 1 ? 'GH' : 'SO'}</Text>

                                            </View>
                                            <View style = {MainStyles.userImageView}>
                                                <Image source = { item.patient_image == "" || item.patient_image == null ? Patient : {uri: BACKEND_URL + "uploads/providerimages/" + item.patient_image}} style = {MainStyles.userImage} />
                                                <Text style = {{justifyContent: "center", alignItems: "center", margin: "auto", textAlign: "center"}}>{item.patientFirstName + ' ' + item.patientLastName}</Text>
                                            </View>
                                            <View style = {[MainStyles.centerStyle, {marginTop: 0, width: LAYOUT.window.width * 0.25}]}>
                                                <Text style = {[MainStyles.userApointmentStyleText, {fontWeight: "700"}]}>{item.appointment_id}</Text>
                                                <Text style = {MainStyles.userApointmentStyleText}>{item.created_at}</Text>
                                                <Text style = {[MainStyles.userApointmentStyleText, {fontWeight: "700", color: COLOR.mainColor}]}>Croup</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity style = {[MainStyles.patientAppointmentInfoButton, {backgroundColor: "#5965f3"}]}  onPress={()=>this.Action(item,param)} >
                                                    <Text style = {{color: 'white', fontSize: LAYOUT.fontSize0 * 0.8}}>Start Call</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style = {[MainStyles.patientAppointmentInfoButton, {backgroundColor: "#28a745"}]} onPress = {() => this.cancelAppointment(item.id, '1')} >
                                                    <Text style = {{color: 'white', fontSize: LAYOUT.fontSize0 * 0.8}}>Complete Appt</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style = {[MainStyles.patientAppointmentInfoButton, {backgroundColor: "#ffc107"}]} onPress = {() => this.cancelAppointment(item.id, '3')} >
                                                    <Text style = {{color: 'white', fontSize: LAYOUT.fontSize0 * 0.8}}>No Show</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style = {[MainStyles.patientAppointmentInfoButton, {backgroundColor: "#dc3545"}]} onPress = {() => this.cancelAppointment(item.id, '2')} >
                                                    <Text style = {{color: 'white', fontSize: LAYOUT.fontSize0 * 0.8}}>Cancel Appt</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style = {{flexDirection: "row"}}>
                                            <TouchableOpacity style = {[MainStyles.infoButton, {marginRight: 30, backgroundColor: "#7d5ae8"}]} onPress = {() => this.toggleModal2(item)} >
                                                <Text style = {{fontSize: LAYOUT.fontSize0, color: 'white'}}>Send SMS</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style = {MainStyles.infoButton} onPress = {() => this.toggleModal(item)} >
                                                <Text style = {{fontSize: LAYOUT.fontSize0, color: 'white'}}>Patient Current Visit Info</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                )
                            }) : <Text style = {[MainStyles.processingStyle, {width: "100%"}]}>There is no Booked Appointments</Text> : <View  style = {[MainStyles.loadingStyleView, {width: "100%"}]}>
                            <Indecate />
                        </View>}
                    </View>
                    <Modal
                        transparent={true}
                        isVisible={this.state.isModalVisible}
                        animationIn = {"slideInRight"}
                        animationOut = {"slideOutRight"}
                        animationInTiming = {300}
                        animationOutTiming = {300}
                        style = {MainStyles.chatRoomModalStyle}
                        onRequestClose={() => {this.toggleModal("")}}
                    >
                         {/* <TouchableOpacity 
                            activeOpacity={1} 
                            onPressOut={() => {this.toggleModal("")}}
                        > */}
                            <View style = {MainStyles.chatroomModalViewStyle}>
                                <ScrollView style = {{width: "100%"}}>
                                    <TouchableOpacity onPress = {() => this.toggleModal("")} style = {{padding: 30, width: "100%"}} ><Text style = {{width: "100%", textAlign: "left", fontSize: LAYOUT.fontSize7 }}>×</Text></TouchableOpacity>
                                    <View style={{flex: 1, width: "100%"}}>
                                        <Collapse
                                            selectedRoomInfo = {this.state.selectedRoomInfo}
                                            viewPosition = {"dashboard"}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        {/* </TouchableOpacity> */}
                    </Modal>
                    <Modal
                        transparent={true}
                        isVisible={this.state.smsModal}
                        animationIn = {"slideInUp"}
                        animationInTiming = {500}
                        animationOutTiming = {500}
                        style = {MainStyles.SMSModalStyle}
                    >
                        <View style = {[MainStyles.smsStyle, {flex: 1}]}>
                            <View style={{width: "100%", padding: LAYOUT.window.width * 0.05}}>
                                <Textarea 
                                    containerStyle={MainStyles.textareaContainer}
                                    style={MainStyles.textareaStyle}
                                    onChangeText={(text) => this.setState({smsMessage: text})}
                                    maxLength={300}
                                    value = {this.state.smsMessage}
                                    placeholder={'SMS Message'}
                                    placeholderTextColor={'#c7c7c7'}
                                    underlineColorAndroid={'transparent'}
                                />
                                <View style = {{flexDirection: "row", width: "100%", justifyContent: "center"}}>
                                    <TouchableOpacity style = {[MainStyles.infoButton, {padding: 10, width: '40%', marginRight: "10%"}]} onPress = {() => this.sendSMS()} >
                                        <Text style = {{fontSize: LAYOUT.fontSize0, color: 'white', textAlign: "center"}}>Send</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {[MainStyles.infoButton, {padding: 10, width: '40%', borderColor: COLOR.mainColor, borderWidth: 1, backgroundColor: "white"}]} onPress = {() => this.setState({smsModal: !this.state.smsModal })} >
                                        <Text style = {{fontSize: LAYOUT.fontSize0, color: COLOR.mainColor, textAlign: "center"}}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        list:state.appointments,
        user:state.auth.user,
    }
}

const mapDispatchToProps = {
    ListLoad, logOut, Join, Create, closedProviderCall, setProviderAvailable, cancelAppointment, sendSMS
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProviderDashboard)
  
