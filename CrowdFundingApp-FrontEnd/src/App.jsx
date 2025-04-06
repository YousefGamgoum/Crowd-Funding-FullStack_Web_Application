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
import Notfound from './Pages/Notfound'
import Footer from './Components/footer'
function App() {
  // const [logged, setlogged] = useState(false);
  // const is_logged=(value)=>{
  //   setlogged(value)
  // }
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/create' element={<CreateProject/>}></Route>
            <Route path='/update/:id' element={<UpdateProject/>}></Route>
            <Route path='/delete/:id' element={<DeleteProject/>}></Route>
        <Route path='*' element={<Notfound />} ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
      
    </>
  )
}

export default App
