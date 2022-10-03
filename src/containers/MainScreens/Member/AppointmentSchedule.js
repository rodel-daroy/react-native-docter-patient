import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { TextInput, Checkbox} from "react-native-paper"
import Modal from "react-native-modal"
import { Calendar } from 'react-native-calendars';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setSelectedProviderAppointmentData, getSelectedProviderAppointmentData } from "../../../redux/services/index"
import { getAllSlots, checkCoupon, saveAppointment } from "../../../redux/actions/memberActions"
import Indecate from "../Indicating"
import { medicalGroupInformedConsent } from "../../fakeDB"


export class AppointmentsSchedule extends React.Component{
    constructor(props){
        super(props);
        let d = ((new Date())).getDate();
        if(getSelectedProviderAppointmentData().serviceType != 1)
        {
            d += 2;
        }
        this.state = {
            isModalVisible: getSelectedProviderAppointmentData().selectedProviderAvailable == "1" ? true : false,
            initialInput: "",
            haveAnyCoupon: "",
            activeindex: 0,
            appointmentDate: "",
            appointmentTime: "11:00:00",
            selectedTab: "1",
            amSlots: null,
            pmSlots: null,
            allAmSlots: [],
            allpmSlots: [],
            selectedTimeId: "",
            selectedTime: ((new Date()).getFullYear()) + '-' + (((new Date()).getMonth() + 1) >= 10 ? ((new Date()).getMonth() + 1) : '0' + ((new Date()).getMonth() + 1)) + '-' + ((d >= 10 ? d : "0" + d)) + ' ' + (((new Date()).getHours() < 10) ? ('0' + (new Date()).getHours()) : (new Date()).getHours()) + ':' + (((new Date()).getMinutes() < 10) ? ('0' + (new Date()).getMinutes()) : (new Date()).getMinutes()) + ':' + (((new Date()).getSeconds() < 10) ? ('0' + (new Date()).getSeconds()) : (new Date()).getSeconds()),
            initLetter: "",
            providerAvailable: "",
            medicalGroupInformedConsentModal: false,
            policyAgree: "unchecked",
            discountamount: 0,
            return_success: "",
            service_amount: 0,
            currentDate: ((new Date())).getFullYear() + '-' + ((((new Date())).getMonth() + 1) >= 10 ? (((new Date())).getMonth() + 1) : "0" + (((new Date())).getMonth() + 1)) + '-' + (d >= 10 ? d : "0" + d)
        }
    }
    componentDidMount() {
        // getSelectedProviderAppointmentData();
        this.props.getAllSlots({currentDate: this.state.currentDate})
        this.setState({initLetter: getSelectedProviderAppointmentData().newPatientData.firstName.split('')[0] +getSelectedProviderAppointmentData().newPatientData.lastName.split('')[0], providerAvailable: getSelectedProviderAppointmentData().selectedProviderAvailable})
        StatusBar.setHidden(true);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.slots !== this.props.slots) {
            if(this.props.slots.slots) {
                var amArr = [];
                var pmArr = [];
                for(var i = 0; i < this.props.slots.slots.amSlots.length; i ++) {
                    if(this.getTimeStamp(this.get_correct_time_with_time_zone(this.props.slots.slots.amSlots[i].start_time)) > (new Date()).getTime()) {
                        amArr.push({
                            id: this.props.slots.slots.amSlots[i].id,
                            time: this.get_correct_time_with_time_zone(this.props.slots.slots.amSlots[i].start_time).split(' ')[1].split(":")[0] + ':' + this.get_correct_time_with_time_zone(this.props.slots.slots.amSlots[i].start_time).split(' ')[1].split(":")[1] + 'AM'
                        })
                    }
                }
                for(var i = 0; i < this.props.slots.slots.pmSlots.length; i ++) {
                    if(this.getTimeStamp(this.get_correct_time_with_time_zone(this.props.slots.slots.pmSlots[i].start_time)) > (new Date()).getTime()) {
                        var h = this.get_correct_time_with_time_zone(this.props.slots.slots.pmSlots[i].start_time).split(' ')[1].split(":")[0] - 12;
                        if(h < 10) {
                            h = "0" + h;
                        }
                        pmArr.push({
                            id: this.props.slots.slots.pmSlots[i].id,
                            time: h + ':' + this.get_correct_time_with_time_zone(this.props.slots.slots.pmSlots[i].start_time).split(' ')[1].split(":")[1] + 'PM'
                        })
                    }
                }
                this.setState({
                    amSlots: amArr,
                    pmSlots: pmArr,
                    allAmSlots: this.props.slots.slots.amSlots,
                    allPmSlots: this.props.slots.slots.pmSlots
                })
            }
        }
        
