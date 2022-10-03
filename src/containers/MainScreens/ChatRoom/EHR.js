import React from 'react';
import { connect } from "react-redux"
import { 
    View, 
    Text, 
    Image, 
    StyleSheet,
    ScrollView,
    TouchableOpacity } from 'react-native';
import { getChatRoomAllData } from "../../../redux/actions/ChatRoomActions"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { LAYOUT, COLOR } from '../../../constants';
import Modal from "react-native-modal"
import DocumentPicker from 'react-native-document-picker';
import DocIcon from '../../../assets/doc.png';
import PdfIcon from '../../../assets/pdf.png';
import ExeIcon from '../../../assets/exe.png';
import MainStyles from "../Style/MainStyle"

import { BACKEND_URL } from "../../../config"
import { patientStatusImageUpload, patientFileRemove } from "../../../redux/actions/memberActions";


class EHRSection extends React.Component{
    constructor(props) {
        super(props);
        var imgs = JSON.parse(this.props.room_info.created_room_info.upload_medical_records);
        var nameArr = [];
        for(var i in imgs)
        {
            nameArr.push({realName: imgs[i], type: 'image', uri: BACKEND_URL + 'uploads/' + imgs[i]});
        }
        
        this.state = {
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
            medicalReports: Object.entries(imgs),
            uploadImages: nameArr,
            isModalVisible: false,
            modalImgUri: ""
        }
    }

