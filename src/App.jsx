import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai, mainnet, polygon } from 'wagmi/chains'

//pages
import Vite from './pages/Vite'
import Home from './pages/Home';
import Connect from './pages/Connect'
import UserPage from './pages/UserPage';

const chains = [mainnet, polygon, polygonMumbai]
const projectId = 'ba7804e457fbb5f1375cbdc14e679617'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function App() {
  return (
    <>
    <WagmiConfig client={wagmiClient}>
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Home/>} />
        <Route path="/Vite" element={<Vite/>} />
        <Route path="/Connect" element={<Connect/>} />
        <Route path="/User" element={<UserPage/>} />

      </Routes>
    </BrowserRouter>
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App
