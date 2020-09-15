import React, { useState, createContext } from "react"

export const ModeContext = createContext()

const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light")
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export default ModeContextProvider
