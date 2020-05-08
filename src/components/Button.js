import React from "react"
import { View, TouchableNativeFeedback } from "react-native"
import Colors from "../styles/Colors"
import Icon from "./Icon"
import Text from "./Text"
import Fonts from "../styles/Fonts"

const Button = ({ onPress, title }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={{
      backgroundColor: Colors.primary,
      padding: 12,
      borderRadius: 6
    }}>
      <Text style={{
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center"
      }}>
        {title}
      </Text>
    </View>
  </TouchableNativeFeedback>
)

export const ButtonIcon = ({ iconName, fgColor, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={{ marginRight: 18 }}>
      <Icon
        iconName={iconName}
        fgColor={fgColor}
      />
    </View>
  </TouchableNativeFeedback>
)

export const ButtonText = ({ title, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={{
      paddingHorizontal: 16,
      paddingVertical: 8
    }}>
      <Text style={{
        fontSize: 12,
        fontFamily: Fonts.bold
      }}>
        {title.toUpperCase()}
      </Text>
    </View>
  </TouchableNativeFeedback>
)

export default Button
