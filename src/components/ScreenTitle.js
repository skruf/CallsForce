import React from "react"
import { Text } from "react-native"
import Styles from "../styles"

const ScreenTitle = ({ children, style }) => (
  <Text style={{
    ...Styles.screenTitle,
    ...style
  }}>
    {children}
  </Text>
)

export default ScreenTitle
