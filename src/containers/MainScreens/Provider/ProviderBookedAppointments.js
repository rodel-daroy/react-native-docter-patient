import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DataTable } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal"
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader"
import Footer from "../Footer/ProviderFooter"
import Indecate from "../Indicating"
import { LAYOUT, COLOR } from '../../../constants';
import { getProviderAppointments, setFeatureApptToCurrentAppt } from "../../../redux/actions/providerActions"
import { getChatRoomAllData } from "../../../redux/actions/ChatRoomActions"
import Collapse from "./appointmentPatientInfo/patientInfoCollaps"

const itemsPerPage = 10;

export class ProviderBookedAppointments extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        numberOfPages: 0,
        page: 0,
        fromPage: 1,
        toPage: itemsPerPage,
        pageArray: null,
        viewModal: false,
        selectedItem: {},
        BookedAppointmentArray: []
    }

    componentDidMount(){
        this.props.getProviderAppointments({status: "booked"});
    }
    componentDidUpdate(prevProps) {
        if(prevProps.appointmentList !== this.props.appointmentList) {
            if(this.props.appointmentList.providerAppointments) {
                var BookedAppointmentArray = this.props.appointmentList.providerAppointments;
                if (BookedAppointmentArray.length > itemsPerPage){
                    var pageArr = [];
                    for(var i = 0; i < itemsPerPage; i ++){
                        pageArr.push(BookedAppointmentArray[i]);
                    }
                    this.setState({BookedAppointmentArray: BookedAppointmentArray, fromPage: BookedAppointmentArray.length > 0 ? 1 : 0, toPage: itemsPerPage, pageArray: pageArr});
                } else {
                    this.setState({BookedAppointmentArray: BookedAppointmentArray, fromPage: BookedAppointmentArray.length > 0 ? 1 : 0, toPage: BookedAppointmentArray.length, pageArray: BookedAppointmentArray});
                }
                // this.setSt
            } 
        }

        
        if(prevProps.room_info !== this.props.room_info) {
            if(this.props.room_info.all_appointment_info) {
                var data = this.props.room_info.all_appointment_info;
                // return;
                // symptom Making
                var symptomArr = [];
                var appointmentSymptomArr = this.state.selectedItem.medical_sympotoms != null && this.state.selectedItem.medical_sympotoms ? this.state.selectedItem.medical_sympotoms.split(',') : "";
                // var appointmentSymptomArr = [13,31];
                for(var i = 0; i < data.symptomList.length; i ++) {
                    for(var j = 0; j < appointmentSymptomArr.length; j ++) {
                        if(data.symptomList[i].id == appointmentSymptomArr[j]) {
                            symptomArr.push(data.symptomList[i].symptom_name)
                        }
                    }
                }
                var symptomString = symptomArr.join();

                // visit type making
                var visitTypeString = data.visitTypeList.filter(obj => obj.id == this.state.selectedItem.visit_type)[0] ? data.visitTypeList.filter(obj => obj.id == this.state.selectedItem.visit_type)[0].visit_name : "";
                // var visitTypeString = data.visitTypeList.filter(obj => obj.id == '6')[0].visit_name;
                
                // medical Conditions
                var medicalConditionArray = [];
                var appointmentMedicalConditionArr = this.state.selectedItem.medical_questions ? this.state.selectedItem.medical_questions.split(',') : "";
                // var appointmentMedicalConditionArr = [4,6,7,8,9,10,12,13,14,16,18,19,20,21,22];
                for(var i = 0; i < data.medicalConditionList.length; i ++) {
                    for(var j = 0; j < appointmentMedicalConditionArr.length; j ++) {
                        if(data.medicalConditionList[i].id == appointmentMedicalConditionArr[j]) {
                            medicalConditionArray.push(data.medicalConditionList[i].condition_name)
                        }
                    }
                }
                var medicalCondtionString = medicalConditionArray.join();

                var item = this.state.selectedItem;
                item.symptomString = symptomString;
                item.visitTypeString = visitTypeString;
                item.medicalCondtionString = medicalCondtionString;
                item.patientEmail = data.patientData[0] ? data.patientData[0].email : "";
                item.patientPhone = data.patientData[0] ? data.patientData[0].phone : "";
                this.setState({selectedItem: item})
            }
        }
    }

    setPage = (page) => {
        if(page * itemsPerPage >= this.state.BookedAppointmentArray.length){
            alert('This is last page.')
            return;
        }
        if((page + 1) * itemsPerPage > this.state.BookedAppointmentArray.length){
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * page + this.state.BookedAppointmentArray.length % (itemsPerPage * page);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                pageArr.push(this.state.BookedAppointmentArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageArray: pageArr});
        } else {
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * (page + 1);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                pageArr.push(this.state.BookedAppointmentArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageArray: pageArr});
        }
        // this.setState({page: page})
    }

    goDashboard = (id) => {
        this.props.setFeatureApptToCurrentAppt({appt_id: id});
    }

    toggleModal = (item) => {
        if(item !== "") {
            this.setState({ viewModal: !this.state.viewModal, selectedItem: item })
            this.props.getChatRoomAllData({patient_id: item.patient_id })
        } else {
            this.setState({ viewModal: !this.state.viewModal})
        }
    }

    get_correct_time_with_time_zone = (input) => {
        var d = new Date(); // get current date
        d.setHours(d.getHours() + 2, 0,0,0);

        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');
        var dt = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
        dt.setHours( dt.getHours() + parseInt(this.props.user.tz), dt.getMinutes(), dt.getSeconds(), 0 );

        var year = dt.getFullYear();
        var month = (dt.getMonth() + 1) < 10 ? ('0' + (dt.getMonth() + 1)) : (dt.getMonth() + 1);
        var day = ((dt.getDate() < 10) ? ('0' + dt.getDate()) : dt.getDate());
        var hour = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        var minute = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        var second = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
        var returnTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return returnTime;
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header
                    headerText = {"Booked Appointments"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={{marginTop: 20}}></View>
                <ScrollView>

                    <ScrollView horizontal = {true} showsVerticalScrollIndicator = {true} alwaysBounceVertical = {true} style = {{height: LAYOUT.height}}>
                        <DataTable style = {{width: LAYOUT.window.width * 3.2, height: "auto", marginTop: 50}}>
                            <DataTable.Header>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Appointment Date</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Patient</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Service Type</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Call Type</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Status</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Appointment Created</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>View</DataTable.Title>
                            </DataTable.Header>
                            {this.state.pageArray ? this.state.pageArray.length > 0 ? this.state.pageArray.map((item, id) => {
                                return (
                                    <DataTable.Row key = {id + 'bookedAppointments'} onPress = {() => this.toggleModal(item)}>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{this.get_correct_time_with_time_zone(item.appointment_date)}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.memberFirstName + '  ' + item.memberLastName}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.service_name_shortcut}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>
                                            {item.call_type == "Video Call" ? (
                                                <Icon name = "video-camera" size = {15}></Icon>
                                            ) : (
                                                <Icon name = "volume-up" size = {15}></Icon>
                                            ) }
                                        </DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{
                                            (() => {
                                                if(item.status == "0") {
                                                    return "Booked";
                                                } else if( item.status == "1") {
                                                    return "Completed";
                                                } else if( item.status == "2") {
                                                    return "Cancelled";
                                                } else if( item.status == "3") {
                                                    return "NoShow";
                                                } else {
                                                    return "-";
                                                }
                                            })()
                                        }</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.created_at}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>
                                            <TouchableOpacity style = {{padding: 5}} onPress = {() => this.toggleModal(item)} >
                                                <Icon name = "eye" size = {15} color = {"black"}></Icon>
                                                </TouchableOpacity>
                                            <Text> | </Text>
                                            <TouchableOpacity style = {{padding: 5}} onPress = {() => this.toggleModal(item)} >
                                                <Icon name = "edit" size = {15} color = {"black"}></Icon>
                                            </TouchableOpacity>
                                            <Text> | </Text>
                                            <TouchableOpacity style = {{padding: 5}} onPress = {() => this.goDashboard(item.id)} >
                                                <Icon name = "arrow-right" size = {15} color = {"black"}></Icon>
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }) : <Text style = { MainStyles.processingStyle }>There is no Booked Appointments</Text> 
                            : <View  style = { MainStyles.loadingStyleView }>
                            <Indecate />
                        </View>}
                        </DataTable>
                        
                    </ScrollView>
                    <DataTable.Pagination
                        page={this.state.page}
                        numberOfPages={this.state.numberOfPages}
                        onPageChange={page => this.setPage(page)}
                        label={`${this.state.fromPage}-${this.state.toPage} of ${this.state.BookedAppointmentArray.length}`}
                    />
                </ScrollView>
                <Footer />
                <Modal
                        transparent={true}
                        isVisible={this.state.viewModal}
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
                                        selectedRoomInfo = {this.state.selectedItem}
                                        viewPostition = {"table"}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    {/* </TouchableOpacity> */}
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        room_info: state.chatroom,
        appointmentList: state.provider
    }
}

const mapDispatchToProps = {
    getProviderAppointments, getChatRoomAllData, setFeatureApptToCurrentAppt
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderBookedAppointments)


const styles = StyleSheet.create({
    listStyle: {
        flexDirection: "row",
        marginBottom: 10
    },
    titleStyle: {
        color: "black", 
        fontWeight: "700"
    },
    descriptionStyle: {
        color: "black"
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
        // padding: 5
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        padding: 10,
        fontSize: 16,
      },
      textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
      },
});
