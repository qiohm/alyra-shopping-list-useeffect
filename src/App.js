import React from "react"
import ShoppingApp from "./components/ShoppingApp"
import AppContainer from "./components/AppContainer"
import ModeSwitch from "./components/ModeSwitch"
import ModeContextProvider from "./context/ModeContext"

function App() {
  return (
    <ModeContextProvider>
      <AppContainer>
        <header className="App-header d-flex justify-content-between flex-wrap align-items-center mb-5">
          <h1>Ma liste des courses</h1>
          <ModeSwitch />
        </header>
        <ShoppingApp />
      </AppContainer>
    </ModeContextProvider>
  )
}

export default App
