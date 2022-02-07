const connectWithPhantom = async () => {
  try {
    const { solana }: any = window
    if (solana) {
      if (solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: false })
        return response
      }
    } else {
      window.open("https://phantom.app/", "_blank")?.focus()
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const disconnectPhantom = async () => {
  try {
    const { solana }: any = window
    await solana.disconnect()
  } catch (error) {
    throw error
  }
}

const connectWithSolflareExtension = async () => {
  try {
    const { solflare }: any = window
    if (solflare) {
      if (solflare.isSolflare) {
        await solflare.connect()
        return solflare
      }
    } else {
      window.open("https://solflare.com/", "_blank")?.focus()
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const disconnectSolflareExtension = async () => {
  try {
    const { solflare }: any = window
    await solflare.disconnect()
  } catch (error) {
    throw error
  }
}

const walletOptions = [
  {
    name: "Phantom",
    connect: connectWithPhantom,
    disconnect: disconnectPhantom,
    icon: require("../images/phantomIcon.png"),
  },
  {
    name: "Solflare",
    connect: connectWithSolflareExtension,
    disconnect: disconnectSolflareExtension,
    icon: require("../images/solflareIcon.png"),
  },
]

export default walletOptions
