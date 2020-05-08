import React from "react"
import { Text } from "react-native"
import Styles from "../styles"

const BaseTitle = ({ children, style }) => (
  <Text style={{
    ...Styles.title,
    ...style
  }}>
    {children}
  </Text>
)

export default BaseTitle
