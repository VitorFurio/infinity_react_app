import {useNavigate} from "react-router-dom"

export default function ValidaPage() {

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 

  return (
    <>
      <h3>Validando Seus Tickets...</h3>
    </>
  )
}
