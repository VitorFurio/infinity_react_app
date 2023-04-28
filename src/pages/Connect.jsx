import {useNavigate} from "react-router-dom"
import { Web3Button } from '@web3modal/react'

export default function Connection(){

    const navigate = useNavigate()
    const goToPage = (page)=>{navigate(page)} 

    return(
        <>
        <h2>Conectado...</h2>
        <Web3Button />
        <div><button onClick={()=>goToPage("/")}>Home</button></div>
        </>
    )
}