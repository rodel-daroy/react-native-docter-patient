import React from 'react';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import { Container } from "native-base"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';
import Header from "../Header/MenuHeader"
import { getSelectedProviderAppointmentData } from "../../../redux/services/index"

export class MemberMenu extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    render(){
        return(
            <Container style={styles.container}>
                <Header 
                    name = {this.props.user.first_name + ' ' + this.props.user.last_name}
                    email = {this.props.user.email}
                    patientName = {getSelectedProviderAppointmentData().patientData.first_name + ' ' + getSelectedProviderAppointmentData().patientData.last_name}
                    userType = {"member"}
                />
                <ScrollView>
                    <View style = {styles.menuTotalStyle}>
                        <View style = {styles.groupStyle}>
                            <View style = {styles.labelStyle}>
                                <Text style = {styles.labelText}>Patient Page</Text>                            
                            </View>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('MedicalHistoriesScreen')} >
                                <FontAwesome name = {"history"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Medical History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('MedicalReportsScreen')} >
                                <FontAwesome name = {"stethoscope"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Medical Reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('PatientImageScreen')} >
                                <FontAwesome name = {"camera"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Patient Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('PreferredPharmacyScreen')} >
                                <FontAwesome name = {"medkit"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Preferred Pharmacy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.menuStyle} onPress = {() => Actions.push('PaymentScreen')} >
                                <FontAwesome name = {"paypal"} size = {25} color = {"rgba(0, 0, 0, 0.7)"} />
                                <Text style = {styles.menuText}>Billing / Payment</Text>
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

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = {
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
