import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/Cyborg/bootstrap.min.css';
import { Route, Routes} from 'react-router-dom'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Dashbord } from './components/Dashbord'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Routes>

      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashbord' element={<Dashbord/>}/>
     
     </Routes>
    </>
  )
}

export default App
