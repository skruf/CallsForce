import React, { useEffect, useState } from "react"
import { View } from "react-native"
import useApi from "../hooks/useApi"
import withLoading from "../components/LoadingHOC"
import Input from "../components/Input"
import ScreenContainer from "../components/ScreenContainer"
import Button from "../components/Button"
import { AirbnbRating } from "react-native-elements"

const CallEndedScreen = ({ navigation }) => {
  const [ details, setDetails ] = useState({})
  const [ saveCall, saveCallIsLoading ] = useApi("saveCall")

  useEffect(() => {
    const d = navigation.getParam("callDetails")
    // tron.log(d)
    setDetails(d)
  }, [])

  const onChangeComment = (e) => {
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
        onChange={onChangeComment}
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

CallEndedScreen.navigationOptions = ({ navigation }) => ({
  title: "Call ended after 3m and 34s",
  // headerRight: (
  //   <ButtonIcon
  //     iconName="save"
  //     onPress={() => {
  //       tron.log("@TODO: implement save call")
  //     }}
  //   />
  // )
})

export default CallEndedScreen
