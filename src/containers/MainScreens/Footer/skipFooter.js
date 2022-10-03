import React from 'react';
import { StyleSheet, View, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';

export class Footer extends React.Component{
    render(){
        return(
            <View style={styles.Footer}>
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <TouchableOpacity  style = {styles.footerSectionStyle} onPress = {() => Actions.push('HomeScreen')} >
                        <Text style = {styles.footerText}>Skip</Text>
                        <FontAwesome name = "hand-o-right" size = {30} color = {"white"} style = {{marginLeft: 20}} />  
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Footer


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
        // borderTopWidth: 1,
        // borderColor: 'red'
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
