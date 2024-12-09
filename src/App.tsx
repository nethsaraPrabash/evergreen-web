import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AuthForm from './pages/auth/AuthForm'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />}/>
        <Route path="/home" element={<Home />} />
    
      </Routes>
    </BrowserRouter>
  )
}

export default App