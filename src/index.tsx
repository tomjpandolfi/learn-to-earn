import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import WalletProvider from "./context/wallet"

ReactDOM.render(
  <WalletProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WalletProvider>,
  document.getElementById("root")
)
