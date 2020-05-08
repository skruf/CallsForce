import { AppRegistry, YellowBox } from "react-native"
import App from "./src/App"

if(__DEV__) {
  import("./src/reactotron").then(
    () => console.log("Reactotron Configured")
  )
}

YellowBox.ignoreWarnings([
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillReceiveProps is deprecated",
  "Remote debugger"
])

AppRegistry.registerComponent("CallsForce", () => App)

// AppRegistry.registerHeadlessTask("RNCallKeepBackgroundMessage", () => ({ name, callUUID, handle }) => {
//   // Make your call here
//   return Promise.resolve()
// })
