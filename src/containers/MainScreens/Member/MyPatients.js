import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, Image, ScrollView, Alert} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';


import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/MemberFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { setSelectedProviderAppointmentData } from "../../../redux/services/index"
import { getPatientDetails } from "../../../redux/actions/memberActions"
import { ListLoad } from "../../../redux/actions/HomeActions"
import PatientImage from "../../../assets/patient.png"
import { Join, Create } from '../../../redux/actions/ChatRoomActions';
import { BACKEND_URL } from "../../../config"
import Indecate from "../Indicating"



export class AppointmentToday extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'secondPage')
    }

    state = {
        patientDetails: null
    }
    componentDidMount() {
        this.props.getPatientDetails();
    }

    componentDidUpdate(prevProps){
        if(prevProps.patientDetails !== this.props.patientDetails) {
            if (this.props.patientDetails.patientData) {
                this.setState({patientDetails: this.props.patientDetails.patientData})
            }
        }
    }

    nextPage = (index) => {
        if(index === '') {
            setSelectedProviderAppointmentData('patientData', {});
            setSelectedProviderAppointmentData('selectedPatientId', '0');
        } else {
            var pData = this.state.patientDetails[index];
            setSelectedProviderAppointmentData('patientData', pData);
            setSelectedProviderAppointmentData('selectedPatientId', pData.id);
        }
        Actions.push('SelectServiceTypeScreen')
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Who Need Appointment today?"}
                    backURL = {"MemberFirstPageScreen"}
                    backType = {"reset"}
                    button = {this.state.patientDetails&&this.state.patientDetails.length<9&&
                        <View style={{alignItems:'center'}} >
                            <TouchableOpacity onPress = {() => this.nextPage('')} style = {{backgroundColor:'#fff', width:50, height:50,borderRadius:25, justifyContent:'center', alignItems:'center'}}>
                                <FontAwesome name="plus" style={{color: COLOR.mainColor}} size={LAYOUT.window.width * 0.05} />
                            </TouchableOpacity>
                            <Text style={{color:'#fff', fontSize:13, fontFamily: 'poorRichard'}}>Add Dependents</Text>
                        </View>
                    }
                />
                <View style={MainStyles.HeaderStyle}>
                    {/* <Text style={MainStyles.HeaderText}>My Patients</Text> */}
                </View>
                <ScrollView>
                    <View style={[MainStyles.main, {marginBottom: 50}]}>
                        {/* <Text>Calculating...</Text> */}
                        {this.state.patientDetails ? this.state.patientDetails ? this.state.patientDetails.map((item, idx) => {
                            return(
                                <TouchableOpacity  onPress = {() => this.nextPage(idx)}  key = {'user' + idx}>
                                    <Animatable.View style={MainStyles.userList1} animation = "zoomInUp" delay = {150 * idx} duration = {900}>
                                        <View style = {MainStyles.userlistInStyle}>
                                            <Image source = { item.patient_image == "" || item.patient_image == null ? PatientImage : {uri: BACKEND_URL + "uploads/providerimages/" + item.patient_image}} style = {[MainStyles.userImage, {borderRadius: 100}]} />
                                            <Text style={MainStyles.userName}>{item.first_name + " " + item.last_name}</Text>
                                        </View>
                                    </Animatable.View>
                                </TouchableOpacity>
                            )
                        }) : <Text style = {[MainStyles.processingStyle, {width: "100%"}]}>There is no Patients</Text>  : <Indecate />}
                        {/* <TouchableOpacity style={MainStyles.userList1} onPress = {() => this.nextPage('')}>
                            <View style = {MainStyles.userlistInStyle}>
                                <FontAwesome name="plus" style={[MainStyles.icon, {color: "white"}]} size={LAYOUT.window.width * 0.1} />
                                <Text style={MainStyles.userName}>Add Dependents</Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        patientDetails: state.member,
        appointmentList: state.appointments
    }
}

const mapDispatchToProps = {
    getPatientDetails,
    ListLoad,
    Join,
    Create
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentToday)

