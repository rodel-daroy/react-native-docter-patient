import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container} from 'native-base';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainStyles from "../../Style/MainStyle";
import Header from "../../Header/SecondHeader";
import Footer from "../../Footer/MemberFooter"
import { setNavigator } from "../../../../redux/actions/navigator"
import { LAYOUT, COLOR } from '../../../../constants';
import { getAppointments } from "../../../../redux/actions/memberActions"
import { getChatRoomAllData } from "../../../../redux/actions/ChatRoomActions"
import { BACKEND_URL } from "../../../../config"
import Indecate from "../../Indicating"


const itemsPerPage = 10;

export class BookedAppointments extends React.Component{
    constructor(props){
        super(props);
        setNavigator(props.navigation, 'secondPage')
    }

    state = {
        numberOfPages: 0,
        page: 0,
        fromPage: 1,
        toPage: itemsPerPage,
        pageArray: null,
        viewModal: false,
        selectedItem: {},
        BookedAppointmentArray: [],
        activeItem:null
    }

    componentDidMount(){
        setNavigator(this.props.navigation, 'secondPage')
        this.props.getAppointments({status: "booked"});
    }

    componentDidUpdate(prevProps) {
        if(prevProps.appointmentList !== this.props.appointmentList) {
            if(this.props.appointmentList.appointmentList) {
                var BookedAppointmentArray = this.props.appointmentList.appointmentList;
                
                // if (BookedAppointmentArray.length > itemsPerPage){
                //     var pageArr = [];
                //     for(var i = 0; i < itemsPerPage; i ++){
                //         pageArr.push(BookedAppointmentArray[i]);
                //     }
                //     this.setState({BookedAppointmentArray: BookedAppointmentArray, fromPage: BookedAppointmentArray.length > 0 ? 1 : 0, toPage: itemsPerPage, pageArray: pageArr});
                // } else {
                    this.setState({BookedAppointmentArray: BookedAppointmentArray, fromPage: BookedAppointmentArray.length > 0 ? 1 : 0, toPage: BookedAppointmentArray.length, pageArray: BookedAppointmentArray});
                // }
                // this.setSt
            } 
        }

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
    }

    toggleModal = (item) => {
        if(item !== "") {
            this.setState({ viewModal: !this.state.viewModal, selectedItem: item })
            this.props.getChatRoomAllData({patient_id: item.patient_id })
        } else {
            this.setState({ viewModal: !this.state.viewModal})
        }
    }

    activeItem(e, item){
        if(this.state.activeItem===e){
            this.setState({activeItem:null});
        }else{
            this.setState({selectedItem: item , activeItem:e})
            this.props.getChatRoomAllData({patient_id: item.patient_id })
        }
    }
    setPage = (page) => {
        if(page * itemsPerPage >= this.state.BookedAppointmentArray.length){
            alert('This is last page.')
            return;
        }
        if((page + 1) * itemsPerPage > this.state.BookedAppointmentArray.length){
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * page + this.state.BookedAppointmentArray.length % (itemsPerPage * page);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                pageArr.push(this.state.BookedAppointmentArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageArray: pageArr});
        } else {
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * (page + 1);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                pageArr.push(this.state.BookedAppointmentArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageArray: pageArr});
        }
        // this.setState({page: page})
    }

    cancelAppointment = () => {
        Alert.alert("Look out!",
            "If you must cancel / Reschedule an appointment, please call at (903) 8846601 / Email at admin@eclinicforyou.com us at least 24 hours in advance. 24 hour notice is defined as one businessday. Failure to cancel without 24 hour notice will result in a $15 fee. You are responsible for this fee; it will not be billed to insurance.",
        )
    }

    get_correct_time_with_time_zone = (input) => {
        var d = new Date(); // get current date
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
    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Booked Appointments"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView showsVerticalScrollIndicator = {true} alwaysBounceVertical = {true} style = {{height: LAYOUT.height, marginBottom:50}}>
                    <View style={{padding:20}}>
                    {
                        this.state.pageArray
                        ?this.state.pageArray.length > 0 ? this.state.pageArray.map((item, key)=>(
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
                                        <Text style={{fontSize:18}}>$ {this.state.selectedItem.amount}</Text>
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
                                            <Text style = {styles.titleStyle}>Medical Records: </Text>
                                            <View>
                                                {JSON.parse(this.state.selectedItem.upload_medical_records).map((item2, idx2) => (
                                                    <Image source = {{uri: BACKEND_URL + "uploads/" + item2}} key = {idx2 + 'images'}  style = {{width: 50, height: 50}}></Image>
                                                ))}
                                            </View>
                                        </View>
                                    ):null}
                                <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.cancelAppointment()}>
                                    <Text style={MainStyles.Button}>Cancel Appointment</Text>
                                </TouchableOpacity>
                            </View>}
                            </View>
                        )) : 
                        <Text style = {[MainStyles.processingStyle, {width: "100%"}]}>There is not booked appointments.</Text>
                        :<Indecate />
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
        appointmentList: state.member,
        room_info: state.chatroom,
    }
}

const mapDispatchToProps = {
    getAppointments, getChatRoomAllData
}

export default connect(mapStateToProps, mapDispatchToProps)(BookedAppointments)

const styles = StyleSheet.create({
    listStyle: {
        flexDirection: "row",
        marginBottom: 10
    },
    titleStyle: {
        color: "black", 
        fontWeight: "700"
    },
    descriptionStyle: {
        color: "black"
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
        // padding: 5
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        padding: 10,
        fontSize: 16,
      },
      textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
      },
});
