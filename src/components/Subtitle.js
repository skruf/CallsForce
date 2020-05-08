import React from "react"
import { Text } from "react-native"
import Styles from "../styles"

const BaseSubtitle = ({ children, style }) => (
  <Text style={{
    ...Styles.subtitle,
    ...style
  }}>
    {children}
  </Text>
)

export default BaseSubtitle
