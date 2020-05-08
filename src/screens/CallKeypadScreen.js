import React, { useState, useEffect } from "react"
import {
  FlatList, TouchableNativeFeedback, View
} from "react-native"
import RNCallKeep from "react-native-callkeep"
import BackgroundTimer from "react-native-background-timer"
import { Icon } from "react-native-elements"
import _debounce from "lodash.debounce"

import ScreenContainer from "../components/ScreenContainer"
import TabBarIcon from "../components/TabBarIcon"
import Text from "../components/Text"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import Keypad from "../components/Keypad"
import Avatar from "../components/Avatar"
import Colors from "../styles/Colors"
import Styles from "../styles"
import useApi from "../hooks/useApi"
import useDebounce from "../hooks/useDebounce"
import { getUuid, formatUuid } from "../utils/uuid"
import Config from "../config"

BackgroundTimer.start()

RNCallKeep.setup(Config.callKeep)
RNCallKeep.setAvailable(true)

const call = (number, name) => {
  if(number.length < 3) return
  const uuid = getUuid()
  RNCallKeep.startCall(uuid, number, name)
}

const ContactListItem = ({ item, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={{
      ...Styles.listItem,
      paddingVertical: 8
    }}>
      <Avatar
        text={item.Name}
        size={30}
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
          <Subtitle>
            {item.Phone}
          </Subtitle>
        </View>
      </View>
    </View>
  </TouchableNativeFeedback>
)

const ListEmpty = ({ text, onPress }) => (
  <ScreenContainer>
    <TouchableNativeFeedback onPress={onPress}>
      <View style={{
        ...Styles.listItem,
        paddingVertical: 8,
        alignItems: "center"
      }}>
        <Icon
          name="plus-circle"
          color="#000"
          type="feather"
          size={28}
        />

        <View
          style={{
            justifyContent: "center",
            marginLeft: 12
          }}
        >
          <Title>
            {text}
          </Title>

          <Subtitle>
            Create a new lead
          </Subtitle>
        </View>
      </View>
    </TouchableNativeFeedback>
  </ScreenContainer>
)

const CallKeypadScreen = ({ navigation }) => {
  const [ number, setNumber ] = useState("")
  const debouncedNumber = useDebounce(number, 500)
  const [ log, setLog ] = useState("")
  const [ heldCalls, setHeldCalls ] = useState({})
  const [ mutedCalls, setMutedCalls ] = useState({})
  const [ calls, setCalls ] = useState({})
  const [ leads, setLeads ] = useState([])
  const [ callStartedAt, setCallStartedAt ] = useState(null)
  const [ leadId, setLeadId ] = useState()
  const [
    searchLeadsByNumber, searchLeadsByNumberIsLoading
  ] = useApi("searchLeadsByNumber")

  const renderListEmpty = () => (
    <ListEmpty
      text={number}
      onPress={() => {
        navigation.navigate("LeadNew")
      }}
    />
  )

  const l = (v) => {
    // tron.log(v)
    setLog(`${v}\n${log}`)
  }

  useEffect(() => {
    const lead = navigation.getParam("lead")
    // tron.log(navigation.state)
    if(!lead) return
    setNumber(lead.Phone)
    setLeadId(lead.Id)
  }, [])

  useEffect(() => {
    navigation.setParams({ number })
    if(number.length < 2) return
    ;(async () => {
      try {
        setLeads(await searchLeadsByNumber(number))
      } catch(e) {
        // tron.error(e)
      }
    })()
  }, [
    debouncedNumber
  ])

  useEffect(() => {
    const onAnswerCall = (data) => {
      const { callUUID } = data
      const number = calls[callUUID]
      l(`[answerCall] ${formatUuid(callUUID)}, number: ${number}`)
  
      RNCallKeep.startCall(callUUID, number, number)
  
      BackgroundTimer.setTimeout(() => {
        l(`[setCurrentCallActive] ${formatUuid(callUUID)}, number: ${number}`)
        RNCallKeep.setCurrentCallActive(callUUID)
      }, 1000)
    }
  
    const didPerformDTMFAction = ({ callUUID, digits }) => {
      const number = calls[callUUID]
      l(`[didPerformDTMFAction] ${formatUuid(callUUID)}, number: ${number} (${digits})`)
    }

    const didReceiveStartCallAction = (data) => {
      l("didReceiveStartCallAction")

      setCallStartedAt(new Date())
  
      const { handle: number } = data
      if(!number) return
  
      const callUUID = getUuid()
      addCall(callUUID, number)
  
      l(`[didReceiveStartCallAction] ${callUUID}, number: ${number}`)
  
      RNCallKeep.startCall(callUUID, number, number)
  
      BackgroundTimer.setTimeout(() => {
        l(`[setCurrentCallActive] ${formatUuid(callUUID)}, number: ${number}`)
        RNCallKeep.setCurrentCallActive(callUUID)
      }, 1000)
    }
  
    // Currently iOS only
    // const onIncomingCallDisplayed = (data) => {
    //   let { error } = data
    //   // You will get this event after RNCallKeep finishes showing incoming call UI
    //   // You can check if there was an error while displaying
    // }

    const onToggleMute = (data) => {
      let { muted, callUUID } = data
      const number = calls[callUUID]
      l(`[didPerformSetMutedCallAction] ${formatUuid(callUUID)}, number: ${number} (${muted})`)
      setCallMuted(callUUID, muted)
    }

    const onToggleHold = (data) => {
      let { hold, callUUID } = data
      const number = calls[callUUID]
      l(`[didToggleHoldCallAction] ${formatUuid(callUUID)}, number: ${number} (${hold})`)
      setCallHeld(callUUID, hold)
    }

    // const audioSessionActivated = (data) => {
    //   // you might want to do following things when receiving this event:
    //   // - Start playing ringback if it is an outgoing call
    // }
  
    const onEndCallAction = (data) => {
      let { callUUID } = data
      const handle = calls[callUUID]
      l(`[endCall] ${formatUuid(callUUID)}, number: ${handle}`)
      removeCall(callUUID)
      const duration = callStartedAt - Date.now()
      navigation.navigate("CallEnded", { callDetails: { leadId, duration } })
    }

    RNCallKeep.addEventListener("answerCall", onAnswerCall)
    RNCallKeep.addEventListener("didPerformDTMFAction", didPerformDTMFAction)
    RNCallKeep.addEventListener("didReceiveStartCallAction", didReceiveStartCallAction)
    // RNCallKeep.addEventListener("didDisplayIncomingCall", onIncomingCallDisplayed)
    RNCallKeep.addEventListener("didPerformSetMutedCallAction", onToggleMute)
    RNCallKeep.addEventListener("didToggleHoldCallAction", onToggleHold)
    // RNCallKeep.addEventListener("didActivateAudioSession", audioSessionActivated)
    RNCallKeep.addEventListener("endCall", onEndCallAction)

    return () => {
      RNCallKeep.removeEventListener("answerCall", onAnswerCall)
      RNCallKeep.removeEventListener("didPerformDTMFAction", didPerformDTMFAction)
      RNCallKeep.removeEventListener("didReceiveStartCallAction", didReceiveStartCallAction)
      // RNCallKeep.removeEventListener("didDisplayIncomingCall", onIncomingCallDisplayed)
      RNCallKeep.removeEventListener("didPerformSetMutedCallAction", onToggleMute)
      RNCallKeep.removeEventListener("didToggleHoldCallAction", onToggleHold)
      // RNCallKeep.removeEventListener("didActivateAudioSession", audioSessionActivated)
      RNCallKeep.removeEventListener("endCall", onEndCallAction)
    }
  }, [])

  const addCall = (callUUID, number) => {
    setHeldCalls({ ...heldCalls, [callUUID]: false })
    setCalls({ ...calls, [callUUID]: number })
  }
  const removeCall = (callUUID) => {
    const { [callUUID]: _, ...updated } = calls
    const { [callUUID]: __, ...updatedHeldCalls } = heldCalls
    setCalls(updated)
    setCalls(updatedHeldCalls)
  }
  const setCallHeld = (callUUID, held) => {
    setHeldCalls({ ...heldCalls, [callUUID]: held })
  }
  const setCallMuted = (callUUID, muted) => {
    setMutedCalls({ ...mutedCalls, [callUUID]: muted })
  }

  const hangup = (callUUID) => {
    RNCallKeep.endCall(callUUID)
    removeCall(callUUID)
  }
  const hold = (callUUID, held) => {
    const handle = calls[callUUID]
    RNCallKeep.setOnHold(callUUID, held)
    l(`[setOnHold: ${held}] ${formatUuid(callUUID)}, number: ${handle}`)
    setCallHeld(callUUID, held)
  }
  const mute = (callUUID, muted) => {
    const handle = calls[callUUID]
    RNCallKeep.setMutedCall(callUUID, muted)
    l(`[setMutedCall: ${muted}] ${formatUuid(callUUID)}, number: ${handle}`)
    setCallMuted(callUUID, muted)
  }
  const updateDisplay = (callUUID) => {
    const number = calls[callUUID]
    RNCallKeep.updateDisplay(callUUID, number, "New Name")
    l(`[updateDisplay: ${number}] ${formatUuid(callUUID)}`)
  }

  const displayIncomingCallNow = () => {
    const callUUID = getUuid()
    const number = "(650) 555-1212"
    addCall(callUUID, number)
    l(`[displayIncomingCall] ${formatUuid(callUUID)}, number: ${number}`)
    RNCallKeep.displayIncomingCall(callUUID, number, number, "number", false)
  }

  const renderContactItem = ({ item }) => (
    <ContactListItem
      item={item}
      onPress={() => {
        setLeadId(item.Id)
        call(number)
      }}
    />
  )

  return (
    <ScreenContainer
      style={{
        justifyContent: "space-between"
      }}
    >
      {number.length < 2 ? (
        <View style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{ color: Colors.soft }}>
            Enter 2 digits to search..
          </Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          refreshing={searchLeadsByNumberIsLoading}
          onRefresh={() => {}}
          keyExtractor={({ Id }) => Id}
          renderItem={renderContactItem}
          ListEmptyComponent={renderListEmpty}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}

      <View style={{
        width: "100%",
        backgroundColor: "#fff"
      }}>
        <Keypad
          onPress={setNumber}
          number={number}
        />
      </View>
    </ScreenContainer>
  )
}

CallKeypadScreen.navigationOptions = ({ navigation }) => {
  if(navigation.isFocused()) return {
    title: "Start a Call",
    tabBarOnPress: () => {
      const number = navigation.getParam("number")

      try {
        call(number)
      } catch(e) {
        // tron.log(e.message)
      }

      // Linking.openURL(
      //   Platform.OS === "android"
      //     ? `tel:${number}`
      //     : `tel://:${number}`
      // )
    },
    tabBarIcon: () => (
      <TabBarIcon
        bgColor={Colors.success}
        fgColor="#fff"
        iconName="phone"
      />
    )
  }
}

export default CallKeypadScreen
