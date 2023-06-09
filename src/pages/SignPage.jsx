import {useNavigate} from "react-router-dom"
import { useAccount, useDisconnect, useContractRead, useContractWrite, useWaitForTransaction,useSignMessage} from 'wagmi'
import { useState, useEffect } from 'react';

import { BigNumber} from 'ethers'
import {polygonMumbai} from 'wagmi/chains'
import resetTicket from '../tools/ResetTicket';

import Loading from "../componentes/Loading";
import Message from "../componentes/Message";
import contractABI from "../contracts/InfinityTicketABI.json"

let success = false;

export default function SignPage() {
    const [nfts, setNfts] = useState([]);
    const [message, setMessage] = useState("")
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
      address: '0xcfDd86Ff1f4db29A44BD3487CFF1EE601C0338ff',
      abi: contractABI,
      functionName: 'GetNotUsedTicket',
      args: [address],
      onError(error) {
        setBuscando(false);
        console.log('Error reading contract', error.reason)
        success=false;
        setMessage(error.reason)
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
        console.log("nfts: "+nfts)
        console.log("Tickets: "+tickets)
        SetLoadingMessage("Aguardando confirmação do usuário...");
        // if(contractWrite.write){
        //   contractWrite.write?.()
        // }
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
        SetLoadingMessage("Mensagem assinada! Aguardando a transação ser aprovada...")
        handleResetTicket()
      },
    })

    const handleResetTicket = async () => {
      const resetResult = await resetTicket();
      if(resetResult){
        success=true;
        setMessage("Transação Aprovada! Item resetado.")
        setWaitUser(false)
      }else{
        success=false;
        setMessage("A transação falhou. Por favor, desconecte-se e tente novamente.")
        setWaitUser(false)
      }
    };

  //   const contractWrite = useContractWrite({
  //     address: '0xcfDd86Ff1f4db29A44BD3487CFF1EE601C0338ff',
  //     abi: contractABI,
  //     functionName: 'UseFirstTicket',
  //     // args: [contractRead.data[0].toNumber()],
  //     gas: 1_000_000n,
  //     onError(error) {
  //       console.log('Error writing contract', error.message)
  //       success=false;
  //       setMessage(error.message)
  //       setWaitUser(false)
  //     },
  //     onSuccess(data) {
  //       console.log('Success writing contract', data)
  //       // success=true;
  //       SetLoadingMessage("Aguardando a transação "+data.hash+" ser aprovada...")
  //     },
  //   })

  //   const waitForTransaction = useWaitForTransaction({
  //   hash: contractWrite.data?.hash,
  //   cacheTime: 1_000,
  //   onError(error) {
  //     console.log('Error on transaction')
  //     console.log(error)
  //     success=false;
  //     setMessage("A transação falhou. Por favor, desconecte-se e tente novamente.")
  //     setWaitUser(false)
  //   },
  //    onSuccess(data) {
  //     console.log('Success on transaction')
  //     console.log(data)
  //     success=true;
  //     setMessage("Transação Aprovada! Entrada permitida com o item "+nfts[0]+".")
  //     setWaitUser(false)
  //   },
  // })




    // const { config } = usePrepareContractWrite({
    //   address: '0xcfDd86Ff1f4db29A44BD3487CFF1EE601C0338ff',
    //   abi: contractABI,
    //   functionName: 'UseFirstTicket',
    //   onError(error) {
    //     console.log('Error', error)
    //   },
    //   onSuccess(data) {
    //     console.log('Success', data)
    //   },
    // })
    // const { dataWrite, isLoadingWrite, isSuccess, write } = useContractWrite(config)

   

    

    // async function ValidaTicket(nfts){
    //   console.log("Nfts: "+nfts)
    //   if(validado) return;
    //   if(nfts.length===0){
    //     console.log("Não há itens válidos")
    //     setMessage("Não há itens válidos nesta carteira");
    //     success=false;
    //     validado=true;
    //   }else{
    //     for (let i = 0; i < nfts.length; i++) {
    //         let item =nfts[i];
    //         let valorItem = await getItem(item);
    //         if(valorItem==false){
    //           setItem(item,true)
    //           success=true;
    //           console.log("Entrada permitida com o item "+item+"!");
    //           setMessage(`Item ${item} utilizado!`)
    //           break;
    //         }else{
    //           console.log("Item "+item+" já foi utilizado.");
    //           // setMessage("item: "+item+" já foi utilizado")
    //           // setSuccess(false)
    //         }
    //     }
    //     if(!success){
    //       console.log("Todos os itens da carteira já foram utilizados.");
    //       setMessage("Todos os itens da carteira já foram utilizados.")
    //     }
    //     validado=true;
    //   }
    // }

    function Desconectar(){
      console.log('Desconectando...')
      // validado=false
      success=false
      setMessage("")
      disconnect() 
    }

  return (
    <>
      <p>Versão 2</p>
      {!buscando ? <h3>NFTs encontradas: {nfts.join(", ")}</h3> : <h3>Buscando tickets...</h3>}
      {!waitUser ? <Message message={message} success={success}/> : <Loading message={loadingMessage}/>}
      {!buscando ? <button onClick={()=>Desconectar()}>Desconectar</button> : <p> Isso pode demorar um pouco.</p>}
    </>
  )
}
