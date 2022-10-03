import React from 'react';
import { connect } from "react-redux"
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { getChatRoomAllData } from "../../../../redux/actions/ChatRoomActions"

class EHRSection extends React.Component{
    state = {
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        patientAddress: "",
        patientDob: "",
        serviceType: "",
        symptoms: "",
        visitType: "",
        yourProblemStarted: "",
        takingAnyMedications: "",
        haveAnyMedicalConditions: "",
        haveAnyDrugAllergies: "",
        callType: "",
        height: "",
        patientAge: "",
        weight: "",
        bmi: "",
        pharmacyName: "",
        pharmacyAddress: "",
        medicalReports: ""
    }

    componentDidMount() {
        this.props.getChatRoomAllData({patient_id: this.props.selectedRoomInfo.patient_id })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.room_info !== this.props.room_info) {
            if(this.props.room_info.all_appointment_info) {
                var data = this.props.room_info.all_appointment_info;

                // symptom Making
                var symptomArr = [];
                if(this.props.selectedRoomInfo.medical_sympotoms != null) {
                    var appointmentSymptomArr = this.props.selectedRoomInfo.medical_sympotoms.split(',');
                    // var appointmentSymptomArr = [13,31];
                    for(var i = 0; i < data.symptomList.length; i ++) {
                        for(var j = 0; j < appointmentSymptomArr.length; j ++) {
                            if(data.symptomList[i].id == appointmentSymptomArr[j]) {
                                symptomArr.push(data.symptomList[i].symptom_name)
                            }
                        }
                    }
                    var symptomString = symptomArr.join();
                } else {
                    var symptomString = "";
                }

                // visit type making
                var visitTypeString = this.props.selectedRoomInfo.visit_type ? data.visitTypeList.filter(obj => obj.id == this.props.selectedRoomInfo.visit_type)[0].visit_name : "";
                // var visitTypeString = data.visitTypeList.filter(obj => obj.id == '6')[0].visit_name;
                
                // medical Conditions
                var medicalConditionArray = [];
                if(this.props.selectedRoomInfo.medical_questions) {
                    var appointmentMedicalConditionArr = this.props.selectedRoomInfo.medical_questions.split(',');
                    for(var i = 0; i < data.medicalConditionList.length; i ++) {
                        for(var j = 0; j < appointmentMedicalConditionArr.length; j ++) {
                            if(data.medicalConditionList[i].id == appointmentMedicalConditionArr[j]) {
                                medicalConditionArray.push(data.medicalConditionList[i].condition_name)
                            }
                        }
                    }
                    var medicalCondtionString = medicalConditionArray.join();
                } else {
                    var medicalCondtionString = ""
                }
                this.setState({
                    patientName: data.patientData[0] ? data.patientData[0].first_name + ' ' + data.patientData[0].last_name : "",
                    patientEmail: data.patientData[0] ? data.patientData[0].last_name : "",
                    patientPhone: data.patientData[0] ? data.patientData[0].phone : "",
                    patientAddress: data.patientData[0] ? data.patientData[0].address : "",
                    patientDob: data.patientData[0] ? data.patientData[0].dob : "",
                    serviceType: this.props.selectedRoomInfo.service_id == "1" ? "General Health" : "2nd Option",
                    symptoms: symptomString,
                    visitType: visitTypeString,
                    yourProblemStarted: this.props.selectedRoomInfo.problem_started,
                    takingAnyMedications: this.props.selectedRoomInfo.any_medications,
                    haveAnyMedicalConditions: medicalCondtionString,
                    haveAnyDrugAllergies: this.props.selectedRoomInfo.drug_allergies,
                    callType: this.props.selectedRoomInfo.call_type,
                    height: this.props.selectedRoomInfo.height1,
                    patientAge: this.props.selectedRoomInfo.age + ' years ' + this.props.selectedRoomInfo.month + ' months',
                    weight: this.props.selectedRoomInfo.weight,
                    bmi: this.props.selectedRoomInfo.bmi,
                    pharmacyName: this.props.selectedRoomInfo.pharmacy_name,
                    pharmacyAddress: this.props.selectedRoomInfo.pharmacy_address,
                    medicalReports: ""
                })
            }
        }
    }
    render() {
        return(
            <View>
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Patient Name: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.patientName}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Patient Email: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.patientEmail}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Patient Phone: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.patientPhone}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Patient Address: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.patientAddress}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Patient DOB: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.patientDob}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Sevice Type: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.serviceType}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Symptoms: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.symptoms}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Visit Type: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.visitType}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>When did your problem Started: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.yourProblemStarted}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Are you taking any Medications: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.takingAnyMedications}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Do you have any Medical conditions : </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.haveAnyMedicalConditions}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Do you have any Drug Allergies: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.haveAnyDrugAllergies}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Call Type: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.callType}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Height: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.height}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Patient Age: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.patientAge}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Weight: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.weight}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>BMI: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.bmi}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Pharmacy: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.pharmacyName}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Pharmacy Address: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.pharmacyAddress}</Text>
                {/* </View> */}
                {/* <View style = {styles.listStyle}> */}
                    <Text style = {styles.titleStyle}>Medical Reports: </Text>
                    <Text style = {[styles.descriptionStyle, {paddingLeft: 20}]}>{this.state.medicalReports}</Text>
                {/* </View> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    room_info: state.chatroom,
  })
  
  const mapDispatchToProps = {
    getChatRoomAllData
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EHRSection)




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
    }
});