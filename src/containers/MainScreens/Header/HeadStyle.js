import { LayoutAnimation, StyleSheet } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { LAYOUT, COLOR } from "../../../constants";


export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'white',
    background2: '#21D4FD'
};


export default StyleSheet.create({
    container : {
        backgroundColor:COLOR.baseBackgroundColor,
        width:LAYOUT.window.width,
    },
    bellIcon:{
        marginLeft:LAYOUT.window.width*0.03
    },
    content:{
        height:LAYOUT.window.height*0.905,
    },
    buttonContent: {
        paddingTop: LAYOUT.window.height*0.05,
        paddingLeft: LAYOUT.window.width * 0.2,
        paddingBottom: LAYOUT.window.height*0.01,
        paddingRight: LAYOUT.window.width * 0.2
    },
    headerList:{
        height:LAYOUT.window.height*0.07,
        paddingLeft:LAYOUT.window.width*0.04,
        borderBottomWidth:3,
        borderBottomColor:'#F2F2F2',
        alignItems:'center',
        flexDirection:'row',
    },
    itemList:{
        marginHorizontal:LAYOUT.window.width*0.04,
        paddingTop:LAYOUT.window.height*0.02,
        paddingBottom:LAYOUT.window.height*0.05,
        height:LAYOUT.window.height*0.835,
        width:LAYOUT.window.width*0.92,
    },

    buttons: {
        fontSize: LAYOUT.fontSize5,
        marginBottom: LAYOUT.window.width*0.05,
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: 15,
        color: '#2a93c9',
        borderRadius: 20,
        fontWeight: "bold"
        // fontWeight: 700
    },
    buttons1: {
        // marginTop: LAYOUT.window.height * 0.05,
        fontSize: LAYOUT.fontSize5,
        marginBottom: LAYOUT.window.width*0.05,
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: 15,
        color: '#2a93c9',
        borderRadius: 20,
        fontWeight: "bold"
        // fontWeight: 700
    },
    descriptionText: {
        fontSize: LAYOUT.fontSize1, 
        paddingLeft: LAYOUT.window.width * 0.07, 
        paddingRight: LAYOUT.window.width * 0.07, 
        textAlign: "center", 
        color: "white",
        fontWeight: '700',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    header:{
        backgroundColor:'#5189a7',
        height:LAYOUT.window.height*0.095,
        width:LAYOUT.window.width * 0.96,
        marginLeft: LAYOUT.window.width * 0.02,
        display: "flex",
        flexDirection: "row",
        // position: "absolute",
        // top: 0
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
        justifyContent:'center'
    },
    headerLeft:{
        width:LAYOUT.window.width*0.1,
        // alignItems:'center',
        justifyContent: "center",
        textAlign: "left",
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
    MainView: {
        width: LAYOUT.window.width * 0.6,
        justifyContent: "center",
        alignItems: "center",
        margin: LAYOUT.window.width * 0.2,
        marginTop: LAYOUT.window.width * 0.1
    },
    ListItems: {
        width: "100%",
        textAlign: "center",
        padding: 20,
        borderBottomColor: COLOR.mainColor,
        borderBottomWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    ListItemText: {
        fontSize: LAYOUT.fontSize2
    }
});
