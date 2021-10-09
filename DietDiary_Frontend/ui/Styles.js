import { Dimensions, StyleSheet } from 'react-native';
import colors from '../assets/colors';

const screenWidth = Dimensions.get('window').width;
const primaryButtonWidth = screenWidth * 0.8;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img_splash: {
    width: "90%"
  },
  container_center_top: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text_primary_button: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  primary_button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    width: primaryButtonWidth,
    borderRadius: 15,
    height: 55,
  },

})