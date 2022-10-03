import React from 'react';
import { connect } from "react-redux"
import { Platform, View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import { Picker } from "@react-native-picker/picker";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getSelectedProviderAppointmentData, setSelectedProviderAppointmentData } from "../../../redux/services/index"
import { submitPatientData } from "../../../redux/actions/memberActions"


const genderArray = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

const relationShipArray = [
    { label: 'Self', value: 'Self' },
    { label: 'Kids', value: 'Kids' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Others', value: 'Others' },
]

export class PatientInfo extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'thirdPage')
    }
    state = {
        maxDate: ((new Date()).getFullYear()) + '-' + (((new Date()).getMonth() + 1) >= 10 ? ((new Date()).getMonth() + 1) : '0' + ((new Date()).getMonth() + 1)) + '-' + ((new Date()).getDate() >= 10 ? (new Date()).getDate() : '0' + (new Date()).getDate()),
        transactionId: "1000029",
        firstName: "",
        lastName: "",
        relationShip: "Self",
        email: "",
        birthday: "",
        gender: "Male",
        cellPhone: "",
        height: "",
        inches: "",
        weight: "",
        bmi: "",
        age: "",
        months: "",
        days: "",
        showDropDownRelantionShip: false,
        showDropDownGender: false
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage');
        if(getSelectedProviderAppointmentData().selectedPatientId != "0") {
            var patientData = getSelectedProviderAppointmentData().patientData;
            var bYear = patientData.dob.split('-')[0];
            var bMonth = patientData.dob.split('-')[1];
            var bDate = patientData.dob.split('-')[2];
    
            var nYear = (new Date()).getFullYear();
            var nMonth = (new Date()).getMonth() + 1;
            var nDate = (new Date()).getDate();
    
            var agoYear = nYear - bYear;
            var agoMonth = 0;
            var agoDate = 0;
            if (bMonth > nMonth) {
                agoYear --;
                agoMonth = nMonth + 12 - bMonth;
            } else {
                agoMonth = nMonth - bMonth;
            }
    
            if (bDate > nDate) {
                agoMonth --;
                agoDate = nDate + new Date(nYear, nMonth - 1, 0).getDate() - bDate;
                if(agoMonth < 0){
                    agoYear --;
                    agoMonth = agoMonth + 12;
                }
            } else {
                agoDate = nDate - bDate;
            }
    
            this.setState({
                transactionId: patientData.patient_id,
                firstName: patientData.first_name,
                lastName: patientData.last_name,
                relationShip: patientData.relation,
                email: patientData.email,
                birthday: patientData.dob,
                gender: patientData.gender,
                cellPhone: patientData.phone,
                height: '',
                inches: '',
                weight: '',
                bmi: '',
                age: ('' + agoYear),
                months: ('' + agoMonth),
                days: ('' + agoDate),
            })
        }
    }

    changeDate = (date) => {
        var bYear = date.split('-')[0];
        var bMonth = date.split('-')[1];
        var bDate = date.split('-')[2];

        var nYear = (new Date()).getFullYear();
        var nMonth = (new Date()).getMonth() + 1;
        var nDate = (new Date()).getDate();

        var agoYear = nYear - bYear;
        var agoMonth = 0;
        var agoDate = 0;
        if (bMonth > nMonth) {
            agoYear --;
            agoMonth = nMonth + 12 - bMonth;
        } else {
            agoMonth = nMonth - bMonth;
        }

        if (bDate > nDate) {
            agoMonth --;
            agoDate = nDate + new Date(nYear, nMonth, 0).getDate() - bDate;
            if(agoMonth < 0){
                agoYear --;
                agoMonth = agoMonth + 12;
            }
        } else {
            agoDate = nDate - bDate;
        }

        this.setState({
            age: ('' + agoYear),
            months: ('' + agoMonth),
            days: ('' + agoDate),
            birthday: date
        })
    }

    nextPage = () => { 
        if(this.state.firstName == "" || this.state.lastName == "" || this.state.relationShip == "" || this.state.email == "" || this.state.birthday == "" || this.state.gender == "" || this.state.cellPhone == "" ) {
            alert('Enter all field.');
            return;
        }
        this.props.submitPatientData({id: getSelectedProviderAppointmentData().selectedPatientId, data: this.state})
        setSelectedProviderAppointmentData('newPatientData', this.state);
        Actions.push('ReasonForTodayVisitScreen');
    }

    heightChange = (e) => {
        this.setState({height: e});
        this.getBMI();
    }

    incheChange = (e) => {
        this.setState({inches: e});
        this.getBMI();
    }

    weightChange = (e) => {
        this.setState({weight: e});
        this.getBMI();
    }

    getBMI() {
        var height1 = Number(this.state.height);
        var height2 = Number(this.state.inches);
        var weight = Number(this.state.weight);
        if((height1 != '' && height2 != '' && weight != '') || height1 >= 0 || height2 >= 0 || weight >= 0 ){
            var height = (12 * height1) + height2;
            var bmi =  weight  / Math.pow(height,2)  * 703;
            this.setState({bmi: bmi.toFixed(2)})
        }else{
            var bmi = 0;
            this.setState({bmi: bmi.toFixed(2)})
        }
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Patient Information"}
                    backURL = {"SelectServiceTypeScreen"}
                    backType = {"reset"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Patient Information</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Transaction Id"
                            Outlined = {true}
                            disabled = {true}
                            value = {this.state.transactionId}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="First Name"
                            Outlined = {true}
                            value = {this.state.firstName}
                            onChangeText={text => this.setState({firstName: text})}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Last Name"
                            Outlined = {true}
                            value = {this.state.lastName}
                            onChangeText={text => this.setState({lastName: text})}
                        />
                        <View style = {{borderBottomColor: COLOR.mainColor, borderBottomWidth: 1, marginBottom: 20}}>
                            <Picker
                                selectedValue={this.state.relationShip}
                                style={[MainStyles.pickerStyle, {marginBottom: 0}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({relationShip: itemValue})
                                }
                            >
                                {relationShipArray.map((item, idx) => {
                                    return(
                                        <Picker.Item label={item.label} value={item.value} key = {idx} />
                                    )
                                })}
                            </Picker>
                        </View>
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Email"
                            Outlined = {true}
                            value = {this.state.email}
                            onChangeText={text => this.setState({email: text})}
                        />
                        <DatePicker
                            style={{width: LAYOUT.window.width * 0.8, textAlign: 'left', borderTopWidth: 0}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder="Date Of Birth"
                            format="YYYY-MM-DD"
                            maxDate = {this.state.maxDate}
                            androidMode = {"spinner"}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon = {false}
                            customStyles={{
                            textAlign: 'left',
                                dateInput: {
                                    textAlign: "left",
                                    alignItems: 'flex-start',
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    // borderBottomColor: COLOR.mainColor,
                                    marginTop: 10,
                                    paddingLeft: 10,
                                    fontSize: LAYOUT.fontSize2
                                },
                                placeholderText: {
                                    textAlign: "left",
                                    alignItems: 'flex-start',
                                    color: COLOR.mainColor,
                                    fontSize: LAYOUT.fontSize2,
                                    // marginLeft: 10 
                                },
                            }}
                            onDateChange={(date) => this.changeDate(date)}
                        />
                        <View style = {{borderBottomColor: COLOR.mainColor, borderBottomWidth: 1, marginBottom: 20, marginTop: 20}}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={[MainStyles.pickerStyle, {marginBottom: 0}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }
                            >
                                {genderArray.map((item, idx) => {
                                    return(
                                        <Picker.Item label={item.label} value={item.value} key = {idx} />
                                    )
                                })}
                                {/* <Picker.Item label="JavaScript" value="js" /> */}
                            </Picker>
                        </View>
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Cell Phone #"
                            Outlined = {true}
                            value = {this.state.cellPhone}
                            onChangeText={text => this.setState({cellPhone: text})}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Height(feet)"
                            Outlined = {true}
                            value = {this.state.height}
                            onChangeText={text => {this.heightChange(text)}}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Inches"
                            Outlined = {true}
                            value = {this.state.inches}
                            onChangeText={text => {this.incheChange(text)}}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Weight (Ibs)"
                            Outlined = {true}
                            value = {this.state.weight}
                            onChangeText={text => {this.weightChange(text)}}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="BMI (Body Mass Index)"
                            Outlined = {true}
                            value = {this.state.bmi}
                            onChangeText={text => this.setState({bmi: text})}
                        />
                        <View style = {{flexDirection: "row", width: '100%'}}>
                            <TextInput
                                style={[MainStyles.TextInput, {width: '33%', textAlign: "center"}]}
                                theme={{    
                                    colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                    }
                                }}
                                label="Age"
                                Outlined = {true}
                                value = {this.state.age}
                                disabled = {true}
                                onChangeText={text => this.setState({age: text})}
                            />
                            <TextInput
                                style={[MainStyles.TextInput, {width: '33%', textAlign: "center"}]}
                                theme={{    
                                    colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                    }
                                }}
                                label="Months"
                                Outlined = {true}
                                disabled = {true}
                                value = {this.state.months}
                                onChangeText={text => this.setState({months: text})}
                            />
                            <TextInput
                                style={[MainStyles.TextInput, {width: '33%', textAlign: "center"}]}
                                theme={{    
                                    colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                    }
                                }}
                                label="Days"
                                Outlined = {true}
                                disabled = {true}
                                value = {this.state.days}
                                onChangeText={text => this.setState({days: text})}
                            />
                        </View>
                        <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextPage()}>
                            <Text style={MainStyles.Button}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
    submitPatientData 
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInfo)