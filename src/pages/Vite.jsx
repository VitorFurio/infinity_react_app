import { useState } from 'react'
import {useNavigate,useParams} from 'react-router-dom'

import reactLogo from '/infLogoBlack.ico'
import viteLogo from '/infLogo.ico'
// import '../css/Vite.css'

export default function Vite() {
  const { id } = useParams();
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const goToPage = (page)=>{navigate(page)} 

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <button onClick={()=>goToPage("/")}> Home </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Parâmetro ID: {id}</p>
    </>
  )
}
