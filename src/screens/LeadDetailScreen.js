import React, { useEffect, useState } from "react"
import {
  View, FlatList, TouchableNativeFeedback
} from "react-native"
import ScreenContainer from "../components/ScreenContainer"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import Text from "../components/Text"
import Icon from "../components/Icon"
import useApi from "../hooks/useApi"
import withLoading from "../components/LoadingHOC"
import Styles from "../styles"
import { ButtonIcon, ButtonText } from "../components/Button"
import LeadHeader from "../components/LeadHeader"

const ListEmpty = ({ text, onPress }) => (
  <ScreenContainer style={{
    alignItems: "center",
    justifyContent: "center"
  }}>
    <Text style={{ marginBottom: 8 }}>
      {text}
    </Text>

    <ButtonText
      title="Start a call"
      onPress={onPress}
    />
  </ScreenContainer>
)

const CallListItem = ({ item, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={Styles.listItem}>
      <Icon
        iconName="phone-call"
        size={24}
      />

      <View style={{
        flexDirection: "column",
        marginLeft: 16
      }}>
        <Title>
          {item.Phone}
        </Title>

        <Subtitle>
          Called by {item.Owner.Name} at {item.ActivityDate}
        </Subtitle>
      </View>
    </View>
  </TouchableNativeFeedback>
)

const LeadDetailScreen = ({ navigation }) => {
  const [ lead, setLead ] = useState({})
  const [ calls, setCalls ] = useState([])
  const [
    queryLeadById, queryLeadByIdIsLoading
  ] = useApi("queryLeadById")
  const [
    queryCallsByLeadId, queryCallsByLeadIdIsLoading
  ] = useApi("queryCallsByLeadId")

  const fetch = async () => {
    try {
      const leadId = navigation.getParam("leadId")
      const lead = await queryLeadById(leadId)
      const calls = await queryCallsByLeadId(leadId)
      setLead(lead)
      setCalls(calls)
      navigation.setParams({ lead })
    } catch(e) {
      // tron.error(e.message)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const renderListEmpty = () => (
    <ListEmpty
      text="No calls yet.."
      onPress={() => {
        navigation.navigate("CallKeypad", { lead })
      }}
    />
  )

  const renderListItem = ({ item }) => (
    <CallListItem
      item={item}
      onPress={() => {
        navigation.navigate("CallDetail", { lead })
      }}
    />
  )

  const Content = withLoading(() => (
    <ScreenContainer>
      <LeadHeader
        lead={lead}
      />

      <FlatList
        data={calls}
        refreshing={queryCallsByLeadIdIsLoading}
        onRefresh={fetch}
        keyExtractor={(item, index) => "key_" + index}
        renderItem={renderListItem}
        ListEmptyComponent={renderListEmpty}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </ScreenContainer>
  ))

  return <Content isLoading={queryLeadByIdIsLoading} />
}

LeadDetailScreen.navigationOptions = ({ navigation }) => ({
  title: "Lead Details",
  headerRight: (
    <ButtonIcon
      iconName="edit-3"
      onPress={() => {
        navigation.navigate("LeadDetailEdit", {
          lead: navigation.getParam("lead")
        })
      }}
    />
  )
})

export default LeadDetailScreen
