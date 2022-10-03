import React from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity , StatusBar, ScrollView, StyleSheet, Image } from 'react-native';
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import { Actions } from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import authStyles from "../AuthStyle";
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { ProviderLogin } from "../../../redux/actions/authActions"
import Logo from "../../../assets/logo.png"

export class ProviderLoginScreen extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'firstPage')
    }
    componentDidUpdate(){
        setNavigator(this.props.navigation, 'firstPage');
    }
    state = {
        // login_email: "bosudk229@gmail.com",
        // password: "B@123456",
        login_email: "",
        password: "",
        passwordShow: false,
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'firstPage')
    }

    login = () => {
        if(this.state.login_email == ""){
            alert('Email is invalid!');
            return;
        }
        if(this.state.password == ""){
            alert('Password is invalid!');
            return;
        }

        var datas = this.state;
        datas.tz = this.diff_to_GMT(new Date());
        this.props.ProviderLogin(datas);
        // Actions.push('ProviderDashboardScreen');
    }

    diff_to_GMT = (dt) => {
        return (-dt.getTimezoneOffset() < 0 ? '-' : '+') + Math.abs(dt.getTimezoneOffset() / 60);
    }

    render(){
        return(
            <Container style={[authStyles.container, {backgroundColor: COLOR.mainColor, height: LAYOUT.window.height, alignItems: "center"}]}>
                <View style={styles.header}>
                    <Image source = {Logo} style = {{width: LAYOUT.window.width * 0.6, height: LAYOUT.window.width  * 0.6 * 1.38 / 4 }} />
                </View>
                <View style={authStyles.main1}>
                    <ScrollView>
                        <View style={authStyles.mainHeader}>
                            <Text style={[authStyles.mainHeaderText, styles.font, {color: "white", fontSize: LAYOUT.fontSize7}]}>Login As Doctor</Text>
                            {/* <View style = {{width: LAYOUT.window.width * 0.3, borderBottomColor: "white", borderBottomWidth: 1, marginTop: 20}}></View> */}
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
                            <View style = {{
                                flexDirection: "row",
                                alignItems: "center", 
                                width: "70%", 
                                justifyContent: "center", 
                                borderBottomWidth: 2.5, 
                                borderBottomColor: 'white',
                                marginBottom: 10
                            }}>
                                <TouchableOpacity style = {{paddingLeft: 10}}>
                                    <FontAwesome name = { "envelope-o" } size = {30} color = {"white"}></FontAwesome>
                                </TouchableOpacity>
                                <TextInput
                                    style={[{flex: 1, marginBottom: -2}]}
                                    theme={{
                                        colors: { placeholder: 'white', text: 'white', primary: "white", background: 'transparent'}
                                    }}
                                    underlineColor = "transparent"
                                    label="Email"
                                    value = {this.state.login_email}
                                    Outlined = {false}
                                    onChangeText={text => this.setState({login_email: text})}
                                />
                            </View>
                            <View style = {{
                                flexDirection: "row",
                                alignItems: "center", 
                                width: "70%", 
                                justifyContent: "center",
                                borderBottomWidth: 2.5, 
                                borderBottomColor: 'white'}}>
                                <TouchableOpacity style = {{paddingLeft: 10, paddingRight: 10}}>
                                    <FontAwesome name = { "lock" } size = {30} color = {"white"}></FontAwesome>
                                </TouchableOpacity>
                                <TextInput
                                    secureTextEntry = {!this.state.passwordShow}
                                    style={{flex: 1, marginBottom: -2}}
                                    theme={{
                                        colors: { placeholder: 'white', text: 'white', primary: "white", background: 'transparent'
                                        }
                                    }}
                                    underlineColor = "transparent"
                                    label="Password"
                                    value = {this.state.password}
                                    onChangeText={text => this.setState({password: text})}
                                />
                                <TouchableOpacity style = {{padding: 10}} onPress = {() => this.setState({passwordShow: !this.state.passwordShow})}>
                                    <FontAwesome name = { this.state.passwordShow ? "eye-slash" : "eye"} size = {20} color = {"white"}></FontAwesome>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={authStyles.centerStyle} onPress={()=>Actions.push('ForgotPasswordScreen', 0)}>
                            <Text style={styles.font}>Forgot Username or Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={authStyles.centerStyle} onPress={()=> this.login()}>
                            <Text style = {[authStyles.authButton, {backgroundColor: "white", color: COLOR.mainColor}]}>Login</Text>
                        </TouchableOpacity>
                        <View style={authStyles.centerStyle}>
                            <Text style={styles.font}>Do you want to have an account?</Text>
                            <Text onPress={()=>Actions.push('ProviderRegisterScreen')} style={{color: "white", fontSize: LAYOUT.fontSize2, textDecorationLine: "underline"}}>Sign Up</Text>
                        </View>
                        <View style={[authStyles.centerStyle, {flexDirection: "row"}]}>
                            <View style = {{borderBottomColor: "white", borderBottomWidth: 1, width: LAYOUT.window.width * 0.3}}></View>
                            <FontAwesome style = {{marginLeft: 20, marginRight: 20}} name = "handshake-o" size = {30} color = {"white"} />
                            <View style = {{borderBottomColor: "white", borderBottomWidth: 1, width: LAYOUT.window.width * 0.3}}></View>
                        </View>
                        <View style={authStyles.centerStyle}>
                        <Text style={styles.font}><Text onPress={()=>Actions.replace('LoginScreen')} style={{fontSize: LAYOUT.fontSize2, textDecorationLine: "underline"}}>Login As Member</Text></Text>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    ProviderLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderLoginScreen)



const styles = StyleSheet.create({
    header:{
        // backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        paddingTop:10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
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
    },
    font: {
        fontFamily: 'poorRichard',
        fontSize: 25, 
        color: "white",
    }
})
