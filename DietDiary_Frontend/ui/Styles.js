import { Dimensions, StyleSheet } from 'react-native';
import colors, { primaryColor } from '../assets/colors';
import dimen from '../assets/dimen'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const primaryButtonWidth = screenWidth * 0.85;
const weightInputWidth = screenWidth * 0.3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container_base: {
    flex: 1,
    backgroundColor: colors.baseBackground,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container_space_between_base: {
    flex: 1,
    backgroundColor: colors.baseBackground,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container_top_base: {
    flex: 1,
    backgroundColor: colors.baseBackground,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  img_splash: {
    width: "90%"
  },

  container_center_top: {
    flex: 1,
    backgroundColor: colors.baseBackground,
    alignItems: 'center',
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

  // Style for button with text
  primary_button_text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primaryColor,
    textAlign: 'center',
    textDecorationLine: 'underline', 
    margin: 10,
  },

  primary_input: {
    backgroundColor: "white",
    height: dimen.primaryButtonHeight,
    width: primaryButtonWidth,
    borderRadius: 15,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    fontSize: 17,
    padding: 10,
    paddingStart: 15,
    paddingEnd: 15,
    color: 'black'
  },

  // input style for weight and height
  weight_input: {
    backgroundColor: "white",
    height: dimen.primaryButtonHeight,
    width: weightInputWidth,
    borderRadius: 15,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    fontSize: 17,
    padding: 10,
    paddingStart: 15,
    paddingEnd: 15,
    color: 'black'
  },

  input_label: {
    fontSize: 15,
    margin: 10,
    color: colors.primaryColor,
  },

  connect_title: {
    fontSize: 30,
  },

  text_description: {
    fontSize: 15,
    color: 'black'
  },

  text_description_center: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center'
  },

  text_description_center_tiny: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center'
  },

  text_description_bold: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  },

})