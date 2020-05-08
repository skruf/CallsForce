import React from "react"
import { Text } from "react-native"
import ScreenContainer from "../components/ScreenContainer"

const LeadNewScreen = ({ navigation }) => (
  <ScreenContainer style={{
    alignItems: "center",
    justifyContent: "center"
  }}>
    <Text>
      TBD..
    </Text>
  </ScreenContainer>
)

LeadNewScreen.navigationOptions = ({ navigation }) => ({
  title: "New lead"
})

export default LeadNewScreen
