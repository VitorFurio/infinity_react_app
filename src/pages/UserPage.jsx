import {useNavigate} from "react-router-dom"

export default function UserPage() {

    const navigate = useNavigate();
    const goToPage = (page)=>{navigate(page)} 

  return (
    <>
      <h3>Hello User!</h3>
      <button onClick={()=>goToPage("/")}> Home</button>
    </>
  )
}
