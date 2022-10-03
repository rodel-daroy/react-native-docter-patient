import React from 'react';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, TouchableOpacity , StatusBar, Text  } from 'react-native';
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Actions } from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { LAYOUT, COLOR } from "../../../constants";
import { logOut } from "../../../redux/actions/authActions"
import { getToken, setIntervalState } from "../../../redux/services/index"

export class Headers extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    back = (url, type) => {
        switch(type) {
            case "push":
                Actions.push(url);
                break;
            case "pop":
                Actions.pop();
                break;
            case "replace":
                Actions.replace(url);
                break;
            case "reset":
                Actions.reset(url);
                break;
            default:
                Actions.push(url)
        }
    }

    signOut = () => {
        setIntervalState(false)
        // setNavigator(this.props.navigation, 'firstPage')
        this.props.logOut();
        if(getToken().Usertype == "member"){
            Actions.reset('LoginScreen')
        }
        else if(getToken().Usertype == "provider"){
            Actions.reset('ProviderLoginScreen')
        }
    }

    render(){
        return(
            <View style={styles.header}>
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <TouchableOpacity onPress = {() => Actions.pop()}>
                        <View style={styles.headerLeft}>
                            <FontAwesome name = "arrow-left" size = {30} color = {"white"} />
                        </View>
                    </TouchableOpacity>
                    <View style = {styles.headerTitle}>
                        <Text style = {styles.headerText}>My Account</Text>
                        {this.props.patientName ? (
                            <Text style = {{marginLeft: 10, color: "white"}}>{"(Patient: " + this.props.patientName + ")"}</Text>
                        ) : (null)}
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.nameButtonView}>
                        <Text style = {styles.nameButton}>{this.props.name}</Text>
                    </View>
                    <TouchableOpacity style = {styles.signoutbuttonView} onPress = {() => this.signOut()}>
                        <Text style = {styles.signoutButton}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)


const styles = StyleSheet.create({
    header:{
        backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        padding:10,
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 5,
    },
    headerText: {
        textAlign: "left",
        fontSize: LAYOUT.fontSize4,
        color: "white",
        fontFamily: 'poorRichard'
    },    
    headerBackground:{
        width:LAYOUT.window.width,
        flexDirection:'row',
        // borderBottomRightRadius:LAYOUT.window.width*0.06,
        // borderBottomLeftRadius:LAYOUT.window.width*0.06,
        alignItems:'center',
    },
    headerTitle:{
        fontSize:LAYOUT.fontSize5,
        color:COLOR.whiteColor,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        paddingRight: 30,
        flexDirection: "row",
        flex: 1
    },
    headerLeft:{
        // width:LAYOUT.window.width*0.,
        // alignItems:'center',
        justifyContent: "center",
        textAlign: "left",
        padding: 10,
    },
    signoutbuttonView: {
        justifyContent: "flex-end",
        alignItems: "center",
        // width: "100%",
        // marginTop:5,
        padding: 10,
        flex: 1
    },
    signoutButton: {
        textAlign: "right",
        width: "100%",
        color: "white",
        fontSize: 24,
    },
    nameButtonView: {
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        padding: 10
    },
    nameButton: {
        textAlign: "left",
        width: "100%",
        color: "white",
        fontSize: LAYOUT.fontSize2,
        fontFamily: 'poorRichard'
    },
    emailButtonView: {
        textAlign: "left",
        width: "100%",
    },
    emailButton: {
        textAlign: "left",
        width: "100%",
        color: "white",
        fontSize: LAYOUT.fontSize2
    }
})
