import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Container} from 'native-base';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator";

export class ServiceList extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'thirdPage')

        var params = props.navigation.state.params || {};
        this.state = {
            details: params.details,
            serviceType: params.serviceType
        }
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Details of " + this.state.serviceType}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <View style = {MainStyles.smsStyle}>
                    <ScrollView style = {{width: "100%"}}>
                        <View style={{flex: 1, width: "100%", padding: LAYOUT.window.width * 0.05, paddingTop: 0}}>
                            <Text style = {{fontSize: LAYOUT.fontSize2, paddingBottom: 20}}>{this.state.details}</Text>
                            <View style = {{flexDirection: "row", justifyContent: "center"}}>
                                <TouchableOpacity style = {[MainStyles.infoButton, {padding: 10, width: '40%', borderColor: "#28a77e", borderWidth: 1, backgroundColor: "white"}]} onPress = {() => this.setState({serviceTypeDetailModal: !this.state.serviceTypeDetailModal})} >
                                    <Text style = {{fontSize: LAYOUT.fontSize0, color: "#28a77e", textAlign: "center"}}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList)

