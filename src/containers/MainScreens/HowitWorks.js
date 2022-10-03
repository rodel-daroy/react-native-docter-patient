import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';

import MainStyles from "./Style/MainStyle";
import { LAYOUT, COLOR } from '../../constants';
import Header from "./Header/SecondHeader";
import MemberFooter from "./Footer/MemberFooter";
import ProviderFooter from "./Footer/ProviderFooter"


export class HowitWorks extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"How it Works"}
                    backURL = { "LearnMoreScreen" }
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Only three steps away from connecting with a doctor.</Text>
                            <Text style = {MainStyles.subText}>
                                When you or your loved ones sick and want to see the doctor right away! Our physicians with you and get care 24/7 around the US.
                            </Text>
                        </View>
                        <View style = {[MainStyles.paragraphStyle, , MainStyles.borderRadiousStyle]}>
                            <Text style = {MainStyles.stepHeader}>Sign Up</Text>
                            <FontAwesome name = 'hand-o-down' size = {LAYOUT.fontSize4} color = {COLOR.mainColor} style = {[MainStyles.centerStyle, {marginTop: 10}]}></FontAwesome>
                            <Text>Create free secure account from any device, it takes few minutes.</Text>
                            <Text>Your information is then stored securely for all future visits.</Text>
                            <Text>Select our services, like Genaral Health Or 2nd Opinion.</Text>
                        </View>
                        <View style = {[MainStyles.paragraphStyle, , MainStyles.borderRadiousStyle]}>
                            <Text style = {MainStyles.stepHeader}>Select a Doctor</Text>
                            <FontAwesome name = 'hand-o-down' size = {LAYOUT.fontSize4} color = {COLOR.mainColor} style = {[MainStyles.centerStyle, {marginTop: 10}]}></FontAwesome>
                            <Text>Tell our Doctors about the reason for your visit and symptoms.</Text>
                            <Text>Select our board-certified Physicians from your state, We'll search our network of Doctors, You can view their profile and ratings before start your visit.</Text>
                        </View>
                        <View style = {[MainStyles.paragraphStyle, , MainStyles.borderRadiousStyle]}>
                            <Text style = {MainStyles.stepHeader}>Start your Visit</Text>
                            <FontAwesome name = 'hand-o-down' size = {LAYOUT.fontSize4} color = {COLOR.mainColor} style = {[MainStyles.centerStyle, {marginTop: 10}]}></FontAwesome>
                            <Text>Schedule an appointment with your selected doctor.</Text>
                            <Text>They’ll go through your symptoms, recommend a treatment and can even send a prescription to your nearest pharmacy if necessary.</Text>
                        </View>
                    </View>
                </ScrollView>
                {this.props.user ? (
                    this.props.user.role == "member" ? (
                        <MemberFooter />
                    ) : (
                        <ProviderFooter />
                    )
                ) : null}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(HowitWorks)  