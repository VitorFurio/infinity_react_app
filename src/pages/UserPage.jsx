import {useNavigate} from "react-router-dom"
import { Web3Button} from '@web3modal/react'
import { useAccount } from 'wagmi'

export default function UserPage() {

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
    const {account,isConnected} = useAccount({
        onDisconnect() {
          console.log('Disconnected')
          goToPage('/Connect')
        },
      })

  return (
    <>
    <div>
      <h3>Hello User!</h3>
      <Web3Button/>
    </div>
    <button onClick={()=>goToPage("/Valida")}> Validar Ticket</button>
    <button onClick={()=>goToPage("/")}> Home</button>
    </>
  )
}
