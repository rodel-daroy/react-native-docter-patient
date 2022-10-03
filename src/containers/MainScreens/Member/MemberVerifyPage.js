import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet} from 'react-native';
import { Container} from 'native-base';
import { RadioButton, TextInput } from "react-native-paper";

import MainStyles from "../Style/MainStyle";
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import Footer from "../Footer/SignOutFooter"
import Indecate from "../Indicating"
import { sendOtp, updateOtp } from "../../../redux/actions/memberActions"

export class MemberVerifyPageScreen extends React.Component{
    constructor(props){
        super(props);

        var params = props.navigation.state.params || {};
        setNavigator(props.navigation, 'secondPage')        
        
        this.state = {
            member: params.member,
            to: 0,
            isloading: false,
            sent: 0,
            otpcode: "",
            checked: 0
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props)
        {
            this.setState({isloading: false, sent: this.props.sent, checked: this.props.checked});
        }
    }

    sendOtp() {
        this.setState({isloading: true});
        this.props.sendOtp({
            memberDbId: this.state.member.id,
            to: this.state.to
        });
    }

    updateOtp() {
        this.setState({isloading: true});
        this.props.updateOtp({
            memberDbId: this.state.member.id,
            otp: this.state.otpcode
        });
    }

    againSend() {
        this.setState({sent: 0});
    }

    render(){
        return(
            <Container>
                <ScrollView>
                {
                    this.state.isloading ? 
                    <Indecate /> :
                    <View style={MainStyles.main}>
                        <View>
                            <Text style={styles.title}>Welcome to eClinicforyou, Please complete your verification process</Text>
                        </View>
                        {
                            this.state.sent > 0 ? 
                            <View>
                                <View><Text style={styles.subtitle}>Enter Your Verify Code: </Text></View>
                                <View>
                                    <TextInput
                                        keyboardType="number-pad"
                                        theme={{
                                            colors: { text: COLOR.mainColor,  primary: COLOR.mainColor, background: "#ffffff"
                                            }
                                        }}
                                        onChangeText={text => this.setState({otpcode: text})}
                                    />
                                </View>
                                <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.againSend()}>
                                    <Text style={MainStyles.Button}>Send Again</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.centerStyle, {marginTop: 5}]} onPress={() => this.updateOtp()}>
                                    <Text style={MainStyles.Button}>Confirm</Text>
                                </TouchableOpacity>
                            </View> : 
                            <>
                            <View>
                                <Text style={styles.subtitle}>We will send verify code to your</Text>
                            </View>
                            <View>
                                <View style={styles.chooseOtpion}>
                                    <RadioButton value="0" status={this.state.to == 0 ? "checked" : "unchecked"}
                                        onPress={() => this.setState({to: 0})}
                                    />
                                    <Text style={styles.chooseLabel}>Email Address</Text>
                                </View>
                                <Text style={{marginBottom: 20}}>{this.state.member.email.split("@")[0].substr(0, 3) + "...@" + this.state.member.email.split("@")[1]}</Text>
                            </View>
                            <View>
                                <View style={styles.chooseOtpion}>
                                    <RadioButton value="1" status={this.state.to == 1 ? "checked" : "unchecked"}
                                        onPress={() => this.setState({to: 1})}
                                    />
                                    <Text style={styles.chooseLabel}>Mobile Phone Number</Text>
                                </View>
                                <Text>+1(xxx) xxx-{this.state.member.phone.substr(6)}</Text>
                            </View>
                            <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.sendOtp()}>
                                <Text style={MainStyles.Button}>Send</Text>
                            </TouchableOpacity>
                            </>
                        }
                    </View>
                }
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        sent: state.member.sent,
        checked: state.member.checked,
    }
}

const mapDispatchToProps = {
    sendOtp, updateOtp
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberVerifyPageScreen)

const styles = StyleSheet.create({
    chooseOtpion: {display: 'flex', flexDirection: 'row'},
    title: {fontSize: 20,marginBottom: 20,marginTop: 20},
    subtitle: {fontSize: 16, marginBottom: 15},
    chooseLabel: {padding: 9},
});
