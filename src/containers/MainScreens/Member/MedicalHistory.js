import React from 'react';
import { connect } from "react-redux";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StepIndicator from 'react-native-step-indicator';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper";
import DocumentPicker from 'react-native-document-picker';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getMedicalCondition, medicalRecordImage, patientStatusImageUpload, patientFileRemove } from "../../../redux/actions/memberActions"
import { setSelectedProviderAppointmentData, getSelectedProviderAppointmentData } from "../../../redux/services/index"
import Indicating from '../Indicating';
import DocIcon from '../../../assets/doc.png';
import PdfIcon from '../../../assets/pdf.png';
import ExeIcon from '../../../assets/exe.png';
import { Platform } from 'react-native';

const callTypeArray = [
    {label: "Video/Audio Call", value: "Video Call"},
    {label: "Only Audio Call", value: "Audio Call"},
]
const labels = ["Step 1","Step 2","Step 3"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#2BDC28',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#2BDC28',
  stepStrokeUnFinishedColor: '#5BA2BC',
  separatorFinishedColor: '#2BDC28',
  separatorUnFinishedColor: '#fff',
  stepIndicatorFinishedColor: '#2BDC28',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#087700',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#5BA2BC',
  labelColor: '#fff',
  labelSize: 13,
  currentStepLabelColor: '#2BDC28',
  labelFontFamily:'poorRichard'
}

