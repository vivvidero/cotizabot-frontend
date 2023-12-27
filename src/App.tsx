import './App.css'
import { Admin, DashboardPage, Home, Login, ProjectFeatures, PropertyType, Register, StyleSelector } from './pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { CartCanvasProvider, QuotationProvider, AuthProvider } from './context'



function App() {



  return (
    <AuthProvider>
      <QuotationProvider>
        <CartCanvasProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/admin' element={<Admin />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/property-type' element={<PropertyType />} />
                <Route path='/project-feature' element={<ProjectFeatures />} />
                <Route path='/style-selector' element={<StyleSelector />} />

                <Route path='/dashboard/:id' element={<DashboardPage />} />

              </Route>
            </Routes>
          </BrowserRouter>
        </CartCanvasProvider>
      </QuotationProvider>
    </AuthProvider>

  )
}

export default App
