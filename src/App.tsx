import { useContext, useState } from "react";
import { WalletContext } from "./context/wallet";
import ConnectWalletPage from "./pages/ConnectWalletPage/ConnectWalletPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import "./sass/global.scss";

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
