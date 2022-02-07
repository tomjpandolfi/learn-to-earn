import BodyText from "../../components/BodyText/BodyText"
import Button from "../../components/Button/Button"
import TitleText from "../../components/TitleText/TitleText"
import "./ConnectWalletPage.scss"

const ConnectWalletPage = () => {
  const connectWallet = () => {}

  return (
    <div className="connect-wallet-page">
      <TitleText>Honey Finance Whitelist</TitleText>
      <BodyText>
        Complete this quiz to verify your knowledge of the Honey protocol and
        attempt to earn a whitelist spot for our upcoming mint
      </BodyText>
      <Button
        title="Connect wallet"
        onClick={connectWallet}
        className="connect-wallet-button"
      />
      <div className="bottom-note">
        <BodyText>
          Still need to study? Check out our{" "}
          <a href="doc" target="_blank" id="gradient">
            docs.
          </a>
        </BodyText>
      </div>
    </div>
  )
}

export default ConnectWalletPage
