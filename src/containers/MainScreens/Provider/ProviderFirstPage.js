import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, Image, ScrollView, Alert, StyleSheet} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import MainStyles from "../Style/MainStyle";
import { ListLoad } from '../../../redux/actions/HomeActions';
// import Header from "../Header/FirstPageHeader"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import Footer from "../Footer/SignOutFooter"


export class ProviderFirstPageScreen extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'secondPage')
    }

    state = {
        appointmentNumber: 'Calculating...',
    }
    componentDidMount() {
        this.props.ListLoad();
    }

    componentDidUpdate(prevProps){
        if(prevProps.list !== this.props.list){
            if(this.props.list.list){
                this.setState({appointmentNumber: "(" + this.props.list.list.length + " Appointments)"});
            }
        }
    }

    render(){
        return(
            <Container style={[MainStyles.container, {backgroundColor: COLOR.mainColor, borderWidth: 1, borderColor: "white", flexDirection: 'row', alignItems: 'center'}]}>
                {/* <Header /> */}
                <View style = {MainStyles.firstPageStyle}>
                    <View style = {styles.sectionParentStyle}>
                        <ScrollView>
                            <View style = {styles.sectionStyle}>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderTopWidth: 0, borderLeftWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.reset('ProviderDashboardScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {0} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "modx" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Appointments</Text>
                                                <Text style = {styles.underText}>{this.state.appointmentNumber}</Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderTopWidth: 0, borderRightWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('ProviderBillingTransactionScreen')}>
                                        <Animatable.View animation="zoomInUp" delay = {150} style = {styles.mainSectionStyle} duration = {900}>
                                            <View style = {styles.underBackgroundStyle}>
                                                <FontAwesome name = "credit-card" color = {COLOR.mainColor} size = {50} />
                                                <Text style = {styles.mainText}>Billing / Transactions</Text>
                                                {/* <Text style = {styles.underText}>{this.state.patientNumber}</Text> */}
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.sectionStyle}>
                                {
                                    (this.props.user.availbility_service === "1" || this.props.user.availbility_service === '0') ? 
                                        <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0}]}>
                                            <TouchableOpacity onPress = {() => Actions.push('ProviderGeneralHealthScreen')}>
                                                <Animatable.View animation="zoomInUp" delay = {300} style = {styles.mainSectionStyle} duration = {900}>
                                                    <View style = {styles.underBackgroundStyle}>
                                                        <FontAwesome name = "calendar" color = {COLOR.mainColor} size = {50} />
                                                        <Text style = {styles.mainText}>GH Schedule</Text>
                                                        <Text style = {styles.underText}>{"(General Health)"}</Text>
                                                    </View>
                                                </Animatable.View>
                                            </TouchableOpacity>
                                        </View>
                                    :
                                    null
                                }
                                {
                                    (this.props.user.availbility_service === "2" || this.props.user.availbility_service === '0') ? 
                                        <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}]}>
                                            <TouchableOpacity onPress = {() => Actions.push('Provider2ndOptionScreen')}>
                                                <Animatable.View animation="zoomInUp" delay = {450} style = {styles.mainSectionStyle} duration = {900}>
                                                    <View style = {styles.underBackgroundStyle}>
                                                        <FontAwesome name = "calendar" color = {COLOR.mainColor} size = {50} />
                                                        <Text style = {styles.mainText}>SO Schedule</Text>
                                                        <Text style = {styles.underText}>{"(2nd Option)"}</Text>
                                                    </View>
                                                </Animatable.View>
                                            </TouchableOpacity>
                                        </View>
                                    :
                                    null
                                }
                            </View>
                            <View style = {styles.sectionStyle}>
                                <View style = {[styles.sectionChildStyle, {borderWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}]}>
                                    <TouchableOpacity onPress = {() => Actions.push('ProviderMenuScreen')}>
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
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list:state.appointments,
        user: state.auth.user,
    }
}

const mapDispatchToProps = {
    ListLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderFirstPageScreen)


const styles = StyleSheet.create({
    sectionParentStyle: {
        width: "100%",
        paddingBottom: 40,
    },
    sectionStyle: {
        width: "50%",
        flexDirection: "row"
    },
    sectionChildStyle: {
        width: "100%",
        padding: 5,
        borderColor: COLOR.mainColor
    },
    mainSectionStyle: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderWidth: 3,
        borderColor: "white"
    },
    underBackgroundStyle: {
        backgroundColor: "white",
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
