import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AuthForm from './pages/auth/AuthForm'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App