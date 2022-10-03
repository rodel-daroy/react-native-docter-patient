import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { DataTable } from "react-native-paper";
import { Container} from 'native-base';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Picker } from "@react-native-picker/picker"
import { Picker } from 'react-native';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { getBillingData } from "../../../redux/actions/memberActions"
import { getSelectedProviderAppointmentData } from "../../../redux/services"
import { getChatRoomAllData } from "../../../redux/actions/ChatRoomActions"
import Indecate from "../Indicating"
import { BACKEND_URL } from '../../../config';

const itemsPerPage = 10;

export class BillingPayments extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        selectedItem: {},
        activeItem:null,
        numberOfPages: 0,
        page: 0,
        fromPage: 1,
        toPage: itemsPerPage,
        pageArray: [],
        fromDate: "",
        toDate: "",
        birthday: "",
        searchArray: [],
        pageData: [],
        totalAmount: 0.00,
        realAmount: 0.00,
        selectedMonth: '',
        monthList: [
            { label: 'All', value: '' },
            { label: 'January', value: '01' },
            { label: 'February', value: '02' },
            { label: 'March', value: '03' },
            { label: 'April', value: '04' },
            { label: 'May', value: '05' },
            { label: 'June', value: '06' },
            { label: 'July', value: '07' },
            { label: 'August', value: '08' },
            { label: 'September', value: '09' },
            { label: 'October', value: '10' },
            { label: 'November', value: '11' },
            { label: 'December', value: '12' },
        ]
    }


    componentDidMount(){
        // console.log(getSelectedProviderAppointmentData().patientData)
        this.props.getBillingData();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.room_info !== this.props.room_info) {
            if(this.props.room_info.all_appointment_info) {
                var data = this.props.room_info.all_appointment_info;
                // return;
                // symptom Making
                var symptomArr = [];
                var appointmentSymptomArr = this.state.selectedItem.medical_sympotoms ? this.state.selectedItem.medical_sympotoms.split(',') : "";
                // var appointmentSymptomArr = [13,31];
                for(var i = 0; i < data.symptomList.length; i ++) {
                    for(var j = 0; j < appointmentSymptomArr.length; j ++) {
                        if(data.symptomList[i].id == appointmentSymptomArr[j]) {
                            symptomArr.push(data.symptomList[i].symptom_name)
                        }
                    }
                }
                var symptomString = symptomArr.join();

                // visit type making
                var visitTypeString = data.visitTypeList.filter(obj => obj.id == this.state.selectedItem.visit_type)[0] ? data.visitTypeList.filter(obj => obj.id == this.state.selectedItem.visit_type)[0].visit_name : "";
                // var visitTypeString = data.visitTypeList.filter(obj => obj.id == '6')[0].visit_name;
                
                // medical Conditions
                var medicalConditionArray = [];
                var appointmentMedicalConditionArr = this.state.selectedItem.medical_questions ? this.state.selectedItem.medical_questions.split(',') : '';
                // var appointmentMedicalConditionArr = [4,6,7,8,9,10,12,13,14,16,18,19,20,21,22];
                for(var i = 0; i < data.medicalConditionList.length; i ++) {
                    for(var j = 0; j < appointmentMedicalConditionArr.length; j ++) {
                        if(data.medicalConditionList[i].id == appointmentMedicalConditionArr[j]) {
                            medicalConditionArray.push(data.medicalConditionList[i].condition_name)
                        }
                    }
                }
                var medicalCondtionString = medicalConditionArray.join();

                var item = this.state.selectedItem;
                item.symptomString = symptomString;
                item.visitTypeString = visitTypeString;
                item.medicalCondtionString = medicalCondtionString;
                item.patientEmail = data.patientData[0] ? data.patientData[0].email : "";
                item.patientPhone = data.patientData[0] ? data.patientData[0].phone : "";
                this.setState({selectedItem: item})
            }
        }
        if(prevProps.providerBillingTransiction !== this.props.providerBillingTransiction) {
            if(this.props.providerBillingTransiction.providerBillingTransiction){
                var datas = this.props.providerBillingTransiction.providerBillingTransiction;
                var total_amount = 0.00;
                for(var i = 0; i < datas.length; i ++) {
                    var final_amount = 0;
                    if(datas[i].status == '2') {
                        if(datas[i].canceled_by == "Provider") {
                            final_amount = parseFloat(0.00);
                        } else if(datas[i].canceled_by == "Member") {
                            final_amount = parseFloat(15.00);
                        } else if(datas[i].canceled_by == 'Admin') {
                            if(datas[i].apply_fee == 1) {
                                final_amount = parseFloat(15.00);
                            } else {
                                final_amount = parseFloat(0.00);
                            }
                        }
                    } else if(datas[i].status == "3") {
                        final_amount = parseFloat(15.00);
                    } else {
                        final_amount = parseFloat(datas[i].final_amount);
                    }
                    datas[i].final_amount = final_amount;
                    total_amount += final_amount;
                }

                var real_amount = final_amount;
                // if (datas.length > itemsPerPage){
                //     real_amount = 0;
                //     var pageArr = [];
                //     for(var i = 0; i < itemsPerPage; i ++){
                //         pageArr.push(datas[i]);
                //         real_amount += datas[i].final_amount;
                //     }
                //     this.setState({fromPage: datas.length > 0 ? 1 : 0, toPage: itemsPerPage, pageArray: datas, pageData: pageArr, searchArray: datas, numberOfPages: Math.floor(datas / itemsPerPage)});
                // } else {
                    this.setState({fromPage: datas.length > 0 ? 1 : 0, toPage: datas.length, pageArray: datas, pageData: datas, searchArray: datas, numberOfPages: Math.floor(datas / itemsPerPage)});
                // }
                this.setState({totalAmount: total_amount, realAmount: real_amount})
            }
        }
    }

    setPage = (page, noButton) => {
        if(page * itemsPerPage >= this.state.searchArray.length){
            if(noButton) {
                this.setState({page: 0, fromPage: 0, toPage: 0, pageData: [], realAmount: 0});
            }
            else {
                alert('This is last page.')
            }
            return;
        }

        var real_amount = 0;
        if((page + 1) * itemsPerPage > this.state.searchArray.length){
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * page + this.state.searchArray.length % (itemsPerPage * page);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                real_amount += parseFloat(this.state.searchArray[i].final_amount);
                pageArr.push(this.state.searchArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageData: pageArr, realAmount: real_amount});
        } else {
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * (page + 1);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                real_amount += parseFloat(this.state.searchArray[i].final_amount);
                pageArr.push(this.state.searchArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageData: pageArr, realAmount: real_amount});
        }
        // this.setState({page: page})
    }

    changeFromDate = async (date) => {
        if(this.state.toDate !== "" && date > this.state.toDate) {
            alert('Select Correct From Date(From Date < To Date).');
            return;
        }
        var searchArray = [];
        for(var i = 0; i < this.state.pageArray.length; i ++) {
            if(this.state.toDate != "") {
                if(this.state.pageArray[i].appointment_date <= this.state.toDate && this.state.pageArray[i].appointment_date >= date) {
                    searchArray.push(this.state.pageArray[i]);
                }
            } else {
                if(this.state.pageArray[i].appointment_date >= date) {
                    searchArray.push(this.state.pageArray[i]);
                }
            }
        }
        await this.setState({fromDate: date, searchArray: searchArray, totalAmount: this.calculateAmount(searchArray),  realAmount: this.calculateAmount(searchArray), numberOfPages: Math.floor(searchArray / itemsPerPage)})
        this.setPage(0, true);
    }

    changeToDate = async (date) => {
        if(this.state.fromDate !== "" && date < this.state.fromDate) {
            alert('Select Correct To Date.(To Date > From Date)');
            return;
        }
        var searchArray = [];
        for(var i = 0; i < this.state.pageArray.length; i ++) {
            if(this.state.fromDate !== "") {
                if(this.state.pageArray[i].appointment_date <= date && this.state.pageArray[i].appointment_date >= this.state.fromDate) {
                    searchArray.push(this.state.pageArray[i]);
                }
            } else {
                if(this.state.pageArray[i].appointment_date <= date) {
                    searchArray.push(this.state.pageArray[i]);
                }
            }
        }
        this.setState({toDate: date, searchArray: searchArray, totalAmount: this.calculateAmount(searchArray), realAmount: this.calculateAmount(searchArray), numberOfPages: Math.floor(searchArray / itemsPerPage)})
        this.setPage(0, true);
    }

    calculateAmount = (array) => {
        var amount = 0.00;
        for(var i = 0; i < array.length; i ++) {
            amount += parseFloat(array[i].final_amount);
        }
        return amount;
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

    showSelectedMonthData = async (val) => {
        await this.setState({selectedMonth: val});
        
        if(val === '') {
            await this.setState({fromDate: '', toDate: ''});
            this.changeFromDate('');
            this.changeToDate('');
            return;
        }
        
        var d = new Date();
        var year = d.getFullYear();
        var month = val;
        var fromDate = year + '-' + month + '-01 00:00:00';
        d.setMonth(month);
        d.setDate(0);
        var toDate = year + '-' + month + '-' +d.getDate()+ ' 23:59:59';

        await this.setState({fromDate: fromDate, toDate: toDate});
        this.changeFromDate(fromDate);
        this.changeToDate(toDate);
    }

    showCurrentMonthData = async () => {
        var d = new Date();
        var month = (d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
        await this.setState({selectedMonth: month+''});
        this.showSelectedMonthData(month);
    }
    activeItem(e, item){
        if(this.state.activeItem===e){
            this.setState({activeItem:null});
        }else{
            this.setState({selectedItem: item , activeItem:e})
            this.props.getChatRoomAllData({patient_id: item.patient_id })
        }
    }
    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Billing / Payments \n (" + getSelectedProviderAppointmentData().patientData.first_name + ' ' + getSelectedProviderAppointmentData().patientData.last_name + ")"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={[MainStyles.HeaderStyle, {paddingTop: 30}]}></View>
                <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
                    <View style = {{borderBottomColor: COLOR.mainColor, borderBottomWidth: 1, flex: 1}}>
                        <Picker
                            selectedValue={this.state.selectedMonth}
                            onValueChange={(itemValue, itemIndex) =>
                                this.showSelectedMonthData(itemValue)
                            }
                        >
                            {this.state.monthList.map((item, idx) => {
                                return(
                                    <Picker.Item label={item.label} color = {"black"} value={item.value} key = {idx} />
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Text style={{width: '100%'}}>{`$${this.state.realAmount} (Total $${this.state.totalAmount})`}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator = {true} alwaysBounceVertical = {true} style = {{height: LAYOUT.height, marginBottom:50}}>
                    <View style={{padding:20}}>
                    {
                        this.state.pageData&&this.state.pageData.length
                        ?this.state.pageData.map((item, key)=>(
                            <View key={key} style={{
                                backgroundColor:'#fff',
                                width:LAYOUT.window.width*0.95,
                                padding:20,
                                
                                borderRadius:10,
                        
                                shadowOffset: { width: 10, height:5 },
                                shadowColor: '#000',
                                shadowOpacity: 1, 
                                shadowRadius: 5,
                                elevation:3,
                                marginBottom:40,
                                alignItems:'center',
                                overflow:'visible'
                            }}>
                                <TouchableOpacity onPress={()=>this.activeItem(key, item)} style={{backgroundColor:COLOR.mainColor, width:50, height:50, borderRadius:25, position:'absolute', bottom:-20, justifyContent:'center', alignItems:'center'}}>
                                    {
                                        this.state.activeItem===key?
                                        <FontAwesome name="angle-up" size={40} color='#fff' />:
                                        <FontAwesome name="angle-down" size={40} color='#fff' />
                                    }
                                </TouchableOpacity>
                                <View style={{width:'100%', flexDirection:'row',}}>
                                    <View style={{width:'30%'}}>
                                        <Text style={{marginTop:5, fontSize:18, fontWeight:'700'}}>{`${item.providerFirstName} ${item.providerLastName}`}</Text>
                                        <Text style={{marginTop:5, fontSize:18, fontWeight:'700'}}>{`${item.memberFirstName} ${item.memberLastName}`}</Text>
                                        
                                    </View>
                                    <View style={{width:'30%'}}>
                                        <View style={{flexDirection:'row',marginTop:5}}>
                                            <FontAwesome name="calendar" size={24} color={COLOR.mainColor} />
                                            <Text style={{marginLeft:10}}>{item.appointment_date.slice(0,10)}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:15}}>
                                            <FontAwesome name="clock-o" size={24} color={COLOR.mainColor} />
                                            <Text style={{marginLeft:10}}>{item.appointment_date.slice(11,16)}</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'30%'}}>
                                        <Text style={{marginTop:5, color:COLOR.mainColor}}>{
                                            (() => {
                                                if(item.status == "0") {
                                                    return "Booked";
                                                } else if( item.status == "1") {
                                                    return "Completed";
                                                } else if( item.status == "2") {
                                                    return "Cancelled";
                                                } else if( item.status == "3") {
                                                    return "NoShow";
                                                } else {
                                                    return "-";
                                                }
                                            })()
                                        }</Text>
                                        <Text style={{marginTop:15, }}>{item.service_id == "1" ? "General Health" : "2nd Option"}</Text>
                                    </View>
                                    <View style={{justifyContent:'space-between', paddingBottom:20}}>
                                        {
                                            item.call_type==='Video Call'?
                                            <FontAwesome name = "video-camera" size = {LAYOUT.window.width * 0.05} style = {{color:'#03CB33', marginBottom: 20}} />:
                                            <FontAwesome name = "volume-up" size = {LAYOUT.window.width * 0.05} style = {{color:'#03CB33', marginBottom: 20}} />
                                        }
                                    </View>
                                </View>
                                {this.state.activeItem===key&&<View style={{marginBottom:10,}}>
                                    <View style = {{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10}}>
                                        <View style = {{width: LAYOUT.window.width*0.8, borderBottomColor: COLOR.mainColor, borderBottomWidth: 2, marginTop: 20, justifyContent: "center", alignItems: "center"}}></View>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Patient Email  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.patientEmail}</Text>
                                    </View>    
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Patient Phone  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.patientPhone}</Text>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Visit Type :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.visitTypeString}</Text>
                                    </View>  
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Amount  :</Text>
                                        <Text style={{fontSize:18}}>{
                                            (() => {
                                                if(item.status == '2') {
                                                    if(item.canceled_by == "Provider") {
                                                        return '$ 0.00';
                                                    } else if(item.canceled_by == "Member") {
                                                        return '$ 15.00';
                                                    } else if(item.canceled_by == 'Admin') {
                                                        if(item.apply_fee == 1) {
                                                            return '$ 15.00';
                                                        } else {
                                                            return '$ 0.00';
                                                        }
                                                    }
                                                } else if(item.status == "3") {
                                                    return '$ 15.00';
                                                } else {
                                                    return '$ ' + item.final_amount;
                                                }
                                            })()
                                        }</Text>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Height  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.height1}</Text>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Patient Age  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.age + ' years ' + this.state.selectedItem.month + ' months ' + this.state.selectedItem.days + ' days '}</Text>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Relationship  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.relationship}</Text>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Weight  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.weight}</Text>
                                    </View>
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>BMI  :</Text>
                                        <Text style={{fontSize:18}}>{this.state.selectedItem.bmi}</Text>
                                    </View>
                                    <View style={{marginTop:10, alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Symptoms : {this.state.selectedItem.symptomString}</Text>
                                    </View>    
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}> When did your problem started :   {this.state.selectedItem.problem_started}</Text>
                                    </View>    
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Are you taking any Medications :   {this.state.selectedItem.medical_conditions_descriptions}</Text>
                                    </View>    
                                    <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Do you have any Drug allergies :   {this.state.selectedItem.medical_conditions_descriptions}</Text>
                                    </View>
                                    <View style={{marginTop:10, alignItems:'flex-start'}}>
                                        <Text style={{fontSize:18}}>Do you have any Medical conditions :    {this.state.selectedItem.medicalCondtionString}</Text>
                                    </View>    
                                    {this.state.selectedItem.upload_medical_records && this.state.selectedItem.upload_medical_records != null && this.state.selectedItem.upload_medical_records != "" ? (
                                        <View>
                                            <Text style = {{color: "black", fontWeight: "700"}}>Medical Records: </Text>
                                            <View>
                                                {JSON.parse(this.state.selectedItem.upload_medical_records).map((item2, idx2) => (
                                                    <Image source = {{uri: BACKEND_URL + "uploads/" + item2}} key = {idx2 + 'images'}  style = {{width: 50, height: 50}}></Image>
                                                ))}
                                            </View>
                                        </View>
                                    ):null}
                            </View>}
                        </View>
                        )):null
                    }
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
        providerBillingTransiction: state.member,
        room_info: state.chatroom,
    }
}

const mapDispatchToProps = {
    getBillingData, getChatRoomAllData
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPayments)
