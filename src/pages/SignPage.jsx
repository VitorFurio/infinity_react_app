import {useNavigate} from "react-router-dom"
import { useAccount, useDisconnect, useContractRead, useContractWrite, useWaitForTransaction,useSignMessage} from 'wagmi'
import { useState, useEffect } from 'react';

import { BigNumber} from 'ethers'
import {polygonMumbai} from 'wagmi/chains'
import UseTicket from '../tools/UseTicket';

import Loading from "../componentes/Loading";
import Message from "../componentes/Message";
import contractABI from "../contracts/InfinityTicketABI.json"

let success = false;

export default function SignPage() {

    const contractAddress = '0xD4cC2e0fe8feFb4D230Fdf7bADBE04FfAebF67a7';

    const [nfts, setNfts] = useState([]);
    const [message, setMessage] = useState("")
    const [message2, setMessage2] = useState("")
    const [buscando, setBuscando] = useState(true)
    const [waitUser, setWaitUser] = useState(true)
    const [loadingMessage, SetLoadingMessage] = useState("Buscando dados na Blockchain...")

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
    const { disconnect } = useDisconnect()

    // timer
    useEffect(() => {
      if (!waitUser) {
        // console.log('Entrou no timer...');
        const timer = setTimeout(() => {
          disconnect();
          console.log('Desconectando...');
        }, 7000);
        return () => clearTimeout(timer);
      }
    }, [waitUser]);


    const { address, isConnecting, isDisconnected } = useAccount({
      async onConnect({ address, connector, isReconnected }) {
        console.log('Validando dados...',)
      },
      onDisconnect() {
        console.log('Disconnected');
        goToPage("/Home")

        //reset das variaveis (não sei se é necessário)
        // success=false
        // setNfts([])
        // setMessage("")
        // setBuscando(true)
        // setWaitUser(true)
        // setTimerStarted(false)
        // SetLoadingMessage("Buscando dados na Blockchain...")
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
        setMessage("Verifique se esta carteira possui um ticket não utilizado")
        setWaitUser(false)
      },
      onSuccess(data) {
        setBuscando(false);
        console.log('Success reading contract', data)
        let tickets=[];
        for(let i=0;i<data.length;i++){
            tickets[i]=data[i].toNumber();
        }
        setNfts(tickets)
        // console.log("nfts: "+nfts)
        console.log("Tickets: "+tickets)
        SetLoadingMessage("Aguardando confirmação do usuário...");
        if(signMessage.signMessage){
          signMessage?.signMessage()
        }
      },
    })


    const signMessage = useSignMessage({
      message: 'Deseja utilizar o seu ticket?',
      onError(error) {
        console.log('Error signing message', error)
        success=false;
        setMessage(error.message)
        setWaitUser(false)
      },
      onSuccess(data) {
        console.log('Success signing message', data)
        SetLoadingMessage("Mensagem assinada. Aguardando a transação ser aprovada...")
        handleUseTicket()
      },
    })

    const handleUseTicket = async () => {
      const Result = await UseTicket(address);
      if(Result){
        success=true;
        setMessage("Transação aprovada!")
        setMessage2("item "+nfts?.shift()+" utilizado com sucesso!")
        setWaitUser(false)
      }else{
        success=false;
        setMessage("A transação falhou. Por favor, tente novamente.")
        setWaitUser(false)
      }
    };


  return (
    <>
      {!buscando ? <h3>ID encontrado: {nfts.join(", ")}</h3> : <h3>Buscando IDs dos tickets...</h3>}
      {!waitUser ? <Message message={message} message2={message2} success={success}/> : <Loading message={loadingMessage}/>}
      {/* {!buscando ? <button onClick={()=>disconnect() }>Desconectar</button> : <p> Isso pode demorar um pouco.</p>} */}
    </>
  )
}
