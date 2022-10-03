import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';

import MainStyles from "./Style/MainStyle";
import Header from "./Header/SecondHeader";
import MemberFooter from "./Footer/MemberFooter";
import ProviderFooter from "./Footer/ProviderFooter"
import { LAYOUT, COLOR } from '../../constants';
import {TakeCareOfArray} from "../fakeDB/index"


export class ProviderBenefits extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Patient Benefits"}
                    backURL = { "LearnMoreScreen" }
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Increased Revenue</Text>
                            <Text style = {MainStyles.subText}>
                                Physicians will be able to expand their practice within the US, where their license permits. This will allow the providers to maximize their reach especially for those who are located in a less populated area (rural area).
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Increased Revenue</Text>
                            <Text style = {MainStyles.subText}>
                                Physicians will be able to expand their practice within the US, where their license permits. This will allow the providers to maximize their reach especially for those who are located in a less populated area (rural area).
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Seeing more Patients</Text>
                            <Text style = {MainStyles.subText}>
                                eClinicforyou is willing to work with your schedule. Allowing you to schedule patients in your free time.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Convenience</Text>
                            <Text style = {MainStyles.subText}>
                                Convenience in terms of wasting time in transportation for either providers or patients, some patients located in remote or far away areas and they may miss the appointment, we would recommend eClinicforyou.com virtual care solution which can fit into your current workflow to maximize the effect of convenience.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>2nd Opinion</Text>
                            <Text style = {MainStyles.subText}>
                                In some cases, patients need to get 2nd Opinion from another specialist, using eClinicforyou.com doctors can quickly establish secure video call with patient to get 2nd Opinion and will be guiding them in the right direction.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>eClinicforyou.com will take care of:</Text>
                            {TakeCareOfArray.map((item, idx) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProviderBenefits)  

