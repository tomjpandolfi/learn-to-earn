import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "./context/wallet";
import ConnectWalletPage from "./pages/ConnectWalletPage/ConnectWalletPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import "./sass/global.scss";

import { db } from "./index";
import { getDocs, collection } from "firebase/firestore";

const App = () => {
  const { walletAddress } = useContext(WalletContext);
  const [nftCollection, setCollection] = useState<{
    name: string;
    whitelistLimit: number;
    collectionCode: string;
  }>({
    name: "Honey Finance",
    collectionCode: "HNYWHL",
    whitelistLimit: 50,
  });

  useEffect(() => {
    (async function () {
      const snapshot = await getDocs(collection(db, "collections"));
      snapshot.forEach((doc) => {
        console.log(doc.id);
      });
    })();
  }, []);

  return (
    <div className="App">
      {!walletAddress ? (
        <ConnectWalletPage setCollection={setCollection} />
      ) : (
        <QuizPage nftCollection={nftCollection} />
      )}
    </div>
  );
};

export default App;
