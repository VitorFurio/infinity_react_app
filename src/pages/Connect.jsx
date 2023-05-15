import {useNavigate, useParams} from "react-router-dom"
import { Web3Button, useWeb3ModalTheme } from '@web3modal/react'
import { useAccount } from 'wagmi'

import {writeUserData} from '../tools/FireBaseFunctions'

import logo from '../images/infLogoBlack.png'
import logoNome from '../images/infinityBlack.png'
import '../css/logo.css'

export default function Connection(){
    const { TypeOfValidation } = useParams();
    const navigate = useNavigate()
    const goToPage = (page)=>{navigate(page)} 
    // const { address, isConnecting, isDisconnected } = useAccount()

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log('Connected', { address, connector, isReconnected })
        writeUserData(address);
        if(TypeOfValidation==="Check"){
          goToPage("/Check")
        }else{
          goToPage("/Valida")
        }
        
      },
    })

    const { theme, setTheme } = useWeb3ModalTheme()
    setTheme({
      themeMode: 'light',
      themeVariables: {
        '--w3m-font-family': 'Roboto, sans-serif',
        '--w3m-accent-color': '#8700FF',
        '--w3m-accent-fill-color' : '#FFFFFF',
        '--w3m-background-color' : '#8700FF',
        // '--w3m-logo-image-url' : 'https://drive.google.com/file/d/1i9_5axHFHbeFf-LwEsr-wuzFVvHZ57nR'
      }
    })

    return(
        <>
        <div>
          <img src={logoNome} className="logo" alt="InfNomeBlack" />
          <img src={logo} className="logo" alt="InflogoBlack" />
        </div>
        <Web3Button icon="hide" label="Conecte sua carteira!"/>
        <p>Type of Validation {TypeOfValidation}</p>
        {/* <div><button onClick={()=>goToPage("/")}>Home</button></div> */}
        </>
    )
}