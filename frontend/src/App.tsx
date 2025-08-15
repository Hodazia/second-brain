
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import SignUp from './pages/SignUp.tsx'
import Signin from './pages/SignIn.tsx'
import { Toaster } from 'sonner'
import DashBoard from './components/DashboardComponents/Dashboard.tsx'
import Shared from './components/DashboardComponents/Shared.tsx'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-right'/>
        <Routes>
          <Route path='/' element={<Landingpage />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/xyz' element={<DashBoard />}/>
          {/* <Route path='/xyz' element={<Tutorials />}/> */}
          <Route path='/dashboard' element={<Navigate to="/dashboard/all" replace />}/>
          <Route path="/dashboard/:filter" element={<DashBoard/>}/>
          <Route path="/share/:hash" element={<Shared />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
