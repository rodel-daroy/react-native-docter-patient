import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity , StatusBar, LayoutAnimation  } from 'react-native';
import { LAYOUT, COLOR } from "../../constants";
import { Container} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Carousel from "./Carousel/Carousel"
import Icon from "../../assets/logo.png";
import { setNavigator } from "../../redux/actions/navigator"
import { logOut } from '../../redux/actions/authActions';
import { ScrollView } from 'react-native-gesture-handler';



export class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    setNavigator(props.navigation, 'firstPage')
  }
  componentDidMount() {
    StatusBar.setHidden(true);
    this.props.logOut();
  }

  componentDidUpdate(){
    setNavigator(this.props.navigation, 'firstPage')
  }
  render(){
    return(
      <Container style = {{backgroundColor: COLOR.mainColor}}>
        {/* <LinearGradient
          colors={COLOR.linearGradient1Color}
          style={{ height: LAYOUT.window.height }}> */}
            <ScrollView>
            <View style={styles.header}>
              <View  style = {{ alignItems: "center"}}>
                  <Image source={Icon} style={styles.image} style={{ width: LAYOUT.window.width * 0.7, height: LAYOUT.window.width * 0.25, shadowColor: "black", opacity: 1,shadowRadius: 5, justifyContent: "center", alignItems: 'center'}} />
              </View>
            </View>
            <Carousel />
            <View style={styles.buttonContent}>
              <TouchableOpacity onPress={() => Actions.push('LoginScreen')}>
                <Text style={styles.buttons}>I'm a Member</Text>
              </TouchableOpacity>
              <View style={{flexDirection: "row", justifyContent: "center",textAlign: "center",alignItems: "center"}}>
                  <View style = {{borderBottomColor: "white", borderBottomWidth: 1, width: LAYOUT.window.width * 0.2}}></View>
                  <Text style={{color: 'white', padding: 20}}> or </Text>
                  <View style = {{borderBottomColor: "white", borderBottomWidth: 1, width: LAYOUT.window.width * 0.2}}></View>
              </View>
              <TouchableOpacity onPress = {() => Actions.push('ProviderLoginScreen')}>
                <Text style={styles.buttons}>I'm a Doctor</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        {/* </LinearGradient> */}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)



const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
    width:LAYOUT.window.width,
    marginTop: LAYOUT.window.height * 0.095
  },
  bellIcon:{
    marginLeft:LAYOUT.window.width*0.03
  },
  content:{
    height:LAYOUT.window.height*0.905,
  },
  buttonContent: {
    padding: LAYOUT.window.width * 0.05,
    paddingTop: LAYOUT.window.width * 0.1,
    justifyContent: "center",
    alignItems: 'center',
  },

  buttons: {
    fontSize: LAYOUT.fontSize5,
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 15,
    color: COLOR.mainColor,
    borderRadius: 1000,
    // fontWeight: "bold",
    width: LAYOUT.window.width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "FontAwesome5_Solid",
    // fontVariant: "POORICH"
    // fontStyle: "POORICH"
  },
  buttons1: {
    // marginTop: LAYOUT.window.height * 0.05,
    fontSize: LAYOUT.fontSize5,
    marginBottom: LAYOUT.window.width*0.05,
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 15,
    color: COLOR.mainColor,
    borderRadius: 20,
    fontWeight: "bold"
  },
  descriptionText: {
    fontSize: LAYOUT.fontSize3, 
    paddingLeft: LAYOUT.window.width * 0.07, 
    paddingRight: LAYOUT.window.width * 0.07, 
    textAlign: "center", 
    color: "white",
    // fontWeight: '700',
    //fontFamily: 'poorRichard',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },


  header:{
    width: LAYOUT.window.width,
    paddingTop:30,
    justifyContent: "center"
  },
  headerBackground:{
    width:LAYOUT.window.width,
    flexDirection:'row',
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
    width:LAYOUT.window.width*0.8,
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
  }
})
