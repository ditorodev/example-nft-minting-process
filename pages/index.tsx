import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { Web3Account } from '../components/Web3Account'

const Home: NextPage = () => {
  const [{ data, error, loading }, disconnect] = useAccount({
    fetchEns: true,
  })

  console.log({data})
  return (
    <div className='mx-auto my-52 flex flex-col bg-slate-100 p-5 rounded-md max-w-4xl'>
      <h1 className="text-3xl font-bold text-gray-700">
        Fake NFT -- Craft Table
      </h1>
      <div className="p-5 my-2 bg-slate-200">
        <Web3Account />
      </div>
    </div>
  )
}

export default Home
