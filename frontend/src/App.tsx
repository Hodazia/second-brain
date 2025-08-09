import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import SignUp from './pages/SignUp.tsx'
import Signin from './pages/SignIn.tsx'
import { Toaster } from 'sonner'
import { Tutorials } from './components/DashboardComponents/Tutorials.tsx'
import DashBoard from './components/DashboardComponents/Dashboard.tsx'
import Shared from './components/DashboardComponents/Shared.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<Landingpage />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/xyz' element={<Tutorials />}/>
          <Route path='/dashboard' element={<DashBoard />}/>
          <Route path="/dashboard/:filter" element={<DashBoard/>}/>
          <Route path="/share/:hash" element={<Shared />}/>
          <Route path='*' element={<Landingpage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
