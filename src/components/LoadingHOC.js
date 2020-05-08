import React from "react"
import Spinner from "./Spinner"

const withLoading = (Component) => ({ isLoading, ...props }) => (
  isLoading ? <Spinner /> : <Component {...props} />
)

export default withLoading
