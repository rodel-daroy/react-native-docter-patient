import React from 'react';
import { connect } from "react-redux";
import { View, Text, TouchableOpacity , StatusBar, ScrollView, Alert } from 'react-native';
import { Container } from 'native-base';
import { TextInput } from "react-native-paper"
import { Actions } from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome"

import authStyles from "../AuthStyle";
import Header from "../../MainScreens/Header/SecondHeader"
import Footer from "../../MainScreens/Footer/ProviderFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { changeProviderPassword } from "../../../redux/actions/providerActions";

export class ProviderChangePassword extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    changePassword = () => {
        if(this.state.newPassword === "" || this.state.oldPassword === "" || this.state.confirmPassword === "") {
            Alert.alert("Notification",
                "Enter all field!",
            )
            return;
        }
        if(this.state.newPassword !== this.state.confirmPassword) {
            Alert.alert("Error!",
                "Match Confirm Password!",
            )
            return;
        }
        this.props.changeProviderPassword(this.state);
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
                <View style={[authStyles.HeaderStyle, {marginBottom: LAYOUT.window.width * 0.1}]}></View>
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
                        <TouchableOpacity style={authStyles.centerStyle} onPress={()=> this.changePassword()}>
                            <Text style={authStyles.authButton}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})  

const mapDispatchToProps = {
    changeProviderPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderChangePassword)

