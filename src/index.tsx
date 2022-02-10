import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WalletProvider from "./context/wallet";
import { initializeApp } from "firebase/app";
import { ThemeProvider } from "degen";

import "degen/styles";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "honeydefi-b95ae.firebaseapp.com",
  projectId: "honeydefi-b95ae",
  storageBucket: "honeydefi-b95ae.appspot.com",
  messagingSenderId: "566239830349",
  appId: "1:566239830349:web:173ee10c76285588ae1704",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

ReactDOM.render(
  <WalletProvider>
    <ThemeProvider forcedMode="dark">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </WalletProvider>,
  document.getElementById("root")
);
