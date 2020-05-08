import { PermissionsAndroid } from "react-native"

export default {
  callKeep: {
    ios: {
      appName: "CallsForce",
      imageName: "sim_icon",
      supportsVideo: false,
      maximumCallGroups: "1",
      maximumCallsPerCallGroup: "1"
    },
    android: {
      alertTitle: "Permissions Required",
      alertDescription: "This application needs to access your phone calling accounts to make calls",
      cancelButton: "Cancel",
      okButton: "ok",
      imageName: "sim_icon",
      additionalPermissions: [
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ]
    }
  }
}
