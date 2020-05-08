import React, { useEffect, useState } from "react"
import { oauth } from "react-native-force"
import Spinner from "../components/Spinner"

const LaunchScreen = ({ navigation }) => {
  const [ completedOnboarding, setCompletedOnboarding ] = useState(true)

  useEffect(() => {
    const nav = () => {
      navigation.navigate(completedOnboarding ? "App" : "Onboarding")
    }

    oauth.getAuthCredentials(
      () => nav(),
      () => {
        oauth.authenticate(
          () => nav(),
          () => {}
          // (error) => tron.error("Failed to authenticate:" + error)
        )
      }
    )
  }, [])

  return <Spinner />
}


LaunchScreen.navigationOptions = ({ navigation }) => ({
  title: "launch"
})

export default LaunchScreen
