import React from 'react';
import { Header } from 'native-base';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, TouchableOpacity , StatusBar, Text  } from 'react-native';
import { LAYOUT, COLOR } from "../../../constants";
import Icon from "../../../assets/logo.png";
export class FirstPageHeader extends React.Component{

  render(){
    return(
        <View style={styles.header}>
          <View style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10 }}>
              <View  style = {{ justifyContent: "center"}}>
                  <Image source={Icon} style={styles.image} style={{ width: LAYOUT.window.width * 0.6, height: LAYOUT.window.width * 0.18, justifyContent: "center", alignItems: 'center'}} />
              </View>
          </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPageHeader)


const styles = StyleSheet.create({
  header:{
    width: LAYOUT.window.width,
    padding:10,
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
