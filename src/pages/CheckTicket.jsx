import {useNavigate} from "react-router-dom"
import { useAccount, useDisconnect, useContractRead } from 'wagmi'
import { useState } from 'react';

import {polygonMumbai} from 'wagmi/chains'

import Loading from "../componentes/Loading";
import Message from "../componentes/Message";
import contractABI from "../contracts/InfinityTicketABI.json"

let success = false;

export default function CheckTicket() {

    const contractAddress = '0xD4cC2e0fe8feFb4D230Fdf7bADBE04FfAebF67a7';

    const Contract = {
      address: contractAddress,
      abi: contractABI,
      chainId: polygonMumbai.id,
    }

    const [message, setMessage] = useState("")
    const [message2, setMessage2] = useState("")
    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
    const { disconnect } = useDisconnect()
    
    const [buscando, setBuscando] = useState(true)
    const [waitUser, setWaitUser] = useState(true)
    const [loadingMessage, SetLoadingMessage] = useState("Buscando dados na Blockchain...")

    const { address, isConnecting, isDisconnected } = useAccount({
      async onConnect({ address, connector, isReconnected }) {
        console.log('Validando dados...',)
      },
      onDisconnect() {
        console.log('Disconnected');
        goToPage("/Home")
      },
    })

     const contractRead = useContractRead({
      chainId: polygonMumbai.id,
      address: contractAddress,
      abi: contractABI,
      functionName: 'GetNotUsedTicket',
      args: [address],
      onError(error) {
        setBuscando(false);
        console.log('Error reading contract', error.reason)
        success=false;
        setMessage2(error.reason)
        setMessage('Por favor, tente utilizar outro endereço de carteira.')
        setWaitUser(false)
      },
      onSuccess(data) {
        setBuscando(false);
        console.log('Success reading contract', data)
        let tickets=[];
        for(let i=0;i<data.length;i++){
            tickets[i]=data[i].toNumber();
        }
        console.log("Tickets: "+tickets)
        success=true;
        setMessage('Esta carteira possui tickets que ainda não foram utilizados.')
        setMessage2('IDs dos tickets: '+tickets.join(", "))
        setWaitUser(false)
      },
    })


    function Desconectar(){
      console.log('Desconectando...')
      success=false
      setMessage("")
      disconnect() 
    }

  return (
    <>
      {<h3>Conectado com a carteira: {address}</h3>}
      {<p>Endereço do contrato: {contractAddress}</p>}
      {!waitUser ? <Message message={message} message2={message2} success={success}/> : <Loading message={loadingMessage}/>}
      {!buscando ? <button className="utilizar-button" onClick={()=>Desconectar()}>Desconectar</button> : <p>Aguarde um momento...</p>}
    </>
  )
}
