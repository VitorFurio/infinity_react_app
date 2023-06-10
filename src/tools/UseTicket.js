import { ethers } from 'ethers';

import contractABI from "../contracts/InfinityTicketABI.json"

async function UseTicket(userAddress) {
  try {
    const INFURA_ID = import.meta.env.VITE_INFURA_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY; 
    const contractAddress = '0xD4cC2e0fe8feFb4D230Fdf7bADBE04FfAebF67a7';
    const abi = contractABI;
    
    // const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/'+INFURA_ID);
    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
    const signer = new ethers.Wallet(privateKey, provider);
 
    const contract = new ethers.Contract(contractAddress, abi, signer);
   
    const gasLimit = 1000000;
    const transaction = await contract.UseFirstTicket(userAddress,{ gasLimit });
    // const transaction = await contract.ResetTicket(2);

    const transactionReceipt = await transaction.wait();

    if (transactionReceipt.status === 1) {
      console.log('Transação concluída com sucesso!')
      return 1;
    } else {  
      console.log('A transação falhou.')
      return 0;
    }
  } catch (error) {
    console.log('Ocorreu um erro:', error);
    return 0;
  }
}

export default UseTicket;
