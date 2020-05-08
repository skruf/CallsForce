import React, { useEffect, useState } from "react"
import { View } from "react-native"
import useApi from "../hooks/useApi"
import Picker from "../components/Picker"
import Input from "../components/Input"
import ScreenContainer from "../components/ScreenContainer"
import Button from "../components/Button"
import withLoading from "../components/LoadingHOC"

const LeadDetailEditScreen = ({ navigation }) => {
  const [ details, setDetails ] = useState({})
  const [ statusLabels, setStatusLabels ] = useState([])
  const [ saveLead, saveLeadIsLoading ] = useApi("saveLead")
  const [
    queryGetLeadStatusLabels,
    queryGetLeadStatusLabelsIsLoading
  ] = useApi("queryGetLeadStatusLabels")

  useEffect(() => {
    setDetails(navigation.getParam("lead"))
    ;(async () => {
      setStatusLabels(await queryGetLeadStatusLabels())
    })()
  }, [])

  const onChange = (k) => (e) => {
    setDetails({ ...details, [k]: e.target.value })
  }

  const Content = withLoading(() => (
    <ScreenContainer>
      <Input
        label="Name"
        value={details.Name}
        onChange={onChange("Name")}
      />

      <Input
        label="Company"
        value={details.Company}
        onChange={onChange("Company")}
      />

      <Input
        label="Title"
        value={details.Title}
        onChange={onChange("Title")}
      />

      <Input
        label="Phone"
        value={details.Phone}
        onChange={onChange("Phone")}
      />

      <Picker
        label="Status"
        items={statusLabels}
        selectedValue={details.Status}
        onValueChange={(value) => {
          setDetails({ ...details, Status: value })
        }}
      />

      <View style={{
        padding: 24,
        flex: 1,
        justifyContent: "flex-end"
      }}>
        <Button
          title="Save"
          onPress={() => { saveLead() }}
        />
      </View>
    </ScreenContainer>
  ))

  return (
    <Content
      isLoading={
        queryGetLeadStatusLabelsIsLoading || saveLeadIsLoading
      }
    />
  )
}

LeadDetailEditScreen.navigationOptions = ({ navigation }) => ({
  title: "Edit a Lead",
  // headerRight: (
  //   <ButtonIcon
  //     fgColor={Colors.primary}
  //     iconName="save"
  //     onPress={() => {
  //       // navigation.navigate("CallDetailEdit", {
  //       //   call: navigation.getParam("call")
  //       // })
  //     }}
  //   />
  // )
})

export default LeadDetailEditScreen
