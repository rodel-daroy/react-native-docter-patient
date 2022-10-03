import React from 'react';
import { connect } from 'react-redux'
import { Platform, View, Text, TouchableOpacity , StatusBar, ScrollView, StyleSheet, Image } from 'react-native';
// import { View, Text, TouchableOpacity , StatusBar, ScrollView, Picker} from 'react-native';
import { Picker } from "@react-native-picker/picker"
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import DatePicker from 'react-native-datepicker'
import Modal from "react-native-modal"
import { Actions } from 'react-native-router-flux';
import CheckBox from "react-native-check-box";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StepIndicator from 'react-native-step-indicator';
import authStyles from "./AuthStyle";
import MainStyles from "../MainScreens/Style/MainStyle"
import { LAYOUT, COLOR } from '../../constants';
import { setNavigator } from "../../redux/actions/navigator"
import { MemberRegister, getCityAndStateFromZipcode } from "../../redux/actions/authActions"
import { privacyArray } from "../fakeDB";

import Logo from "../../assets/logo.png";

const labels = ["Step 1","Step 2"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#2BDC28',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#2BDC28',
  stepStrokeUnFinishedColor: '#2BDC28',
  separatorFinishedColor: '#2BDC28',
  separatorUnFinishedColor: '#fff',
  stepIndicatorFinishedColor: '#2BDC28',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#087700',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#000',
  labelColor: '#fff',
  labelSize: 13,
  currentStepLabelColor: '#2BDC28'
}

