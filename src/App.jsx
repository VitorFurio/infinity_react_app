import { Route, Routes, BrowserRouter } from 'react-router-dom';

//pages
import Vite from './pages/Vite'
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/Vite" element={<Vite/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
