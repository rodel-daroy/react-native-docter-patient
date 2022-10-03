import React from 'react';
import { View, Text, StatusBar, Image, ScrollView} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { setNavigator } from "../../../redux/actions/navigator"
import Stars from "react-native-stars"

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT } from '../../../constants';
import { BACKEND_URL } from "../../../config"
import ProviderImage from "../../../assets/doctor2.png"


export class DoctorProfileView extends React.Component{
    constructor(props){
        super(props);
        setNavigator(this.props.navigation, 'thirdPage')

        var params = props.navigation.state.params || {};
        this.state = {
            provider_image: params.provider_image,
            provider_image: params.provider_image,
            first_name: params.first_name,
            last_name: params.last_name,
            speciality_care: params.speciality_care,
            known_language: params.known_language,
            professional_education: params.professional_education,
            experience: params.experience,
            residency: params.residency,
            board_certified: params.board_certified,
            board_certified_description: params.board_certified_description,
            state_registration: params.state_registration,
            primary_care: params.primary_care,
            license: params.license,
            profile_description: params.profile_description
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
    }
    
    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Doctor Profile"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={MainStyles.HeaderStyle}>
                </View>
                <ScrollView style = {{width: "100%"}}>
                    <View style={{flex: 1, width: "100%", padding: 20}}>
                        <View style = {MainStyles.modalUserView}>
                            <Image source = {this.state.provider_image ? {uri: BACKEND_URL + "uploads/providerimages/" + this.state.provider_image} : ProviderImage} style = {MainStyles.doctorImage}/>
                            <View style = {MainStyles.userInfoText}>
                                <View>
                                    <Text style = {{fontSize: LAYOUT.fontSize2}}>{this.state.first_name + '  ' + this.state.last_name}</Text>
                                </View>
                                <View>
                                    <Text style = {{fontSize: LAYOUT.fontSize1}}>{this.state.speciality_care}</Text>
                                </View>
                                <View>
                                <Stars
                                    disabled = {true}
                                    default={2.5}
                                    count={5}
                                    half={true}
                                    fullStar={<FontAwesome name={'star'} size = {LAYOUT.window.width * 0.07} style={[MainStyles.myStarStyle]}/>}
                                    emptyStar={<FontAwesome name={'star-o'} size = {LAYOUT.window.width * 0.07} style={[MainStyles.myStarStyle, MainStyles.myEmptyStarStyle]}/>}
                                    halfStar={<FontAwesome name={'star-half-o'} size = {LAYOUT.window.width * 0.07} style={[MainStyles.myStarStyle]}/>}
                                />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Language</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.known_language}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Personal Education</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.professional_education}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Year of experience</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.experience + 'Years'}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Residency</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.residency}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Board Certificate in</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.board_certified + '  ' + this.state.board_certified_description}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>State Registrtation</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.state_registration}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Primary care provider in</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.primary_care}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>State Licenses</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>{this.state.license}</Text>
                                </View>
                            </View>
                            <View style = {MainStyles.modalInfoTextView}>
                                <View>
                                    <Text style = {MainStyles.modalInfoHeaderText}>Profile</Text>
                                </View>
                                <View>
                                    <Text style = {MainStyles.modalInfoBodyText}>
                                        {this.state.profile_description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

export default DoctorProfileView
