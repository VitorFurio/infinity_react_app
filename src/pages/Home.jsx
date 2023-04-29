import {useNavigate} from "react-router-dom"

export default function Home() {

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 
  
  return (
    <>
      <h3>Hello</h3>
      <button onClick={()=>goToPage("/Vite")}> Vite</button>
      <button onClick={()=>goToPage("/Connect")}> Conectar</button>
      <button onClick={()=>goToPage("/User")}> Usuario</button>
    </>
  )
}
