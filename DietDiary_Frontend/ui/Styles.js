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

  container_full_width_center_top: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  icon_tab_navigator: {
    width: 25,
    height: 25,
  },

  bottom_tab: {
    paddingTop:5, 
    paddingBottom: 5, 
    marginStart: 10, 
    marginEnd: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  log_home: {
    width: screenWidth * 0.9,
    height: 65,
    paddingStart: 16,
    paddingEnd: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  image_log: {
    width: 35,
    height: 35,
    tintColor: 'black',
  },

  image_button: {
    width: 35,
    height: 35,
    tintColor: 'black',
    margin: 10
  },

  log_home_text_times: {
    fontSize: 18,
    color: 'black',
    margin: 10,
  },

  log_home_text_number: {
    fontSize: 40,
    color: 'black',
  },

  log_home_title: {
    fontSize: 22,
    margin: 16,
    color: 'black',
  },

  log_title: {
    fontSize: 22,
    margin: 16,
    color: 'black',
    fontWeight: 'bold'
  },

  log_title_container: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },

  arrow: {
    width: 20,
    height: 20,
    margin: 10
  },

  history_weight_item_container: {
    width: screenWidth * 0.9,
    height: 55,
    backgroundColor:  'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingStart: 20,
    paddingEnd: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  history_weight_item_date: {
    margin: 5,

  },

  history_weight_item_value: {
    marginStart: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },

  history_weight_item_icon: {
    width: 25,
    height: 25
  },

  delete_container: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 10,
    bottom: 10,
    paddingStart: 5,
    paddingEnd: 5,
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'red'
  },

})