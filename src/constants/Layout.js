import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const LAYOUT = {
  window: {
    width,
    height,
  },
  // fontSize1: width*0.03,
  // fontSize2: width*0.035,
  // fontSize3: width*0.025,
  // fontSize4: width*0.045,
  // fontSize5: width*0.04,
  // fontSize6: width*0.06,
  fontSize0: width * 0.025,
  fontSize1: width * 0.03,
  fontSize2: width * 0.035,
  fontSize3: width * 0.04,
  fontSize4: width * 0.045,
  fontSize5: width * 0.05,
  fontSize6: width * 0.06,
  fontSize7: width * 0.07,
  fontSize01: width * 0.0275,
  isSmallDevice: width < 375,
};