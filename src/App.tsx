import './App.css'
import { DashboardPage, FormInicial, Home, Login } from './pages'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'



function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/project' element={<FormInicial />} />
            <Route path='/dashboard/:id' element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>


  )
}

export default App
