import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity , StatusBar, ScrollView} from 'react-native';
import { Container} from 'native-base';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { setSelectedProviderAppointmentData } from "../../../redux/services/index"
import { getServiceType } from "../../../redux/actions/memberActions"
import Indecate from "../Indicating"

const backgroundColor = [
    '#ffc000',
    '#92d050',
    '#d63093',
    '#187052'
]

export class SelectServiceType extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'thirdPage')
    }
    state = {
        medicalServiceType: null,
        serviceTypeDetailModal: false,
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage');
        this.props.getServiceType();
    }

    componentDidUpdate(prevProps){
        if(prevProps.medicalServiceType !== this.props.medicalServiceType) {
            if (this.props.medicalServiceType.type) {
                this.setState({medicalServiceType: this.props.medicalServiceType.type})
            }
        }
    }

    nextPage = (type, name) => {
        setSelectedProviderAppointmentData('serviceType', type);
        setSelectedProviderAppointmentData('serviceName', name);
        Actions.push('PatientInfoScreen')
    }

    showServiceList = (data, type) => {
        var data = data.replace(/<ul>/g,'');
        data = data.replace(/<\/ul>/g,'')
        data = data.replace(/<li>/g,'')
        data = data.replace(/<\/li>/g,'')
        
        Actions.push('ServiceListScreen', {details: data, serviceType: type});
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Select Your Service Type"}
                    backURL = {"MemberMyPatientScreen"}
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={ [MainStyles.main1] }>
                        <ScrollView>
                            <View style = {{justifyContent: "center", height: LAYOUT.window.height - 150, width: "100%"}}>
                                {this.state.medicalServiceType ? this.state.medicalServiceType.length > 0 ? this.state.medicalServiceType.map((item, idx) => {
                                    return (
                                        <TouchableOpacity style={MainStyles.SelectType} onPress = {() => this.nextPage(item.id, item.service_name)} key = {idx + 'medicalServiceType'}>
                                            <View style={[MainStyles.TypeHeader, {backgroundColor: backgroundColor[idx]}]}>
                                                <Text style={MainStyles.TypeHeaderText}>{item.service_name  }</Text>
                                            </View>
                                            <View style={MainStyles.TypeBody}>
                                                <View style={{justifyContent: "center", padding: 10, alignItems: "center"}}>
                                                    <Text><Text style={{color: "red", fontSize: LAYOUT.fontSize4}}>{ '$' + item.amount}</Text><Text style={{fontWeight: "bold", fontSize: LAYOUT.fontSize1}}>/Visit</Text></Text>
                                                </View>
                                                <View style={{justifyContent: "center", padding: 10, alignItems: "center"}}>
                                                    <Text style = {{textAlign: "center"}}><Text style={{fontSize: LAYOUT.fontSize0, textAlign: "center", color: "black"}}>{item.short_description.trim()}</Text></Text>
                                                </View>
                                                <TouchableOpacity onPress = {() => this.showServiceList(item.full_description, item.service_name)} style={{justifyContent: "center", padding: 10, alignItems: "center"}}>
                                                    <Text style={{textAlign: "center", padding: 10}}><Text style={{color: "red", textDecorationLine: "underline"}}>Read More</Text></Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) : <Text style = {MainStyles.processingStyle}>There is no Service Type</Text> : 
                                <View  style = { [MainStyles.loadingStyleView , {width: "100%"}]}>
                                    <Indecate />
                                </View>}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        medicalServiceType: state.member
    }
}

const mapDispatchToProps = {
    getServiceType
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectServiceType)

