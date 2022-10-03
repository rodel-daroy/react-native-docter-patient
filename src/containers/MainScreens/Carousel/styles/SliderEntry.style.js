import { StyleSheet, Dimensions, Platform } from 'react-native';
import { LAYOUT } from '../../../../constants';
import { colors } from './index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = LAYOUT.window.width * 0.7;
const slideWidth = LAYOUT.window.width * 0.8;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        borderRadius: 1000,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
    },
    shadow: {
        width: LAYOUT.window.width * 0.3,
        height: LAYOUT.window.width * 0.3,
        textAlign: "center",
        position: "relative",
        top: 20,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: 10000,
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, 
        justifyContent : "center",
        alignItems : 'center',
        borderRadius: 1000,
        width: "100%",
        height: "100%"
    },
    imageContainerEven: {
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 1000,
        width: "100%",
        height: "100%",
        borderWidth: 10,
        borderColor: "white",
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
    },
    radiusMaskEven: {
    },
    textContainer: {                             
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
    
    DoctorText: {
        textAlign: "center", 
        color: "white", 
        // fontWeight: "700", 
        fontFamily: 'poorRichard',
    }
});
