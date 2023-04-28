import {useNavigate} from "react-router-dom"

export default function Home() {

    const navigate = useNavigate();
    function goToPage(page){
        navigate(page);
    }
  return (
    <>
      <h3>Hello</h3>
      <button onClick={()=>goToPage("/Vite")}> Ola</button>
    </>
  )
}
