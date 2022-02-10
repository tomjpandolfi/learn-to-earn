import { Input } from "degen";
import { useContext, useState } from "react";
import Countdown from "react-countdown";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";
import ModalContainer from "../../components/ModalContainer/ModalContainer";
import TitleText from "../../components/TitleText/TitleText";
import { WalletContext } from "../../context/wallet";
import walletOptions from "../../helpers/connectWallet";
import "./ConnectWalletPage.scss";

import mappingCodes from "../../mapping_codes.json";

const renderLaunchCountdown = (props: {
  hours: any;
  minutes: any;
  seconds: any;
  days: any;
}) => {
  console.log();
  return (
    <div className="launch-countdown">
      <div>
        <BodyText>
          {props.hours} hours {props.minutes} mins {props.seconds} secs
        </BodyText>
      </div>
    </div>
  );
};

const LAUNCH_TIMESTAMP = 1644283443002;
const COUNTDOWN_TIMESTAMP = 1644316207;

const ConnectWalletPage: React.FC<{
  setCollection: React.Dispatch<
    React.SetStateAction<{
      name: string;
      whitelistLimit: number;
      collectionCode: string;
    }>
  >;
}> = ({ setCollection }) => {
  const { connectWallet } = useContext(WalletContext);
  const [isWalletSelectVisible, setIsWalletSelectVisible] = useState<boolean>();
  const [collectionName, setCollectionName] = useState<string>("");

  const hasAppOpened = new Date().valueOf() > LAUNCH_TIMESTAMP;

  return (
    <div className="connect-wallet-page">
      <ModalContainer
        className="wallet-options-modal"
        isVisible={isWalletSelectVisible}
        onClose={() => setIsWalletSelectVisible(false)}
      >
        <div className="wallet-options-container">
          <TitleText>Connect wallet</TitleText>
          <div className="line" />
          {walletOptions.map(({ name, connect, icon }) => (
            <div
              key={name}
              onClick={() => {
                let collection = collectionName.length
                  ? mappingCodes.find((code) => {
                      return (
                        code.collectionCode.toUpperCase() ===
                        collectionName.toUpperCase()
                      );
                    }) || null
                  : {
                      name: "Honey Finance",
                      collectionCode: "HNYWHL",
                      whitelistLimit: 50,
                    };

                if (!collection) {
                  alert("Invalid Collection Code");
                  setIsWalletSelectVisible(false);
                  return;
                }
                collection.collectionCode !== "HNYWHL" &&
                  setCollection(collection);
                connectWallet(name, connect, collection);
              }}
              className="wallet-option"
            >
              <BodyText>{name}</BodyText>
              <img src={icon} alt={`${name} icon`} />
            </div>
          ))}
        </div>
      </ModalContainer>
      <TitleText>Honey Finance Whitelist</TitleText>
      <BodyText>
        Complete this quiz to verify your knowledge of the Honey protocol and
        attempt to earn a whitelist spot. The first round of spots have already
        been won. Keep an eye on our discord for the next one 👀
      </BodyText>
      <div style={{ margin: "20px 0 10px 0" }}>
        <Input
          label="DAO Code"
          placeholder="HNYWHL"
          width="80"
          name="collectionName"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </div>
      {!hasAppOpened ? (
        <div className="countdown">
          <BodyText>Opens in </BodyText>
          <Countdown
            date={new Date(COUNTDOWN_TIMESTAMP)}
            renderer={renderLaunchCountdown}
          />
        </div>
      ) : (
        <Button
          title="Connect wallet"
          onClick={() => setIsWalletSelectVisible(true)}
          className="connect-wallet-button"
        />
      )}
      <div className="bottom-note">
        <BodyText>
          Still need to study? Check out our 📚
          <a
            href="https://docs.honey.finance/"
            rel="noreferrer"
            target="_blank"
            id="gradient"
          >
            docs.
          </a>
        </BodyText>
      </div>
    </div>
  );
};

export default ConnectWalletPage;
