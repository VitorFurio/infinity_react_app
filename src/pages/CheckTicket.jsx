import {useNavigate} from "react-router-dom"
import { useAccount, useDisconnect ,useContractRead} from 'wagmi'
import { useState} from 'react';
import { BigNumber} from 'ethers'

import Loading from "../componentes/Loading";
import Message from "../componentes/Message";
import ContratoABI from "../contracts/contractAbi.json"

let validado = false;
let success = false;

// TODO: Concertar bug: a primeira conexão sempre falha.

export default function CheckTicket() {
  
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
    const { disconnect } = useDisconnect()
    const {address} = useAccount()
    let qntd = -1

    const contractRead = useContractRead({
      address: '0x18145188f281c3e0E8E0f566b2CB692Ac3576892',
      abi: ContratoABI,
      functionName: 'balanceOf',
      args: [address],
      onSuccess() {
        if (address !== undefined) {
          ValidaTicket()
        }
      },
    })
    if(BigNumber.isBigNumber(contractRead.data)){
      qntd = contractRead.data.toNumber()
    }

    function ValidaTicket(){
      console.log("Nfts: "+qntd)
      if(validado) return;
      // if(qntd === -1) return;
      if(qntd>0){
        console.log("Tem NFTs")
        setMessage("Você tem "+qntd+ "NFTs");
        success=true;
        // SUCESSO, a carteira possui NFTs

        //Adicione o codigo de abertura da porta/catraca aqui!

      }else{
        setMessage("Você não possui NFTs.");
        success=false;
      }
      validado=true;
    }

    function Desconectar(){
      console.log('Desconectando...')
      validado=false
      success=false
      setMessage("")
      disconnect() 
      console.log('Disconnected');
      goToPage("/Home")
    }

  return (
    <>
      {validado ? <Message message={message} success={success}/> : <Loading/>}
      {validado ? <button onClick={()=>Desconectar()}>Desconectar</button> : <p> Isso pode demorar um pouco.</p>}
    </>
  )
}
