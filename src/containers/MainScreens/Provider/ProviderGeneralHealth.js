import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, ScrollView,  Image } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import { CheckBox } from "react-native-elements"
import {Calendar} from 'react-native-calendars';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader"
import Footer from "../Footer/ProviderFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getProviderAllSlots, setProviderScheduleSlots, setProviderSlotCheckAll } from "../../../redux/actions/providerActions.js"
import Indecate from "../Indicating"


export class ProviderGeneralHealth extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        initialInput: "",
        haveAnyCoupon: "",
        activeindex: 0,
        selectedTab: "1",
        allSlots: null,
        // pmSlots: [],
        selectedDate: '' 
    }

    componentDidMount() {
        var d = (new Date());
        var day = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' + ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
        this.setState({selectedDate: day})
        this.props.getProviderAllSlots({ currentDate: day, serviceType: '1', datePo: this.state.selectedTab, providerTimeZone: this.props.user.tz })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.providerSlots !== this.props.providerSlots) {
            if(this.props.providerSlots) {
                var start_time = '';
                var end_time = '';
                if (this.state.selectedTab == '1'){
                    start_time = this.getTimeStamp(this.state.selectedDate + ' 00:00:00');
                    end_time = this.getTimeStamp(this.state.selectedDate + ' 11:59:59');
                } else {
                    start_time = this.getTimeStamp(this.state.selectedDate + ' 12:00:00');
                    end_time = this.getTimeStamp(this.state.selectedDate + ' 23:59:59');
                }
                var slots = this.props.providerSlots.providerSlots;
                var allSlots = [];
                for(var i = start_time; i < end_time; i = i + (15 * 60 * 1000)) {
                    if(this.getTimeStamp(this.getDateFormat(0)) <= i) {
                        var obj = {
                            id: "",
                            slotTime: "",
                            isChecked: false,
                            isBooked: false,
                            totalTime: ""
                        }
                        for(var j = 0; j < slots.length; j ++) {
                            if(this.getDateFormat(i) == this.get_correct_time_with_time_zone(slots[j].start_time)) {
                                obj.id = slots[j].id;
                                obj.isChecked = true;
                                obj.isBooked = slots[j].appt_booked == "0" ? false : true
                            }
                        }
                        if(this.state.selectedTab == "1") {
                            obj.slotTime = new Date(i).toLocaleTimeString().split(':')[0] + ':' + new Date(i).toLocaleTimeString().split(':')[1] + ' AM';
                        } else {
                            obj.slotTime = (new Date(i).toLocaleTimeString().split(':')[0] - 12) + ':' + new Date(i).toLocaleTimeString().split(':')[1] + ' PM';
                        }
                        obj.totalTime = this.getDateFormat(i);
                        allSlots.push(obj);
                    } 
                }
                this.setState({allSlots: allSlots})
            }
        }
    }

    get_correct_time_with_time_zone = (input) => {
        var d = (new Date()); // get current date
        d.setHours(d.getHours() + 2, 0,0,0);

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

    getDateFormat(timestamp) {
        var d = null
        if(timestamp == 0) {
            d = (new Date())
        } else {
            d = new Date(timestamp);
        }
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
        var day = ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
        var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return time;
    }

    getTimeStamp(input) {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');
    
        var d = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
        return d.getTime();
    }

    selectTab = (tabIndex) => {
        this.props.getProviderAllSlots({currentDate: this.state.selectedDate, serviceType: '1', datePo: tabIndex, providerTimeZone: this.props.user.tz})
        this.setState({selectedTab: tabIndex});
    }

    selectCalendarDay = (day) => {
        this.props.getProviderAllSlots({currentDate: day, serviceType: 1, datePo: this.state.selectedTab, providerTimeZone: this.props.user.tz})
        this.setState({selectedDate: day})
    }

    selectTime = (index) => {
        var slotArray = this.state.allSlots;
        if( slotArray[index].isBooked == false) {
            slotArray[index].isChecked = slotArray[index].isChecked ? 'unchecked' : 'checked';
            this.props.setProviderScheduleSlots({currentDate: this.state.selectedDate, serviceType: 1, datePo: this.state.selectedTab, saveData: slotArray[index], providerTimeZone: this.props.user.tz})
            slotArray[index].isChecked = slotArray[index].isChecked == 'checked' ? true : false;
            this.setState({allSlots: slotArray})
        }
    }

    selectAll = (status) => {
        var slotArray = this.state.allSlots;
        if(slotArray.length > 0) {
            for(var i = 0; i < slotArray.length; i ++) {
                slotArray[i]['isChecked'] = (status == true ? true : false);
            }
            // this.setState({allSlots: slotArray})
            this.props.setProviderSlotCheckAll({currentDate: this.state.selectedDate, serviceType: 1, datePo: this.state.selectedTab, saveData: slotArray, status: status, providerTimeZone: this.props.user.tz})
        }
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header
                    headerText = {"General Health Service"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                    <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main1}>
                    <Calendar
                            current={(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1) >= 10 ? ((new Date()).getMonth() + 1) : "0" + ((new Date()).getMonth() + 1)) + '-' + ((new Date()).getDate() >= 10 ? (new Date()).getDate() : "0" + (new Date()).getDate())}
                            minDate={(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1) >= 10 ? ((new Date()).getMonth() + 1) : "0" + ((new Date()).getMonth() + 1)) + '-' + ((new Date()).getDate() >= 10 ? (new Date()).getDate() : "0" + (new Date()).getDate())}
                            onDayPress={(day) => {this.selectCalendarDay(day.dateString)}}
                            onPressArrowRight={addMonth => addMonth()}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            theme = {{
                                // textSectionTitleColor: '#b6c1cd',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: 'white',
                                todayTextColor: 'red',
                                dotColor: "green",
                                dayTextColor: COLOR.mainColor,
                                monthTextColor: "green",
                                textDayFontWeight: '700',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '700',
                                textDayHeaderFontSize: 16,
                                textDayFontSize: 16,
                                textMonthFontSize: 20,
                                textDayHeaderFontSize: 16,
                            }}
                            style = {{borderWidth: 2, borderColor: COLOR.mainColor}}
                        />
                        <Tabbar
                            selectTab = {this.selectTab}
                            selectedTab= {this.state.selectedTab}
                            allSlots = {this.state.allSlots}
                            selectTime = {this.selectTime}
                            selectAll = {this.selectAll}
                        />
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        providerSlots: state.provider
    }
}

