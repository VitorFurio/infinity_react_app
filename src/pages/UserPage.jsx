import {useNavigate} from "react-router-dom"
import { Web3Button} from '@web3modal/react'
import { useAccount } from 'wagmi'

export default function UserPage() {

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
    const account = useAccount({
        onDisconnect() {
          console.log('Disconnected')
          goToPage('/Connect')
        },
      })

  return (
    <>
      <h3>Hello User!</h3>
      <Web3Button/>
      <button onClick={()=>goToPage("/")}> Home</button>
    </>
  )
}