    componentDidMount() {
        // this.props.getChatRoomAllData({patient_id: '149' })
        this.props.getChatRoomAllData({patient_id: this.props.room_info.created_room_info.patient_id })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.room_info !== this.props.room_info) {
            if(this.props.room_info.all_appointment_info) {
                var data = this.props.room_info.all_appointment_info;

                // symptom Making
                var symptomArr = [];
                var appointmentSymptomArr = this.props.room_info.created_room_info.medical_sympotoms ? this.props.room_info.created_room_info.medical_sympotoms.split(',') : "";
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
                var visitTypeString = this.props.room_info.created_room_info.visit_type ? data.visitTypeList.filter(obj => obj.id == this.props.room_info.created_room_info.visit_type)[0].visit_name : "";
                // var visitTypeString = data.visitTypeList.filter(obj => obj.id == '6')[0].visit_name;
                
                // medical Conditions
                var medicalConditionArray = [];
                var appointmentMedicalConditionArr = this.props.room_info.created_room_info.medical_questions ? this.props.room_info.created_room_info.medical_questions.split(',') : "";
                // var appointmentMedicalConditionArr = [4,6,7,8,9,10,12,13,14,16,18,19,20,21,22];
                for(var i = 0; i < data.medicalConditionList.length; i ++) {
                    for(var j = 0; j < appointmentMedicalConditionArr.length; j ++) {
                        if(data.medicalConditionList[i].id == appointmentMedicalConditionArr[j]) {
                            medicalConditionArray.push(data.medicalConditionList[i].condition_name)
                        }
                    }
                }
                var medicalCondtionString = medicalConditionArray.join();
                this.setState({
                    patientName: data.patientData[0] ? data.patientData[0].first_name + ' ' + data.patientData[0].last_name : "",
                    patientEmail: data.patientData[0] ? data.patientData[0].last_name : "",
                    patientPhone: data.patientData[0] ? data.patientData[0].phone : "",
                    patientAddress: data.patientData[0] ? data.patientData[0].address : "",
                    patientDob: data.patientData[0] ? data.patientData[0].dob : "",
                    serviceType: this.props.room_info.created_room_info.service_id == "1" ? "General Health" : "2nd Option",
                    symptoms: symptomString,
                    visitType: visitTypeString,
                    yourProblemStarted: this.props.room_info.created_room_info.problem_started,
                    takingAnyMedications: this.props.room_info.created_room_info.any_medications,
                    haveAnyMedicalConditions: medicalCondtionString,
                    haveAnyDrugAllergies: this.props.room_info.created_room_info.drug_allergies,
                    callType: this.props.room_info.created_room_info.call_type,
                    height: this.props.room_info.created_room_info.height1,
                    patientAge: this.props.room_info.created_room_info.age + ' years ' + this.props.room_info.created_room_info.month + ' months',
                    weight: this.props.room_info.created_room_info.weight,
                    bmi: this.props.room_info.created_room_info.bmi,
                    pharmacyName: this.props.room_info.created_room_info.pharmacy_name,
                    pharmacyAddress: this.props.room_info.created_room_info.pharmacy_address
                })
            }
        }
    }
    
    selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            var res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images ],
            });

            var fileToUpload = res;
            var formData = new FormData();
            var fakeName = Math.floor(Math.random() * 1000000000000) + '.' + fileToUpload.name.split('.')[fileToUpload.name.split('.').length - 1];
            formData.append('image', {
                uri: fileToUpload.uri, 
                type: fileToUpload.type, 
                name: fakeName
            });

            formData.append('appointment_id', this.props.room_info.created_room_info.id);
            var nameArr = this.state.uploadImages;
            nameArr.push({realName: fakeName, name: fileToUpload.name, type: fileToUpload.type, uri: fileToUpload.uri});

            this.state.medicalReports.push([0, fakeName]);
            
            this.props.patientStatusImageUpload(formData);
            this.setState({uploadImages: nameArr});
        } catch (err) {
            // this.setState({singleFile: null});
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    fileRemove (file){
        let uploadImages =  this.state.uploadImages.filter(e=>e.realName != file.realName);
        this.setState({uploadImages})
        // this.props.patientFileRemove(file);
    }

    viewImage(uri) {
        this.setState({
            modalImgUri : uri,
            isModalVisible : true
        });
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
                    <View>
                        {this.state.medicalReports.map((img, index) => (
                            <TouchableOpacity key={index} onPress={() => this.viewImage(BACKEND_URL + "uploads/" + img[1])}>
                                <Text style = {[styles.descriptionStyle, {padding: 10}]}>{img[1]}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                {/* </View> */}
                {
                  this.props.user.role === 'member' ? 
                  <>
                    <TouchableOpacity style={{
                        marginTop:50,
                        flexDirection:'row', 
                        backgroundColor:'#fff',
                        padding:10,
                        borderRadius:10,
                        shadowOffset: { width: 10, height:5 },
                        shadowColor: '#000',
                        shadowOpacity: 1, 
                        shadowRadius: 5,
                        elevation:3,
                        alignItems:'center',
                        width:LAYOUT.window.width*0.4,
                        justifyContent:'center'
                        }} onPress = {() => this.selectFile()}>
                        <Text>Upload Documents </Text>
                        <View style={{width:30,height:30, borderRadius:15,backgroundColor:COLOR.mainColor, justifyContent:'center', alignItems:'center'}}>
                            <FontAwesome name="plus" style={{color: '#fff'}} size={LAYOUT.window.width * 0.035} />
                        </View>
                    </TouchableOpacity>
                    <ScrollView horizontal style={{marginTop:10}}>
                        {this.state.uploadImages&&this.state.uploadImages.map((item, idx) =>(
                            <View key = {idx} style={{margin:10, }}>
                                {item.type.indexOf('image')>-1&&
                                    <TouchableOpacity onPress={() => this.viewImage(item.uri)}>
                                        <Image source={{uri:item.uri}} style={{width:80, height:80, borderRadius:10, borderWidth:2,padding:5,borderColor:COLOR.mainColor}}/>
                                    </TouchableOpacity>
                                }
                                {(item.type.indexOf('application/msword')>-1||item.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document')>-1)
                                    &&<Image source={DocIcon} style={{width:80, height:80,}}/>}
                                {(item.type.indexOf('application/vnd.ms-excel')>-1||item.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')>-1)
                                    &&<Image source={PdfIcon} style={{width:80, height:80,}}/>}
                                {item.type.indexOf('application/pdf')>-1&&<Image source={PdfIcon} style={{width:80, height:80,}}/>}
                                {/* <TouchableOpacity onPress={()=>this.fileRemove(item)} key = {idx} style={{position:'absolute', top:-10, right:-10, width:30,height:30, borderRadius:15,backgroundColor:COLOR.mainColor, justifyContent:'center', alignItems:'center'}}>
                                    <FontAwesome name="remove" style={{color: '#fff'}} size={LAYOUT.window.width * 0.035} />
                                </TouchableOpacity> */}
                            </View>
                        ))}
                    </ScrollView>
                  </>
                  :
                  null
                }
                
                <Modal
                    transparent={true}
                    isVisible={this.state.isModalVisible}
                    animationIn = {"slideInRight"}
                    animationOut = {"slideOutRight"}
                    animationInTiming = {300}
                    animationOutTiming = {300}
                    style = {MainStyles.chatRoomModalStyle}
                >
                    <TouchableOpacity onPress = {() => this.setState({isModalVisible: false})} style={{position:'absolute', top:10, right:10, width:30,height:30, borderRadius:15,backgroundColor:COLOR.mainColor, justifyContent:'center', alignItems:'center', zIndex: 10000}} >
                        <FontAwesome name="remove" style={{color: '#fff'}} size={LAYOUT.window.width * 0.035} />
                    </TouchableOpacity>
                    <View style = {{width: "100%", height: "100%"}}>
                        <Image style={{height: LAYOUT.window.height, width: LAYOUT.window.width}} source={{uri: this.state.modalImgUri}}/>
                    </View>
                </Modal>
                
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    room_info: state.chatroom,
    user:state.auth.user,
  })
  
  const mapDispatchToProps = {
    getChatRoomAllData,patientStatusImageUpload, patientFileRemove
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