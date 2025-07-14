import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import { ThemeProvider } from './context/themeContext.tsx'
import Csx from './components/Csx.tsx'
import SignUp from './pages/SignUp.tsx'
import Signin from './pages/SignIn.tsx'
import { Toaster } from 'sonner'
import { CardContent } from './components/CardContent.tsx'

function App() {
  return (
        /* <Csx variant={'primary'} noofwheels={4}/>
        <Csx variant={'secondary'} noofwheels={6}/> */

    <>
      <ThemeProvider>
          <BrowserRouter>
          <Toaster />
            <Routes>
              <Route path='/' element={<Landingpage />}/>
              <Route path='/signup' element={<SignUp />}/>
              <Route path='/signin' element={<Signin />}/>
              <Route path='/dashboard' element={<CardContent />}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
