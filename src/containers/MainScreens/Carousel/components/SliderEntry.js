import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import { LAYOUT } from '../../../../constants';

export default class SliderEntry extends Component {

    _isMounted = false;
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    componentDidMount (){
        this._isMounted = true;
    }    

    get image () {
        if (this._isMounted){
            const { data: { illustration }, parallax, parallaxProps, even } = this.props;
        
            return parallax ? (
                    <ParallaxImage
                        source={{ uri: illustration }}
                        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                        style={[styles.image, {backgroundColor: "rgba(255, 255, 255, 0)"}]}
                        parallaxFactor={0}
                        showSpinner={true}
                        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                        {...parallaxProps}
                    />
            ) : (
                <Image
                    source={{ uri: illustration }}
                    style={[styles.image]}
                />
            );
        }
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;
        
        const uppercaseTitle = title ? (
            <Text
            // style={[styles.title, even ? styles.titleEven : {}]}
            numberOfLines={2}
            >
                { title }
            </Text>
        ) : false;
        
        return (
            <TouchableOpacity
              activeOpacity={1} 
              style={[styles.slideInnerContainer, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}
              >
                {/* <View style={[styles.shadow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
                    { this.image }
                </View> */}
                <View style={{marginTop: 30}}>
                    <Text style={[styles.DoctorText, {fontSize: LAYOUT.fontSize7}]}>{ uppercaseTitle }</Text>
                    <Text style={[styles.DoctorText, {fontSize: LAYOUT.fontSize2}]}>{ subtitle }</Text>
                </View>
                {/* <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}, {textAlign: 'center', borderRadius: 1000, backgroundColor : 'rgba(255, 255, 255, 0)', color : 'white', width : '100%', height : "100%"} ]}> */}
                {/* </View> */}
            </TouchableOpacity>
        );
    }
}
