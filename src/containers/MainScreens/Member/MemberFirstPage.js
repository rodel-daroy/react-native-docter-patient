import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, Image, ScrollView, Alert, StyleSheet} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';

import MainStyles from "../Style/MainStyle";
// import Header from "../Header/FirstPageHeader"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getPatientDetails } from "../../../redux/actions/memberActions"
import { ListLoad, getAppointmentsNumber } from "../../../redux/actions/HomeActions"
import { Join, Create } from '../../../redux/actions/ChatRoomActions';
import Footer from "../Footer/SignOutFooter"



export class MemberFirstPageScreen extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'secondPage')
    }

    state = {
        patientNumber: 'Calculating...',
        appointmentNumber: 'Calculating...',
        bookedAppointments: 0,
        previousAppointments: 0
    }
    componentDidMount() {
        this.props.getPatientDetails();
        this.props.getAppointmentsNumber();
        this.props.ListLoad();
    }

    componentDidUpdate(prevProps){
        if(prevProps.patientDetails !== this.props.patientDetails) {
            if (this.props.patientDetails.patientData) {
                this.setState({patientNumber: "(" + this.props.patientDetails.patientData.length + " Patients)"})
            }
        }
        if (prevProps.appointmentList !== this.props.appointmentList) {
            if(this.props.appointmentList.list) {
                this.setState({appointmentNumber: "(" + this.props.appointmentList.list.length + " Appointments)"})
            }
            this.setState({
                bookedAppointments: this.props.bookedAppointments || 0,
                previousAppointments: this.props.previousAppointments || 0
            })
        }
    }

    render(){
        return(
            <Container style={[MainStyles.container, {backgroundColor: COLOR.mainColor, borderWidth: 1, borderColor: "white", flexDirection: 'row', alignItems: 'center'}]}>
                {/* <LinearGradient
                colors={COLOR.linearGradient1Color}
                style={{ height: LAYOUT.window.height }}> */}
                {/* <Header /> */}
                <View style = {MainStyles.firstPageStyle}>
                    <View style = {styles.sectionParentStyle}>
                        <ScrollView>
                            <View style = {styles.sectionStyle}>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderTopWidth: 0, borderLeftWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('MemberAppointmentScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {0} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "modx" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Appointments</Text>
                                                <Text style = {{fontSize: 14}}></Text>
                                                <Text style = {styles.underText}>{this.state.appointmentNumber}</Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderTopWidth: 0, borderRightWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('MemberMyPatientScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {150} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "users" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Who Need Appointment?</Text>
                                                <Text style = {styles.underText}>{this.state.patientNumber}</Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.sectionStyle}>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('BookedAppointmentScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {300} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "list" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Booked Appointments({this.state.bookedAppointments})</Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('PreviousAppointmentScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {450} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "list" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Previous Appointments</Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.sectionStyle}>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('MemberMenuScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {600} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "cogs" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>My Account</Text>
                                                <Text style = {styles.underText}> </Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('LearnMoreScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {750} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "paperclip" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Learn More</Text>
                                                <Text style = {styles.underText}> </Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <Footer />
                {/* </LinearGradient> */}
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        patientDetails: state.member,
        appointmentList: state.appointments,
        bookedAppointments: state.appointments.bookedAppointments,
        previousAppointments: state.appointments.previousAppointments
    }
}

const mapDispatchToProps = {
    getPatientDetails,
    getAppointmentsNumber,
    ListLoad,
    Join,
    Create
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberFirstPageScreen)


const styles = StyleSheet.create({
    sectionParentStyle: {
        width: "100%",
        paddingBottom: 40,
    },
    sectionStyle: {
        width: "50%",
        flexDirection: "row",
    },
    sectionChildStyle: {
        width: "100%",
        padding: 5,
        borderColor: COLOR.mainColor,
    },
    mainSectionStyle: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderWidth: 3,
        // borderColor: COLOR.mainColor
        borderColor: 'white'
    },
    underBackgroundStyle: {
        // backgroundColor: COLOR.mainColor,
        backgroundColor: 'white',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        paddingTop: 30,
        paddingBottom: 30,
    },  
    mainText: {
        fontWeight: "bold",
        fontSize: LAYOUT.fontSize3,
        marginTop: 10,
        textAlign: "center",
        color: COLOR.mainColor
    },
    underText: {
        textAlign: "center",
        color: COLOR.mainColor
    }
});
