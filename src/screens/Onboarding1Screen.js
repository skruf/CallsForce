import React from "react"
import { View, Text } from "react-native"

const Onboarding1Screen = ({ navigation }) => {
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafbfc"
    }}>
      <Text>
        Onboarding 1
      </Text>
    </View>
  )
}


Onboarding1Screen.navigationOptions = ({ navigation }) => ({
  title: "onboarding1"
})

export default Onboarding1Screen
