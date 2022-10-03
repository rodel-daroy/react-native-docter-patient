import React from 'react';
import { connect } from "react-redux"
import { Platform, View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { TextInput } from "react-native-paper"
import { Container} from 'native-base';
import { Picker } from "@react-native-picker/picker";
// import MultiSelect from 'react-native-multiple-select';
import { Actions } from 'react-native-router-flux';


import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getChooseDoctorInfo } from "../../../redux/actions/memberActions"
import { setSelectedProviderAppointmentData } from "../../../redux/services/index"
import { BACKEND_URL } from "../../../config"
import ProviderImage from "../../../assets/doctor2.png"
import Indecate from "../Indicating"

export class ChooseDoctor extends React.Component{
    constructor(props){
        super(props);
        setNavigator(this.props.navigation, 'thirdPage')
    }
    state = {
        selectedLanguage: "0",
        selectedState: "0",
        showDropDownCities: false,
        isModalVisible: false,
        providerList: [],
        knownLanguage: [],
        states: [],
        selectedProviderInfo: {},
        searchProviderList: null,
        doctorName: "",
        selectedMemberArray: []
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
        this.props.getChooseDoctorInfo()
    }

    componentDidUpdate(prevProps, a){
        if(prevProps.chooseDoctorInfo !== this.props.chooseDoctorInfo) {
            if(this.props.chooseDoctorInfo.chooseDoctorInfo) {
                var array = [];
                for(var i = 0; i < this.props.chooseDoctorInfo.chooseDoctorInfo.providerInfo.length; i ++) {
                    var obj = this.props.chooseDoctorInfo.chooseDoctorInfo.providerInfo[i];
                    obj.name = obj.first_name + ' ' + obj.last_name;
                    array.push(obj);

                }
                this.setState({
                    providerList: array,
                    searchProviderList: array,
                    knownLanguage: this.props.chooseDoctorInfo.chooseDoctorInfo.knownLanguage,
                    states: this.props.chooseDoctorInfo.chooseDoctorInfo.states,
                })

            }
        }
    }

    viewDoctorProfile = (providerId) => {
        if(providerId == 0) {
            this.setState({isModalVisible: !this.state.isModalVisible});
        } else {
            var provider = this.state.providerList.filter(obj => obj.id == providerId)[0];
            this.setState({isModalVisible: !this.state.isModalVisible, selectedProviderInfo: provider});
            Actions.push('DoctorProfileViewScreen', provider);
        }
    };

    nextPage = (providerId, providerAvailable) => {
        setSelectedProviderAppointmentData('selectedProviderId', providerId);
        setSelectedProviderAppointmentData('selectedProviderAvailable', providerAvailable);
        setSelectedProviderAppointmentData('selectedProviderInfo', this.state.providerList.filter(obj => obj.id == providerId)[0]);
        Actions.push('AppointmentScheduleScreen');
    }

    searchLanguage = (itemValue) => {
        var searchArr = [];
        if(itemValue == "0") {
            searchArr = this.state.providerList;
        } else {
            for(var i = 0; i < this.state.providerList.length; i ++) {
                if(this.state.providerList[i].known_language.split(',').indexOf(itemValue) >= 0) {
                    searchArr.push(this.state.providerList[i]);
                }
            }
        }

        var searchArr2 = [];
        
        for(var i = 0; i < searchArr.length; i ++) {
            if(this.state.selectedState != "0") {
                if(searchArr[i].license.split(',').indexOf(this.state.selectedState.trim()) >= 0) {
                    searchArr2.push(searchArr[i]);
                }
            } else {
                searchArr2.push(searchArr[i]);
            }
        }
        this.setState({selectedLanguage: itemValue, searchProviderList: searchArr2});
    }
    
    searchState = (itemValue) => {
        var searchArr = [];
        if(itemValue == "0") {
            searchArr = this.state.providerList;
        } else {
            for(var i = 0; i < this.state.providerList.length; i ++) {
                if(this.state.providerList[i].license.split(',').indexOf(itemValue.trim()) >= 0) {
                    searchArr.push(this.state.providerList[i]);
                }
            }
        }
        var searchArr2 = [];        
        for(var i = 0; i < searchArr.length; i ++) {
            if(this.state.selectedLanguage != "0") {
                if(searchArr[i].known_language.split(',').indexOf(this.state.selectedLanguage) >= 0) {
                    searchArr2.push(searchArr[i]);
                }
            } else {
                searchArr2.push(searchArr[i]);
            }
        }
        this.setState({selectedState: itemValue, searchProviderList: searchArr2});
    }

    searchDoctorName = (name) => {
        this.setState({doctorName: name});
        this.search(name);
    }

