import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'

import SignUp from './pages/SignUp.tsx'
import Signin from './pages/SignIn.tsx'
import { Toaster } from 'sonner'
import { Tutorials } from './components/DashboardComponents/Tutorials.tsx'

function App() {
  return (
        /* <Csx variant={'primary'} noofwheels={4}/>
        <Csx variant={'secondary'} noofwheels={6}/> */

    <>

          <BrowserRouter>
          <Toaster />
            <Routes>
              <Route path='/' element={<Landingpage />}/>
              <Route path='/signup' element={<SignUp />}/>
              <Route path='/signin' element={<Signin />}/>
              {/* <Route path='/dashboard' element={<Dashboard />}/> */}
              <Route path='*' element={<Landingpage />}/>
              <Route path='/xyz' element={<Tutorials />}/>
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
