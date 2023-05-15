import {useNavigate} from "react-router-dom"
import { useAccount, useDisconnect } from 'wagmi'
import { useState, useEffect } from 'react';

import {getNftByOwner} from '../tools/NftData'
import Loading from "../componentes/Loading";
import {getItem, setItem} from '../tools/FireBaseFunctions'
import Message from "../componentes/Message";

let validado = false;
let success = false;

export default function ValidaPage() {
    const [nfts, setNfts] = useState([]);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
    const { disconnect } = useDisconnect()
    
    const { address, isConnecting, isDisconnected } = useAccount({
      async onConnect({ address, connector, isReconnected }) {
        console.log('Validando dados...',)
        const newData = await getNftByOwner(address);
        setNfts(newData)
        ValidaTicket(newData)
      },
      onDisconnect() {
        console.log('Disconnected');
        goToPage("/Home")
      },
    })

    async function ValidaTicket(nfts){
      console.log("Nfts: "+nfts)
      if(validado) return;
      if(nfts.length===0){
        console.log("Não há itens válidos")
        setMessage("Não há itens válidos nesta carteira");
        success=false;
        validado=true;
      }else{
        for (let i = 0; i < nfts.length; i++) {
            let item =nfts[i];
            let valorItem = await getItem(item);
            if(valorItem==false){
              setItem(item,true)
              success=true;
              console.log("Entrada permitida com o item "+item+"!");
              setMessage(`Item ${item} utilizado!`)
              break;
            }else{
              console.log("Item "+item+" já foi utilizado.");
              // setMessage("item: "+item+" já foi utilizado")
              // setSuccess(false)
            }
        }
        if(!success){
          console.log("Todos os itens da carteira já foram utilizados.");
          setMessage("Todos os itens da carteira já foram utilizados.")
        }
        validado=true;
      }
    }

    function Desconectar(){
      console.log('Desconectando...')
      validado=false
      success=false
      setMessage("")
      disconnect() 
    }

  return (
    <>
      {validado ? <h3>NFTs encontradas: {nfts.join(", ")}</h3> : <h3>Validando seus tickets</h3>}
      {validado ? <Message message={message} success={success}/> : <Loading/>}
      {validado ? <button onClick={()=>Desconectar()}>Desconectar</button> : <p> Isso pode demorar um pouco.</p>}
    </>
  )
}
