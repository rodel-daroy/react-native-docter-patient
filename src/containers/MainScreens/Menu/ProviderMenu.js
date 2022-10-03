import React from 'react';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import { Container } from "native-base"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';
import Header from "../Header/MenuHeader"
import { getAppointmentsNumber } from "../../../redux/actions/HomeActions"

export class ProviderMenu extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        bookedAppointments: 0,
        previousAppointments: 0
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        this.props.getAppointmentsNumber();
    }

    componentDidUpdate(prevProps){
        if (prevProps.appointmentList !== this.props.appointmentList) {
            this.setState({bookedAppointments: this.props.appointmentList.bookedAppointments || 0})
            this.setState({previousAppointments: this.props.appointmentList.previousAppointments || 0})
        }
    }

    render(){
        return(
            <Container style={styles.container}>
                <Header 
                    name = {this.props.user.first_name + ' ' + this.props.user.last_name}
                    email = {this.props.user.email}
                    userType = {"provider"}
                />
                <ScrollView>
                    <View style = {styles.menuTotalStyle}>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>All Appointments</Text>                            
                            </View>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderBookedAppointmentScreen')} >
                                <FontAwesome name = {"list"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Booked Appointments({this.state.bookedAppointments})</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderPreviousAppointmentScreen')} >
                                <FontAwesome name = {"list"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Previous Appointments</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>Schedule</Text>                            
                            </View>
                            {
                                (this.props.user.availbility_service === "1" || this.props.user.availbility_service === '0') ? 
                                    <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderGeneralHealthScreen')} >
                                        <FontAwesome name = {"calendar"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                        <Text style = {styles.menuText}>General Health</Text>
                                    </TouchableOpacity>
                                :
                                null
                            }
                            {
                                (this.props.user.availbility_service === "2" || this.props.user.availbility_service === '0') ? 
                                    <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('Provider2ndOptionScreen')} >
                                        <FontAwesome name = {"calendar"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                        <Text style = {styles.menuText}>2nd Option</Text>
                                    </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>Payment</Text>                            
                            </View>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderBillingTransactionScreen')} >
                                <FontAwesome name = {"paypal"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Billing / Transactions</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>My Page</Text>                            
                            </View>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderPhotoScreen')} >
                                <FontAwesome name = {"camera"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>My Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderProfileScreen')} >
                                <FontAwesome name = {"user"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Change Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProviderChangePasswordScreen')} >
                                <FontAwesome name = {"key"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        appointmentList: state.appointments
    }
}

const mapDispatchToProps = {
    getAppointmentsNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderMenu)


const styles = StyleSheet.create({
    container: {
        width: LAYOUT.window.width,
        backgroundColor: "white"
    },
    menuTotalStyle: {
        width: LAYOUT.window.width,
        backgroundColor: "white"
    },
    groupStyle: {
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1
    },
    labelStyle: {
        padding: 10,
        paddingBottom: 0,
        paddingTop: 30
    },
    labelText: {
        marginLeft: 10,
        fontSize: LAYOUT.fontSize2
    },
    menuStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: '100%',
        padding: 20,
        paddingLeft: 20,
        paddingBottom: 10
        // paddingBottom: 20
    },
    menuText: {
        marginLeft: 20,
        fontSize: LAYOUT.fontSize3,
        color: "rgba(0, 0, 0, 0.7)"
    }
})
