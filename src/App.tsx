import './App.css'
import { DashboardPage, Home, Login, ProjectFeatures, PropertyType, Register, StyleSelector } from './pages'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { QuotationProvider } from './context/QuotationContext'



function App() {


  return (
    <AuthProvider>
      <QuotationProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/property-type' element={<PropertyType />} />
              <Route path='/project-feature' element={<ProjectFeatures />} />
              <Route path='/style-selector' element={<StyleSelector />} />
              <Route path='/dashboard/:id' element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QuotationProvider>
    </AuthProvider>


  )
}

export default App
