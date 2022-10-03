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
    container: {
        backgroundColor:COLOR.baseBackgroundColor,
        width:LAYOUT.window.width,
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
        flexDirection: "row",
        marginTop: LAYOUT.window.height * 0.095
        // border
    },
    HeaderText: {
        margin: "auto",
        width: LAYOUT.window.width * 0.8,
        textAlign: "center",
        paddingLeft: LAYOUT.window.width * 0.1,
        paddingRight: LAYOUT.window.width * 0.1,
        paddingTop: LAYOUT.window.width * 0.04,
        paddingBottom: LAYOUT.window.width * 0.04,
        marginTop: LAYOUT.window.width * 0.05,
        marginBottom: LAYOUT.window.width * 0.1,
        fontSize: LAYOUT.fontSize4,
        // fontWeight: '700',
        color: COLOR.mainColor,
        // borderTopWidth: 5,
        // borderTopColor: COLOR.mainColor,
        // borderBottomWidth: 5,
        // borderBottomColor: COLOR.mainColor,
    },
    main: {
        width: LAYOUT.window.width * 0.9,
        padding: LAYOUT.window.width * 0.05,
        margin: LAYOUT.window.width * 0.05,
        marginTop: 0,
        borderRadius: LAYOUT.window.width * 0.05,
        // backgroundColor: "red",
        // borderColor: COLOR.mainColor,
        // borderWidth: 3
    },
    main1: {
        width: LAYOUT.window.width * 0.9,
        margin: LAYOUT.window.width * 0.05,
        marginTop: 20,
        marginBottom: 50,
        // borderRadius: LAYOUT.window.width * 0.05,
        // backgroundColor: "red",
        // borderColor: COLOR.mainColor,
        // borderWidth: 3
    },
    mainHeader: {
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: LAYOUT.window.width * 0.05
    },
    backIcon: {
        color: COLOR.mainColor,
        marginTop: -LAYOUT.window.width * 0.04,
        padding: 5
        // justifyContent: "center",
        // alignItems: "center"
    },
    mainHeaderText: {
        fontSize: LAYOUT.fontSize2,
        fontWeight: "700",
        color: COLOR.mainColor
    },
    centerStyle: {        
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: 30
    },
    Button: {
        fontSize: LAYOUT.fontSize3,
        marginBottom: LAYOUT.window.width*0.05,
        backgroundColor: COLOR.mainColor,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        borderRadius: 100,
        fontWeight: "bold",
        width: LAYOUT.window.width * 0.7
    },
    callViewStyle: {
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 3,
        backgroundColor : "white",
        shadowRadius: 5,  
        padding: LAYOUT.window.width * 0.04,
        borderRadius: 10,
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    callViewStyle1: {
        backgroundColor : "white",
        padding: 20,
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        borderColor: COLOR.mainColor,
        borderWidth: 1,
        borderRadius: 20
    },
    userImageView: {
        width: LAYOUT.window.width * 0.2,
        // justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
        position: "relative",
        top: 0,
        marginRight: LAYOUT.window.width * 0.025
    },
    userApointmentStyleText: {
        // marginBottom:5
        textAlign: "center"
    },
    joinButton: {
        padding: 5,
        backgroundColor: 'green', 
        color: 'white',
        alignItems:'center',
        marginBottom:5
    },
    joinCancelButton: {
        padding: 5,
        backgroundColor: 'red', 
        color: 'white',
        alignItems:'center'
    },
    userImage:{
        width: LAYOUT.window.width * 0.2,
        height: LAYOUT.window.width * 0.2,
        position: "relative",
        top: 0,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 400
    },
    icon: {
        color: COLOR.mainColor
    },
    userList: {
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 3,
        backgroundColor : "white",
        shadowRadius: 10,  
        padding: 30,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    userList1: {
        padding: 5,
        borderColor: COLOR.mainColor,
        borderWidth: 3,
        marginBottom: 20,
    },
    userlistInStyle: {
        backgroundColor : "white",
        padding: 30,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLOR.mainColor

    },
    userName: {
        fontSize: LAYOUT.fontSize3,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 30,
        color: "white"
    },
    SelectType: {
        // shadowOpacity: 1,
        // shadowColor: 'black',
        // elevation: 5,
        backgroundColor : "white",
        shadowRadius: 10,  
        // padding: LAYOUT.window.width * 0.04,
        // borderRadius: 20,
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        borderColor: COLOR.mainColor,
        borderWidth: 1
    },
    TypeHeader: {
        width: "100%", 
        backgroundColor: "#ffc000", 
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    TypeHeaderText: {
        fontSize: LAYOUT.fontSize3,
        justifyContent: "center",
        alignItems: "center",
        color: 'white'
    },
    TypeBodyForImg: {
        padding: LAYOUT.window.width * 0.05
    },

    TextInput: {
        marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#2a93c9',
        // height
    },
    back: {
        marginLeft: LAYOUT.window.width * 0.06,
        marginTop: 20
    },
    checkboxForm: {
        // justifyContent: "center",
        // alignItems: "center",
        width: '100%'
    },
    checkboxGroup: {
        // paddingTop: 0,
        paddingBottom: LAYOUT.window.width * 0.03,
        // borderBottomWidth: 2,
        // borderBottomColor: COLOR.mainColor
    },
    checkboxGroupHeader: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 20,
        marginTop: 20,
        marginBottom: 10,
        marginBottom: 0,
        fontSize: LAYOUT.fontSize2,
        color: COLOR.mainColor
    },
    textareaContainer: {
        height: LAYOUT.window.width * 0.4,
        padding: 5,
    },
    textareaStyle: {
        textAlignVertical: 'top',
        fontSize: LAYOUT.fontSize1,
        color: COLOR.mainColor,
        height: LAYOUT.window.width * 0.38,
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: COLOR.mainColor
    },
    doctorImage: {
        width: LAYOUT.window.width * 0.25,
        height: LAYOUT.window.width * 0.25,
    },
    ModalStyle: {
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
        padding: LAYOUT.window.width * 0.05,
        width: LAYOUT.window.width * 0.9
    },
    modalUserView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 2,
    },
    userInfoText: {
        justifyContent: "center",
        alignItems: "center"
    },
    modalInfoTextView: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: LAYOUT.window.width * 0.04,
        // width: LAYOUT.window.width * 0.8
    },  
    modalInfoHeaderText: {
        fontSize: LAYOUT.fontSize1,
        fontWeight: "700",
        marginTop: 5
    },
    modalInfoBodyText: {
        fontSize: LAYOUT.fontSize0,
        marginTop: 5
    },
    appointmentTime: {
        padding: LAYOUT.window.width * 0.02,
        backgroundColor: COLOR.mainColor,
        margin : 5,
        color: "white",
        backgroundColor: "#f36621",
        width: '21%',
        justifyContent: "center",
        alignItems: "center"
        // float: "right"
        // flexDirection: "column",
        // Directions: 4
    },
    providerAppointmentTime: {
        padding: LAYOUT.window.width * 0.02,
        backgroundColor: COLOR.mainColor,
        margin : 10,
        color: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f36621",
        width: (LAYOUT.window.width - LAYOUT.window.width * 0.2 - 80) / 2,
    },
    tabActiveStyle: {
        color: '#f36621',
        fontSize: LAYOUT.fontSize2,
        fontWeight: "700"
    },
    tabStyle: {
        color: COLOR.mainColor,
        fontSize: LAYOUT.fontSize2,
        // fontWeight: "700"
    },
    pickerStyle: {
        // color: COLOR.mainColor,
        borderBottomColor: COLOR.mainColor, 
        borderBottomWidth: 1, 
        marginBottom: 20, 
        width: LAYOUT.window.width * 0.7, 
        justifyContent: "center", 
        alignItems: "center", 
        marginLeft: LAYOUT.window.width * 0.005
    },
    pickerStyle1: {
        borderBottomColor: "white", 
        borderBottomWidth: 1, 
        marginBottom: 20, 
        width: "100%",
        justifyContent: "center", 
        alignItems: "center", 
        marginLeft: LAYOUT.window.width * 0.005
    },
    subHeader: {
        color: COLOR.mainColor,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: LAYOUT.fontSize1,
        padding: 10
    },
    subText: {
        fontSize: LAYOUT.fontSize0,
        marginBottom: 10
    },
    paragraphStyle: {
        marginBottom: 20
    },
    ListStyle: {
        flexDirection: "row",
        padding: 10,
        paddingLeft: 30,
        alignItems: "center"
    },
    listText: {
        fontSize: LAYOUT.fontSize0,
        marginLeft: 10
    },
    listIcon: {
        justifyContent: "center",
        alignItems: "center"
    },
    stepHeader: {
        fontSize: LAYOUT.fontSize3,
        color: COLOR.mainColor,
        justifyContent: "center",
        textAlign: "center",
    },
    borderRadiousStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR.mainColor,
        padding: 10
    },
    ProviderImage: {
        width: LAYOUT.window.width * 0.2,
        height: LAYOUT.window.width * 0.2 * 1.5
    },
    ProviderInfoView: {
        justifyContent: "flex-start",
        paddingLeft: 20
    },
    flexDirectionRow: {
        flexDirection: "row"
    },
    ProviderTitleStyle: {
        color: COLOR.mainColor, 
        fontSize: LAYOUT.fontSize0
    },
    ProviderMainStyle: {
        textAlignVertical: "bottom",
        marginLeft: 20
    },
    ProviderListStyle: {
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 3,
        backgroundColor : "white",
        shadowRadius: 10,  
        padding: LAYOUT.window.width * 0.04,
        borderRadius: 20,
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 30        
    },
    DetailsMoreButton: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: COLOR.mainColor,
        fontSize: LAYOUT.fontSize1
    },
    tableCellStyle: {
        justifyContent: "center",
        color: "black",
        height: (LAYOUT.window.height - 250) / 10
    },
    switchViewStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    patientAppointmentInfoButton: {
        marginBottom: 5,
        padding: 5,
        alignItems: "center"
    },
    infoButton: {
        backgroundColor: "#28a77e",
        borderRadius: 5,
        padding:5,
        marginTop: 10
    },
    PickerModalStyle: {
        width: LAYOUT.window.width,
        // width: LAYOUT.window.width * 0.8,
        // height: 400,
        // padding: LAYOUT.window.width * .1,
        // paddingTop: LAYOUT.window.width * .15,
        backgroundColor: "white",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    modalButtonGroup: {
        flexDirection: "row",
        padding: 20
    },
    modalButton: {
        padding: 20,
    },
    ModalButtonText: {
        padding: 10,
        width: 100,
        textAlign: "center",
        color: "white"
    },
    TabbarStyle: {
        width: '100%',
        // height: 400,
        // backgroundColor: "red",
        borderWidth: 1,
        borderColor: COLOR.mainColor
    },
    tabHeader: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLOR.mainColor,
        borderBottomWidth: 2,
        borderBottomColor: COLOR.mainColor
    },
    tabHeaderComponent: {
        width: '50%',
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: "white"
    },
    tabHeaderText: {
        color: "white",
        fontWeight: "700"
    },
    tabBody: {
        width: "100%",
        padding: 5
    },
    selectAllButtons: {
        // width: '40%',
        padding: 10,
        fontSize: LAYOUT.fontSize2,
        backgroundColor: COLOR.mainColor,
        justifyContent: 'center',
        alignItems: "center",
        margin: 20,
        marginBottom: 0,
        marginTop: 0,
        width: '40%'
    },
    chatRoomModalStyle: {
        display: "flex", 
        alignItems: "center", 
        flex: 1, 
        justifyContent: "flex-end", 
        marginBottom: 0,
        margin: 0
    },
    chatroomModalViewStyle: {
        width: LAYOUT.window.width,
        height: LAYOUT.window.height,
        // marginLeft: LAYOUT.window.width * 0.2,
        // padding: LAYOUT.window.width * .1,
        // paddingTop: LAYOUT.window.width * .15,
        backgroundColor: "white",
        // justifyContent: "flex-end",
        alignItems: "center"
    },
    smsStyle: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    SMSModalStyle: {
        display: "flex", 
        alignItems: "center", 
        flex: 1, 
        justifyContent: "center", 
        marginBottom: 0,
        margin: 0
    },
    multiUploadStyle: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    firstPageStyle: {
        // flexDirection: "row",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        // height: LAYOUT.window.height - 40,
        borderColor: COLOR.mainColor,
        // marginTop: 40
    },
    processingStyle: {
        textAlign: "center",
        margin: 10,
        width: LAYOUT.window.width
    },
    loadingStyle: {
        justifyContent: "center",
        alignItems: "center",
        margin: 'auto',
    },
    loadingStyleView: {
        justifyContent: "center",
        alignItems: "center",
        margin: 'auto',
        width: LAYOUT.window.width,
        padding: 30
        // width: '100%'
    }
});
