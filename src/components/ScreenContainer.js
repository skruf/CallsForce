import React from "react"
import { View } from "react-native"
import Styles from "../styles"

const ScreenContainer = ({ children, style }) => (
  <View style={{
    ...Styles.screenContainer,
    ...style
  }}>
    {children}
  </View>
)

export default ScreenContainer
