import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "..";
import walletOptions from "../helpers/connectWallet";

interface WalletContextProps {
  walletAddress: string | null;
  walletApp: any;
  walletType: any;
  disconnectWallet: Function;
  connectWallet: Function;
}
export const WalletContext = React.createContext<WalletContextProps>({
  walletAddress: "",
  walletApp: null,
  walletType: null,
  disconnectWallet: () => {},
  connectWallet: () => {},
});

const WalletProvider = (props: any) => {
  const [walletAddress, setWalletAddress] = useState<string | null>("");
  const [walletApp, setWalletApp] = useState(null);
  const [walletType, setWalletType] = useState("");

  const disconnectWallet = async () => {
    const connectedWallet = walletOptions.find(
      (wallet) => wallet.name === walletType
    );
    await connectedWallet?.disconnect();
    window.localStorage.removeItem("lastConnectedWalletType");
    setWalletAddress(null);
    setWalletApp(null);
    setWalletType("");
  };

  const connectWallet = async (
    walletName: string,
    connect: Function,
    {
      collectionCode,
      name,
      whitelistLimit,
    }: { name: string; whitelistLimit: number; collectionCode: string }
  ) => {
    const wallet = await connect();
    const fetchQuery = collection(
      db,
      "collections",
      collectionCode.toUpperCase(),
      "publicKeys"
    );
    const { docs } = await getDocs(fetchQuery);

    console.log(`WHITELISTED PEOPLE: ${docs.length}`);

    if (docs?.length === 0) {
      await setDoc(doc(db, "collections", collectionCode.toUpperCase()), {
        publicKeys: null,
      });
    } else {
      if (docs.length >= whitelistLimit) {
        alert("Maximum entries reached for whitelist. Better luck next time");
        return;
      }
    }

    window.localStorage.setItem("lastConnectedWalletType", walletName);
    setWalletApp(wallet);
    setWalletAddress(wallet.publicKey.toString());
    setWalletType(walletName);
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletApp,
        walletType,
        disconnectWallet,
        connectWallet,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
