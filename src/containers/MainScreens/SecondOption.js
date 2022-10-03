import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';

import MainStyles from "./Style/MainStyle";
import Header from "./Header/SecondHeader";
import MemberFooter from "./Footer/MemberFooter";
import ProviderFooter from "./Footer/ProviderFooter"
import { LAYOUT, COLOR } from '../../constants';
import {HowitWorksArray} from "../fakeDB/index"


export class SecondOption extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"2nd Option"}
                    backURL = { "LearnMoreScreen" }
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>You're not alone!</Text>
                            <Text style = {MainStyles.subText}>
                                Our experts help you to take right decision!!
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>What is 2nd Opinion?</Text>
                            <Text style = {MainStyles.subText}>
                                A second opinion may confirm or question the first doctor's diagnosis and treatment plan, give more information about the patient's disease or condition, and offer other treatment options.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>When to get 2nd Opinion?</Text>
                            <Text style = {MainStyles.subText}>
                                Your primary doctor has diagnosed you with a serious disease, or recommended a costly procedure, or advised you to undergo major surgery, and if your symptoms are persistent even after treatment, It may be time to seek the advice of different doctors and specialists. Sometimes diseases are very rare that there is very little research behind them. When this occurs, It can be frustrating and frightening to discover you have been diagnosed with something unfamiliar. But you are not alone. Our specialists will be able to help you.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Getting a 2nd Opinion from eClinicforyou.com is easy, convenient, and all done remotely. You don’t have to visit hospital or clinics for this service. You don’t even need to leave home!
                            </Text>
                            <Text style = {[MainStyles.subText, {fontWeight: '700'}]}>
                                Our Board-certified specialists my help you in following areas.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Adults: Ear, Nose, and Throat (ENT), Cancer, Cardiovascular Health, Neurology, Neurosurgery, Orthopaedics
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Children: Ear, Nose, and Throat (ENT), Cardiothoracic Surgery, Orthopaedics, Neurosurgery, Heart Failure/Heart Transplantation, Epilepsy
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Benifits:</Text>
                            <Text style = {MainStyles.subText}>
                                You will get 2nd Opinion or recommendations through our online service.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Follow-up care available to address your questions and concerns.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Savings on the time and costs you spend to find insight into your case
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Peace of mind when you need to make crucial decisions about care    
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>What is 2nd Opinion?</Text>
                            <Text style = {MainStyles.subText}>
                                A second opinion may confirm or question the first doctor's diagnosis and treatment plan, give more information about the patient's disease or condition, and offer other treatment options.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>How It Works?</Text>
                            {HowitWorksArray.map((item, idx) => {
                                return (
                                    <View key = {idx + 'expertProvide'} style = {MainStyles.ListStyle}>
                                        <FontAwesome name = "hand-o-right" size = {LAYOUT.fontSize2} style = {MainStyles.listIcon} />
                                        <Text style = {MainStyles.listText}>{item}</Text>
                                    </View>
                                );
                            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondOption)  


