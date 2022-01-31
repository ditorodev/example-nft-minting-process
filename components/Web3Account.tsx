import * as React from 'react'
import { useAccount } from 'wagmi'
import { AppButton } from './AppButton'
import { Web3Connect } from './Web3Connect'

export function Web3Account() {
    const [{ data: accountData, error, loading }] = useAccount({
        fetchEns: true,
    })
    const [showConnectionModal, setShowConnect] = React.useState<boolean>(Boolean(accountData?.address))

    if (error) return <div>{error.message}</div>

    if (loading) return <div>Loading Account…</div>

    if (!accountData) return (<div className="flex flex-row justify-between">
        No Account is linked
        {!showConnectionModal && <AppButton label='Connect' onClick={() => setShowConnect(true)}/>}
        {showConnectionModal && <Web3Connect />}
        </div>)

    return (
        <div className="flex flex-row justify-between">
            Logged in with:
            <span>{accountData.address} {accountData.ens && `(${accountData.ens})`}</span>
        </div>
    )
}