import React from 'react';
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, ScrollView, Button} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import Modal from "react-native-modal"

import MainStyles from "./Style/MainStyle";
import Header from "./Header/Header"
import { LAYOUT, COLOR } from '../../constants';
import { getAllProviders } from "../../redux/actions/memberActions"
import { BACKEND_URL } from "./../../config"
import ProviderImage from "../../assets/doctor2.png"


export class OurProviders extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        isModalVisible: false,
        providerData: [],
        selectedProviderData: {}
    }

    toggleModal = ( item ) => {
        this.setState({isModalVisible: !this.state.isModalVisible, selectedProviderData: item});
    };

    componentDidMount() {
        this.props.getAllProviders();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.allProviderInfo !== this.props.allProviderInfo) {
            this.setState({
                providerData: this.props.allProviderInfo.providerInfo
            })
        }
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                {/* <ImageBackground source = {BackgroundHeader} style = {MainStyles.HeaderBackground}> */}
                    <Header {...this.props}  />
                    <View style={MainStyles.HeaderStyle}>
                        <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Our Providers</Text>
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        {this.state.providerData ? this.state.providerData.map((item, idx) => {
                            console.log(BACKEND_URL + "uploads/providerimages/" + item.provider_image)
                            return(
                                <TouchableOpacity style={MainStyles.userList} onPress = {() => this.toggleModal(item)} key = {idx + 'providerList'}>
                                    {/* <TouchableOpacity  onPress={() =>  this.toggleModal(item.id)} > */}
                                        <Image source = {item.provider_image ? {uri: BACKEND_URL + "uploads/providerimages/" + item.provider_image} : ProviderImage} style = {MainStyles.doctorImage}/>
                                    {/* </TouchableOpacity> */}
                                    <View style = {{alignItems: "center", justifyContent: "center", width: LAYOUT.window.width * 0.45}}>
                                        <Text style={[MainStyles.userName, {paddingLeft: 0}]}>{item.first_name + ' ' + item.last_name}</Text>
                                        <Text>{item.primary_care}</Text>   
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : null}
                    </View>
                </ScrollView>
                <Modal 
                    isVisible={this.state.isModalVisible}
                    animationIn = {"slideInUp"}
                    animationInTiming = {500}
                    style = {MainStyles.ModalStyle}
                >
                    {/* <TouchableOpacity 
                        activeOpacity={1} 
                        onPressOut={() => {this.toggleModal(0)}}
                    > */}
                        <ScrollView>
                            <TouchableOpacity onPress = {() => this.toggleModal(0)} style = {{padding: 10}} ><Text style = {{fontSize: LAYOUT.fontSize7, fontWeight: "bold"}}>×</Text></TouchableOpacity>
                            <View style={{flex: 1, width: "100%"}}>
                                <View style = {MainStyles.modalUserView}>
                                    <Image source = {this.state.selectedProviderData.provider_image ? {uri: BACKEND_URL + "uploads/providerimages/" + this.state.selectedProviderData.provider_image} : ProviderImage}  style = {MainStyles.doctorImage}/>
                                    <View style = {MainStyles.userInfoText}>
                                        <View>
                                            <Text style = {{fontSize: LAYOUT.fontSize2}}>{this.state.selectedProviderData.first_name + '  ' + this.state.selectedProviderData.last_name}</Text>
                                        </View>
                                        <View>
                                            <Text style = {{fontSize: LAYOUT.fontSize1}}>{this.state.selectedProviderData.speciality_care}</Text>
                                        </View>
                                        {/* <View>
                                            <Stars
                                                disabled = {true}
                                                default={2.5}
                                                count={5}
                                                half={true}
                                                fullStar={<FontAwesome name={'star'} size = {LAYOUT.window.width * 0.07} style={[MainStyles.myStarStyle]}/>}
                                                emptyStar={<FontAwesome name={'star-o'} size = {LAYOUT.window.width * 0.07} style={[MainStyles.myStarStyle, MainStyles.myEmptyStarStyle]}/>}
                                                halfStar={<FontAwesome name={'star-half-o'} size = {LAYOUT.window.width * 0.07} style={[MainStyles.myStarStyle]}/>}
                                            />
                                        </View> */}
                                    </View>
                                </View>
                                <View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Language</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.known_language}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Personal Education</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.professional_education}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Year of experience</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.experience + 'Years'}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Residency</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.residency}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Board Certificate in</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.board_certified + '  ' + this.state.selectedProviderData.board_certified_description}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>State Registrtation</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.state_registration}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Primary care provider in</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.primary_care}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>State Licenses</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>{this.state.selectedProviderData.license}</Text>
                                        </View>
                                    </View>
                                    <View style = {MainStyles.modalInfoTextView}>
                                        <View>
                                            <Text style = {MainStyles.modalInfoHeaderText}>Profile</Text>
                                        </View>
                                        <View>
                                            <Text style = {MainStyles.modalInfoBodyText}>
                                                {this.state.selectedProviderData.profile_description}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    {/* </TouchableOpacity> */}
                </Modal>
            </Container>
        )
    }
}

// export default OurProviders;

const mapStateToProps = (state) => {
    return {
        allProviderInfo: state.member.allProviderInfomation
    }
}

const mapDispatchToProps = {
    getAllProviders
}

export default connect(mapStateToProps, mapDispatchToProps)(OurProviders)
