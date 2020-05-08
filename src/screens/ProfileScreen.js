import React from "react"
import { Text } from "react-native"
import ScreenContainer from "../components/ScreenContainer"

const ProfileScreen = ({ navigation }) => (
  <ScreenContainer style={{
    alignItems: "center",
    justifyContent: "center"
  }}>
    <Text>
      TBD..
    </Text>
  </ScreenContainer>
)

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: "Profile"
})

export default ProfileScreen
