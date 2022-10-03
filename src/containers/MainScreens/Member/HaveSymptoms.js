import React from 'react';
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Container} from 'native-base';
import Textarea from "react-native-textarea"
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator"
import { getSymptomList } from "../../../redux/actions/memberActions"
import { setSelectedProviderAppointmentData } from "../../../redux/services/index"
import Indecate from "../Indicating"

export class HaveSymptoms extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        others: "",
        symptomType: null,
        symptomList: [],
        activeType:null,
        index:0,
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage');
        this.props.getSymptomList();
    }

    componentDidUpdate(prevProps, prevStates){
        if(prevProps.symptomData !== this.props.symptomData) {
            if(this.props.symptomData.symptomData) {
                var array = [];
                for(var i = 0; i < this.props.symptomData.symptomData.symptomList.length; i ++){
                    array.push({
                        id: this.props.symptomData.symptomData.symptomList[i].id,
                        type_id: this.props.symptomData.symptomData.symptomList[i].symptom_type_id,
                        label: this.props.symptomData.symptomData.symptomList[i].symptom_name,
                    })
                }
                this.setState({
                    symptomType: this.props.symptomData.symptomData.symptomType,
                    symptomList: array,
                    activeType:this.props.symptomData.symptomData.symptomType[this.state.index?this.state.index:0]
                })
            }
        }
    }

    selectedCheck = (index) => {
        var array = this.state.symptomList;
        for( var i = 0; i < array.length; i ++ ) {
            if(array[i].id == index) {
                array[i].value = array[i].value ? false : true;
            }
        }
        this.setState({symptomList: array})
    }

    nextPage = () => {
        var saveIds = '';
        var saveTexts = '';
        for(var i = 0; i < this.state.symptomList.length; i ++) {
            if(this.state.symptomList[i].value) {
                saveIds += this.state.symptomList[i].id + ',';
                saveTexts += this.state.symptomList[i].label + ',';
            }
        }
        
        setSelectedProviderAppointmentData('medical_symptom_ids', saveIds);
        setSelectedProviderAppointmentData('medical_symptom_text', saveTexts);
        setSelectedProviderAppointmentData('medical_symptom_others', this.state.others);
        if(saveIds == "" && this.state.others == "") {
            alert('Select if you have any these Symptoms, if not skip');
            return;
        }

        // if(this.state.index != "Selected Symptoms")
        // {
        //     this.setState({index: "Selected Symptoms"});
        //     return;
        // }
        Actions.push('MedicalHistoryScreen');
    }

    nextSymptom = (skip) => {
        if(this.state.index == this.state.symptomType.length - 1){
            let index = this.state.symptomList.find(obj =>obj&&obj.value===true);
            index = index ? 'Selected Symptoms' : 'Others';
            if(index == "Others")
            {
                this.setState({index})
            }
            else
            {
                this.nextPage();
            }
            return;
        }
        
        if(this.state.index == "Others")
        {
            if(this.state.others == "")
            {
                alert("Please enter others");
                return;
            }
            else
            {
                this.nextPage();
            }
        }
        else
        {
            let selectedSymptom = this.state.symptomList.filter(obj => obj.type_id == this.state.activeType.id && obj.value === true);
            if(!selectedSymptom.length && !skip)
            {
                alert("Select if you have any these Symptoms, if not skip");
                return;
            }

            var ind = this.state.index + 1;

            this.setState({
                activeType:this.props.symptomData.symptomData.symptomType[ind],
                index: ind
            })
        }
    }

    prevSymptom = () => {
        var ind = this.state.index - 1;
        if(this.state.index == "Others")
        {
            ind = this.props.symptomData.symptomData.symptomType.length - 1;
        }

        if(ind < 0)
        {
            Actions.reset('ReasonForTodayVisitScreen');
        }
        else
        {
            this.setState({
                activeType:this.props.symptomData.symptomData.symptomType[ind],
                index: ind
            })
        }
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {this.state.index!=='Selected Symptoms'?"Choose Symptoms":'Selected Symptoms'}
                    backURL = {"ReasonForTodayVisitScreen"}
                    backType = {"reset"}
                />
                    <View style={[MainStyles.HeaderStyle,{marginTop: LAYOUT.window.height * 0.06}]}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => Actions.pop()} />
                        <Text style={MainStyles.HeaderText}>Do you have any of these Symptoms</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        {this.state.symptomType ? this.state.symptomType.length > 0 ? this.state.symptomType.map((item, idx) => {
                            if(this.state.index=='Selected Symptoms'){
                                return <View key={idx}>
                                    {this.state.symptomList.find(obj => obj&&obj.value===true)?
                                        <View>
                                            {this.state.symptomList.filter(obj => obj.type_id == item.id&&obj.value===true).length? 
                                            <View>
                                                <Text style = {[MainStyles.checkboxGroupHeader, {textAlign:'left'}]}>{item.type_name}</Text>
                                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                                    <View style={{flexDirection:'row', flexWrap:'wrap',padding:20}}>
                                                        {this.state.symptomList.filter(obj => obj.type_id == item.id&&obj.value===true).map((listItem, listIdx) => (
                                                            <TouchableOpacity onPress = {() => this.selectedCheck(listItem.id)} style={{backgroundColor:'#5BA2BC',margin:5, borderRadius:30, paddingVertical:10, paddingHorizontal:5}} key = {'checkbox' + listIdx}>
                                                                <Text style={{color:'#fff'}}>{listItem.label} ×</Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>
                                                <View style = {{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10}}>
                                                    <View style = {{width: LAYOUT.window.width*0.2, borderBottomColor: COLOR.mainColor, borderBottomWidth: 2, marginTop: 20, justifyContent: "center", alignItems: "center"}}></View>
                                                </View>
                                            </View>:null}
                                        </View>:
                                        <View>
                                            {this.state.symptomType.length===(idx+1)&&
                                            <View>
                                                <Text style = {[MainStyles.checkboxGroupHeader, {textAlign:'left'}]}>Others</Text>
                                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                                    <View style={{flexDirection:'row', flexWrap:'wrap',padding:20}}>
                                                        <TouchableOpacity style={{backgroundColor:'#5BA2BC',margin:5, borderRadius:30, paddingVertical:10, paddingHorizontal:5}}>
                                                            <Text style={{color:'#fff'}}>{this.state.others} ×</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style = {{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10}}>
                                                    <View style = {{width: LAYOUT.window.width*0.2, borderBottomColor: COLOR.mainColor, borderBottomWidth: 2, marginTop: 20, justifyContent: "center", alignItems: "center"}}></View>
                                                </View>
                                            </View>}
                                        </View>
                                    }
                                    {
                                        this.state.symptomType.length===(idx+1)&&
                                        <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextSymptom(false)}>
                                                <Text style={MainStyles.Button}>Next</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            }else if(this.state.index=='Others'){
                                return <View key={idx} style={{marginTop: 40}}>
                                    {idx===0&&<View>
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
                                        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
                                            <TouchableOpacity onPress={() => this.prevSymptom()}>
                                                {this.state.index == 0  
                                                 ? <Text style = {{backgroundColor:'#FFFFFF', color:'white', borderRadius:20, paddingVertical:2, paddingHorizontal:20, opacity: 0}}> </Text> 
                                                 : <Text style = {{backgroundColor:'#5BA2BC', color:'white', borderRadius:20, paddingVertical:2, paddingHorizontal:20}}>Prev</Text>
                                                }
                                            </TouchableOpacity>
                                            <Text>Others</Text>
                                            <Text style = {{backgroundColor:'#FFFFFF', color:'white', borderRadius:20, paddingVertical:2, paddingHorizontal:20, opacity: 0}}> </Text>
                                        </View>
                                        <TouchableOpacity style={MainStyles.centerStyle}  onPress={() => this.nextSymptom(false)}>
                                            <Text style={MainStyles.Button}>Continue</Text>
                                        </TouchableOpacity>
                                    </View>}
                                </View>
                            }else if(this.state.activeType&&this.state.activeType.id===item.id){
                                return (
                                    <ScrollView style = {MainStyles.checkboxGroup} key = {idx + 'type'}>
                                        <Text style = {MainStyles.checkboxGroupHeader}>Do you have any of these Symptoms?</Text>
                                        <View style={{flexDirection:'row', flexWrap:'wrap',padding:20}}>
                                            {this.state.symptomList.filter(obj => obj.type_id == item.id).map((listItem, listIdx) => (
                                                listItem.value ? 
                                                <TouchableOpacity 
                                                    onPress = {() => this.selectedCheck(listItem.id)} 
                                                    style={{
                                                        backgroundColor:'#5BA2BC',
                                                        borderColor:'#FFFFFF',
                                                        margin:5, 
                                                        borderWidth:1, 
                                                        borderRadius:30, 
                                                        paddingVertical:10, 
                                                        paddingHorizontal:5
                                                    }} 
                                                    key = {'checkbox' + listIdx}>
                                                    <Text style={{color:'#fff'}}>{listItem.label}</Text>
                                                </TouchableOpacity> : 
                                                <TouchableOpacity 
                                                    onPress = {() => this.selectedCheck(listItem.id)}
                                                    style={{
                                                        borderColor:'#5BA2BC',
                                                        margin:5, 
                                                        borderWidth:1, 
                                                        borderRadius:30, 
                                                        paddingVertical:10, 
                                                        paddingHorizontal:5
                                                    }} 
                                                    key = {'checkbox' + listIdx}>
                                                    <Text style={{color:'#5BA2BC'}}>{listItem.label}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
                                        {this.state.index == 0  
                                            ? <Text style = {{backgroundColor:'#FFFFFF', color:'white', borderRadius:20, paddingVertical:2, paddingHorizontal:20, opacity: 0}}> </Text> 
                                            : <TouchableOpacity onPress={() => this.prevSymptom()}>
                                                <Text style = {{backgroundColor:'#5BA2BC', color:'white', borderRadius:20, paddingVertical:2, paddingHorizontal:20}}>Prev</Text>
                                            </TouchableOpacity>}
                                            <Text>{item.type_name}</Text>
                                            <TouchableOpacity onPress={() => this.nextSymptom(true)} disabled={this.state.symptomList.filter(obj => obj.type_id == this.state.activeType.id && obj.value === true).length > 0}>
                                                <Text style = {{backgroundColor:(this.state.symptomList.filter(obj => obj.type_id == this.state.activeType.id && obj.value === true).length > 0 ? '#cadae0' : '#5BA2BC'), color:'white', borderRadius:20, paddingVertical:2, paddingHorizontal:20}}>Skip</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextSymptom(false)}>
                                            <Text style={MainStyles.Button}>Next</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            }else{
                                return <View key={idx}/>
                            }
                        }) : <Text style = {MainStyles.processingStyle}>There is no symptoms</Text> : 
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
        symptomData: state.member
    }
}

const mapDispatchToProps = {
    getSymptomList
}

export default connect(mapStateToProps, mapDispatchToProps)(HaveSymptoms)

