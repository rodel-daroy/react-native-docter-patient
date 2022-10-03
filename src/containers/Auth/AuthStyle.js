import { LayoutAnimation, StyleSheet } from 'react-native';

import { LAYOUT, COLOR } from "../../constants";

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'white',
    background2: '#21D4FD'
};


export default StyleSheet.create({
    container: {
        backgroundColor:COLOR.baseBackgroundColor,
        width:LAYOUT.window.width,
        paddingTop: 20,
        // paddingRight: 10,
        // paddingLeft: 10,
    },
    HeaderBackground: {
        width: LAYOUT.window.width,
        height: LAYOUT.window.height * 0.3
    },
    HeaderStyle: {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        margin: 'auto',
        marginTop: LAYOUT.window.height * 0.095
        // border
    },
    HeaderText: {
        margin: "auto",
        paddingLeft: LAYOUT.window.width * 0.1,
        paddingRight: LAYOUT.window.width * 0.1,
        // paddingTop: LAYOUT.window.width * 0.04,
        // paddingBottom: LAYOUT.window.width * 0.04,
        marginTop: LAYOUT.window.width * 0.1,
        marginBottom: LAYOUT.window.width * 0.025,
        fontSize: LAYOUT.fontSize4 + 5,
        // fontWeight: '700',
        color: COLOR.mainColor,
        // borderTopWidth: 5,
        borderTopColor: COLOR.mainColor,
        // borderBottomWidth: 5,
        borderBottomColor: COLOR.mainColor,
    },
    main: {
        width: LAYOUT.window.width * 0.9,
        padding: LAYOUT.window.width * 0.1,
        margin: LAYOUT.window.width * 0.05,
        borderRadius: LAYOUT.window.width * 0.05,
        // backgroundColor: "red",
        borderColor: '#2a93c9',
        borderWidth: 3
    },
    main1: {
        width: LAYOUT.window.width * 0.9,
        // padding: LAYOUT.window.width * 0.1,
        margin: LAYOUT.window.width * 0.05,
        paddingBottom: LAYOUT.window.width * 0.1,
        paddingTop: 40,
    },
    registerMain1: {
        width: LAYOUT.window.width * 0.9,
        // padding: LAYOUT.window.width * 0.1,
        paddingBottom: LAYOUT.window.width * 0.1,
    },
    TextInput: {
        marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#2a93c9',
        fontSize: 15,
        // height
    },
    mainHeader: {
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        paddingBottom: LAYOUT.window.width * 0.01
    },
    mainHeaderText: {
        fontSize: LAYOUT.fontSize4,
        // fontWeight: "700",
        color: "#2a93c9"
    },
    mainHeaderText1: {
        fontSize: LAYOUT.fontSize4,
        // fontWeight: "700",
        color: "white",
        fontFamily: 'poorRichard'
    },
    centerStyle: {        
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: 10
    },
    authButton: {
        fontSize: LAYOUT.fontSize3,
        width: LAYOUT.window.width * 0.6,
        marginBottom: LAYOUT.window.width*0.05,
        backgroundColor: COLOR.mainColor,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
        color: '#fff',
        borderRadius: 100,
        fontWeight: "700"
    },
    authButton1: {
        fontSize: LAYOUT.fontSize3,
        width: LAYOUT.window.width * 0.6,
        marginBottom: LAYOUT.window.width*0.05,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
        color: COLOR.mainColor,
        borderRadius: 100,
        fontWeight: "700"
    },
    // dropDownStyle: {
    //     flex: 1,
    //     // marginHorizontal: 20,
    //     justifyContent: 'center',
    // }
});
