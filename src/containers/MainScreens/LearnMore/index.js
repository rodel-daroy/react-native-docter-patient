import React, { Component } from 'react';
import { connect } from "react-redux"
import {  View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.js';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.js';
import { ENTRIES1 } from './static/entries';
import { COLOR } from '../../../constants/Color.js';
import Header from "../Header/SecondHeader"
import MemberFooter from "../Footer/MemberFooter"
import ProviderFooter from "../Footer/ProviderFooter"
import SkipFooter from "../Footer/skipFooter"
import LogoHeader from "../Header/LogoHeader"
const SLIDER_1_FIRST_ITEM = 0;

class LearnMoreSection extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }
    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}></Text>
                <Text style={styles.subtitle}></Text>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={1000}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={ COLOR.mainColor }
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    render () {
        const LearnMoreSlider = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');

        return (
            <SafeAreaView style={styles.safeArea}>
                {this.props.currentUser ? (
                    <Header 
                        headerText = {"About US"}
                        backURL = { this.props.currentUser.role == "member" ? "MemberFirstPageScreen" : "ProviderFirstPageScreen"}
                        backType = {"reset"}
                    />

                ) : (
                    <LogoHeader />
                )}
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                    //   barStyle={'light-content'}
                    />
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                        { LearnMoreSlider }
                    </ScrollView>
                </View>
                {this.props.currentUser ? (
                    this.props.currentUser.role == "member" ? (
                        <MemberFooter />
                    ) : (
                        <ProviderFooter />
                    )
                ) : (
                    <SkipFooter />
                )}
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnMoreSection)  