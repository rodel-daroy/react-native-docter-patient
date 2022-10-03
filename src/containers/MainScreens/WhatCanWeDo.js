import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';
import { Container} from 'native-base';
import MainStyles from "./Style/MainStyle";
import Header from "./Header/Header"
import { LAYOUT, COLOR } from '../../constants';


export class WhatCanWeDoScreen extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                {/* <ImageBackground source = {BackgroundHeader} style = {MainStyles.HeaderBackground}> */}
                    <Header {...this.props}  />
                    <View style={MainStyles.HeaderStyle}>
                        <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>What Can We Do</Text>
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>Welcome to eClinicforyou.com!</Text>
                            <Text style = {MainStyles.subText}>
                                eClinicforyou.com offers remote Clinical Services, We use the telecommunications technology and software to provide clinical services for patients without an in-person visit.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Remote Clinical Services means Telemedicine, the distance and travel time between patients and care providers can limit access to care. Fortunately, telemedicine can overcome geographic barriers to healthcare, especially for specialized providers. Telemedicine can be particularly beneficial for patients in medically underserved communities and those in rural geographical locations where clinician shortages exist.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                We build strong doctor-patient relationship with high-quality patient care and reducing health care costs. eClinicforyou.com makes it easier and more convenient for patients to stay healthy and engaged in their health care. Patients love the convenience, flexibility and real-time care with their providers.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                During the virtual appointments, the doctors may discuss your symptoms and treatment options, through secure Video chat or Audio chat, and prescribe medication which will be sent electronically to a pharmacy of the patient’s choice, If necessary.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                We do offer Two Services: 1) General Health, 2) 2nd Opinion
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>General Health</Text>
                            <Text style = {MainStyles.subText}>
                                Our providers will help to get health recommendations through online services with affordable and easy accessibility to outside the doctor's office. we treat <Text style = {{fontWeight: "700"}}>Non-emergent</Text> medical issues, Cold & Cough problems, Flu or Fever symptoms, and <Text style = {{color: COLOR.mainColor, fontWeight: "700"}} onPress = {() => Actions.push('WhatWeTreatScreen')}>More...</Text>
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>2nd Opinion</Text>
                            <Text style = {MainStyles.subText}>
                                Second opinion on medical treatment may confirm or question the first doctor's diagnosis and treatment plan, give more information about the patient's disease or condition, and offer other treatment options. <Text style = {{fontWeight: "700"}}>Our Board Certified Specialist</Text> may assess their impact on clinical outcomes and to determine characteristics and motivating factors of patients who seek a second opinion.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                We offer 2nd Opinion in following speciality: <Text style = {{fontWeight: "700"}}>Family Medicine, Internal Medicine, Medical Genetics,</Text> and <Text style = {{color: COLOR.mainColor, fontWeight: "700"}}  onPress = {() => Actions.push('WhatWeTreatScreen')}>More...</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

export default WhatCanWeDoScreen;

