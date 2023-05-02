import {useNavigate} from "react-router-dom"
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react';

import {getNftByOwner} from '../tools/NftData'
import Loading from "../tools/Loading";
import {readUserData, writeUserData, getItem, setItem} from '../tools/FireBaseFunctions'

export default function ValidaPage() {
    const [nfts, setNfts] = useState(null);
    // const [validado, SetValidado] = useState(false)
    const { address, isConnecting, isDisconnected } = useAccount()

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 

    useEffect(() => {
      async function getData() {
        const newData = await getNftByOwner(address);
        setNfts(newData);
      }
      getData();
    }, []);

    console.log(nfts);

  // async function ValidaTicket(address) {
  //   // writeUserData(address)
  //   if (qntd > 0) {
  //     const nfts = await getNftByOwner(address)
  //     let item;
  //     let valorItem;
  //     let verificando = true;
  //     while(verificando){ 
  //       if((item=nfts.shift()) != undefined){
  //         valorItem = await getItem(item);
  
  //         if(valorItem==false){
  //           verificando=false;
  //           setItem(item,true)
  //           setApproved(true);
  //           setMessage(`Item ${item} utilizado!`)
  //           console.log("Entrada permitida com o item "+item+"!");
  //         }else{
  //           console.log("Item "+item+" já foi utilizado.");
  //           //setMessage("item: "+item+" já foi utilizado")
  //         }
  //       }
  //       else{
  //         verificando = false;
  //         setMessage("Todos os itens da carteira já foram utilizados.")
  //         console.log("Todos os itens da carteira já foram utilizados.");
  //       }
  //     }
  //   } else {
  //     setApproved(false)
  //     setMessage("Não há itens na carteira.")
  //     console.log("Não há ticket");
  //   }
  //   setLoading(false);
  //   SleepToDisconnect()
  // }
    

  return (
    <>
      <h3>Validando Seus Tickets...</h3>
      <button onClick={()=>getItem(1)}>Valida!</button>
      {nfts ? "Dados Obtidos com sucesso" : <Loading/>}
    </>
  )
}
