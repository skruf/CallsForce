import React from "react"
import { View, Text } from "react-native"

const Onboarding2Screen = ({ navigation }) => {
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafbfc"
    }}>
      <Text>
        Onboarding 2
      </Text>
    </View>
  )
}


Onboarding2Screen.navigationOptions = ({ navigation }) => ({
  title: "onboarding2"
})

export default Onboarding2Screen
