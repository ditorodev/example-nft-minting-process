import * as React from 'react'
import { useConnect } from 'wagmi'

import { useIsMounted } from '../hooks/useIsMounted'

export function Web3Connect() {
    const isMounted = useIsMounted()
    const [
        {
            data: { connector, connectors },
            error,
            loading,
        },
        connect,
    ] = useConnect()

    const buttonColotStyle = (connectorName: "MetaMask" | "WalletConnect" | "Coinbase Wallet") => {
        switch (connectorName) {
            case "Coinbase Wallet":
                return "bg-blue-600 text-white"
            case "WalletConnect":
                return "bg-blue-300 text-white"
            case "MetaMask":
                return "bg-orange-600 text-white"
            default: return "bg-gray-600 text-black"
        }
    }

    return (
        <div className='bg-slate-300 p-5 rounded-lg'>
            <div>
                Connect with: {loading && "Loading…"}
                {!loading && connectors.map((x) => (
                    <button
                        className={`py-2 px-4 mx-2 rounded-md ${buttonColotStyle(x.name as any)} `}
                        disabled={isMounted && !x.ready}
                        key={x.name}
                        onClick={() => connect(x)}
                    >
                        {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
                        {isMounted && !x.ready && ' (unsupported)'}
                        {loading && x.name === connector?.name && '…'}
                    </button>
                ))}
            </div>
            <div>{error && (error?.message ?? 'Failed to connect')}</div>
        </div>
    )
}