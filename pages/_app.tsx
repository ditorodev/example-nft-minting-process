import type { AppProps } from 'next/app'
import { providers } from 'ethers'

import { Connector, Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import '../styles/globals.css'
import { CollectionsProvider } from '../hooks/useCollection'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string


const chains = defaultChains
const defaultChain = chain.ropsten

// Set up connectors
type ConnectorsConfig = { chainId?: number }
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0]
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: 'wagmi',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector }
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      infuraId,
    },
  )
const webSocketProvider = ({ chainId }: ProviderConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider autoConnect
    connectors={connectors}
    provider={provider}
    webSocketProvider={webSocketProvider}>
    <CollectionsProvider>
      <Component {...pageProps} />
    </CollectionsProvider>
  </Provider>
}

export default MyApp
