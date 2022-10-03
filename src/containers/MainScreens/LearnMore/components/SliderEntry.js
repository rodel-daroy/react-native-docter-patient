import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/SliderEntry.js';
import { ScrollView } from 'react-native-gesture-handler';
import { COLOR, LAYOUT } from '../../../../constants/index.js';
import FontAweSome from "react-native-vector-icons/FontAwesome"
import { Actions } from 'react-native-router-flux';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    render () {

        return (
            <View
                activeOpacity={1}
                style={styles.slideInnerContainer}
            >
                <View style = {{height: "80%"}}>
                    <ScrollView>
                        <Text style = {currentStyles.titleStyle}>{this.props.data.title}</Text>
                        {this.props.data.subtitle ? (
                            <Text style = {currentStyles.subTitleStyle}>{this.props.data.subtitle}</Text>
                        ) : (<></>)}
                        {this.props.data.content ? this.props.data.content.map((item, idx) => {
                            return (
                                <View style = {{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 15}} key = {idx + 'causol'}>
                                    <FontAweSome name = {this.props.data.icon} size = {20} color = {COLOR.mainColor} />
                                    <Text style = {currentStyles.listStyle}>{item}</Text>
                                </View>
                            )
                        }) : <></>}
                    </ScrollView>
                </View>
                <TouchableOpacity style = {currentStyles.readMoreButton} onPress = {() => Actions.push(this.props.data.readMoreUrl)} >
                    <Text style = {{textAlign: "center", width: "100%", color: "white"}}>Read More ...</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const currentStyles = StyleSheet.create({
    titleStyle: {
        fontWeight: "bold",
        fontSize: LAYOUT.fontSize3,
        color: "rgba(0, 0, 0, 0.7)",
        marginBottom: 20
    },
    subTitleStyle: {
        fontSize: LAYOUT.fontSize2,
        color: "rgba(0, 0, 0, 0.7)",
        marginBottom: 20,
    },
    listStyle: {
        marginLeft: 10,
        // marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    readMoreButton: {
        backgroundColor: COLOR.mainColor,
        padding: 10,
        marginTop: LAYOUT.window.height * 0.05,
        justifyContent: "center",
        alignItems: "center"
    }
})
