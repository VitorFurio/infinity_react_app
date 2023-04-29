import {useNavigate} from "react-router-dom"
import { Web3Button, useWeb3ModalTheme } from '@web3modal/react'

import logo from '../images/infLogoBlack.png'
import logoNome from '../images/infinityBlack.png'
import '../css/Connect.css'

export default function Connection(){

    const navigate = useNavigate()
    const goToPage = (page)=>{navigate(page)} 

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
        
        {/* <div><button onClick={()=>goToPage("/")}>Home</button></div> */}
        </>
    )
}