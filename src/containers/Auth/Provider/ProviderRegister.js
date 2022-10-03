import React from 'react';
import { connect } from "react-redux"
import StepIndicator from 'react-native-step-indicator';
import { Platform, View, Text, TouchableOpacity , StatusBar, ScrollView, StyleSheet, Image } from 'react-native';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
// import MultiSelect from 'react-native-multiple-select';
import MultiSelect from '../../../components/MultiSelect';
import Textarea from "react-native-textarea"
import { Picker } from "@react-native-picker/picker"
import { Actions } from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import authStyles from "../AuthStyle";
import MainStyles from "../../MainScreens/Style/MainStyle"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getKnownLanguageData, getLicenseStates } from "../../../redux/actions/providerActions"
import { providerRegisterFunc, getCityAndStateFromZipcode } from "../../../redux/actions/authActions";

import Logo from "../../../assets/logo.png";
const theme={
    colors: { placeholder: '#ffffff',  text: '#ffffff',  primary: '#ffffff', background: 'transparent'}
}
const BoardCertifiedArray = [
    {label: "Yes", value: "Yes"},
    {label: "No", value: "No"},
];

const InterestedInArray = [
    {label: "General Health", value: "1"},
    {label: "2nd Option", value: "2"},
    {label: "Both", value: "0"},
];

const labels = ["Step 1","Step 2","Step 3"];
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



