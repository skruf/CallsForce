import { useState } from "react"
import { net } from "react-native-force"
import { fakeFnAsync } from "../utils/faker"

export default (fn) => {
  const [ isLoading, setIsLoading ] = useState(false)

  const request = async (filter, method = "query") => {
    setIsLoading(true)
    const response = await new Promise((resolve, reject) => {
      net[method](filter, resolve, reject)
    })
    setIsLoading(false)
    return response
  }

  const queryLeads = async () => {
    const res = await request(`
      SELECT Id, Name, Company, Title, Phone, Status, LastActivityDate
      FROM Lead
    `)
    return res.records
  }

  const queryLeadById = async (Id) => {
    const res = await request(`
      SELECT Id, Name, Company, Title, Phone, Status, LastActivityDate
      FROM Lead
      WHERE Id = '${Id}'
    `)
    return res.records[0]
  }

  const searchLeadsByNumber = async (number) => {
    const n = number.replace(/\D/g, "")
    const res = await request(`
      FIND {*${n}*}
      IN Phone Fields
      RETURNING lead(id, name, company, title, phone, status)
    `, "search")
    return res.searchRecords
  }

  const queryCallsByLeadId = async (leadId) => {
    const res = await request(`
      SELECT Id, Phone, (
        SELECT Owner.Name, ActivityDate, Status, istask, ActivitySubtype, Subject
        FROM ActivityHistories
      )
      FROM Lead
      WHERE Id = '${leadId}'
    `)

    const lead = res.records[0]

    if(!lead.ActivityHistories) return []

    return lead.ActivityHistories.records.map((call) => ({
      ...call,
      Phone: lead.Phone
    }))
  }

  const queryCallByActivityId = async (activityId) => {
    return {
      Comment: "Test",
      Caller: "Arne Hagen",
      Date: "24.12.2019",
      Duration: "34m 52s",
      Phone: "40122491",
      Name: "Roger Nilsen",
      Title: "Grøftegraver",
      Company: "Graverne"
    }
  }

  const queryGetLeadStatusLabels = async () => {
    const res = await request(`
      SELECT MasterLabel
      FROM LeadStatus
    `)
    return res.records.map(({ MasterLabel }) => MasterLabel)
  }

  // @TODO: implement mobilesync..
  const saveLead = async () => {
    setIsLoading(true)
    await fakeFnAsync()
    setIsLoading(false)
  }
  const saveCall = async () => {
    setIsLoading(true)
    await fakeFnAsync()
    setIsLoading(false)
  }

  const api = {
    queryLeads,
    queryLeadById,
    searchLeadsByNumber,
    queryCallsByLeadId,
    queryCallByActivityId,
    queryGetLeadStatusLabels,
    saveLead,
    saveCall
  }

  return [ api[fn], isLoading ]
}
