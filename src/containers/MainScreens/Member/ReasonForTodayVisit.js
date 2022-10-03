import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { TextInput } from "react-native-paper";
import { Picker } from "react-native-wheel-pick";
import Modal from "react-native-modal"
import Textarea from "react-native-textarea"
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { setSelectedProviderAppointmentData } from "../../../redux/services/index"
import { getReasonForVisitList } from "../../../redux/actions/memberActions"

export class ReasonForTodayVisit extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        others: "",
        isModalVisible: false,
        selectedReasonLabel: "",
        selectedReasonValue: "",
        reasonForVisitList: []
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
        this.props.getReasonForVisitList();
    }

    componentDidUpdate(prevProps){
        if(prevProps.reasonList !== this.props.reasonList){
            if(this.props.reasonList.reasonForVisitList){
                var array = [{label: "No Reason", value: "0"}];
                for(var i = 0; i < this.props.reasonList.reasonForVisitList.length; i ++) {
                    array.push({
                        label: this.props.reasonList.reasonForVisitList[i].visit_name,
                        value: this.props.reasonList.reasonForVisitList[i].id
                    })
                }
                this.setState({reasonForVisitList: array});
            }
        }
    }

    toggleModal = () => {
        // alert('12312312');
        var xx = this.state.isModalVisible;
        this.setState({isModalVisible: !xx});
    }

    setRadioValue = (value) => {
        var label = this.state.reasonForVisitList.filter(obj => obj.value == value)[0].label;
        this.setState({
            selectedReasonValue: value,
            selectedReasonLabel: label,
        })
    }

    nextPage = () => {
        if((this.state.selectedReasonValue == "" || this.state.selectedReasonValue == "0") && this.state.others == "") {
            alert('Enter Visit Reason');
            return;
        }
        setSelectedProviderAppointmentData('visitReason', this.state.selectedReasonValue);
        setSelectedProviderAppointmentData('visitReasonText', this.state.selectedReasonLabel);
        setSelectedProviderAppointmentData('visitReasonTextOthers', this.state.others);
        Actions.push('HaveSymptomsScreen');
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"What is the Reason for Today's Visit?"}
                    backURL = {"PatientInfoScreen"}
                    backType = {"reset"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>What is the Reason for Today's Visit?</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <TextInput
                            style={MainStyles.TextInput}
                            theme={{    
                                colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                }
                             }}
                            label="The Reason For Today's Visit"
                            Outlined = {true}
                            value = {this.state.selectedReasonLabel}
                            // onTouchStart={() => this.toggleModal()}
                            onChangeText={text => console.log(text)}
                            onFocus = {() => this.toggleModal()}
                        />
                        <Textarea 
                             containerStyle={MainStyles.textareaContainer}
                             style={MainStyles.textareaStyle}
                             onChangeText={(text) => this.setState({others: text})}
                             maxLength={120}
                             value = {this.state.others}
                             placeholder={'Others'}
                             placeholderTextColor={'#c7c7c7'}
                             underlineColorAndroid={'transparent'}
                        />
                        <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextPage()}>
                            <Text style={MainStyles.Button}>Continue</Text>
                        </TouchableOpacity>
                        
                        <Modal 
                            transparent={true}
                            isVisible={this.state.isModalVisible}
                            animationIn = {"slideInUp"}
                            animationInTiming = {500}
                            style={{display: "flex", alignItems: "center", flex: 1, justifyContent: "flex-end", marginBottom: 0}}
                        >
                            {/* <TouchableOpacity 
                                activeOpacity={1} 
                                onPressOut={() => {this.toggleModal()}}
                            > */}
                                <View style={MainStyles.PickerModalStyle}>
                                    {this.state.reasonForVisitList.length > 0 ? (
                                        <Picker
                                            style={{ backgroundColor: 'transparent', width: '90%', height: 300}}
                                            selectedValue = {this.state.selectedReasonValue}
                                            pickerData={this.state.reasonForVisitList}
                                            onValueChange={value => this.setRadioValue(value)}
                                            itemSpace={30} // this only support in android
                                        />
                                    ) : (null)}
                                    <View style = {MainStyles.modalButtonGroup}>
                                        <TouchableOpacity style={MainStyles.centerStyle} onPress = {() => this.toggleModal() }>
                                            <Text style={[MainStyles.Button, {paddingTop: 5, paddingBottom: 5, width: LAYOUT.window.width * 0.5}]}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            {/* </TouchableOpacity> */}
                        </Modal>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reasonList: state.member
    }
}

const mapDispatchToProps = {
    getReasonForVisitList
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonForTodayVisit)

