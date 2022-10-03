import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { TextInput } from "react-native-paper"
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { saveAppointment } from "../../../redux/actions/memberActions"
import CardImg from "../../../assets/card.jpg"
import { getSelectedProviderAppointmentData, setSelectedProviderAppointmentData } from '../../../redux/services';

export class PaymentInfomation extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        nameOnCard: "",
        cardNumber: "",
        cvc: "",
        expirationMonth: "",
        expirationYear: "",
        clicked: false
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
    }


    nextPage = () => {
        this.setState({clicked: true});
        var time = ((new Date()).getFullYear()) + '-' + (((new Date()).getMonth() + 1) >= 10 ? ((new Date()).getMonth() + 1) : '0' + ((new Date()).getMonth() + 1)) + '-' + ((new Date()).getDate() >= 10 ? (new Date()).getDate() : '0' + (new Date()).getDate()) + ' ' + (((new Date()).getHours() < 10) ? ('0' + (new Date()).getHours()) : ((new Date()).getHours())) + ':' + (((new Date()).getMinutes() < 10) ? ('0' + (new Date()).getMinutes()) : (new Date()).getMinutes()) + ':' + (((new Date()).getSeconds() < 10) ? ('0' + (new Date()).getSeconds()) : (new Date()).getSeconds());
        
        if( getSelectedProviderAppointmentData().selectedProviderAvailable =="0" && getSelectedProviderAppointmentData().selectedTime <=  time) {
            alert('Please select Schedule time again!');
            this.setState({clicked: false});
            return;
        }
        
        setSelectedProviderAppointmentData('nameOnCard', this.state.nameOnCard );
        setSelectedProviderAppointmentData('cardNumber', this.state.cardNumber );
        setSelectedProviderAppointmentData('cvc', this.state.cvc );
        setSelectedProviderAppointmentData('expirationMonth', this.state.expirationMonth );
        setSelectedProviderAppointmentData('expirationYear', this.state.expirationYear );
        setSelectedProviderAppointmentData('freeAppt', false);
        this.props.saveAppointment();
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Payment Information"}
                    backURL = {"AppointmentScheduleScreen"}
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}>
                    {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                    <Text style={MainStyles.HeaderText}>Payment Information</Text> */}
                </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <View style={MainStyles.mainHeader}>
                            <Text style={MainStyles.mainHeaderText}>Payment Details</Text>
                        </View>
                        <View style = {{display: "flex", flexDirection: "row", justifyContent: 'center'}}>
                            <Image source = {CardImg} style = {{width: LAYOUT.window.width * 0.45, height: LAYOUT.window.width * 0.05, marginBottom: 40 }} />
                        </View>
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Name On Card"
                            Outlined = {true}
                            value = {this.state.nameOnCard}
                            onChangeText={text => this.setState({nameOnCard: text})}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Card Number"
                            keyboardType="number-pad"
                            Outlined = {true}
                            value = {this.state.cardNumber}
                            onChangeText={text => this.setState({cardNumber: text})}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="CVC"
                            keyboardType="number-pad"
                            Outlined = {true}
                            value = {this.state.cvc}
                            onChangeText={text => this.setState({cvc: text})}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Month/mm"
                            keyboardType="number-pad"
                            Outlined = {true}
                            value = {this.state.expirationMonth}
                            onChangeText={text => this.setState({expirationMonth: text})}
                        />
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="Year/yyyy"
                            keyboardType="number-pad"
                            Outlined = {true}
                            value = {this.state.expirationYear}
                            onChangeText={text => this.setState({expirationYear: text})}
                        />
                        <TouchableOpacity style={MainStyles.centerStyle} disabled={this.state.clicked} onPress={() => this.nextPage()}>
                            <Text style={MainStyles.Button}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
    saveAppointment
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfomation)

