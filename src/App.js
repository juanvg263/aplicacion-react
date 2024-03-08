import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Informacion from './Informacion';
import Tareas from './Tareas';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/informacion" element={<Informacion/>}></Route>
          <Route path="/tareas" element={<Tareas/>}></Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
