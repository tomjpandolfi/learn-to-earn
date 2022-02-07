import React, { useContext } from "react"
import { WalletContext } from "./context/wallet"
import ConnectWalletPage from "./pages/ConnectWalletPage/ConnectWalletPage"
import QuizPage from "./pages/QuizPage/QuizPage"
import "./sass/global.scss"

const App = () => {
  const { walletAddress } = useContext(WalletContext)
  return (
    <div className="App">
      {!walletAddress ? <ConnectWalletPage /> : <QuizPage />}
    </div>
  )
}

export default App