export class MedicalHistorys extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        singleFile: null,
        callType: "Video Call",
        whenProblemStartedValue: "",
        takeAnyMedication: "",
        takeAnyDrug: "",
        otherMedicalCondition:"",
        medicalConditionArray: null,
        uploadImages: [],
        currentPage:0,
        prevDoctorName: "",
        prevDoctorPhone: "",
        prevConditionDescription: "",
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage');
        this.props.getMedicalCondition({"patient_id": getSelectedProviderAppointmentData().selectedPatientId});
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.medicalCondition !== this.props.medicalCondition) {
            if(this.props.medicalCondition.medicalCondition.conditionData) {
                // return;
                var checkedArray = [];
                if(this.props.medicalCondition.medicalCondition.lastCondition[0]) {
                    checkedArray = this.props.medicalCondition.medicalCondition.lastCondition[0].medical_questions ? this.props.medicalCondition.medicalCondition.lastCondition[0].medical_questions.split(',') : [];
                }
                var array = [];
                for(var i = 0; i < this.props.medicalCondition.medicalCondition.conditionData.length; i ++) {
                    var obj = {}
                    for(var j = 0; j < checkedArray.length; j ++) {
                        if(this.props.medicalCondition.medicalCondition.conditionData[i].id == checkedArray[j]) {
                            obj.value = true;
                        }
                    }
                    obj.id = this.props.medicalCondition.medicalCondition.conditionData[i].id;
                    obj.label = this.props.medicalCondition.medicalCondition.conditionData[i].condition_name;  
                    array.push(obj);
                }
                this.setState({
                    medicalConditionArray: array
                })
            }
        }
    }

    selectedMedicialConditionCheck = (index) => {
        var array = this.state.medicalConditionArray;
        for(var i = 0; i < array.length; i ++) {
            if(array[i].id == index) {
                array[i].value = array[i].value ? false : true;
            }
        }
        this.setState({medicalConditionArray: array})
    }

    nextPage = () => {
        var array = [];
        for(var i = 0; i < this.state.uploadImages.length; i ++) {
            array.push(this.state.uploadImages[i].realName);
        }
        // console.log(JSON.stringify(array), '++++++++');
        // return;
        var saveIds = '';
        var saveText = '';
        for(var i = 0; i < this.state.medicalConditionArray.length; i ++) {
            if(this.state.medicalConditionArray[i].value) {
                saveIds += this.state.medicalConditionArray[i].id + ',';
                saveText += this.state.medicalConditionArray[i].label + ',';
            }
        }

        if(saveIds == '') {
            alert('Select Medical Condition');
            return;
        }
        if( this.state.callType == '' ) {
            alert('Select Call Type');
            return;
        }
        setSelectedProviderAppointmentData('medical_condition_ids', saveIds);
        setSelectedProviderAppointmentData('medical_condition_text', saveText);
        setSelectedProviderAppointmentData('medical_condition_others', this.state.otherMedicalCondition);
        setSelectedProviderAppointmentData('callType', this.state.callType);
        setSelectedProviderAppointmentData('medical_condition_whenProblemStartedValue', this.state.whenProblemStartedValue);
        setSelectedProviderAppointmentData('medical_condition_takeAnyMedication', this.state.takeAnyMedication);
        setSelectedProviderAppointmentData('medical_condition_takeAnyDrug', this.state.takeAnyDrug);
        setSelectedProviderAppointmentData('upload_medical_records', JSON.stringify(array));
        setSelectedProviderAppointmentData('doctor_name', this.state.prevDoctorName);
        setSelectedProviderAppointmentData('doctor_phone', this.state.prevDoctorPhone);
        setSelectedProviderAppointmentData('medical_conditions_descriptions', this.state.prevConditionDescription);
        Actions.push('SelectPharmacyScreen')
    }

    fileRemove (file){
        let uploadImages =  this.state.uploadImages.filter(e=>e.realName != file.realName);
        this.setState({uploadImages})
        // this.props.patientFileRemove(file);
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
                name: fakeName,
            });
            var nameArr = this.state.uploadImages;
            nameArr.push({realName: fakeName, name: fileToUpload.name, type: fileToUpload.type, uri: fileToUpload.uri});
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

    selectedStep = (ind) => {
        this.setState({currentPage: ind});
    }

    back = () => {
        if(this.state.currentPage === 0)
        {
            Actions.reset("HaveSymptomsScreen");
        }
        else
        {
            this.setState({currentPage: this.state.currentPage - 1});
        }
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <View style={styles.header}>
                    <View style = {{display: "flex", flexDirection: "row"}}>
                        <TouchableOpacity onPress = {() => this.back()}>
                            <View style={styles.headerLeft}>
                                <FontAwesome name = "arrow-left" size = {30} color = {"white"} />
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.headerTitle}>
                            <Text style = {styles.headerText}>Medical History</Text>
                        </View>
                    </View>
                </View>
                <View style={[MainStyles.HeaderStyle, {marginTop: LAYOUT.window.height * 0.07}]}>
                    {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                    <Text style={MainStyles.HeaderText}>Tell Us About Your Medical History</Text> */}
                </View>
                {/* </ImageBackground> */}
                {/* <KeyboardAvoidingView behavior={Platform.OS == "android" ? "height" : "padding"} style={MainStyles.container}> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <Text style={{color:'#5BA2BC', fontSize:25, textAlign:'center', marginVertical:10, fontFamily: 'poorRichard'}}>{'Tell Us About Your \nMedical History?'}</Text>
                        <StepIndicator
                            customStyles={customStyles}
                            stepCount={3}
                            currentPosition={this.state.currentPage}
                            labels={labels}
                            onPress={(ind) => this.selectedStep(ind)}
                        />
                        {
                                this.state.currentPage===0&&
                                <View>

                                    <TextInput
                                        style={MainStyles.TextInput}
                                        theme={{    
                                            colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                            }
                                        }}
                                        label="When did your problem started ? e.g.2 weeks..."
                                        Outlined = {true}
                                        value = {this.state.whenProblemStartedValue}
                                        onChangeText={text => this.setState({whenProblemStartedValue: text})}
                                    />
                                    <TextInput
                                        style={MainStyles.TextInput}
                                        theme={{    
                                            colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                            }
                                        }}
                                        label="Enter, If you are taking any Medications?"
                                        Outlined = {true}
                                        value = {this.state.takeAnyMedication}
                                        onChangeText={text => this.setState({takeAnyMedication: text})}
                                    />
                                    <TextInput
                                        style={MainStyles.TextInput}
                                        theme={{    
                                            colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                            }
                                        }}
                                        label="Enter, If you have any Drug allergies?"
                                        Outlined = {true}
                                        value = {this.state.takeAnyDrug}
                                        onChangeText={text => this.setState({takeAnyDrug: text})}
                                    />
                                    
                                    <TextInput
                                        style={MainStyles.TextInput}
                                        theme={{    
                                            colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                            }
                                        }}
                                        label="Enter, If any Other Medical conditions?"
                                        Outlined = {true}
                                        value = {this.state.otherMedicalCondition}
                                        onChangeText={text => this.setState({otherMedicalCondition: text})}
                                    />
                                    <View style = {[MainStyles.checkboxGroup, {borderBottomColor: "transparent"}]}>
                                        <Text style = {MainStyles.checkboxGroupHeader}>Appointment Type</Text>
                                        <RadioForm
                                            animation={true}
                                            initial = {0}
                                        >
                                            {
                                                callTypeArray.map((obj, i) => (
                                                    <RadioButton labelHorizontal={true} key={i} >
                                                        <RadioButtonInput
                                                            obj={obj}
                                                            index={i}
                                                            isSelected={this.state.callType === obj.value}
                                                            onPress={(text) => {this.setState({callType: text})}}
                                                            borderWidth={1}
                                                            buttonInnerColor={COLOR.mainColor}
                                                            buttonOuterColor={COLOR.mainColor}
                                                            buttonSize={20}
                                                            buttonOuterSize={30}
                                                            buttonStyle={{margin: 10}}
                                                            buttonWrapStyle={{marginLeft: 10}}

                                                        />
                                                        <RadioButtonLabel
                                                            obj={obj}
                                                            index={i}
                                                            labelHorizontal={true}
                                                            onPress={(text) => {this.setState({callType: text})}}
                                                            labelStyle={{fontSize: LAYOUT.fontSize1, color: COLOR.mainColor}}
                                                            labelWrapStyle={{margin: 10, marginLeft: 0}}
                                                        />
                                                    </RadioButton>
                                                ))
                                            }  
                                        </RadioForm>
                                    </View>
                                    <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.setState({currentPage:++this.state.currentPage})}>
                                        <Text style={MainStyles.Button}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                        }{
                            this.state.currentPage===1&&
                            <View>
                                <View style = {[MainStyles.checkboxGroup, {borderBottomColor: "transparent"}]}>
                                    <Text style = {MainStyles.checkboxGroupHeader}>Do you have any Known Medical conditions ?</Text>
                                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                        {this.state.medicalConditionArray ? this.state.medicalConditionArray.length > 0 ? this.state.medicalConditionArray.map((item, idx) => (
                                            (!item.value || item.value === false) ? 
                                            <TouchableOpacity 
                                                key = {'checkbox' + idx}
                                                onPress = {() => this.selectedMedicialConditionCheck(item.id)}
                                                style={{borderColor:'#5BA2BC',margin:5, borderWidth:1, borderRadius:30, paddingVertical:10, paddingHorizontal:5}} >
                                                <Text style={{color:'#5BA2BC'}}>{item.label}</Text>
                                            </TouchableOpacity> : 
                                            <TouchableOpacity onPress = {() => this.selectedMedicialConditionCheck(item.id)} style={{backgroundColor:'#5BA2BC', borderWidth: 1, borderColor: "#FFFFFF",margin:5, borderRadius:30, paddingVertical:10, paddingHorizontal:5}} key = {'checkbox' + idx}>
                                                <Text style={{color:'#fff'}}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )) : <Text style = {MainStyles.processingStyle}>There is no Medical Hostory</Text> : 
                                        <Indicating />}
                                    </View>
                                </View>
                                <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.setState({currentPage:++this.state.currentPage})}>
                                    <Text style={MainStyles.Button}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        }{
                            this.state.currentPage===2&&
                            <View>
                                <View style = {[{borderBottomColor: "transparent", alignItems:'center'}]}>
                                    <Text style={{fontSize: LAYOUT.fontSize4, padding: 5, width: '100%', textAlign:'center', fontFamily:'poorRichard', color:COLOR.mainColor}}> Upload Your Medical Records</Text>
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
                                                {item.type.indexOf('image')>-1&&<Image source={{uri:item.uri}} style={{width:80, height:80, borderRadius:10, borderWidth:2,padding:5,borderColor:COLOR.mainColor}}/>}
                                                {(item.type.indexOf('application/msword')>-1||item.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document')>-1)
                                                    &&<Image source={DocIcon} style={{width:80, height:80,}}/>}
                                                {(item.type.indexOf('application/vnd.ms-excel')>-1||item.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')>-1)
                                                    &&<Image source={PdfIcon} style={{width:80, height:80,}}/>}
                                                {item.type.indexOf('application/pdf')>-1&&<Image source={PdfIcon} style={{width:80, height:80,}}/>}
                                                <TouchableOpacity onPress={()=>this.fileRemove(item)} key = {idx} style={{position:'absolute', top:-10, right:-10, width:30,height:30, borderRadius:15,backgroundColor:COLOR.mainColor, justifyContent:'center', alignItems:'center'}}>
                                                    <FontAwesome name="remove" style={{color: '#fff'}} size={LAYOUT.window.width * 0.035} />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                                {
                                    getSelectedProviderAppointmentData().serviceType == 1 ? null : 
                                    <View>
                                        <Text style={{color: COLOR.mainColor, borderBottomWidth: 1, borderBottomColor: COLOR.mainColor}}>Previous Physican Information</Text>
                                        <TextInput
                                            style={MainStyles.TextInput}
                                            theme={{    
                                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                                }
                                            }}
                                            label="Doctor's Name"
                                            Outlined = {true}
                                            value = {this.state.prevDoctorName}
                                            onChangeText={text => this.setState({prevDoctorName: text})}
                                        />
                                        <TextInput
                                            style={MainStyles.TextInput}
                                            theme={{    
                                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                                }
                                            }}
                                            keyboardType="number-pad"
                                            label="Doctor's Phone"
                                            Outlined = {true}
                                            value = {this.state.prevDoctorPhone}
                                            onChangeText={text => this.setState({prevDoctorPhone: text})}
                                        />
                                        <TextInput
                                            style={MainStyles.TextInput}
                                            theme={{    
                                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                                }
                                            }}
                                            label="Brief description of medical condition"
                                            Outlined = {true}
                                            value = {this.state.prevConditionDescription}
                                            onChangeText={text => this.setState({prevConditionDescription: text})}
                                        />
                                    </View>
                                }
                                <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextPage()}>
                                    <Text style={MainStyles.Button}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </ScrollView>
                {/* </KeyboardAvoidingView> */}
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        medicalCondition: state.member
    }
}

const mapDispatchToProps = {
    getMedicalCondition, medicalRecordImage, patientStatusImageUpload, patientFileRemove
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistorys)    

const styles = StyleSheet.create({
    header:{
        backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        // marginLeft: LAYOUT.window.width * 0.02,
        // display: "flex",
        // flexDirection: "row",
        padding:10,
        position: "absolute",
        // height: 400,
        zIndex: 999999,
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 5,
    },
    headerText: {
        textAlign: "center",
        width:'100%',
        fontSize: LAYOUT.fontSize3,
        color: "white",
        fontFamily: 'poorRichard'
    },  
    headerTitle:{
        fontSize:LAYOUT.fontSize5,
        color:COLOR.whiteColor,
        // fontWeight:'600',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        paddingRight: 30,
        flex: 1
    },
    headerLeft:{
        // width:LAYOUT.window.width*0.,
        justifyContent: "center",
        textAlign: "center",
        padding: 10
    },
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