    search = (doctorName) => {
        var searchArr = [];
        if(this.state.selectedLanguage == "0") {
            searchArr = this.state.providerList;
        } else {
            for(var i = 0; i < this.state.providerList.length; i ++) {
                if(this.state.providerList[i].known_language.split(',').indexOf(this.state.selectedLanguage) >= 0) {
                    searchArr.push(this.state.providerList[i]);
                }
            }
        }

        var searchArr2 = [];
        
        for(var i = 0; i < searchArr.length; i ++) {
            if(this.state.selectedState != "0") {
                if(searchArr[i].license.split(',').indexOf(this.state.selectedState.trim()) >= 0) {
                    searchArr2.push(searchArr[i]);
                }
            } else {
                searchArr2.push(searchArr[i]);
            }
        }
        var searchArr3 = searchArr2.filter(item => {
            let includesCondition =
                item.first_name.toLowerCase().includes(doctorName.toLowerCase()) ||
                item.last_name.toLowerCase().includes(doctorName.toLowerCase())
            if(includesCondition) {
                return includesCondition;
            }
        })
        this.setState({searchProviderList: searchArr3})
    }

    changeSelectedItems = (items) => {
        var searchArr = [];
        for(var i = 0; i < this.state.providerList.length;  i ++ ){
            for(var j = 0; j < items.length; j ++) {
                if(this.state.providerList[i].id == items[j]) {
                    searchArr.push(this.state.providerList[i]);
                }
            }
        }
        this.setState({ selectedMemberArray: items, searchProviderList: searchArr })
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Choose Your Doctor"}
                    backURL = {"SelectPharmacyScreen"}
                    backType = {"reset"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Choose Your Doctor</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <View style = {{borderBottomColor: COLOR.mainColor, borderBottomWidth: 1, marginBottom: 20}}>
                            <Picker
                                selectedValue={this.state.selectedState}
                                style={[MainStyles.pickerStyle, {marginBottom: 0}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.searchState(itemValue)
                                }
                            >
                                <Picker.Item label = "Search by State" value='0' />
                                {this.state.states.map((item, idx) => {
                                    return(
                                        <Picker.Item label={item.state_name} value={item.state_name} key = {idx + 'states'} />
                                    )
                                })}
                            </Picker>
                        </View>
                        <View style = {{borderBottomColor: COLOR.mainColor, borderBottomWidth: 1, marginBottom: 20}}>
                            {/* <MultiSelect
                                hideTags
                                items={this.state.providerList}
                                uniqueKey="id"
                                ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => this.changeSelectedItems(items)}
                                selectedItems={this.state.selectedMemberArray}
                                selectText="Select By Doctor"
                                searchInputPlaceholderText="Search Name..."
                                onChangeInput={ (text)=> console.log(text)}
                                tagRemoveIconColor = {COLOR.mainColor}
                                tagBorderColor = {COLOR.mainColor}
                                tagTextColor = {COLOR.mainColor}
                                selectedItemTextColor = {COLOR.mainColor}
                                selectedItemIconColor = {COLOR.mainColor}
                                itemTextColor="#000"
                                styleDropdownMenuSubsection = {{paddingLeft: 12}}
                                displayKey="name"
                                searchInputStyle={{ color: COLOR.mainColor }}
                                submitButtonColor = {COLOR.mainColor}
                                submitButtonText="OK"
                            /> */}
                            <TextInput 
                                    style={{backgroundColor: 'white'}} 
                                    theme={{
                                        colors: { placeholder: '#000',  text: '#000',  primary: COLOR.mainColor, background: 'transparent'
                                        }
                                    }}
                                    placeholder="Search name" value={this.state.doctorName} onChangeText={(e) => this.searchDoctorName(e)}/>
                        </View>
                        {this.state.searchProviderList ? this.state.searchProviderList.length > 0 ? this.state.searchProviderList.map((item, idx) => {
                            return (
                                <TouchableOpacity style={[MainStyles.userList, {borderWidth: 2, borderColor: item.available == "1" ? "green" : "red"}]} onPress = {() => this.nextPage(item.id, item.available)} key = {idx + 'providerList'}>
                                    <TouchableOpacity  onPress={() =>  this.viewDoctorProfile(item.id)} >
                                        <Image source = {item.provider_image ? {uri: BACKEND_URL + "uploads/providerimages/" + item.provider_image} : ProviderImage} style = {MainStyles.doctorImage}/>
                                    </TouchableOpacity>
                                    <View style = {{alignItems: "center", justifyContent: "center", width: LAYOUT.window.width * 0.45}}>
                                        <Text>{item.first_name + ' ' + item.last_name}</Text>
                                        <Text>{item.speciality_care}</Text>
                                        <Text style={[MainStyles.userName, {paddingLeft: 0, color: COLOR.mainColor}]}>Schedule</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : <Text style = {[MainStyles.processingStyle, {width: "100%"}]}>There is no Doctors</Text> : 
                        <View  style = { [MainStyles.loadingStyleView, {width: "100%"}] }>
                            <Indecate />
                        </View>}
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chooseDoctorInfo: state.member
    }
}

const mapDispatchToProps = {
    getChooseDoctorInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDoctor)    