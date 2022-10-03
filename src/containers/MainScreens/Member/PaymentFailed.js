import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { setNavigator } from "../../../redux/actions/navigator"
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/Header"
import { LAYOUT } from '../../../constants';


export class PaymentFailed extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        nameOnCard: "",
        cardNumber: "",
        cvc: "",
        expirationMonth: "",
        expirationYear: "",
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
    }
    
    render(){
        return(
            <Container style={MainStyles.container}>
                {/* <ImageBackground source = {BackgroundHeader} style = {MainStyles.HeaderBackground}> */}
                    <Header  {...this.props} />
                    <View style = {MainStyles.back}>
                    </View>
                    <View style={MainStyles.HeaderStyle}>
                        <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Payment Processed Failed!</Text>
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <TouchableOpacity style={MainStyles.centerStyle} onPress={()=>Actions.reset('MemberFirstPageScreen')}>
                            <Text style={MainStyles.Button}>Go To Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

export default PaymentFailed
