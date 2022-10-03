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

export class MemberMenu extends React.Component{
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
            this.setState({
                bookedAppointments: this.props.appointmentList.bookedAppointments || 0,
                previousAppointments: this.props.appointmentList.previousAppointments || 0
            })
        }
    }

    render(){
        return(
            <Container style={styles.container}>
                <Header 
                    name = {this.props.user.first_name + ' ' + this.props.user.last_name}
                    email = {this.props.user.email}
                    userType = {"member"}
                />
                <ScrollView>
                    <View style = {styles.menuTotalStyle}>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>All Appointments</Text>                            
                            </View>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('BookedAppointmentScreen')} >
                                <FontAwesome name = {"list"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Booked Appointments({this.state.bookedAppointments})</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('PreviousAppointmentScreen')} >
                                <FontAwesome name = {"list"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Previous Appointments</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>My Page</Text>                            
                            </View>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ProfileScreen')} >
                                <FontAwesome name = {"user"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Change Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('ChangePasswordScreen')} >
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberMenu)


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
