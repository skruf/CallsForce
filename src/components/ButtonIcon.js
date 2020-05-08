import React from "react"
import { View, TouchableNativeFeedback } from "react-native"
import Icon from "./Icon"

const ButtonIcon = ({ iconName, fgColor, onPress }) => (
  <TouchableNativeFeedback
    onPress={onPress}
  >
    <View style={{ marginRight: 18 }}>
      <Icon
        iconName={iconName}
        fgColor={fgColor}
      />
    </View>
  </TouchableNativeFeedback>
)

export default ButtonIcon
