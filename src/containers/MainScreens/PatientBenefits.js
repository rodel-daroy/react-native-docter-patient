import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';

import MainStyles from "./Style/MainStyle";
import Header from "./Header/SecondHeader";
import MemberFooter from "./Footer/MemberFooter";
import ProviderFooter from "./Footer/ProviderFooter"
import { LAYOUT, COLOR } from '../../constants';

export class PatientBenefits extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Patient Benefits"}
                    backURL = { "LearnMoreScreen" }
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main}>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subText}>
                                Is your primary care physician far away from your home and you are tired of being stuck in traffic?
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Waiting long hours outside the physician waiting room?
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Did you miss any scheduled doctor appointment because of weather condition? (Extreme hot or Extreme cold or rainy day)
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Login to eClinicforyou.com and schedule an appointment and see the doctor from your home or office.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subText}>
                                More worried about contagious seasonal disease(such as the flu, colds, or strep throat). Infectious microbe travels through the air after someone nearby sneezes or coughs its spread from person to person.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                do you need to see the doctor after normal office hours, weekends, and holidays?
                            </Text>
                            <Text style = {MainStyles.subText}>
                                eClinicforyou.com provide remote Clinical Services, Our board-certified doctors, avilable 24/7 with any device.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subText}>
                                Are you traveling with your loved ones and need non-emergency medical assistance right away? Not familiar with the area? Don't worry go to eClinicforyou.com find the local physicians for immediate medical assistance.
                            </Text>
                        </View>
                        <View style = {MainStyles.paragraphStyle}>
                            <Text style = {MainStyles.subHeader}>eClinicforyou.com is your preferred virtual clinic</Text>
                            <Text style = {MainStyles.subText}>
                                The benefits are also evident for health care broadly. We’ve experienced a significant decrease in unnecessary emergency room and urgent care utilization among patients who’ve used the service. Sixty-two percent of patients who utilized Telemedicine reported that they would have otherwise accessed care at an emergency room or urgent care clinic. And, as the health industry moves toward a value-based model that rewards providers for achieving better outcomes at lower costs and away from a fee-for-service model that bases payment on the volume of services provided, telehealth allows the best use of resources to provide high-quality care at the lowest possible cost.
                            </Text>
                            <Text style = {MainStyles.subText}>
                                Telehealth isn’t just for rural communities. It can also be used to help patients in urban areas with transportation, time, or mobility constraints access a full range of specialties. But one challenge to scaling telehealth to improve health care nationwide is that, despite its many benefits and cost savings, the relevant payment policies and reimbursement models often prevent providers from receiving payment for telehealth services. So even though patients, families, community hospitals, their surrounding communities, and care providers clearly benefit, large integrated health care systems are left to cover the costs.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                {this.props.user ? (
                    this.props.user.role == "member" ? (
                        <MemberFooter />
                    ) : (
                        <ProviderFooter />
                    )
                ) : null}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientBenefits)  
