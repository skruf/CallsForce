import React, { useEffect, useState } from "react"
import { View } from "react-native"
import useApi from "../hooks/useApi"
import withLoading from "../components/LoadingHOC"
import Text from "../components/Text"
import Subtitle from "../components/Subtitle"
import ScreenContainer from "../components/ScreenContainer"
import ButtonIcon from "../components/ButtonIcon"
import LeadHeader from "../components/LeadHeader"
import Styles from "../styles"

const Detail = ({ label, value }) => (
  <View style={Styles.listItem}>
    <Subtitle style={{
      ...Styles.label,
      width: 100
    }}>
      {label}
    </Subtitle>

    <Text>
      {value}
    </Text>
  </View>
)

const CallDetailScreen = ({ navigation }) => {
  const [ details, setDetails ] = useState({})
  const [
    queryCallByActivityId, queryCallByActivityIdIsLoading
  ] = useApi("queryCallByActivityId")

  useEffect(() => {
    ;(async () => {
      try {
        const activityId = navigation.getParam("activityId")
        const data = await queryCallByActivityId(activityId)
        setDetails(data)
        navigation.setParams({ call: data })
      } catch(e) {
        // tron.error(e.message)
      }
    })()
  }, [])

  const Content = withLoading(() => (
    <ScreenContainer>
      <LeadHeader
        lead={details}
      />

      <Detail
        label="Caller"
        value={details.Caller}
      />

      <Detail
        label="Date"
        value={details.Date}
      />

      <Detail
        label="Duration"
        value={details.Duration}
      />

      <Detail
        label="Phone"
        value={details.Phone}
      />

      <View style={{
        ...Styles.listItem,
        flexDirection: "column",
        alignItems: "flex-start",
        paddingVertical: 16
      }}>
        <Subtitle>
          Comment
        </Subtitle>

        <Text style={{ marginTop: 16 }}>
          {details.Comment}
        </Text>
      </View>

    </ScreenContainer>
  ))

  return <Content isLoading={queryCallByActivityIdIsLoading} />
}


CallDetailScreen.navigationOptions = ({ navigation }) => ({
  title: "Call Details",
  headerRight: (
    <ButtonIcon
      iconName="edit-3"
      onPress={() => {
        navigation.navigate("CallDetailEdit", {
          call: navigation.getParam("call")
        })
      }}
    />
  )
})

export default CallDetailScreen
