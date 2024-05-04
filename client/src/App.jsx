import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  return (
    <GoogleOAuthProvider clientId="58562817379-ocgq8pn2lt8a7ju4rovto5up1h08e05b.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Signup /> }></Route>
        <Route path='/login' element = { <Login /> }></Route>
        <Route path='/home' element = { <Home /> }></Route>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
