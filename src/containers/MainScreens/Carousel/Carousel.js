import React, { Component } from 'react';
import { View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index.style';
import { ENTRIES1 } from './static/entries';

const SLIDER_1_FIRST_ITEM = 1;

export default class example extends Component {

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
                style = {{backgroundColor: "red"}}
                parallaxProps={parallaxProps}
                containerStyle = {{backgroundColor: "red"}}
            />
        );
    }

    snapToItem = (index) => {
        if (index >= ((ENTRIES1.length * 3) - 3)) {
            this.refs.example.snapToItem(index - ENTRIES1.length, false);
        }
        else if (index < 3) {
            this.refs.example.snapToItem(index + ENTRIES1.length, false);
        }
    };

    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style = {{backgroundColor: "rgba(255, 255, 255, 0)"}}>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={this.state.slider1ActiveSlide}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={0}
                    containerCustomStyle={[styles.slider, {backgroundColor: "rgba(255, 255, 255, 0)", padding: 0}]}
                    contentContainerCustomStyle={[styles.sliderContentContainer]}
                    slideStyle = {{backgroundColor: "rgba(255, 255, 255, 0)", margin: 0}}
                    loop
                    enableSnap = {true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={100}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => index == ENTRIES1.length - 1 ? this.setState({ slider1ActiveSlide: 1}) : this.setState({ slider1ActiveSlide: index }) }
                />
            </View>
        );
    }

    render () {
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');

        return (
            <SafeAreaView style={[styles.safeArea, {backgroundColor:"none"}]}>
                <View style={[styles.container, {backgroundColor:"none"}]}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    {/* { this.gradient } */}
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                        { example1 }
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
