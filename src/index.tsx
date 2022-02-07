import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import WalletProvider from "./context/wallet"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB7ad1_7bZTD18y7huU_bmq-BPu6oNhG7o",
  authDomain: "honeydefi-b95ae.firebaseapp.com",
  projectId: "honeydefi-b95ae",
  storageBucket: "honeydefi-b95ae.appspot.com",
  messagingSenderId: "566239830349",
  appId: "1:566239830349:web:173ee10c76285588ae1704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <WalletProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WalletProvider>,
  document.getElementById("root")
)
