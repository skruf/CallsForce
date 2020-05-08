import AsyncStorage from "@react-native-community/async-storage"
import Reactotron from "reactotron-react-native"

global.tron = Reactotron
  .useReactNative()
  .configure()
  .setAsyncStorageHandler(AsyncStorage)
  .connect()

global.tron.clear()
