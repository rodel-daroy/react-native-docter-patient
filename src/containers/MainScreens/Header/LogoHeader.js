import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Image, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import { Actions } from 'react-native-router-flux';
import Logo from "../../../assets/logo.png"


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

    render(){
        return(
            <View style={styles.header}>
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <View>
                        <View style={styles.headerLeft}>
                            <Image source = {Logo} style = {{width: LAYOUT.window.width * 0.5, height: LAYOUT.window.width * 0.15}} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)


const styles = StyleSheet.create({
    header:{
        backgroundColor: COLOR.mainColor,
        width: LAYOUT.window.width,
        // marginLeft: LAYOUT.window.width * 0.02,
        // display: "flex",
        // flexDirection: "row",
        padding:10,
        position: "absolute",
        // height: 400,
        zIndex: 999999,
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 5,
    },
    headerText: {
        textAlign: "left",
        fontSize: LAYOUT.fontSize3,
        fontWeight: "bold",
        color: "white"
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
        fontWeight:'600',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        paddingRight: 30
    },
    headerLeft:{
        // width:LAYOUT.window.width*0.,
        // alignItems:'center',
        justifyContent: "center",
        textAlign: "left",
        padding: 10
    },
    headerRight:{
        // flexDirection:'row', 
        width:LAYOUT.window.width*0.2, 
        justifyContent:'center',
        textAlign: "right",
        // margin:"auto"
    },
    headerList:{
        height:LAYOUT.window.height*0.07,
        paddingLeft:LAYOUT.window.width*0.04,
        borderBottomWidth:3,
        borderBottomColor:'#F2F2F2',
        alignItems:'center',
        flexDirection:'row',
    },
    menuView: {
        // position: "absolute",
        // top: LAYOUT.window.height*0.095,
        maxHeight: LAYOUT.window.height*0.8,
        width: '100%',
        marginTop: 30,
        // height: 300,
        // backgroundColor: "red",
        borderRadius: 20,
        borderColor: '#143b50',
        borderWidth: 1,
    },
    profileItemBox:{
        width:'100%', 
        // height:LAYOUT.window.height*0.048,
        // marginVertical:LAYOUT.window.height*0.01,
        alignItems:'center',
        flexDirection:'row',
        padding: LAYOUT.window.height*0.02,
        paddingLeft: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#143b50'
        // justifyContent: "center"
    },
    profileItemText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.03
    },
    iconStyle: {
        color: "white",
        marginRight: 15
    },
    profileItemSubMenuBox: {
        width:'100%', 
        // height:LAYOUT.window.height*0.048,
        // marginVertical:LAYOUT.window.height*0.01,
        alignItems:'center',
        flexDirection:'row',
        padding: LAYOUT.window.height*0.02,
        paddingLeft: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#143b50'
    },
    subMenuView: {
        width: '100%', 
        // backgroundColor: "red"
    }
})
