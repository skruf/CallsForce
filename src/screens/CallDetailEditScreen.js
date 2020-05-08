import React, { useEffect, useState } from "react"
import { View } from "react-native"
import useApi from "../hooks/useApi"
import withLoading from "../components/LoadingHOC"
import Input from "../components/Input"
import Button from "../components/Button"
import ScreenContainer from "../components/ScreenContainer"
import { AirbnbRating } from "react-native-elements"

const CallDetailEditScreen = ({ navigation }) => {
  const [ details, setDetails ] = useState({})
  const [ saveCall, saveCallIsLoading ] = useApi("saveCall")

  useEffect(() => {
    const call = navigation.getParam("call")
    setDetails(call)
  }, [])

  const onChange = (e) => {
    setDetails({ ...details, comment: e.target.value })
  }

  const Content = withLoading(() => (
    <ScreenContainer>
      <AirbnbRating
        style={{ marginBottom: 16 }}
      />

      <Input
        label="Comment"
        value={details.Comment}
        onChange={onChange}
        multiline={true}
        numberOfLines={4}
        placeholder="Enter a comment.."
      />

      <View style={{
        padding: 24,
        flex: 1,
        justifyContent: "flex-end"
      }}>
        <Button
          title="Save"
          onPress={() => { saveCall() }}
        />
      </View>
    </ScreenContainer>
  ))

  return <Content isLoading={saveCallIsLoading} />
}


CallDetailEditScreen.navigationOptions = ({ navigation }) => ({
  title: "Edit a call",
  // headerRight: (
  //   <View>
  //     <Icon
  //       iconName="save"
  //     />
  //   </View>
  // )
})

export default CallDetailEditScreen
