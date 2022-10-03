import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { Actions } from "react-native-router-flux";
import { COLOR, LAYOUT } from "../constants";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export const InputBox = (props) => {
    return (
      <View style={props.style}>
        <View style={styles.bgP}>
          <TextInput
            {...props}
            placeholderTextColor={COLOR.placeholderTextColor}
            autoCapitalize="none"
            style={[
              styles.InputBox,
              props.width !== undefined ? props.width : {},
            ]}
          />
          <View style={styles.inputLeft}>
            {props.leftLabel?props.leftLabel:null}
          </View>
        </View>
      </View>
    );
};

export const ListItem = ({item, type}) =>{
  return(
    <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>Actions.push('OffersScreen', item)}>
      <View style={[styles.itemListBox,{height:LAYOUT.window.width*(type===2?0.35:0.5)}]}>
        <Image source={item.img} style={styles.itemListImage}/>
        <Text style={styles.itemListTitle}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const TitleListItem = ({item}) =>{
  return(
    <TouchableOpacity onPress={()=>Actions.push('OffersScreen', item)}>
      <Text style={styles.headerListItem}>{item.title}</Text>
    </TouchableOpacity>
  )
}
export const OfferListItem = ({item}) =>{
  return(
    <View style={OfferListItemStyles.OfferListItem}>
      <Image source={item.img} style={OfferListItemStyles.image}/>
      <View>
        <View style={OfferListItemStyles.OfferListTextBox}>
          <Text numberOfLines={1} style={OfferListItemStyles.itemTitle}>{item.title}</Text>
          <Text numberOfLines={1} style={OfferListItemStyles.itemText}>{item.text}</Text>
          <Text numberOfLines={3} style={OfferListItemStyles.itemDesc}>{item.desc}</Text>
        </View>
        <View style={OfferListItemStyles.itemActionBox}>
          <TouchableOpacity style={OfferListItemStyles.actionButton} onPress={()=>Actions.push('DetailScreen', item)}>
            <FontAwesome name="edit" size={LAYOUT.window.width*0.03} color={COLOR.greyColor} />
              <Text style={OfferListItemStyles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[OfferListItemStyles.actionButton,{marginLeft:LAYOUT.window.width*0.03}]}>
            <FontAwesome name="delete-outline" size={LAYOUT.window.width*0.03} color={COLOR.greyColor} />  
              <Text style={OfferListItemStyles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[OfferListItemStyles.itemMark,{backgroundColor:item.color}]}>
        <Text style={OfferListItemStyles.itemPercent}>{item.percent}</Text>
        <Text style={OfferListItemStyles.type}>{item.type}</Text>
      </View>
    </View>
  )
}

const OfferListItemStyles = StyleSheet.create({
  OfferListItem:{
    paddingHorizontal:LAYOUT.window.width*0.04, 
    paddingVertical:LAYOUT.window.height*0.025, 
    marginVertical:LAYOUT.window.height*0.01, 
    width:LAYOUT.window.width*0.88,
    height:LAYOUT.window.width*0.34,
    borderRadius:LAYOUT.window.width*0.04,
    flexDirection:'row',


    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5, 
    shadowRadius: 10,
    elevation:3,
  },
  image:{
    borderRadius:LAYOUT.window.width*0.02,
    width:LAYOUT.window.width*0.35,
    resizeMode:'cover',
    height:'100%',
  },
  OfferListTextBox:{
    width:LAYOUT.window.width*0.35, 
    height:LAYOUT.window.width*0.18,
    marginTop:LAYOUT.window.height*0.008, 
    marginLeft:LAYOUT.window.width*0.04,
  },
  itemTitle:{
    fontSize:LAYOUT.window.width*0.035, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemText:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.025, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemDesc:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.015, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemActionBox:{
    width:LAYOUT.window.width*0.4,
    height:LAYOUT.window.width*0.05,
    marginTop:LAYOUT.window.height*0.005, 
    marginLeft:LAYOUT.window.width*0.04,
    flexDirection:'row', 
    justifyContent:'flex-end', 
    alignItems:'center', 
  },
  actionButton:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center'
  },
  actionButtonText:{
    marginLeft:LAYOUT.window.width*0.005, 
    fontSize:LAYOUT.window.width*0.02, 
    color:COLOR.greyColor
  },
  itemMark:{
    top:LAYOUT.window.width*0.02, 
    right:LAYOUT.window.width*0.02, 
    position:'absolute', 
    width:LAYOUT.window.width*0.065,
    borderRadius:LAYOUT.window.width*0.065, 
    height:LAYOUT.window.width*0.065,
    justifyContent:'center',
    alignItems:'center'
  },
  itemPercent:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.02, 
    fontWeight:'700'
  },
  type:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.015
  }
})

const styles = StyleSheet.create({
  bgP: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLOR.inputBackgroundColor,
    borderRadius: 10,
    width: "auto",
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginVertical: LAYOUT.window.height*0.01,

    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5, 
    shadowRadius: 10,
    elevation:3,
  },    
  InputBox: {
    flex: 1,
    height: LAYOUT.window.height*0.036,
    fontSize: LAYOUT.fontSize1,
    fontWeight: '600',
    color: COLOR.blackColor,
  },
  inputLeft: {
    width: "auto",
    marginRight: LAYOUT.window.width*0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  itemListBox:{
    marginVertical:LAYOUT.window.height*0.01,
    marginHorizontal:LAYOUT.window.width*0.02,
    width:LAYOUT.window.width*0.42,
    borderRadius:LAYOUT.window.width*0.05,
    justifyContent:'center',
    alignItems:'center'
  },
  itemListImage:{
    resizeMode:'cover',
    borderRadius:LAYOUT.window.width*0.05, 
    width:'100%', 
    height:'100%'
  },
  itemListTitle:{
    paddingHorizontal:LAYOUT.window.width*0.06,
    position:'absolute', 
    width:'100%', 
    fontWeight:'600', 
    color:COLOR.whiteColor, 
    textAlign:'center', 
    fontSize:LAYOUT.fontSize5
  },
  headerListItem:{
    marginHorizontal:LAYOUT.window.width*0.01,
    paddingHorizontal:LAYOUT.window.width*0.03,
    paddingVertical:LAYOUT.window.height*0.006,
    borderRadius:LAYOUT.window.width*0.05,
    borderColor:COLOR.greenColor,
    borderWidth:2,
    textAlign:'center',
    fontWeight:'600',
    color:COLOR.grey3Color,
  }
})