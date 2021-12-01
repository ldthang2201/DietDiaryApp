import React from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import colors from "../assets/colors";
import Styles from "../ui/Styles";

const screenWidth = Dimensions.get('window').width;
const InputWidth = screenWidth * 0.85;

// props: label (string), placeholder (string), onChangeText (function), required (boolen), isPassword (boolen)
export default function PrimaryInput(props) {

    let textLabel = props.label
    if (props.required) {
        textLabel = textLabel.concat('*')
    }

    return (
        <View style = {{flexDirection: 'column'}}>
            <Text style = {Styles.input_label}>{textLabel}</Text>
            <TextInput style = {Styles.primary_input}
                placeholder = {props.placeholder}
                placeholderTextColor = 'gray'
                onChangeText = {props.onChangeText}
                secureTextEntry = {props.isPassword}
                value = {props.value}></TextInput>
        </View>
    )
}