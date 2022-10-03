import React from 'react';
import { connect } from "react-redux"
import { StyleSheet, View, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';
import { logOut } from "../../../redux/actions/authActions"
import { getToken, setIntervalState } from "../../../redux/services/index"

export class Footer extends React.Component{

    signOut = () => {
        setIntervalState(false);
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
            <View style={styles.Footer}>
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <TouchableOpacity  style = {styles.footerSectionStyle} onPress = {() => this.signOut()} >
                        <Text style = {styles.footerText}>Sign Out</Text>
                        <FontAwesome name = "sign-out" size = {30} color = {"white"} style = {{marginLeft: 20}} />  
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)

const styles = StyleSheet.create({
    Footer:{
        backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        padding:10,
        position: "absolute",
        bottom:0,
        zIndex: 999999,
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 5,
        // paddingTop: 5,
        borderTopWidth: 1,
        borderColor: 'white'
    },
    footerSectionStyle: {
        width: '100%',
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    footerText: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: "auto",
        color: "white",
        paddingLeft: 10
    }
})
