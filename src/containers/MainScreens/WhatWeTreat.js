import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';

import MainStyles from "./Style/MainStyle";
import { LAYOUT, COLOR } from '../../constants';
import {setNavigator, navigate} from "../../redux/actions/navigator"
import {OurExpertProvideCareFor, Get2ndOptionFromSpecialist, WhatWeDontTreat} from "../fakeDB/index"
import Header from "./Header/SecondHeader";
import MemberFooter from "./Footer/MemberFooter";
import ProviderFooter from "./Footer/ProviderFooter"


export class WhatWeTreat extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"What We Treat"}
                    backURL = { "LearnMoreScreen" }
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Our experts will provide care</Text>
                            <Text style = {MainStyles.subText}>
                                Our board certified experts are available 24/7 for your convenience. Our providers can help and guide you as well as order prescriptions online, if needed.
                            </Text>
                            {OurExpertProvideCareFor.map((item, idx) => {
                                return (
                                    <View key = {idx + 'expertProvide'} style = {MainStyles.ListStyle}>
                                        <FontAwesome name = "check" size = {LAYOUT.fontSize2} style = {MainStyles.listIcon} />
                                        <Text style = {MainStyles.listText}>{item}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Our experts will provide care</Text>
                            <Text style = {MainStyles.subText}>
                                Top-notch medical professionals based in the United States of America are in our network for patients seeking 2nd Opinion.
                            </Text>
                            {Get2ndOptionFromSpecialist.map((item, idx) => {
                                return (
                                    <View key = {idx + 'expertProvide'} style = {MainStyles.ListStyle}>
                                        <FontAwesome name = "check" size = {LAYOUT.fontSize2} style = {MainStyles.listIcon} />
                                        <Text style = {MainStyles.listText}>{item}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Our experts will provide care</Text>
                            <Text style = {MainStyles.subText}>
                                There are some conditions that we don’t treat. Please see an in-person doctor or hospital if you experience any of the following :
                            </Text>
                            {WhatWeDontTreat.map((item, idx) => {
                                return (
                                    <View key = {idx + 'expertProvide'} style = {MainStyles.ListStyle}>
                                        <FontAwesome name = "hand-o-right" size = {LAYOUT.fontSize2} style = {MainStyles.listIcon} />
                                        <Text style = {MainStyles.listText}>{item}</Text>
                                    </View>
                                );
                            })}
                            <Text style = {MainStyles.subText}>
                                Our doctors are unable to write prescriptions for controlled substances such as codeine or oxycodone. Please see a doctor in person if you require medication classified as a controlled substance.
                            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(WhatWeTreat)  
