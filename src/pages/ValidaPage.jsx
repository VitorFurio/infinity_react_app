import {useNavigate} from "react-router-dom"
import { useAccount } from 'wagmi'

import {getNftByOwner} from '../tools/NftData'
import Loading from "../tools/Loading";

export default function ValidaPage() {

    const { address, isConnecting, isDisconnected } = useAccount()
    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 

    // const nfts = getNftByOwner(address);
    // console.log(nfts)
    //TODO: implementar validação de toknes e mensgame de aprovado e rejeitado.
  return (
    <>
      <h3>Validando Seus Tickets...</h3>
      <button onClick={()=>getNftByOwner(address)}>Valida!</button>
      <Loading/>
    </>
  )
}
