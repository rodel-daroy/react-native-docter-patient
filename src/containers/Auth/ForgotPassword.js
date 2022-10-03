import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, ScrollView} from 'react-native';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"

import authStyles from "./AuthStyle";
import Footer from "../MainScreens/Footer/MemberFooter"
import Header from "../MainScreens/Header/SecondHeader"
import { COLOR, LAYOUT } from '../../constants';
import { forgotPassword } from "../../redux/actions/authActions"

import MainStyles from "../MainScreens/Style/MainStyle"

export class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            forgotPasswordEmail: "",
            member: props.navigation.state.params.data
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }
    
    sendForgotPasswordEmail = () => {
        this.props.forgotPassword({
            member: this.state.member,
            email: this.state.forgotPasswordEmail
        })
    }

    render(){
        return(
            <Container style={authStyles.container}>
                <Header 
                    headerText = {"Forgot Password"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                    <View style={[authStyles.HeaderStyle, {marginBottom: LAYOUT.window.width * 0.1}]}></View>
                {/* </ImageBackground> */}
                <View style = {MainStyles.smsStyle}>
                    <ScrollView>
                        <Text style = {{fontSize: LAYOUT.fontSize3, fontWeight: "bold", paddingBottom: 20}}>Forgot Password / Email</Text>
                        <Text>We will send you an E-mail with temporary password. If you forgot your Email Id, please call us at (903) 8846601 Or Send an email to support@eclinicforyou.com</Text>
                        <TextInput
                            style={[authStyles.TextInput, {marginBottom: 30}]}
                            theme={{
                                colors: { placeholder: COLOR.mainColor,  text: COLOR.mainColor, primary: COLOR.mainColor, underlineColor: 'white', background: 'transparent'
                                }
                            }}
                            underlineColor = {COLOR.mainColor}
                            label="Email Address"
                            value = {this.state.forgotPasswordEmail}
                            Outlined = {true}
                            onChangeText={text => this.setState({forgotPasswordEmail: text})}
                        />
                        <View style = {{flexDirection: "row", justifyContent: "center"}}>
                            <TouchableOpacity style = {{padding: 10, width: '100%', marginRight: "10%", backgroundColor: COLOR.mainColor}} onPress = {() => this.sendForgotPasswordEmail()} >
                                <Text style = {{fontSize: LAYOUT.fontSize0, color: 'white', textAlign: "center"}}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
    forgotPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)