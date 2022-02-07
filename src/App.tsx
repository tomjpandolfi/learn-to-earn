import React, { useState } from "react"
import ConnectWalletPage from "./pages/ConnectWalletPage/ConnectWalletPage"
import QuizPage from "./pages/QuizPage/QuizPage"
import "./sass/global.scss"

const App = () => {
  const [walletAddress, setWalletAddress] = useState("kaldfj")
  return (
    <div className="App">
      {!walletAddress ? <ConnectWalletPage /> : <QuizPage />}
    </div>
  )
}

export default App
