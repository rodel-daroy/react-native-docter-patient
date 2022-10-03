import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';

import MainStyles from "./Style/MainStyle";
import Header from "./Header/Header"
import { LAYOUT, COLOR } from '../../constants';


export class Provider extends React.Component{
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
                        <Text style={MainStyles.HeaderText}>Provider</Text>
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <Text>Comming Soon...</Text>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

export default Provider;

