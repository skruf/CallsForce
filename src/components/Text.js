import React from "react"
import { Text } from "react-native"
import Styles from "../styles"

const BaseText = ({ children, style }) => (
  <Text style={{
    ...Styles.text,
    ...style
  }}>
    {children}
  </Text>
)

export default BaseText
