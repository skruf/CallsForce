import { StyleSheet } from "react-native"
import Colors from "./Colors"
import Fonts from "./Fonts"

export const headerStyle = {
  elevation: 0,
  borderBottomWidth: 0,
  backgroundColor: Colors.bg
}

export const headerTitleStyle = {
  fontSize: 14,
  fontFamily: Fonts.boldest,
  color: "#8e8e8e",
  paddingVertical: 16
}

export const tabBarOptions = {
  keyboardHidesTabBar: true,
  showLabel: false,
  // activeTintColor: Colors.primary,
  activeTintColor: "#000",
  inactiveTintColor: "#222",
  style: {
    borderTopWidth: 2,
    borderTopColor: Colors.bg,
    height: 70
  }
}

const Main = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.bg
  },

  screenTitle: {
    fontSize: 21,
    color: Colors.hard,
    fontFamily: Fonts.bolder,
    marginHorizontal: 16,
    marginBottom: 6
  },

  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.hard
  },

  subtitle: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.soft
  },

  label: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.soft
  },

  text: {
    fontFamily: Fonts.normal,
    fontSize: 14,
    color: Colors.fg
  },

  listItem: {
    paddingHorizontal: 24,
    // paddingVertical: 12,
    minHeight: 60,
    alignItems: "center",
    fontSize: 14,
    backgroundColor: "#fff",
    marginTop: 2,
    flexDirection: "row"
  },

  button: {
    borderRadius: 30,
    fontSize: 13,
    fontFamily: Fonts.normal
  }
})

export default Main
