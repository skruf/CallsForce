import React from "react"
import { View, Picker as RNPicker } from "react-native"
import Styles from "../styles"
import Text from "./Text"

const Picker = ({ label, items, onValueChange, selectedValue }) => {
  if(typeof items[0] === "string") {
    items = items.map((value) => ({ label: value, value }))
  }

  return (
    <View style={{...Styles.listItem, }}>
      {label && label !== "" && (
        <Text style={{
          ...Styles.label,
          width: 90
        }}>
          {label}
        </Text>
      )}
  
      <RNPicker
        style={{ width: "100%" }}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map(({ label, value }) => (
          <RNPicker.Item
            key={value}
            label={label}
            value={value}
          />
        ))}
      </RNPicker>
    </View>
  )
}



export default Picker
