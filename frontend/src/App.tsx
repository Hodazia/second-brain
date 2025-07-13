import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import { ThemeProvider } from './context/themeContext.tsx'
import Csx from './components/Csx.tsx'
function App() {
  return (
        /* <Csx variant={'primary'} noofwheels={4}/>
        <Csx variant={'secondary'} noofwheels={6}/> */

    <>
      <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Landingpage />}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
