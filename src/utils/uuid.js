import uuid from "uuid"
export const getUuid = () => uuid.v4().toLowerCase()
export const formatUuid = (uuid) => uuid.split("-")[0]