export class ProviderRegister extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'firstPage');
        
        var maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18);
     
        this.state = {
            firstName: "Dr.",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            genderList: [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
            gender: "Male",
            address1: "",
            address2: "",
            zipCode: "",
            city: "",
            state: "",
            birthday: "",
            selectedKnownLanguage: [],
            residency: "",
            professional_education: "",
            experienceYear: "",
            selectedBoardCertifiedRadio: "Yes",
            boardCertifiedin: "",
            primaryCare: "",
            SelectStatesLicenced: [],
            fellowShip: "",
            specialityCare: "",
            affiliation: "",
            stateRegistrations: "",
            NPI: "",
            DEA: "",
            BNDD: "",
            selectedInterestedIn: '',
            yourDescription: "",
            referredBy: "",
            knownLanguageArray: [],
            licenseStateArray: [],
            currentPage:0,
            passwordShow: false,
            maxDate: maxDate
        }
    }

    componentDidMount(){
        setNavigator(this.props.navigation, 'firstPage')
        // if(getToken().Usertype == "provider") {
        //     Actions.push('ProviderDashboardScreen');
        // }
        StatusBar.setHidden(true);
        this.props.getKnownLanguageData();
        this.props.getLicenseStates();
    }
    
    componentDidUpdate(prevProps){
        setNavigator(this.props.navigation, 'firstPage')
        if(prevProps.listData !== this.props.listData) {
            if(this.props.listData.knownLanguage) {
                var array = [];
                for(var i = 0; i < this.props.listData.knownLanguage.length; i ++) {
                    if(array.filter(obj => obj.id == this.props.listData.knownLanguage[i].language_name).length == 0) {
                        array.push({
                            id: this.props.listData.knownLanguage[i].language_name,
                            name: this.props.listData.knownLanguage[i].language_name
                        })
                    }
                }
                this.setState({knownLanguageArray: array});
            }
            if(this.props.listData.license_states) {
                var array = [];
                for(var i = 0; i < this.props.listData.license_states.length; i ++) {
                    if(array.filter(obj => obj.id == this.props.listData.license_states[i].state_name).length == 0) {
                        array.push({
                            id: this.props.listData.license_states[i].state_name,
                            name: this.props.listData.license_states[i].state_name
                        })
                    }
                }
                this.setState({licenseStateArray: array})
            }
        }
        
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

    onSelectedKnownLanguageChange = selectedItems => {
        this.setState({ selectedKnownLanguage: selectedItems });
    };

    onSelectedStatesLicencedChange = selectedItems => {
        this.setState({ SelectStatesLicenced: selectedItems });
    };

    register = () => {
        if(!this.validate3()){
            return;
        }

        if(!this.validate2()) {
            this.setState({currentPage: 1});
            return;
        }

        if(!this.validate1()) {
            this.setState({currentPage: 0});
            return;
        }
        
        var datas = this.state;
        datas.tz = this.diff_to_GMT(new Date());
        this.props.providerRegisterFunc(datas);
    }

    diff_to_GMT = (dt) => {
        return (-dt.getTimezoneOffset() < 0 ? '-' : '+') + Math.abs(dt.getTimezoneOffset() / 60);
    }

    getCityAndState = (zipCode) => {
        this.setState({zipCode: zipCode});
        this.props.getCityAndStateFromZipcode({zipcode: zipCode});
    }

    validateAndNext1 = () => {
        if(!this.validate1()) {
            return;
        }

        this.scroller.scrollTo({x: 0, y: 0});
        this.setState({currentPage:++this.state.currentPage})
    }

    validateAndNext2 = () => {
        if(!this.validate2()) {
            return;
        }

        this.scroller.scrollTo({x: 0, y: 0});
        this.setState({currentPage:++this.state.currentPage})
    }

    validate1 = () => {
        var require_fields = {
            'firstName': 'First Name', 
            'lastName': 'Last Name', 
            'email': 'Email', 
            'password': 'Password', 
            'confirmPassword': 'Confirm Password', 
            'phoneNumber': 'Phone Number',
            'address1': 'Address 1', 
            'zipCode': 'Zipcode', 
            'city': 'City', 
            'state': 'State', 
            'birthday': 'Date of Birth'};
        for(var f in require_fields) {
            if(this.state[f] == "") {
                alert("Please enter " + require_fields[f]);
                return false;
            }
        }

        if(this.state.firstName.trim() == "Dr.") {
            alert("Please enter first name.");
            return;
        }

        var phoneno = /^\d{10}$/;
        if(!this.state.phoneNumber.match(phoneno))
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

        var optimizedBirthday = this.state.birthday.replace(/-/g, "/");
        var myBirthday = new Date(optimizedBirthday);
        var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
        var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

        if(myAge < 18) {
            alert("You must be 18+ years of age to become a member.");
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
            'professional_education': 'Profesional Education', 
            'experienceYear': 'Years of Experience', 
            'SelectStatesLicenced': 'States Licenced', 
            'stateRegistrations': 'State registration'};
        for(var f in require_fields) {
            if(this.state[f].length == 0) {
                alert("Please enter " + require_fields[f]);
                return false;
            }
        }

        return true;
    }

    validate3 = () => {
        var require_fields = {
            'NPI': 'NPI #', 
            'DEA': 'DEA #', 
            'yourDescription': 'Tell about your self'};
        for(var f in require_fields) {
            if(this.state[f] == "") {
                alert("Please enter " + require_fields[f]);
                return false;
            }
        }

        return true;
    }

    selectedStep = (ind) => {
        this.scroller.scrollTo({x: 0, y: 0});
        this.setState({currentPage: ind})
    }

    render(){
        return(
            <Container style={[authStyles.container, {backgroundColor: COLOR.mainColor, height: LAYOUT.window.height, justifyContent: "center", alignItems: "center"}]}>
                <View>
                    <View style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <Image source = {Logo} style = {{width: LAYOUT.window.width * 0.6, height: LAYOUT.window.width * 0.2 }} />
                    </View>
                </View>
                <View style={{width: "100%", paddingLeft: 20}}>
                    <View style = {{display: "flex", flexDirection: "row"}}>
                        <TouchableOpacity onPress = {() => Actions.reset('ProviderLoginScreen')}>
                            <View style={styles.headerLeft}>
                                <FontAwesome name = "arrow-left" size = {30} color = {"white"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView ref={(scroller) => {this.scroller = scroller}}>
                    <View style={authStyles.registerMain1}>
                        <View style={authStyles.mainHeader}>
                            <Text style={authStyles.mainHeaderText1}>Doctor Registration</Text>
                        </View>
                        <StepIndicator
                            customStyles={customStyles}
                            stepCount={3}
                            currentPosition={this.state.currentPage}
                            labels={labels}
                            onPress={ind => this.selectedStep(ind)}
                        />
                            {
                                this.state.currentPage===0&&
                                <View>
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="First Name"
                                        Outlined = {true}
                                        value = {this.state.firstName}
                                        onChangeText={text => this.setState({firstName: text})}
                                    />
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="Last Name"
                                        Outlined = {true}
                                        value = {this.state.lastName}
                                        onChangeText={text => this.setState({lastName: text})}
                                    />
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="Email"
                                        Outlined = {true}
                                        value = {this.state.email}
                                        onChangeText={text => this.setState({email: text})}
                                    />
                                    <TextInput
                                        secureTextEntry = {!this.state.passwordShow}
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
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
                                        theme={theme}
                                        underlineColor = {"white"}
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
                                        keyboardType="number-pad"
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="Phone Number"
                                        Outlined = {true}
                                        value = {this.state.phoneNumber}
                                        onChangeText={text => this.setState({phoneNumber: text})}
                                    />
                                    <View style = {{borderBottomColor: "white", borderBottomWidth: 1, marginBottom: 20}}>
                                        <Picker
                                            selectedValue={this.state.gender}
                                            style={[MainStyles.pickerStyle1, {marginBottom: 0, color: 'white' }]}
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
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="Address 1"
                                        Outlined = {false}
                                        value = {this.state.address1}
                                        onChangeText={text => this.setState({address1: text})}
                                    />
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="Address 2"
                                        Outlined = {true}
                                        value = {this.state.address2}
                                        onChangeText={text => this.setState({address2: text})}
                                    />
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        keyboardType="number-pad"
                                        label="ZipCode"
                                        Outlined = {true}
                                        value = {this.state.zipCode}
                                        onChangeText={text => this.getCityAndState(text)}
                                    />
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="City"
                                        editable={false}
                                        Outlined = {true}
                                        value = {this.state.city}
                                        onChangeText={text => this.setState({city: text})}
                                    />
                                    <TextInput
                                        style={authStyles.TextInput}
                                        theme={theme}
                                        underlineColor = {"white"}
                                        label="State"
                                        Outlined = {true}
                                        editable={false}
                                        value = {this.state.state}
                                        onChangeText={text => this.setState({state: text})}
                                    />
                                    <DatePicker
                                        style={{width: "100%", textAlign: 'left', borderTopWidth: 0, marginTop: 10}}
                                        date={this.state.birthday}
                                        mode="date"
                                        placeholder="Date Of Birth"
                                        format="YYYY-MM-DD"
                                        androidMode = {"spinner"}
                                        maxDate={this.state.maxDate}
                                        // maxDate="2016-06-01"
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
                                                borderBottomColor: 'white',
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                paddingBottom: 20,
                                            },
                                            dateText: {
                                                color: 'white',
                                            },
                                            placeholderText: {
                                                textAlign: "left",
                                                alignItems: 'flex-start',
                                                color: "white",
                                                fontSize: 15,
                                                // marginLeft: 10
                                            },
                                        }}
                                        onDateChange={(date) => {this.setState({birthday: date})}}
                                    />
                                    <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.validateAndNext1()}>
                                        <Text style={authStyles.authButton1}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                this.state.currentPage===1&&
                                <View>
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Residency"
                                    Outlined = {true}
                                    value = {this.state.residency}
                                    onChangeText={text => this.setState({residency: text})}
                                />
                                <MultiSelect
                                    hideTags
                                    items={this.state.knownLanguageArray}
                                    uniqueKey="id"
                                    ref={(component) => { this.multiSelect1 = component }}
                                    onSelectedItemsChange={this.onSelectedKnownLanguageChange}
                                    selectedItems={this.state.selectedKnownLanguage}
                                    selectText="Select Known Languages"
                                    searchInputPlaceholderText="Search Items..."
                                    onChangeInput={ (text)=> console.log(text)}
                                    tagRemoveIconColor = {"white"}
                                    tagBorderColor = {"white"}
                                    tagTextColor = {"white"}
                                    selectedItemTextColor = {COLOR.mainColor}
                                    selectedItemIconColor = {COLOR.mainColor}
                                    itemTextColor="#000"
                                    styleDropdownMenuSubsection = {{paddingLeft: 12, backgroundColor: "transparent"}}
                                    styleTextDropdown={{color: 'white', fontSize: LAYOUT.fontSize01}}
                                    styleTextDropdownSelected={{color: 'white', fontSize: LAYOUT.fontSize01}}
                                    displayKey="name"
                                    searchInputStyle={{ color: COLOR.mainColor }}
                                    submitButtonColor = {COLOR.mainColor}
                                    submitButtonText="OK"
                                />
                                <View>
                                    {this.multiSelect1&&this.multiSelect1.getSelectedItemsExt(this.state.selectedKnownLanguage)}
                                </View>
                                
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Professional Education"
                                    Outlined = {true}
                                    value = {this.state.professional_education}
                                    onChangeText={text => this.setState({professional_education: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Year of Experience"
                                    keyboardType="number-pad"
                                    Outlined = {true}
                                    value = {this.state.experienceYear}
                                    onChangeText={text => this.setState({experienceYear: text})}
                                />
                                <View style = {[MainStyles.checkboxGroup, {borderBottomColor: "transparent", flexDirection: "row", justifyContent: "center", alignItems: "center"}]}>
                                    <Text style = {{color: "white"}}>Board Certified</Text>
                                    <RadioForm
                                        animation={true}
                                        initial = {0}
                                        formHorizontal = {true}
                                    >
                                        {
                                            BoardCertifiedArray.map((obj, i) => (
                                                <RadioButton labelHorizontal={true} key={i} >
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={this.state.selectedBoardCertifiedRadio === obj.value}
                                                        onPress={(text) => {this.setState({selectedBoardCertifiedRadio: text})}}
                                                        borderWidth={1}
                                                        buttonInnerColor={"white"}
                                                        buttonOuterColor={"white"}
                                                        buttonSize={20}
                                                        buttonOuterSize={30}
                                                        // buttonStyle={{margin: 10}}
                                                        buttonWrapStyle={{marginLeft: 10}}

                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        onPress={(text) => {this.setState({selectedBoardCertifiedRadio: text})}}
                                                        labelStyle={{fontSize: LAYOUT.fontSize1}}
                                                        // labelWrapStyle={{margin: 10, marginLeft: 0}}
                                                    />
                                                </RadioButton>
                                            ))
                                        }  
                                    </RadioForm>
                                </View>
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="IF YES, BOARD CERTIFIED IN"
                                    disabled = {this.state.selectedBoardCertifiedRadio == "Yes" ? false : true}
                                    Outlined = {true}
                                    value = {this.state.boardCertifiedin}
                                    onChangeText={text => this.setState({boardCertifiedin: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Primary Care"
                                    Outlined = {true}
                                    value = {this.state.primaryCare}
                                    onChangeText={text => this.setState({primaryCare: text})}
                                />
                                <MultiSelect
                                    hideTags
                                    items={this.state.licenseStateArray}
                                    uniqueKey="id"
                                    ref={(component) => { this.multiSelect2 = component }}
                                    onSelectedItemsChange={this.onSelectedStatesLicencedChange}
                                    selectedItems={this.state.SelectStatesLicenced}
                                    selectText="States Licenced In:"
                                    searchInputPlaceholderText="Search Items..."
                                    onChangeInput={ (text)=> console.log(text)}
                                    tagRemoveIconColor = {"white"}
                                    tagBorderColor = {"white"}
                                    tagTextColor = {"white"}
                                    selectedItemTextColor = {COLOR.mainColor}
                                    selectedItemIconColor = {COLOR.mainColor}
                                    itemTextColor="#000"
                                    styleDropdownMenuSubsection = {{paddingLeft: 12, backgroundColor: "transparent"}}
                                    styleTextDropdown={{color: 'white', fontSize: LAYOUT.fontSize01}}
                                    styleTextDropdownSelected={{color: 'white', fontSize: LAYOUT.fontSize01}}
                                    displayKey="name"
                                    searchInputStyle={{ color: COLOR.mainColor }}
                                    submitButtonColor = {COLOR.mainColor}
                                    submitButtonText="OK"
                                />
                                <View>
                                    {this.multiSelect2&&this.multiSelect2.getSelectedItemsExt(this.state.SelectStatesLicenced)}
                                </View>

                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="FellowShips"
                                    Outlined = {true}
                                    value = {this.state.fellowShip}
                                    onChangeText={text => this.setState({fellowShip: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Speciality Care"
                                    Outlined = {true}
                                    value = {this.state.specialityCare}
                                    onChangeText={text => this.setState({specialityCare: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Affiliations"
                                    Outlined = {true}
                                    value = {this.state.affiliation}
                                    onChangeText={text => this.setState({affiliation: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="State Registrations#"
                                    Outlined = {true}
                                    value = {this.state.stateRegistrations}
                                    onChangeText={text => this.setState({stateRegistrations: text})}
                                />
                                <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.validateAndNext2()}>
                                    <Text style={authStyles.authButton1}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            this.state.currentPage===2&&
                            <View>
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="NPI #"
                                    Outlined = {true}
                                    value = {this.state.NPI}
                                    onChangeText={text => this.setState({NPI: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="DEA#"
                                    Outlined = {true}
                                    value = {this.state.DEA}
                                    onChangeText={text => this.setState({DEA: text})}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="BNDD If Any#"
                                    Outlined = {true}
                                    value = {this.state.BNDD}
                                    onChangeText={text => this.setState({BNDD: text})}
                                />
                                <View style = {[MainStyles.checkboxGroup, {borderBottomColor: "transparent"}]}>
                                    <Text style = {[MainStyles.checkboxGroupHeader, {color: "white", textAlign: 'left', marginBottom: 10, padding: 10}]}>Are you interested in:</Text>
                                    <RadioForm
                                        animation={true}
                                        initial = {0}
                                        // formHorizontal = {true}
                                    >
                                        {
                                            InterestedInArray.map((obj, i) => (
                                                <RadioButton labelHorizontal={true} key={i} >
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={this.state.selectedInterestedIn === obj.value}
                                                        onPress={(text) => {this.setState({selectedInterestedIn: text})}}
                                                        borderWidth={1}
                                                        buttonInnerColor={"white"}
                                                        buttonOuterColor={"white"}
                                                        buttonSize={20}
                                                        buttonOuterSize={30}
                                                        // buttonStyle={{margin: 10}}
                                                        buttonWrapStyle={{marginLeft: 10}}
                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        onPress={(text) => {this.setState({selectedInterestedIn: text})}}
                                                        labelStyle={{fontSize: LAYOUT.fontSize1, color: "white"}}
                                                        // labelWrapStyle={{margin: 10, marginLeft: 0}}
                                                    />
                                                </RadioButton>
                                            ))
                                        }  
                                    </RadioForm>
                                </View>
                                <Textarea 
                                    containerStyle={MainStyles.textareaContainer}
                                    style={[MainStyles.textareaStyle, {borderColor: "white", color: "white"}]}
                                    onChangeText={(text) => this.setState({yourDescription: text})}
                                    //  defaultValue={this.state.text}
                                    value = {this.state.yourDescription}
                                    //  maxLength={120}
                                    placeholder={'Tell about yourself'}
                                    placeholderTextColor={'#fff'}
                                    //  underlineColorAndroid={'transparent'}
                                />
                                <TextInput
                                    style={authStyles.TextInput}
                                    theme={theme}
                                    underlineColor = {"white"}
                                    label="Referred By"
                                    Outlined = {true}
                                    value = {this.state.referredBy}
                                    onChangeText={text => this.setState({referredBy: text})}
                                />

                                {/* <View style={authStyles.centerStyle}>
                                    <Text style = {{fontSize: LAYOUT.fontSize1}}>Do you have already an account? <Text onPress={()=>Actions.push('ProviderLoginScreen')} style={{color: "#ffffff", fontSize: LAYOUT.fontSize2, textDecorationLine: 'underline',}}>Login</Text></Text>
                                </View> */}
                                {/* <TouchableOpacity style={authStyles.centerStyle} onPress={()=>Actions.push('ProviderDashboardScreen')}> */}
                                <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.register()}>
                                    <Text style={authStyles.authButton1}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    listData: state.provider,
    cityAndState: state.auth.cityAndState
})  

const mapDispatchToProps = {
    getKnownLanguageData, getLicenseStates, providerRegisterFunc, getCityAndStateFromZipcode
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderRegister)


const styles = StyleSheet.create({
    header:{
        // backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        padding:10,
        position: "absolute",
        top: 0
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
