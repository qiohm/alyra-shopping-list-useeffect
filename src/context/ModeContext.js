import React, { useState, useEffect, createContext } from "react"

export const ModeContext = createContext()

const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light')

  useEffect( () => {
localStorage.setItem('mode', mode)
  }, [mode])

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export default ModeContextProvider
