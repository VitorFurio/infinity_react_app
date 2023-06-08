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
import ValidaPage from './pages/ValidaPage';
import CheckTicket from './pages/CheckTicket';
import ValidaPageV2 from './pages/ValidaPageV2';

const chains = [polygon, polygonMumbai]
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

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
        <Route path="/Home" element={<Home/>} />
        <Route path="/Vite/:id" element={<Vite/>} />
        <Route path="/Connect/:TypeOfValidation" element={<Connect/>} />
        <Route path="/User" element={<UserPage/>} />
        <Route path="/Valida" element={<ValidaPage/>} />
        <Route path="/ValidaV2" element={<ValidaPageV2/>} />
        <Route path="/Check" element={<CheckTicket/>} />

      </Routes>
    </BrowserRouter>
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App
