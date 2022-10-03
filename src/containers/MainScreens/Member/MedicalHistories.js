import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"


export class MedicalHistory extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Medical History"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} /> */}
                        {/* <Text style={MainStyles.HeaderText}>Medical History</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <Text>Comming Soon...</Text>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

export default MedicalHistory;