const mapDispatchToProps = {
    getProviderAllSlots, setProviderScheduleSlots, setProviderSlotCheckAll
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderGeneralHealth)

class Tabbar extends React.Component {
    componentDidUpdate(){
    }
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
                                        <View style = {{flexDirection: "row", padding: 5, justifyContent: "center", alignItems: "center", width: "100%"}}>
                                            <TouchableOpacity style = {MainStyles.selectAllButtons} onPress = {() => this.props.selectAll(true)} >
                                                <Text style={{color: "white", fontSize: LAYOUT.fontSize1}}>{'Select All'}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style = {MainStyles.selectAllButtons} onPress = {() => this.props.selectAll(false)} >
                                                <Text style={{color: "white", fontSize: LAYOUT.fontSize1}}>{'Deselect All'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {this.props.allSlots ? this.props.allSlots.length > 0 ? this.props.allSlots.map((item, idx) => {
                                            return (
                                                // <TouchableOpacity style = {MainStyles.providerAppointmentTime} onPress = {() => this.props.selectTime(idx)} key = {idx + 'amSlots'} >
                                                //     <CheckBox
                                                //         status={item.isChecked}
                                                //         disabled = {item.isBooked}
                                                //         onPress = {() => this.props.selectTime(idx)}
                                                //         color = {'#fff'}
                                                //     />
                                                //     <Text style={{color: "white", fontSize: LAYOUT.fontSize1}}>{item.slotTime}</Text>
                                                // </TouchableOpacity>
                                                <CheckBox 
                                                    title={item.slotTime}
                                                    disabled={item.isBooked}
                                                    checked={item.isChecked}
                                                    onPress={() => this.props.selectTime(idx)}
                                                    containerStyle={MainStyles.providerAppointmentTime}
                                                    textStyle={{color: 'white'}}
                                                    checkedColor='#ffffff'
                                                />
                                            )
                                        }) : <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}><Text style={{justifyContent: "center", textAlign: "center", alignItems: "center", margin: "auto", margin: 30, width: "100%"}}>No Slots</Text></View> 
                                        : <View  style = { [MainStyles.loadingStyleView, {width: "100%"}] }>
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
                                        <View style = {{flexDirection: "row", padding: 5, justifyContent: "center", alignItems: "center", width: "100%"}}>
                                            <TouchableOpacity style = {MainStyles.selectAllButtons} onPress = {() => this.props.selectAll(true)} >
                                                <Text style={{color: "white", fontSize: LAYOUT.fontSize1}}>{'Select All'}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style = {MainStyles.selectAllButtons} onPress = {() => this.props.selectAll(false)} >
                                                <Text style={{color: "white", fontSize: LAYOUT.fontSize1}}>{'Deselect All'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        { this.props.allSlots ? this.props.allSlots.length > 0 ? this.props.allSlots.map((item, idx) => {
                                            return (
                                                // <TouchableOpacity style = {MainStyles.providerAppointmentTime} onPress = {() => this.props.selectTime(idx)} key = {idx + 'pmSlots'} >
                                                //     <CheckBox
                                                //         status={item.isChecked}
                                                //         disabled = {item.isBooked}
                                                //         onPress = {() => this.props.selectTime(idx)}
                                                //         color = {'#fff'}
                                                //     />
                                                //     <Text style={{color: "white", fontSize: LAYOUT.fontSize1}}>{item.slotTime}</Text>
                                                // </TouchableOpacity>
                                                <CheckBox 
                                                    title={item.slotTime}
                                                    disabled={item.isBooked}
                                                    checked={item.isChecked}
                                                    onPress={() => this.props.selectTime(idx)}
                                                    containerStyle={MainStyles.providerAppointmentTime}
                                                    textStyle={{color: 'white'}}
                                                    checkedColor='#ffffff'
                                                />
                                            )
                                        }) : <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}><Text style={{justifyContent: "center", textAlign: "center", alignItems: "center", margin: "auto", margin: 30, width: "100%"}}>No Slots</Text></View>
                                        : <View  style = { [MainStyles.loadingStyleView, {width: "100%"}] }>
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