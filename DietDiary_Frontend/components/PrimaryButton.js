import React from "react";
import { Dimensions, Text, View } from "react-native";
import { TouchableHighlight } from "react-native";
import colors from "../assets/colors";

const screenWidth = Dimensions.get('window').width;
const primaryButtonWidth = screenWidth * 0.85;

// props: title, onPress, type
export default function PrimaryButton(props) {
    return (
        <TouchableHighlight
            style={{ borderRadius: 15, margin: 10, width: primaryButtonWidth }}
            onPress={props.onPress}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.type == "primary" ? colors.primaryColor : 'white',
                borderColor: colors.primaryColor,
                borderWidth: 1,
                width: primaryButtonWidth,
                borderRadius: 15,
                height: 55,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: props.type == "primary" ? 'white' : colors.primaryColor
                }}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

