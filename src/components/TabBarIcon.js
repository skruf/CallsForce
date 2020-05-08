import React from "react"
import { View } from "react-native"
import Icon from "./Icon"

const TabBarIcon = ({ bgColor, iconName, fgColor }) => (
  <View style={{
    backgroundColor: bgColor ? bgColor : "transparent",
    padding: 16,
    borderRadius: 30
  }}>
    <Icon
      iconName={iconName}
      fgColor={fgColor}
      size={24}
    />
  </View>
)

export default TabBarIcon
