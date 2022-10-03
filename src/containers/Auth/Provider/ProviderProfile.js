import React from 'react';
import { connect } from "react-redux"
import { Platform, View, Text, TouchableOpacity , StatusBar, ScrollView } from 'react-native';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
// import MultiSelect from 'react-native-multiple-select';
import MultiSelect from '../../../components/MultiSelect';
import Textarea from "react-native-textarea"
// import { getToken } from "../../../redux/services/index"
import { Picker } from "@react-native-picker/picker";

// import { Actions } from 'react-native-router-flux';

import authStyles from "../AuthStyle";
import MainStyles from "../../MainScreens/Style/MainStyle"
import Header from "../../MainScreens/Header/SecondHeader"
import Footer from "../../MainScreens/Footer/ProviderFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getKnownLanguageData, getLicenseStates, providerProfileUpdate } from "../../../redux/actions/providerActions"

const BoardCertifiedArray = [
    {label: "Yes", value: "Yes"},
    {label: "No", value: "No"},
];

const InterestedInArray = [
    {label: "General Health", value: "1"},
    {label: "2nd Option", value: "2"},
    {label: "Both", value: "0"},
];

export class ProviderProfileUpdate extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'providerPage')
    }
    state = {
        firstName: "",
        lastName: "",
        email: "",
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
        licenseStateArray: []
    }

    componentDidMount(){
        setNavigator(this.props.navigation, 'providerPage')
        // if(getToken().Usertype == "provider") {
        //     Actions.push('ProviderDashboardScreen');
        // }
        StatusBar.setHidden(true);
        this.props.getKnownLanguageData();
        this.props.getLicenseStates();

        this.setState({
            firstName: this.props.user.first_name ,
            lastName: this.props.user.last_name ,
            email: this.props.user.email ,
            phoneNumber: this.props.user.phone ,
            genderList: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
            gender: this.props.user.gender,
            address1: this.props.user.address1 ,
            address2: this.props.user.address2 ,
            zipCode: this.props.user.zipcode ,
            city: this.props.user.city ,
            state: this.props.user.state ,
            birthday: this.props.user.dob ,
            selectedKnownLanguage: this.props.user.known_language.split(','),
            residency: this.props.user.residency ,
            professional_education: this.props.user.professional_education ,
            experienceYear: this.props.user.experience ,
            selectedBoardCertifiedRadio: this.props.user.board_certified,
            boardCertifiedin: this.props.user.board_certified_description ,
            primaryCare: this.props.user.primary_care ,
            SelectStatesLicenced: this.props.user.license ? this.props.user.license.split(',') : [],
            fellowShip: this.props.user.fellowships ,
            specialityCare: this.props.user.speciality_care ,
            affiliation: this.props.user.affliations ,
            stateRegistrations: this.props.user.state_registration ,
            NPI: this.props.user.npi ,
            DEA: this.props.user.dea ,
            BNDD: this.props.user.bndd ,
            selectedInterestedIn: this.props.user.availbility_service ,
            yourDescription: this.props.user.profile_description ,
            referredBy: this.props.user.referred_by ,
        })
    }
    
    componentDidUpdate(prevProps){
        setNavigator(this.props.navigation, 'providerPage')
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
    }

    onSelectedKnownLanguageChange = selectedItems => {
        this.setState({ selectedKnownLanguage: selectedItems });
    };

    onSelectedStatesLicencedChange = selectedItems => {
        this.setState({ SelectStatesLicenced: selectedItems });
    };

    profileUpdate = () => {
        this.props.providerProfileUpdate(this.state);
    }

    render(){
        return(
            <Container style={authStyles.container}>
                <Header 
                    headerText = {"Change Profile"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={authStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={authStyles.main1}>
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="FirstName"
                            Outlined = {true}
                            value = {this.state.firstName}
                            onChangeText={text => this.setState({firstName: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="LastName"
                            Outlined = {true}
                            value = {this.state.lastName}
                            onChangeText={text => this.setState({lastName: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Email"
                            Outlined = {true}
                            value = {this.state.email}
                            onChangeText={text => this.setState({email: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="PhoneNumber"
                            Outlined = {true}
                            value = {this.state.phoneNumber}
                            onChangeText={text => this.setState({phoneNumber: text})}
                        />
                        <View style = {{borderBottomColor: COLOR.mainColor, borderBottomWidth: 1, marginBottom: 20}}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={[MainStyles.pickerStyle, {marginBottom: 0}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }
                            >
                                {this.state.genderList.map((item, idx) => {
                                    return(
                                        <Picker.Item label={item.label} value={item.value} key = {idx} />
                                    )
                                })}
                            </Picker>
                        </View>
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Address1"
                            Outlined = {true}
                            value = {this.state.address1}
                            onChangeText={text => this.setState({address1: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Address2"
                            Outlined = {true}
                            value = {this.state.address2}
                            onChangeText={text => this.setState({address2: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="ZipCode"
                            Outlined = {true}
                            value = {this.state.zipCode}
                            onChangeText={text => this.setState({zipCode: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="City"
                            Outlined = {true}
                            value = {this.state.city}
                            onChangeText={text => this.setState({city: text})}
                        />
                        <DatePicker
                            style={{width: LAYOUT.window.width * 0.7, textAlign: 'left', borderTopWidth: 0}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder="Date of Birth"
                            format="YYYY-MM-DD"
                            androidMode = {"spinner"}
                            // minDate="2016-05-01"
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
                            },
                        }}
                            onDateChange={(date) => {this.setState({birthday: date})}}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="State"
                            Outlined = {true}
                            value = {this.state.state}
                            onChangeText={text => this.setState({state: text})}
                        />
                        <MultiSelect
                            hideTags
                            items={this.state.knownLanguageArray}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedKnownLanguageChange}
                            selectedItems={this.state.selectedKnownLanguage}
                            selectText="Select Known Languages"
                            searchInputPlaceholderText="Search Items..."
                            onChangeInput={ (text)=> console.log(text)}
                            tagRemoveIconColor = {COLOR.mainColor}
                            tagBorderColor = {COLOR.mainColor}
                            tagTextColor = {COLOR.mainColor}
                            selectedItemTextColor = {COLOR.mainColor}
                            selectedItemIconColor = {COLOR.mainColor}
                            itemTextColor="#000"
                            styleDropdownMenuSubsection = {{paddingLeft: 12, backgroundColor: "transparent"}}
                            styleTextDropdown={{color: 'white', fontSize: LAYOUT.fontSize0}}
                            styleTextDropdownSelected={{color: 'white', fontSize: LAYOUT.fontSize0}}
                            displayKey="name"
                            searchInputStyle={{ color: COLOR.mainColor }}
                            submitButtonColor = {COLOR.mainColor}
                            submitButtonText="OK"
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Residency"
                            Outlined = {true}
                            value = {this.state.residency}
                            onChangeText={text => this.setState({residency: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Professional Education"
                            Outlined = {true}
                            value = {this.state.professional_education}
                            onChangeText={text => this.setState({professional_education: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Year of Experience"
                            Outlined = {true}
                            value = {this.state.experienceYear}
                            onChangeText={text => this.setState({experienceYear: text})}
                        />
                        <View style = {[MainStyles.checkboxGroup, {borderBottomColor: "transparent", flexDirection: "row", justifyContent: "center", alignItems: "center"}]}>
                            <Text style = {{color: COLOR.mainColor}}>Board Certified</Text>
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
                                                buttonInnerColor={COLOR.mainColor}
                                                buttonOuterColor={COLOR.mainColor}
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
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="IF YES, BOARD CERTIFIED IN"
                            disabled = {this.state.selectedBoardCertifiedRadio == "yes" ? false : true}
                            Outlined = {true}
                            value = {this.state.boardCertifiedin}
                            onChangeText={text => this.setState({boardCertifiedin: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Primary Care"
                            Outlined = {true}
                            value = {this.state.primaryCare}
                            onChangeText={text => this.setState({primaryCare: text})}
                        />
                        <MultiSelect
                            hideTags
                            items={this.state.licenseStateArray}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedStatesLicencedChange}
                            selectedItems={this.state.SelectStatesLicenced}
                            selectText="States Licenced In:"
                            searchInputPlaceholderText="Search Items..."
                            onChangeInput={ (text)=> console.log(text)}
                            tagRemoveIconColor = {COLOR.mainColor}
                            tagBorderColor = {COLOR.mainColor}
                            tagTextColor = {COLOR.mainColor}
                            selectedItemTextColor = {COLOR.mainColor}
                            selectedItemIconColor = {COLOR.mainColor}
                            itemTextColor="#000"
                            styleDropdownMenuSubsection = {{paddingLeft: 12, backgroundColor: "transparent"}}
                            styleTextDropdown={{color: 'white', fontSize: LAYOUT.fontSize0}}
                            styleTextDropdownSelected={{color: 'white', fontSize: LAYOUT.fontSize0}}
                            displayKey="name"
                            searchInputStyle={{ color: COLOR.mainColor }}
                            submitButtonColor = {COLOR.mainColor}
                            submitButtonText="OK"
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="FellowShips"
                            Outlined = {true}
                            value = {this.state.fellowShip}
                            onChangeText={text => this.setState({fellowShip: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Speciality Care"
                            Outlined = {true}
                            value = {this.state.specialityCare}
                            onChangeText={text => this.setState({specialityCare: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Affiliations"
                            Outlined = {true}
                            value = {this.state.affiliation}
                            onChangeText={text => this.setState({affiliation: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="State Registrations#"
                            Outlined = {true}
                            value = {this.state.stateRegistrations}
                            onChangeText={text => this.setState({stateRegistrations: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="NPI #"
                            Outlined = {true}
                            value = {this.state.NPI}
                            onChangeText={text => this.setState({NPI: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="DEA#"
                            Outlined = {true}
                            value = {this.state.DEA}
                            onChangeText={text => this.setState({DEA: text})}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="BNDD If Any#"
                            Outlined = {true}
                            value = {this.state.BNDD}
                            onChangeText={text => this.setState({BNDD: text})}
                        />
                        <View style = {[MainStyles.checkboxGroup, {borderBottomColor: "transparent"}]}>
                            <Text style = {MainStyles.checkboxGroupHeader}>Are you interested in</Text>
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
                                                buttonInnerColor={COLOR.mainColor}
                                                buttonOuterColor={COLOR.mainColor}
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
                                                labelStyle={{fontSize: LAYOUT.fontSize1, color: COLOR.mainColor}}
                                                // labelWrapStyle={{margin: 10, marginLeft: 0}}
                                            />
                                        </RadioButton>
                                    ))
                                }  
                            </RadioForm>
                        </View>
                        <Textarea 
                            containerStyle={MainStyles.textareaContainer}
                            style={MainStyles.textareaStyle}
                            onChangeText={(text) => this.setState({yourDescription: text})}
                            //  defaultValue={this.state.text}
                            value = {this.state.yourDescription}
                            //  maxLength={120}
                             placeholder={'Tell about yourself'}
                             placeholderTextColor={'#c7c7c7'}
                             underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={authStyles.TextInput}
                            theme={{
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Referred By"
                            Outlined = {true}
                            value = {this.state.referredBy}
                            onChangeText={text => this.setState({referredBy: text})}
                        />
                        <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.profileUpdate()}>
                            <Text style={authStyles.authButton}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    listData: state.provider,
    user: state.auth.user
})  

const mapDispatchToProps = {
    getKnownLanguageData, getLicenseStates, providerProfileUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfileUpdate)
