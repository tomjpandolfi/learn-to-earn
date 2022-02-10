import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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

  // const checkIfWalletConnected = async () => {
  //   try {
  //     const lastConnectedWalletType = window.localStorage.getItem(
  //       "lastConnectedWalletType"
  //     );
  //     if (!lastConnectedWalletType) return;
  //     const wallet = walletOptions.find(
  //       (wallet) => wallet.name === lastConnectedWalletType
  //     );
  //     const walletConnected = await wallet?.connect();
  //     setWalletAddress(walletConnected.publicKey.toString());
  //     setWalletApp(walletConnected);
  //     setWalletType(lastConnectedWalletType);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

    const fetchQuery = query(
      collection(db, "collections"),
      where("collectionCode", "==", collectionCode.toUpperCase())
    );
    const { docs } = await getDocs(fetchQuery);

    if (docs.length === 0) {
      await addDoc(collection(db, "collections"), {
        name,
        collectionCode: collectionCode.toUpperCase(),
        publicKeys: [],
      });
    } else {
      if (docs[0].data().publicKeys.length >= whitelistLimit) {
        alert("Maximum entries reached for whitelist. Better luck next time");
        return;
      }
    }

    window.localStorage.setItem("lastConnectedWalletType", walletName);
    setWalletApp(wallet);
    setWalletAddress(wallet.publicKey.toString());
    setWalletType(walletName);
  };

  // useEffect(() => {
  //   const onLoad = async () => {
  //     await checkIfWalletConnected()
  //   }
  //   window.addEventListener("load", onLoad)
  //   return () => window.removeEventListener("load", onLoad)
  // }, [])

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
