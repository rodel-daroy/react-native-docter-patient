import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, ScrollView} from 'react-native';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
// import { OutlinedTextField } from 'react-native-material-textfield';

import authStyles from "./AuthStyle";
import Footer from "../MainScreens/Footer/MemberFooter"
import Header from "../MainScreens/Header/SecondHeader"
import { Actions } from 'react-native-router-flux';
import { COLOR, LAYOUT } from '../../constants';
import { memberChangePassword } from "../../redux/actions/memberActions"

export class ChangePassword extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        password: "",
        newPassword: "",
        confirmPassword: "",
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    }
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    updatePassword = () => {
        if(this.state.newPassword !== this.state.confirmPassword) {
            alert('Incorrect ConfirmPassword. Try again!');
            return ;
        }
        this.props.memberChangePassword({newPassword: this.state.newPassword, oldPassword: this.state.password})
        // Actions.push('AppointmentTodayScreen')
    }

    render(){
        return(
            <Container style={authStyles.container}>
                <Header 
                    headerText = {"Change Password"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                    <View style={[authStyles.HeaderStyle, {marginBottom: LAYOUT.window.width * 0.1}]}>
                        {/* <Text style={authStyles.HeaderText}>Member</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={authStyles.main1}>
                        <View style = {{flexDirection: "row",alignItems: "center", width: "100%"}}>
                            <TextInput
                                secureTextEntry = {!this.state.showPassword}
                                style={[authStyles.TextInput, {marginBottom: 30, width: "90%"}]}
                                theme={{
                                    colors: { placeholder: COLOR.mainColor,  text: COLOR.mainColor, primary: COLOR.mainColor, underlineColor: COLOR.mainColor, background: 'transparent'
                                    }
                                }}
                                underlineColor = {COLOR.mainColor}
                                label="Old Password"
                                value = {this.state.password}
                                Outlined = {true}
                                onChangeText={text => this.setState({password: text})}
                            />
                            <TouchableOpacity style = {{width: "10%", padding: 10}} onPress = {() => this.setState({showPassword: !this.state.showPassword})}>
                                <FontAwesome name = { this.state.showPassword ? "eye-slash" : "eye"} size = {20} color = {COLOR.mainColor}></FontAwesome>
                            </TouchableOpacity>
                        </View>
                        <View style = {{flexDirection: "row",alignItems: "center", width: "100%"}}>
                            <TextInput
                                secureTextEntry = {!this.state.showNewPassword}
                                style={[authStyles.TextInput, {marginBottom: 30, width: "90%"}]}
                                theme={{
                                    colors: { placeholder: COLOR.mainColor,  text: COLOR.mainColor, primary: COLOR.mainColor, underlineColor: COLOR.mainColor, background: 'transparent'
                                    }
                                }}
                                underlineColor = {COLOR.mainColor}
                                label="New Password"
                                value = {this.state.newPassword}
                                Outlined = {true}
                                onChangeText={text => this.setState({newPassword: text})}
                            />
                            <TouchableOpacity style = {{width: "10%", padding: 10}} onPress = {() => this.setState({showNewPassword: !this.state.showNewPassword})}>
                                <FontAwesome name = { this.state.showNewPassword ? "eye-slash" : "eye"} size = {20} color = {COLOR.mainColor}></FontAwesome>
                            </TouchableOpacity>
                        </View>
                        <View style = {{flexDirection: "row",alignItems: "center", width: "100%"}}>
                            <TextInput
                                secureTextEntry = {!this.state.showConfirmPassword}
                                style={[authStyles.TextInput, {marginBottom: 30, width: "90%"}]}
                                theme={{
                                    colors: { placeholder: COLOR.mainColor,  text: COLOR.mainColor, primary: COLOR.mainColor, underlineColor: COLOR.mainColor, background: 'transparent'
                                    }
                                }}
                                underlineColor = {COLOR.mainColor}
                                label="Confirm Password"
                                value = {this.state.confirmPassword}
                                Outlined = {true}
                                onChangeText={text => this.setState({confirmPassword: text})}
                            />
                            <TouchableOpacity style = {{width: "10%", padding: 10}} onPress = {() => this.setState({showConfirmPassword: !this.state.showConfirmPassword})}>
                                <FontAwesome name = { this.state.showConfirmPassword ? "eye-slash" : "eye"} size = {20} color = {COLOR.mainColor}></FontAwesome>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={authStyles.centerStyle} onPress={()=> this.updatePassword()}>
                            <Text style={authStyles.authButton}>Change</Text>
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
    memberChangePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)