export class Register extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'firstPage')

        var maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18);

        this.state = {
            genderList: [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            phonenumber: "",
            gender: "Male",
            address1: "",
            address2: "",
            zipcode: "",
            city: "",
            state: "",
            dob: "",
            showDropDown: false,
            policyAgree: false,
            policyModal: false,
            date:"2016-05-15",
            currentPage:0,
            passwordShow: false,
            maxDate: maxDate
        };
    }
    componentDidUpdate(prevProps){
        setNavigator(this.props.navigation, 'firstPage')
        
        var cs = this.props.cityAndState ? this.props.cityAndState.split(":") : ["", ""];
        if(prevProps.cityAndState!==this.props.cityAndState) {
            if(!cs[1]) {
                this.setState({city: "", state: ""});
            }
            else if(cs[0] !== this.state.city || cs[1] !== this.state.state){
                this.setState({city: cs[0], state: cs[1]});
            }
        }
    }
    componentDidMount(){
        setNavigator(this.props.navigation, 'firstPage')
        // if(getToken().Usertype == "member") {
        //     Actions.push('MemberFirstPageScreen');
        // }
    }
    
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    Register = () => {
        if(!this.validate2()){
            return;
        }
        
        if(!this.validate1()){
            this.setState({currentPage: 0});
            return;
        }

        if(this.state.policyAgree == false) {
            alert("Please check if you are agree Terms & Conditions, Privacy Policy");
            return;
        }
        
        var datas = this.state;
        datas.tz = this.diff_to_GMT(new Date());
        this.props.MemberRegister(datas);
    }

    diff_to_GMT = (dt) => {
        return (-dt.getTimezoneOffset() < 0 ? '-' : '+') + Math.abs(dt.getTimezoneOffset() / 60);
    }
    
    getCityAndState = (zipCode) => {
        this.setState({zipcode: zipCode});
        this.props.getCityAndStateFromZipcode({zipcode: zipCode});
    }

    validateAndNext = () => {
        if(!this.validate1()) {
            return;
        }

        this.scroller.scrollTo({x: 0, y: 0});
        this.setState({currentPage:++this.state.currentPage})
    }

    validate1 = () => {
        var require_fields = {
            'firstname': 'First Name', 
            'lastname': 'Last Name', 
            'email': 'Email', 
            'password': 'Password', 
            'confirmPassword': 'Confirm Password', 
            'phonenumber': 'Phone Number'};
        for(var f in require_fields) {
            if(this.state[f] == "") {
                alert("Please enter " + require_fields[f]);
                return false;
            }
        }

        var phoneno = /^\d{10}$/;
        if(!this.state.phonenumber.match(phoneno))
        {
            alert("Phone Number must be 10 numbers or more.");
            return false;
        }

        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)))
        {
            alert("Please enter email format.");
            return false;
        }

        var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
        if(!this.state.password.match(paswd)) 
        { 
            alert('Input Password and Submit [6 to 15 characters which contain at least one numeric digit and a special character]')
            return false;
        }

        if(this.state.password   !== this.state.confirmPassword){
            alert('Confirm Password is incorrectly! Try again!');
            return false;
        }

        return true;
    }

    validate2 = () => {
        var require_fields = {
            'address1': 'Address 1', 
            'zipcode': 'Zipcode', 
            'city': 'City', 
            'state': 'State', 
            'dob': 'Date of Birth'};
        for(var f in require_fields) {
            if(this.state[f] == "") {
                alert("Please enter " + require_fields[f]);
                return false;
            }
        }

        var optimizedBirthday = this.state.dob.replace(/-/g, "/");
        var myBirthday = new Date(optimizedBirthday);
        var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
        var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

        if(myAge < 18) {
            alert("You must be 18+ years of age to become a member.");
            return false;
        }


        return true;
    }

    selectedStep = (ind) => {
        this.scroller.scrollTo({x: 0, y: 0});
        this.setState({currentPage: ind})
    }

    render(){
        return(
            <Container style={[authStyles.container, {backgroundColor: COLOR.mainColor, height: LAYOUT.window.height, justifyContent: "center", alignItems: "center" }]}>
                <View style={styles.header}>
                    <View style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <Image source = {Logo} style = {{width: LAYOUT.window.width * 0.6, height: LAYOUT.window.width * 0.2 }} />
                    </View>
                </View>
                <View style={styles.header}>
                    <View style = {{display: "flex", flexDirection: "row"}}>
                        <TouchableOpacity onPress = {() => Actions.reset('LoginScreen')}>
                            <View style={styles.headerLeft}>
                                <FontAwesome name = "arrow-left" size = {30} color = {"white"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView ref={(scroller) => {this.scroller = scroller}}>
                    <View style={authStyles.registerMain1}>
                        <View style={authStyles.mainHeader}>
                            <Text style={authStyles.mainHeaderText1}>Member Registration</Text>
                        </View>
                        <StepIndicator
                            customStyles={customStyles}
                            stepCount={2}
                            currentPosition={this.state.currentPage}
                            labels={labels}
                            onPress={ind => this.selectedStep(ind)}
                        />
                        {
                            this.state.currentPage===0&&
                            <View>
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="First Name"
                                    onChangeText={text => this.setState({firstname: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="Last Name"
                                    Outlined = {true}
                                    onChangeText={text => this.setState({lastname: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="Email"
                                    Outlined = {true}
                                    onChangeText={text => this.setState({email: text})}
                                />
                                <TextInput
                                    secureTextEntry = {!this.state.passwordShow}
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: 'white', text: 'white', primary: "white", background: 'transparent'
                                        }
                                    }}
                                    underlineColor = "white"
                                    label="Password"
                                    onChangeText={text => this.setState({password: text})}
                                    right={
                                        <TextInput.Icon 
                                            name={"eye"} 
                                            size={20} 
                                            color={this.state.passwordShow ? "#d6d6d6" : "white"} 
                                            forceTextInputFocus={false}
                                            onPress={() => this.setState({passwordShow: !this.state.passwordShow})} 
                                        />
                                    }
                                />
                                <TextInput
                                    secureTextEntry = {!this.state.passwordShow}
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: 'white', text: 'white', primary: "white", background: 'transparent'
                                        }
                                    }}
                                    underlineColor = "white"
                                    label="Confirm Password"
                                    Outlined = {false}
                                    onChangeText={text => this.setState({confirmPassword: text})}
                                    right={
                                        <TextInput.Icon 
                                            name={"eye"} 
                                            size={20} 
                                            color={this.state.passwordShow ? "#d6d6d6" : "white"} 
                                            forceTextInputFocus={false}
                                            onPress={() => this.setState({passwordShow: !this.state.passwordShow})} 
                                        />
                                    }
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    keyboardType="number-pad"
                                    label="Phone Number"
                                    Outlined = {true}
                                    onChangeText={text => this.setState({phonenumber: text})}
                                />
                                <View style = {{borderBottomColor: "white", borderBottomWidth: 1, marginBottom: 20}}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        style={[MainStyles.pickerStyle1, {marginBottom: 0, color: 'white'}]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({gender: itemValue})
                                        }
                                    >
                                        {this.state.genderList.map((item, idx) => {
                                            return(
                                                <Picker.Item label={item.label} color = {"black"} value={item.value} key = {idx} />
                                            )
                                        })}
                                    </Picker>
                                </View>
                                <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.validateAndNext()}>
                                    <Text style={authStyles.authButton1}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            this.state.currentPage===1&&
                            <View>
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="Address 1"
                                    Outlined = {true}
                                    onChangeText={text => this.setState({address1: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="Address 2"
                                    Outlined = {true}
                                    onChangeText={text => this.setState({address2: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    keyboardType="number-pad"
                                    label="ZipCode"
                                    Outlined = {true}
                                    onChangeText={text => this.getCityAndState(text)}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="City"
                                    Outlined = {true}
                                    editable={false}
                                    value = {this.state.city}
                                    onChangeText={text => this.setState({city: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={{
                                        colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'
                                        }
                                    }}
                                    underlineColor = 'white'
                                    label="State"
                                    Outlined = {true}
                                    editable={false}
                                    value = {this.state.state}
                                    onChangeText={text => this.setState({state: text})}
                                />
                                <DatePicker
                                    style={{width: "100%", textAlign: 'left', borderTopWidth: 0, marginTop: 10}}
                                    date={this.state.dob}
                                    color = "white"
                                    mode="date"
                                    placeholder="Date Of Birth"
                                    format="YYYY-MM-DD"
                                    maxDate={this.state.maxDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    androidMode = {"spinner"}
                                    showIcon = {false}
                                    customStyles={{
                                        textAlign: 'left',
                                        dateInput: {
                                            textAlign: "left",
                                            alignItems: 'flex-start',
                                            borderTopWidth: 0,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            color: "white",
                                            borderBottomColor: 'white',
                                            marginTop: 10,
                                            paddingLeft: 10,
                                            paddingBottom: 20,
                                        },
                                        dateText: {
                                            color: 'white'
                                        },
                                        placeholderText: {
                                            textAlign: "left",
                                            alignItems: 'flex-start',
                                            color: "white",
                                            fontSize: 15,
                                            // marginLeft: 10
                                        },
                                    }}
                                    onDateChange={(date) => this.setState({dob: date})}
                                />
                                <View style = {[MainStyles.checkboxForm, {marginTop: 30,flexDirection:'row', alignItems: "flex-start", padding: 20, justifyContent: "flex-start"}]} >
                                    {/* <Checkbox
                                        status={this.state.policyAgree}
                                        onPress = {() => this.setState({policyAgree: this.state.policyAgree == "checked" ? "unchecked" : "checked"})}
                                        color = {'white'}
                                    />
                                    <Text onPress = {() => this.setState({policyAgree: this.state.policyAgree == "checked" ? "unchecked" : "checked"})} style = {{color: "white"}} >I agree to eClininforyou.com <Text style = {{textDecorationLine: 'underline', color: "white", fontSize: LAYOUT.fontSize2}} onPress = {() => this.setState({policyModal: !this.state.policyModal})}>Terms & Conditions, Privacy Policy</Text></Text> */}
                                    <CheckBox
                                        style={{ padding: 10 }}
                                        checkedCheckBoxColor = {"white"}
                                        uncheckedCheckBoxColor = {"white"}
                                        onClick={()=>{
                                            this.setState({
                                                policyAgree:!this.state.policyAgree
                                            })
                                        }}
                                        isChecked={this.state.policyAgree}
                                        // RightText={"CheckBox"}
                                    />
                                    <Text onPress = {() => this.setState({policyAgree: !this.state.policyAgree})} style = {{color: "white"}} >I agree to eClininforyou.com <Text style = {{textDecorationLine: 'underline', color: "white", fontSize: LAYOUT.fontSize2}} onPress = {() => this.setState({policyModal: !this.state.policyModal})}>Terms & Conditions, Privacy Policy</Text></Text>
                                </View>
                                {/* <View style={authStyles.centerStyle}>
                                    <Text style = {{fontSize: LAYOUT.fontSize1}}>Do you have already an account? <Text onPress={()=>Actions.push('LoginScreen')} style={{color: "#ffffff", fontSize: LAYOUT.fontSize2, textDecorationLine: 'underline',}}>Login</Text></Text>
                                </View> */}
                                <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.Register()}>
                                {/* <TouchableOpacity style={authStyles.centerStyle} onPress={()=>Actions.push('AppointmentTodayScreen')}> */}
                                    <Text style={authStyles.authButton1}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        
                    </View>
                </ScrollView>
                <Modal
                    transparent={true}
                    isVisible={this.state.policyModal}
                    animationIn = {"slideInUp"}
                    animationInTiming = {500}
                    animationOutTiming = {500}
                    style = {[MainStyles.SMSModalStyle, {paddingBottom: 20}]}
                >
                    <View style = {[MainStyles.smsStyle, {paddingBottom: 20}]}>
                        <TouchableOpacity style = {{width: "100%", padding: 10, marginTop: 20}} onPress = {() => this.setState({policyModal: !this.state.policyModal})}>
                            <Text style = {{width: "100%", textAlign: "right", marginTop: 20, paddingRight: 20}}>x</Text>
                        </TouchableOpacity>
                        <ScrollView style = {{width: "100%"}}>
                            <View style={{flex: 1, width: "100%", padding: LAYOUT.window.width * 0.05}}>
                                <Text style = {{fontSize: LAYOUT.fontSize3, color: COLOR.mainColor, fontWeight: "bold", paddingBottom: 20, width: "100%", textAlign: "center"}}>eClinicforyou.com</Text>
                                <Text style = {{fontSize: LAYOUT.fontSize2, fontWeight: "bold", paddingBottom: 20, width: "100%", textAlign: "center"}}>eClinicforyou.com</Text>
                                {privacyArray.map((item, idx) => {
                                    return(
                                        <View style = {{marginBottom: 30, justifyContent: "flex-start"}} key = {idx + 'policy'}>
                                            <Text style = {{color: COLOR.mainColor, fontSize: LAYOUT.fontSize2}}>{item.title}</Text>
                                            <Text style = {{fontSize: LAYOUT.fontSize1}}>{item.description}</Text>
                                        </View>
                                    )

                                })}
                            </View>
                        </ScrollView>
                        <View style = {{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                            <TouchableOpacity style = {[MainStyles.infoButton, {padding: 10, width: '40%', borderColor: "#28a77e", borderWidth: 1, backgroundColor: "white"}]} onPress = {() => this.setState({policyModal: !this.state.policyModal})} >
                                <Text style = {{fontSize: LAYOUT.fontSize01, color: "#28a77e", textAlign: "center"}}>Got it</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* </LinearGradient> */}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    cityAndState: state.auth.cityAndState
})

const mapDispatchToProps = {
    MemberRegister, getCityAndStateFromZipcode
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)



const styles = StyleSheet.create({
    header:{
        // backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        padding:10,
        // position: "absolute",
        // top: 0
    },
    headerText: {
        textAlign: "left",
        fontSize: LAYOUT.fontSize3,
        fontWeight: "bold",
        color: "black"
    },    
    headerBackground:{
        width:LAYOUT.window.width,
        flexDirection:'row',
        alignItems:'center',
    },
    headerTitle:{
        fontSize:LAYOUT.fontSize5,
        color:COLOR.whiteColor,
        fontWeight:'600',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        paddingRight: 30
    }
})
