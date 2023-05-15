import {useNavigate} from "react-router-dom"

import logo from '../images/infLogoBlack.png'
import logoNome from '../images/infinityBlack.png'
import '../css/logo.css'

export default function Home() {
    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
  
    return (
    <>
      <div>
          <img src={logoNome} className="logo" alt="InfNomeBlack" />
          <img src={logo} className="logo" alt="InflogoBlack" />
        </div>
      <button className="check-button" onClick={()=>goToPage("/Connect/Check")}> Verificar tokens</button>
      <button className="utilizar-button" onClick={()=>goToPage("/Connect/Valida")}> Utilizar tokens</button>
    </>
  )
}
