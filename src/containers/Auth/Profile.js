import React from 'react';
import { connect } from "react-redux"
import { Platform, View, Text, TouchableOpacity , StatusBar, ScrollView } from 'react-native';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import DatePicker from 'react-native-datepicker'
import { Picker } from "@react-native-picker/picker"

import authStyles from "./AuthStyle";
import MainStyles from "../MainScreens/Style/MainStyle"
import Footer from "../MainScreens/Footer/PatientFooter"
import Header from "../MainScreens/Header/SecondHeader"
import { LAYOUT, COLOR } from '../../constants';
import { memberProfileUpdate, getMemberData } from "../../redux/actions/memberActions"

export class Profile extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        maxDate: ((new Date()).getFullYear()) + '-' + (((new Date()).getMonth() + 1) >= 10 ? ((new Date()).getMonth() + 1) : '0' + ((new Date()).getMonth() + 1)) + '-' + ((new Date()).getDate() >= 10 ? (new Date()).getDate() : '0' + (new Date()).getDate()),
        firstName: "",
        lastName: "",
        phoneNumber: "",
        genderList: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
        ],
        gender: "",
        address1: "",
        address2: "",
        zipCode: "",
        city: "",
        state: "",
        birthday: "",
        showDropDown: false

    }
    componentDidMount() {
        this.props.getMemberData();
        StatusBar.setHidden(true);
    }

    componentDidUpdate(prevProps){
        if(prevProps.memberData !== this.props.memberData) {
            if(this.props.memberData.currentMemberData) {
                this.setState({
                    firstName: this.props.memberData.currentMemberData[0].first_name,
                    lastName: this.props.memberData.currentMemberData[0].last_name,
                    phoneNumber: this.props.memberData.currentMemberData[0].phone,
                    gender: this.props.memberData.currentMemberData[0].gender,
                    address1: this.props.memberData.currentMemberData[0].address1,
                    address2: this.props.memberData.currentMemberData[0].address2,
                    zipCode: this.props.memberData.currentMemberData[0].zipcode,
                    city: this.props.memberData.currentMemberData[0].city,
                    state: this.props.memberData.currentMemberData[0].state,
                    birthday: this.props.memberData.currentMemberData[0].dob,
                })
            }
        }
    }

    nextPage = () => {
        this.props.memberProfileUpdate({profileData: this.state});
    }

    render(){
        return(
            <Container style={authStyles.container}>
                <Header 
                    headerText = {"Change Profile"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={authStyles.HeaderStyle}>
                    {/* <Text style={[authStyles.HeaderText, {borderBottomWidth: 0, borderTopWidth: 0}]}>Profile</Text> */}
                </View>
                {/* </ImageBackground> */}
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
                                selectedValue = {this.state.gender}
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
                        <DatePicker
                            style={{width: LAYOUT.window.width * 0.7, textAlign: 'left', borderTopWidth: 0}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder="Date Of Birth"
                            format="YYYY-MM-DD"
                            maxDate = {this.state.maxDate}
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
                                    marginTop: 10,
                                    paddingLeft: 10,
                                    fontSize: LAYOUT.fontSize2,
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
                        <TouchableOpacity style={authStyles.centerStyle} onPress={() => this.nextPage()}>
                            <Text style={authStyles.authButton}>Update</Text>
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
        memberData: state.member
    }
}

const mapDispatchToProps = {
    memberProfileUpdate, getMemberData
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

