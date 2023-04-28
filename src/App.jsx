import { Route, Routes, BrowserRouter } from 'react-router-dom';

//pages
import Vite from './pages/Vite'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Vite/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
