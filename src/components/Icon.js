import React from "react"
import { Icon as RNIcon } from "react-native-elements"

const Icon = ({
  iconName, fgColor, type, size, containerStyle, iconStyle
}) => (
  <RNIcon
    name={iconName}
    color={fgColor}
    type={type}
    size={size}
    containerStyle={containerStyle}
    iconStyle={iconStyle}
  />
)

Icon.defaultProps = {
  fgColor: "#000",
  type: "feather",
  size: 24,
  containerStyle: {},
  iconStyle: {}
}

export default Icon
