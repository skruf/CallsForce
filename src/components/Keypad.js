import React, { useState } from "react"
import {
  StyleSheet, View, TouchableWithoutFeedback, TouchableNativeFeedback
} from "react-native"
import Collapsible from "react-native-collapsible"
import { Icon } from "react-native-elements"
import Fonts from "../styles/Fonts"
import Colors from "../styles/Colors"
import Text from "./Text"

const styles = StyleSheet.create({
  collapsible: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    paddingBottom: 0,
    borderTopColor: Colors.bg,
    borderTopWidth: 2
  },
  key: {
    width: "33.3333%",
    height: 66,
    justifyContent: "center",
    alignItems: "center"
  },
  digit: {
    fontSize: 30,
    fontFamily: Fonts.light
  },
  letters: {
    fontSize: 10,
    color: "#888"
  }
})

const keys = [
  { n: "1", t: ".." }, { n: "2", t: "abc" }, { n: "3", t: "def" },
  { n: "4", t: "ghi" }, { n: "5", t: "jkl" }, { n: "6", t: "mno" },
  { n: "7", t: "pqrs" }, { n: "8", t: "tuv" }, { n: "9", t: "wxyz" },
  { n: "*", t: "" }, { n: "0", t: "" }, { n: "#", t: "" }
]

const Keypad = ({ onPress, number }) => {
  const [ collapsed, setCollapsed ] = useState(false)

  return (
    <>
      <View style={{
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24
      }}>
        <TouchableWithoutFeedback
          onPress={() => { setCollapsed(!collapsed) }}
        >
          <Icon
            name={`chevron-${collapsed ? "up" : "down"}`}
            color="#000"
            type="feather"
            size={24}
          />
        </TouchableWithoutFeedback>
  
        <Text style={{
          fontSize: 21,
          fontWeight: "700",
          color: number !== "" ? "#000" : "#aaa"
        }}>
          {number !== "" ? number : "00-00-00-00"}
        </Text>
  
        <TouchableWithoutFeedback
          onPress={() => { onPress(number.slice(0, -1)) }}
        >
          <Icon
            name="delete"
            color="#000"
            type="feather"
            size={24}
          />
        </TouchableWithoutFeedback>
      </View>
  
      <Collapsible
        collapsed={collapsed}
        style={styles.collapsible}
      >
        {keys.map((key) => (
          <TouchableNativeFeedback
            key={key.n}
            onPress={() => { onPress(number + key.n) }}
          >
            <View style={styles.key}>
              <Text style={styles.digit}>
                {key.n}
              </Text>
  
              <Text style={styles.letters}>
                {key.t}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </Collapsible>
    </>
  )
}

export default Keypad
