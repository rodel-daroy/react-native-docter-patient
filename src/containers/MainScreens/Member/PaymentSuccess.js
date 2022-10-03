import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { setNavigator } from "../../../redux/actions/navigator"
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT } from '../../../constants';
import { getSelectedProviderAppointmentData } from '../../../redux/services';
import { clearDispatch } from "../../../redux/actions/memberActions"


export class PaymentSuccess extends React.Component{
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

    nextPage = () => {
        this.props.clearDispatch();
        Actions.reset('MemberFirstPageScreen');
    }

    render(){
        const apptInfo = getSelectedProviderAppointmentData();
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Payment Success!"}
                    // backURL = {"AppointmentScheduleScreen"}
                    // backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}>
                    {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                    <Text style={MainStyles.HeaderText}>Payment Processed Successfully!</Text> */}
                </View>
                <ScrollView>
                    <View style={MainStyles.main}>
                        <View style={MainStyles.mainHeader}>
                            <Text style={MainStyles.mainHeaderText}>Payment Details</Text>
                        </View>
                        <View style = {MainStyles.modalInfoTextView}>
                            <View>
                                <Text style = {MainStyles.modalInfoHeaderText}>{'Date'}</Text>
                            </View>
                            <View>
                                <Text style = {MainStyles.modalInfoBodyText }>{apptInfo.cardInfo ? new Date(apptInfo.cardInfo.created).toLocaleString() : ""}</Text>
                            </View>
                        </View>
                        <View style = {MainStyles.modalInfoTextView}>
                            <View>
                                <Text style = {MainStyles.modalInfoHeaderText}>Service Type</Text>
                            </View>
                            <View>
                                <Text style = {MainStyles.modalInfoBodyText }>{apptInfo.serviceName}</Text>
                            </View>
                        </View>
                        <View style = {MainStyles.modalInfoTextView}>
                            <View>
                                <Text style = {MainStyles.modalInfoHeaderText}>Amount </Text>
                            </View>
                            <View>
                                <Text style = {MainStyles.modalInfoBodyText }>{'$' + apptInfo.service_amount}</Text>
                            </View>
                        </View>
                        {/* <View style = {MainStyles.modalInfoTextView}>
                            <View>
                                <Text style = {MainStyles.modalInfoHeaderText}>Transaction Code </Text>
                            </View>
                            <View>
                                <Text style = {MainStyles.modalInfoBodyText }>{apptInfo.}</Text>
                            </View>
                        </View> */}
                        {
                            !apptInfo.cardInfo ? null :
                            <>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Cardholder</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText }>{apptInfo.cardInfo.source.name}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Last 4 digits </Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText }>{apptInfo.cardInfo.source.last4}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Exp</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText }>{apptInfo.cardInfo.source.exp_month + '/' + apptInfo.cardInfo.source.exp_year}</Text>
                                </View>
                            </View>
                            </>
                        }
                        <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextPage()}>
                            <Text style={MainStyles.Button}>Go Dashboard</Text>
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
    clearDispatch
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)

