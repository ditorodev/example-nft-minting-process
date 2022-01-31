import * as React from "react"
import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { AppButton } from '../components/AppButton'
import { NFTFactoryModalContent, NFTFactoryModalRoot, NFTFactoryModalTrigger } from '../components/CreateNFTModal'
import { Web3Account } from '../components/Web3Account'
import { useCollection } from '../hooks/useCollection'
import { data } from "autoprefixer"


const Home: NextPage = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  const { collections } = useCollection()

  const uploadCollection = () => {
    const data = {
      creator_wallet_id: accountData?.address,
      creator_network: (window.ethereum as any).chainId,
      assets: collections,
    }

    console.log("Im Minting the following: ", { minting: data })
  }

  return (
    <div className='mx-auto my-52 flex flex-col bg-slate-100 p-5 rounded-md max-w-4xl'>
      <h1 className="text-3xl font-bold text-gray-700">
        Fake NFT -- Craft Table
      </h1>
      <div className="p-5 my-2 bg-slate-200">
        <Web3Account />
      </div>
      {accountData?.address && (<>
        <hr />
        <NFTFactoryModalRoot>
          <NFTFactoryModalTrigger asChild>
            <AppButton label="Create NFT" onClick={() => console.log("start the creation process")} />
          </NFTFactoryModalTrigger>
          <NFTFactoryModalContent />
        </NFTFactoryModalRoot>
        <hr />
        {collections.map(c => <div key={`${c.date_of_creation}+${c.collection}`} className="bg-gray-200 my-2  p-3 rounded-md">
          <h2 className="text-lg text-gray-700">
            Collection Name: <span className="font-bold">{c.name}</span>
          </h2>
        </div>)}
        {collections.length > 0 && <AppButton label="Upload My Collections" style={{ marginTop: 10 }} onClick={uploadCollection} />}
      </>)}
    </div>
  )
}

export default Home
