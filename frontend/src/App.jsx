import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './Page/Login'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import AdminPage from './Page/AdminPage'
import UserPage from './Page/UserPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} /> 
        <Route path="/login"  element = {<Login/>}/>
        <Route path="/chat" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
