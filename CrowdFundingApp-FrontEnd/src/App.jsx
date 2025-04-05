import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import CreateProject from './Pages/CreateProject'
import UpdateProject from './Pages/UpdateProject'
import DeleteProject from './Components/DeleteProject'
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/create' element={<CreateProject/>}></Route>
        <Route path='/update/:id' element={<UpdateProject/>}></Route>
        <Route path='/delete/:id' element={<DeleteProject/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
