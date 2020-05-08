import React from "react"
import { View, TextInput } from "react-native"
import Text from "../components/Text"
import Styles from "../styles"

const Input = ({
  label, value, onChange, multiline, numberOfLines, placeholder
}) => (
  <View style={{
    ...Styles.listItem,
    flexDirection: multiline ? "column" : "row",
    alignItems: multiline ? "flex-start" : "center",
    paddingTop: multiline ? 16 : 0
  }}>
    {label && label !== "" && (
      <Text style={{
        ...Styles.label,
        width: 100
      }}>
        {label}
      </Text>
    )}

    <TextInput
      style={{ padding: 0 }}
      onChange={onChange}
      defaultValue={value}
      multiline={multiline}
      numberOfLines={numberOfLines}
      placeholder={placeholder}
    />
  </View>
)

Input.defaultProps = {
  multiline: false,
  numberOfLines: 1
}

export default Input
