import React from "react"
import { View } from "react-native"
import Avatar from "./Avatar"
import ScreenTitle from "./ScreenTitle"
import Subtitle from "./Subtitle"

const LeadHeader = ({ lead }) => (
  <View
    style={{
      flexDirection: "row",
      paddingHorizontal: 16,
      marginBottom: 16
    }}
  >
    <Avatar
      text={lead.Name}
    />

    <View style={{
      paddingHorizontal: 12
    }}>
      <ScreenTitle
        style={{
          marginHorizontal: 0,
          marginBottom: 0
        }}
      >
        {lead.Name}
      </ScreenTitle>

      <Subtitle>
        {lead.Company}
      </Subtitle>

      <Subtitle>
        {lead.Title}
      </Subtitle>

      {/* <Subtitle>
        {lead.Status}
      </Subtitle> */}
    </View>
  </View>
)

export default LeadHeader
