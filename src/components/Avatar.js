import React from "react"
import { View, Text } from "react-native"

const getRandomColor = () => {
  const letters = "789ABCD"
  let color = "#"
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)]
  }
  return color
}

const Avatar = ({ text, size }) => {
  if(!text) return null
  const s = text.split(" ")
  let chars = ""

  if(s.length > 1) {
    chars = s[0].charAt(0) + s[1].charAt(0)
  } else {
    chars = text[0] + text[text.length -1]
  }

  return (
    <View style={{
      backgroundColor: getRandomColor(),
      borderRadius: size ? size : 36,
      width: size ? size : 36,
      height: size ? size : 36,
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Text style={{
        color: "#fff",
        fontSize: 13,
        fontFamily: "OpenSans-SemiBold"
      }}>
        {chars.toUpperCase()}
      </Text>
    </View>
  )
}

export default Avatar
