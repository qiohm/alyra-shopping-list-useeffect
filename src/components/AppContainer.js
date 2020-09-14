import React, { useContext } from "react"
import { ModeContext } from "./../context/ModeContext"

const AppContainer = ({ children }) => {
  const { mode } = useContext(ModeContext)
  const modeClass = mode === "dark" ? "bg-dark text-white" : ""
  return (
    <div className={`min-vh-100 py-3 ${modeClass}`}>
      <div className="container my-3">{children}</div>
    </div>
  )
}

export default AppContainer