        if(prevProps.coupon !== this.props.coupon)
        {
            this.setState(this.props.coupon);
        }
    }

    getTimeStamp(input) {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');
    
        var d = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
        return d.getTime();
    }

    toggleModal = (timeId) => {
        if(timeId == "") {
            this.setState({isModalVisible: !this.state.isModalVisible});
        } else {
            if(this.state.selectedTab == '1') {
                this.setState({selectedTime: this.get_correct_time_with_time_zone(this.state.allAmSlots.filter(obj => obj.id == timeId)[0].start_time)})
            } else {
                this.setState({selectedTime: this.get_correct_time_with_time_zone(this.state.allPmSlots.filter(obj => obj.id == timeId)[0].start_time)})
            }
            this.setState({isModalVisible: !this.state.isModalVisible, selectedTimeId: timeId});
        }
    };

    nextPage = () => {
        if(this.state.policyAgree == "unchecked") {
            alert('Please check if you are agree "terms of eClininforyou.com Medical Group\'s informed Consent"');
            return;
        }
        if(this.state.initLetter.toLocaleLowerCase() != this.state.initialInput.toLocaleLowerCase()) {
            alert('Enter Correct Initial');
            return;
        }

        let stime = this.state.selectedTime;
        if(this.state.selectedTimeId == "")
        {
            let now = new Date();
            now.setHours(now.getHours() + parseInt(this.props.user.tz), now.getMinutes(), now.getSeconds(), 0);
            
            var year = now.getFullYear();
            var month = (now.getMonth() + 1) < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
            var day = ((now.getDate() < 10) ? ('0' + now.getDate()) : now.getDate());
            var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
            var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
            var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
            stime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        }
        setSelectedProviderAppointmentData('appointmentTime', this.state.selectedTimeId);
        setSelectedProviderAppointmentData('selectedTime', stime);
        setSelectedProviderAppointmentData('couponCode', this.state.haveAnyCoupon);
        
        this.setState({isModalVisible: false});
        if(this.state.return_success === "Successfully applied" && parseInt(this.state.service_amount) === 0)
        {
            setSelectedProviderAppointmentData('freeAppt', true);
            this.props.saveAppointment();
        }
        else
        {
            Actions.push('PaymentInfomationScreen');
        }
    }

    selectTab = (tabIndex) => {
        this.setState({selectedTab: tabIndex});
    }

    selectCalendarDay = (day) => {
        this.props.getAllSlots({currentDate: day})
        this.setState({appointmentDate: day.dateString})
    }

    get_correct_time_with_time_zone = (input) => {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');
        var dt = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
        dt.setHours( dt.getHours() + parseInt(this.props.user.tz), dt.getMinutes(), dt.getSeconds(), 0 );

        var year = dt.getFullYear();
        var month = (dt.getMonth() + 1) < 10 ? ('0' + (dt.getMonth() + 1)) : (dt.getMonth() + 1);
        var day = ((dt.getDate() < 10) ? ('0' + dt.getDate()) : dt.getDate());
        var hour = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        var minute = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        var second = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
        var returnTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return returnTime;
    }

    goBack = () => {
        this.setState({isModalVisible: false})
        Actions.push('ChooseDoctorScreen');
    }

    applyCoupon = () => {
        if(this.state.haveAnyCoupon == "")
        {
            alert("Please enter your coupon code.");
            return;
        }
        this.props.checkCoupon({couponCode: this.state.haveAnyCoupon});
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Select An Appointment"}
                    backURL = {"ChooseDoctorScreen"}
                    backType = {"reset"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Schedule an Appointment</Text> */}
                    </View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                        <Calendar
                            current={this.state.currentDate}
                            minDate={this.state.currentDate}
                            onDayPress={(day) => this.selectCalendarDay(day.dateString)}
                            onPressArrowRight={addMonth => addMonth()}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            theme = {{
                                textSectionTitleColor: '#b6c1cd',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: 'red',
                                todayTextColor: 'red',
                                dayTextColor: 'blue',
                                textDayFontFamily: 'monospace',
                                textMonthFontFamily: 'monospace',
                                textDayHeaderFontFamily: 'monospace',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '700',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16,
                            }}
                            style = {{borderWidth: 2, borderColor: COLOR.mainColor, marginBottom: 20}}
                        />
                        <Tabbar
                            selectTab = {this.selectTab}
                            selectedTab= {this.state.selectedTab}
                            amSlots = {this.state.amSlots}
                            pmSlots = {this.state.pmSlots}
                            toggleModal = {this.toggleModal}
                        />
                        <Modal 
                            isVisible={this.state.isModalVisible}
                            animationIn = {"slideInUp"}
                            animationInTiming = {500}
                            style = {MainStyles.ModalStyle}
                        >
                            {/* <TouchableOpacity 
                                activeOpacity={1} 
                                onPressOut={() => {this.toggleModal("")}}
                            > */}
                                <ScrollView style={{width: "100%"}}>
                                    {this.state.providerAvailable == "1" ? (<TouchableOpacity onPress = {() => this.goBack()} style = {{padding: 10}} ><FontAwesome name = "arrow-left" size = {25}></FontAwesome></TouchableOpacity>) : (
                                        <TouchableOpacity onPress = {() => this.toggleModal("")} style = {{padding: 10}} ><Text style = {{fontSize: LAYOUT.fontSize7}}>×</Text></TouchableOpacity>
                                    )}
                                    <View style={{flex: 1, width: "100%"}}>
                                        <Text style = {{justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: LAYOUT.fontSize3, color: COLOR.mainColor}}>Review your Appointment</Text>
                                        <View style = {{width: "100%", justifyContent: "center", alignItems: "center", marginTop: 5}}>
                                            <View style = {{width: "40%", borderBottomWidth: 1, borderBottomColor: COLOR.mainColor}}></View>
                                        </View>
                                        <View  style={{width: "100%"}}>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Patient Name</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().newPatientData.firstName + ' ' + getSelectedProviderAppointmentData().newPatientData.lastName}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Symptoms</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().medical_symptom_text}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Visit Type</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().visitReasonText != "" ? getSelectedProviderAppointmentData().visitReasonText : getSelectedProviderAppointmentData().visitReasonTextOthers}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Doctor Name</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().selectedProviderInfo.first_name + ' ' + getSelectedProviderAppointmentData().selectedProviderInfo.last_name}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Service Type</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().serviceName}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Appointment Date</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{this.state.selectedTime }</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>When did your problem started ?</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().medical_condition_whenProblemStartedValue}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Are you taking any Medications ?</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().medical_condition_takeAnyMedication}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Do you have any Drug allergies ?</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().medical_condition_takeAnyDrug}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Do you have any Medical conditions ?</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().medical_condition_text}</Text>
                                                </View>
                                            </View>
                                            {
                                                getSelectedProviderAppointmentData().serviceType == 1 ? null : 
                                                <>
                                                <View style = {MainStyles.modalInfoTextView}>
                                                    <View>
                                                        <Text style = {MainStyles.modalInfoBodyText }>Doctor's Name</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().doctor_name}</Text>
                                                    </View>
                                                </View>
                                                <View style = {MainStyles.modalInfoTextView}>
                                                    <View>
                                                        <Text style = {MainStyles.modalInfoBodyText }>Doctor's Phone</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().doctor_phone}</Text>
                                                    </View>
                                                </View>
                                                <View style = {MainStyles.modalInfoTextView}>
                                                    <View>
                                                        <Text style = {MainStyles.modalInfoBodyText }>Description</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().medical_conditions_descriptions}</Text>
                                                    </View>
                                                </View>
                                                </>
                                            }
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Call Type ?</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().callType}</Text>
                                                </View>
                                            </View>
                                            <View style = {MainStyles.modalInfoTextView}>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoBodyText }>Pharmacy</Text>
                                                </View>
                                                <View>
                                                    <Text style = {MainStyles.modalInfoHeaderText}>{getSelectedProviderAppointmentData().pharmacy_name + ', ' + getSelectedProviderAppointmentData().pharmacy_address}</Text>
                                                </View>
                                            </View>
                                            <TextInput
                                                style={[MainStyles.TextInput, {marginBottom: 0}]}
                                                theme={{    
                                                    colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                                    }
                                                }}
                                                label = {"Please enter your initials '(" + getSelectedProviderAppointmentData().newPatientData.firstName.split('')[0] +getSelectedProviderAppointmentData().newPatientData.lastName.split('')[0] + ")'"}
                                                Outlined = {true}
                                                value = {this.state.initialInput}
                                                onChangeText={text => this.setState({initialInput: text})}
                                            />
                                            <View style={{display: "flex", flexDirection: "row", width: "100%"}}>
                                                <TextInput
                                                    style={[MainStyles.TextInput, {flex: 4}]}
                                                    theme={{    
                                                        colors: { placeholder: '#2a93c9',  text: '#000000',  primary: '#2a93c9', underlineColor: 'transparent',  background: 'transparent'
                                                        }
                                                    }}
                                                    label="Do you have any coupon?"
                                                    Outlined = {true}
                                                    value = {this.state.haveAnyCoupon}
                                                    onChangeText={text => this.setState({haveAnyCoupon: text, return_success: ""})}
                                                />
                                                <TouchableOpacity style={{flex: 1, backgroundColor: COLOR.mainColor, textAlign: "center", height: 25, borderRadius: 6, marginTop: 10}} onPress={() => this.applyCoupon()}>
                                                    <Text style={{textAlign: "center", color: "#FFFFFF"}}>Apply</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {
                                                this.state.return_success == "" ? null : 
                                                <View style={{marginTop: 3}}>
                                                    <Text style={{color: (this.state.return_success == "Successfully applied" ? COLOR.mainColor : "red")}}>{this.state.return_success}</Text>
                                                </View>
                                            }
                                            <View style = {[MainStyles.checkboxForm, {marginTop: 30, alignItems: "flex-start", padding: 20, justifyContent: "flex-start"}]} >
                                                <Checkbox
                                                    status={this.state.policyAgree}
                                                    onPress = {() => this.setState({policyAgree: this.state.policyAgree == "checked" ? "unchecked" : "checked"})}
                                                    color = {COLOR.mainColor}
                                                />
                                                <Text onPress = {() => this.setState({policyAgree: this.state.policyAgree == "checked" ? "unchecked" : "checked"})} style = {{color: COLOR.mainColor}} >I agree to eClininforyou.com <Text style = {{textDecorationLine: 'underline', color: COLOR.mainColor, fontSize: LAYOUT.fontSize2}} onPress = {() => this.setState({medicalGroupInformedConsentModal: !this.state.medicalGroupInformedConsentModal})}>Terms & Conditions, Privacy Policy</Text></Text>
                                            </View>
                                            <TouchableOpacity style={MainStyles.centerStyle} onPress={()=> this.nextPage()}>
                                                <Text style={MainStyles.Button}>{"Total Amount $" + (this.state.return_success == "Successfully applied" ? this.state.service_amount : (getSelectedProviderAppointmentData().serviceType == "1" ? "60.00" : "175.00"))}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            {/* </TouchableOpacity> */}
                        </Modal>
                        
                    </View>
                </ScrollView>
                <Modal
                    transparent={true}
                    isVisible={this.state.medicalGroupInformedConsentModal}
                    animationIn = {"slideInUp"}
                    animationInTiming = {500}
                    animationOutTiming = {500}
                    style = {[MainStyles.SMSModalStyle, {paddingBottom: 20}]}
                >
                    <View style = {[MainStyles.smsStyle, {paddingBottom: 20}]}>
                        <TouchableOpacity style = {{width: "100%", padding: 10, marginTop: 20}} onPress = {() => this.setState({medicalGroupInformedConsentModal: !this.state.medicalGroupInformedConsentModal})}>
                            <Text style = {{width: "100%", textAlign: "right", marginTop: 20, paddingRight: 20}}>x</Text>
                        </TouchableOpacity>
                        <ScrollView style = {{width: "100%"}}>
                            <View style={{flex: 1, width: "100%", padding: LAYOUT.window.width * 0.05}}>
                                <Text style = {{fontSize: LAYOUT.fontSize3, color: COLOR.mainColor, fontWeight: "bold", paddingBottom: 20, width: "100%", textAlign: "center"}}>Informed Consent of Services Performed by Gayatri Tech LLC, (eClinicforyou.com)</Text>
                                {medicalGroupInformedConsent.map((item, idx) => {
                                    return(
                                        <View style = {{marginBottom: 30, justifyContent: "flex-start"}} key = {idx + 'policy'}>
                                            <Text style = {{color: COLOR.mainColor, fontSize: LAYOUT.fontSize2, marginBottom: 5}}>{item.title}</Text>
                                            <Text style = {{fontSize: LAYOUT.fontSize1, marginBottom: 5}}>{item.description1}</Text>
                                            {item.array.map((item1, idx1) => {
                                                return (
                                                    <View style = {{flexDirection: "row", marginBottom: 5}} key = {idx1 + 'index'}>
                                                        {item.icon == "letter" ? <Text>{String.fromCharCode(idx1 + 97) + '.'}</Text> : <FontAwesome name = {item.icon} size = {15} color = {COLOR.mainColor} />}
                                                        <Text>{item1}</Text>
                                                    </View>
                                                )
                                            })}
                                            <Text style = {{fontSize: LAYOUT.fontSize1, marginBottom: 5}}>{item.description2}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        <View style = {{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                            <TouchableOpacity style = {[MainStyles.infoButton, {padding: 10, width: '40%', borderColor: "#28a77e", borderWidth: 1, backgroundColor: "white"}]} onPress = {() => this.setState({medicalGroupInformedConsentModal: !this.state.medicalGroupInformedConsentModal})} >
                                <Text style = {{fontSize: LAYOUT.fontSize0, color: "#28a77e", textAlign: "center"}}>Got it</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        slots: state.member,
        coupon: state.member.couponForAppt
    }
}

const mapDispatchToProps = {
    getAllSlots, checkCoupon, saveAppointment
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsSchedule)

class Tabbar extends React.Component {
    render() {
        return (
            <View style = {MainStyles.TabbarStyle}>
                <View style = {MainStyles.tabHeader}>
                    <TouchableOpacity style = {[MainStyles.tabHeaderComponent, {borderBottomWidth: this.props.selectedTab == "1" ? 5 : 2}]} onPress = {() => this.props.selectTab('1')}>
                        <Text style = {MainStyles.tabHeaderText}>AM SLOTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[MainStyles.tabHeaderComponent, {borderBottomWidth: this.props.selectedTab == "2" ? 5 : 2}]} onPress = {() => this.props.selectTab('2')}>
                        <Text style = {MainStyles.tabHeaderText}>PM SLOTS</Text>
                    </TouchableOpacity>
                </View>
                <View style = {MainStyles.tabBody}>
                    {(()=>{
                        if(this.props.selectedTab == '1') {
                            return (
                                <ScrollView>
                                    <View style = {{overflow: "scroll",flexDirection : "row", flexWrap : "wrap", justifyContent: "center", alignItems: "center"}}>
                                        {this.props.amSlots ? this.props.amSlots.length > 0 ? this.props.amSlots.map((item, idx) => {
                                            return (
                                                <TouchableOpacity  onPress={() =>  this.props.toggleModal(item.id)} style = {MainStyles.appointmentTime} key = {idx + 'amslots'} >
                                                    <Text style={{color: "white", fontSize: LAYOUT.fontSize0, width: "100%", textAlign: "center"}}>{item.time}</Text>
                                                </TouchableOpacity>
                                            )
                                        }) : 
                                            <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}><Text style={{justifyContent: "center", textAlign: "center", alignItems: "center", margin: "auto", margin: 30, width: "100%"}}>No Slots</Text></View>
                                        : 
                                        <View  style = { [MainStyles.loadingStyleView, {width: "100%"}] }>
                                        <Indecate />
                                    </View>
                                        }
                                    </View>
                                </ScrollView>
                            )
                        } else {
                            return (
                                <ScrollView>
                                    <View style = {{overflow: "scroll",flexDirection : "row", flexWrap : "wrap", justifyContent: "center", alignItems: "center"}}>
                                        {this.props.pmSlots ? this.props.pmSlots.length > 0 ? this.props.pmSlots.map((item, idx) => {
                                            return (
                                                <TouchableOpacity  onPress={() =>  this.props.toggleModal(item.id)} style = {MainStyles.appointmentTime} key = {idx + 'pmslots'} >
                                                    <Text style={{color: "white", fontSize: LAYOUT.fontSize0}}>{item.time}</Text>
                                                </TouchableOpacity>
                                            )
                                        }) : 
                                            <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}><Text style={{justifyContent: "center", textAlign: "center", alignItems: "center", margin: "auto", margin: 30, width: "100%"}}>No Slots</Text></View>
                                        : 
                                        <View  style = { [MainStyles.loadingStyleView, {width: "100%"}] }>
                                        <Indecate />
                                    </View>
                                        }
                                    </View>
                                </ScrollView>
                            )
                        }
                    })()}
                </View>
            </View>
        )
    }
}