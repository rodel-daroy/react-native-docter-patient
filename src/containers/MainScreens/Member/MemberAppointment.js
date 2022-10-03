import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, Image, ScrollView, Alert} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader"
import Footer from "../Footer/MemberFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getIntervalState, setIntervalState } from "../../../redux/services/index"
import { ListLoad } from "../../../redux/actions/HomeActions"
import DoctorImg2 from "../../../assets/doctor2.png"
import PatientImage from "../../../assets/patient.png"
import { Join, Create } from '../../../redux/actions/ChatRoomActions';
import { BACKEND_URL } from "../../../config"
import Indecate from "../Indicating"



export class MemberAppointmentScreen extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'secondPage')
    }

    state = {
        appointmentList: null,
        iCount: 0,
        iCountSetInterval: null,
        getDataInterval: null,
        loopVal: true
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        this.setState({loopVal: true})
        setNavigator(this.props.navigation, 'secondPage');
        var me = this;
        this.props.ListLoad();
        setIntervalState(true);
        if(getIntervalState()) {
            var getDataInterval = setInterval(function(){ me.props.ListLoad();  }, 20000);
            this.setState({getDataInterval: getDataInterval})
        } else {
            clearInterval(this.state.getDataInterval);
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.appointmentList !== this.props.appointmentList) {
            if(this.props.appointmentList.list) {
                clearInterval(this.state.iCountSetInterval);
                if(getIntervalState()) {
                    var me = this;
                    var iCountSetInterval = setInterval(function(){
                        var i = me.state.iCount;
                        i ++;
                        me.setState({iCount: i})
                    }, 1000)
                    this.setState({appointmentList: this.props.appointmentList.list, iCountSetInterval:iCountSetInterval, iCount: 0})
                }
                else {
                    this.setState({appointmentList: this.props.appointmentList.list})
                    clearInterval(this.state.iCountSetInterval);
                }
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.iCountSetInterval);
        clearInterval(this.state.getDataInterval);
        this.setState({loopVal: false})
        setIntervalState(false);
    }

    joinRoom = (item) => {
        if(item.opentok_sessionid == "" || item.opentok_sessionid == null || item.opentok_sessionid == undefined) {
            alert('No created room!');
            return;
        }
        clearInterval(this.state.iCountSetInterval);
        clearInterval(this.state.getDataInterval);
        setIntervalState(false);
        this.props.Join({provider_id: item.provider_id, patient_id: item.patient_id, roomData: item});
    }

    memberCancelAppointment = () => {
        Alert.alert("Look out!",
            "If you must cancel / Reschedule an appointment, please call at (903) 8846601 / Email at admin@eclinicforyou.com us at least 24 hours in advance. 24 hour notice is defined as one businessday. Failure to cancel without 24 hour notice will result in a $15 fee. You are responsible for this fee; it will not be billed to insurance.",
        )
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header
                    headerText = {"Your Appointments"}
                    backURL = {"MemberFirstPageScreen"}
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}>
                    {/* <Text style={MainStyles.HeaderText}>Who need Appointment Today?</Text> */}
                </View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        {this.state.appointmentList ? this.state.appointmentList.length > 0 ? this.state.appointmentList.map((item, idx) => {
                            return (
                                <Animatable.View style = {MainStyles.callViewStyle1} key = {idx + 'appointment'}    delay = {idx * 150}  duration = {900} animation = "zoomInUp" >
                                    <View style = {{flexDirection: "row" }}>
                                        <View style={{width:LAYOUT.window.width*0.2}}>
                                            <Text style = {[{textAlign:'left', marginTop:5, fontWeight: "700"}]}>{item.appointment_id}</Text>
                                            <Text style = {{textAlign:'left', marginTop:5}}>{item.appointment_date}</Text>
                                            <Text style = {{textAlign:'left', marginTop:5}}>{item.service_name_shortcut}</Text>
                                            <Text style = {[{textAlign:'left', marginTop:5, fontWeight: "700", color: COLOR.mainColor}]}>{item.visit_name}</Text>
                                        </View>
                                        <View style = {MainStyles.userImageView}>
                                            <Image source = { item.provider_image == "" || item.provider_image == null ? DoctorImg2 : {uri: BACKEND_URL + "uploads/providerimages/" + item.provider_image}} style = {MainStyles.userImage} />
                                            <Text style = {{justifyContent: "center", alignItems: "center", margin: "auto", textAlign: "center"}}><FontAwesome name = "circle" style = {MainStyles.onlineState} color = { item.provider_available == '0' ? 'red' : "green"} /> {item.providerFirstName + " " + item.providerLastName}</Text>
                                        </View>
                                        <View style = {MainStyles.userImageView}>
                                            <Image source = { item.patient_image == "" || item.patient_image == null ? PatientImage : {uri: BACKEND_URL + "uploads/providerimages/" + item.patient_image}} style = {MainStyles.userImage} />
                                            <Text style = {{justifyContent: "center", alignItems: "center", margin: "auto", textAlign: "center"}}>{item.patientFirstName + ' ' + item.patientLastName}</Text>
                                        </View>
                                        <View style = {[MainStyles.centerStyle, {marginTop: 0, width: LAYOUT.window.width * 0.2}]}>
                                            <View style = {{ width: LAYOUT.window.width * 0.08, flexDirection:'row', justifyContent:'space-between' }}>
                                                {item.call_type == "Video Call" ? (
                                                    <FontAwesome name = "video-camera" size = {LAYOUT.window.width * 0.05} style = {{color: item.opentok_sessionid != "" && item.opentok_sessionid != null ? (this.state.iCount % 2 == 0 ? COLOR.mainColor : 'red') : COLOR.mainColor, marginBottom: 20}} />
                                                ) : (
                                                    <FontAwesome name = "volume-up" size = {LAYOUT.window.width * 0.05} style = {{color: item.opentok_sessionid != "" && item.opentok_sessionid != null ? (this.state.iCount % 2 == 0 ? COLOR.mainColor : 'red') : COLOR.mainColor, marginBottom: 20}} />
                                                )}
                                                <FontAwesome name = "clock-o" color = {"#6bf33f"} size = {LAYOUT.window.width * 0.05} style = {{ marginLeft:5, marginBottom: 20}} />
                                            </View>
                                            {/* <Text style = {MainStyles.userApointmentStyleText}>03:59 AM</Text> */}
                                            <View>
                                                <TouchableOpacity style = {[MainStyles.joinButton, {backgroundColor:'#78D45D'}]} onPress = {() => this.joinRoom(item)}>
                                                    <Text style = {{color: 'white', fontSize: LAYOUT.fontSize0 * 0.9}}>Join Room</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style = {[MainStyles.joinCancelButton,{backgroundColor:'#EE1212'}]} onPress = {() => this.memberCancelAppointment()} >
                                                    <Text style = {{color: 'white', fontSize: LAYOUT.fontSize0 * 0.9}}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Animatable.View>
                            )
                        }) : <Text style = {[MainStyles.processingStyle, {width: "100%"}]}>There is no Booked Appointments</Text> 
                        : <Indecate />}
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        appointmentList: state.appointments
    }
}

const mapDispatchToProps = {
    ListLoad,
    Join,
    Create
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberAppointmentScreen)

