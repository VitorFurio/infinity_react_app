import {useNavigate} from "react-router-dom"

export default function Home() {

    const navigate = useNavigate();
    function goToPage(){
        navigate("/Vite");
    }
  return (
    <>
      <h3>Hello</h3>
      <button onClick={goToPage}> Ola</button>
    </>
  )
}
