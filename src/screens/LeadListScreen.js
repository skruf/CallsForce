import React, { useEffect, useState } from "react"
import {
  View, FlatList, TouchableNativeFeedback
} from "react-native"
import useApi from "../hooks/useApi"
import Avatar from "../components/Avatar"
import Styles from "../styles"
import Colors from "../styles/Colors"
import ScreenContainer from "../components/ScreenContainer"
import ScreenTitle from "../components/ScreenTitle"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"

const LeadListItem = ({ item, onPress }) => (
  <TouchableNativeFeedback
    onPress={onPress}
  >
    <View style={Styles.listItem}>
      <Avatar
        text={item.Name}
      />

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flex: 1
        }}
      >
        <View
          style={{
            justifyContent: "center",
            marginLeft: 12
          }}
        >
          <Title>
            {item.Name}
          </Title>

          <Subtitle>
            {item.Company}
          </Subtitle>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          <Subtitle style={{ color: Colors.info }}>
            {item.Status}
          </Subtitle>

          <Subtitle>
            Called 2 days ago
            {/* {item.LastActivityDate} */}
          </Subtitle>
        </View>
      </View>
    </View>
  </TouchableNativeFeedback>
)

const LeadListScreen = ({ navigation }) => {
  const [ data, setData ] = useState([])
  const [ queryLeads, isLoading ] = useApi("queryLeads")

  const fetch = async () => {
    try {
      setData(await queryLeads())
    } catch(e) {
      // tron.error(e)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const renderListItem = ({ item }) => (
    <LeadListItem
      item={item}
      onPress={() => {
        navigation.navigate("LeadDetail", { leadId: item.Id })
      }}
    />
  )

  return (
    <ScreenContainer>
      <ScreenTitle>
        My Unread Leads
      </ScreenTitle>

      <FlatList
        data={data}
        refreshing={isLoading}
        onRefresh={fetch}
        keyExtractor={({ Id }) => Id}
        renderItem={renderListItem}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </ScreenContainer>
  )
}

LeadListScreen.navigationOptions = {
  title: "Leads"
}

export default LeadListScreen
