import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, ScrollView, SafeAreaView, Image } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import MapMaker from "../../../assets/maker.png"
import { getLocationInfomation, getPreferredPharmacy } from "../../../redux/actions/memberActions"
import { setSelectedProviderAppointmentData } from "../../../redux/services/index"
import Indecate from "../Indicating"


export class SelectPharmacy extends React.Component{
    constructor(props){
        super(props);
        setNavigator(this.props.navigation, 'thirdPage')
    }
    state = {
        markers: [],
        lat: 0,
        lon: 0,
        pharmacy_name: "",
        pharmacy_address: ""
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
        this.props.getLocationInfomation();
        this.props.getPreferredPharmacy();
    }

    componentDidUpdate(prevProps){
        if(prevProps.pharmacyData !== this.props.pharmacyData) {
            if(this.props.pharmacyData.pharmacyData) {
                this.setState({markers: this.props.pharmacyData.pharmacyData.data, lat: this.props.pharmacyData.pharmacyData.location.latitude, lon: this.props.pharmacyData.pharmacyData.location.longitude})
            }

            if(this.props.pharmacyData.getPreferredPharmacy) {
                this.setState({pharmacy_name: this.props.pharmacyData.getPreferredPharmacy.pharmacy_name, pharmacy_address: this.props.pharmacyData.getPreferredPharmacy.pharmacy_address})
            }
        }
    }

    pharmacyClick = (name, address) => {
        this.setState({
            pharmacy_name: name,
            pharmacy_address: address
        })
    }
    
    nextPage = () => {
        if(this.state.pharmacy_name == "" || this.state.pharmacy_address == ""){
            alert('Select Pharmacy');
            return;
        }
        setSelectedProviderAppointmentData("pharmacy_name", this.state.pharmacy_name);
        setSelectedProviderAppointmentData("pharmacy_address", this.state.pharmacy_address);
        Actions.push('ChooseDoctorScreen')
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Select Your Pharmacy"}
                    backURL = {"MedicalHistoryScreen"}
                    backType = {"reset"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Select Your Pharmacy</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={[MainStyles.main, {marginLeft: 0, padding: 0, width: LAYOUT.window.width}]}>
                        <View style = {{width: LAYOUT.window.width, justifyContent: "center"}}>
                            <Text style = {{textAlign: "center", justifyContent: "center", alignItems: "center", color: 'black', fontWeight: "bold"}}>{this.state.pharmacy_name}</Text>
                            <Text style = {{textAlign: "center", justifyContent: "center", alignItems: "center", color: 'black'}}>{this.state.pharmacy_address}</Text>
                        </View>
                        {this.state.lat != 0 && this.state.lon != 0 ? (
                            <>
                            <MapView
                                style={{ height: LAYOUT.window.height - 180, width: LAYOUT.window.width}}
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation
                                initialRegion={{ 
                                    latitude: this.state.lat,
                                    longitude: this.state.lon,
                                    latitudeDelta: 0.0522,
                                    longitudeDelta: 0.031862500000000006,
                                }}
                            >
                                {this.state.markers.map((item, idx) => {
                                    return(
                                        <Marker
                                            key = {idx + 'map'}
                                            onPress={() => {this.pharmacyClick(item.name, item.vicinity)}}
                                            coordinate={{
                                                latitude: item.geometry.location.lat,
                                                longitude: item.geometry.location.lng
                                            }}
                                            title = {item.name}
                                            description = {item.vicinity}
                                            image = {MapMaker}
                                        ></Marker>
                                    )
                                })}
                            </MapView>
                            </>
                        ) : <View  style = { [MainStyles.loadingStyleView , {width: LAYOUT.window.width}]}>
                            <Indecate />
                        </View>}
                        <TouchableOpacity style={[MainStyles.centerStyle, { position: "relative", bottom: 140}]} onPress={() => this.nextPage()}>
                                <Text style={MainStyles.Button}>Continue</Text>
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
        pharmacyData: state.member,
    }
}

const mapDispatchToProps = {
    getLocationInfomation, getPreferredPharmacy
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPharmacy)

