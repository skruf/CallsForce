import React from "react"
import { ActivityIndicator } from "react-native"
import ScreenContainer from "./ScreenContainer"

const Spinner = ({ style }) => (
  <ScreenContainer style={{
    alignItems: "center",
    justifyContent: "center",
    ...style
  }}>
    <ActivityIndicator
      size="large"
      color="#000"
    />
  </ScreenContainer>
)

export default Spinner
