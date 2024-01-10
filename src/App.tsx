import './App.css'
import { Admin, AdminNewProject, AdminNewTipology, AdminSpaceSelector, AdminTipology, DashboardPage, Home, Login, ProjectFeatures, PropertyType, Register, StyleSelector } from './pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { CartCanvasProvider, QuotationProvider, AuthProvider, NewProjectProvider } from './context'

function App() {

  return (
    <AuthProvider>
      <QuotationProvider>
        <NewProjectProvider>
          <CartCanvasProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/new-project' element={<AdminNewProject />} />
                <Route path='/new-project/tipology' element={<AdminTipology />} />
                <Route path='/new-project/tipology/new-tipology' element={<AdminNewTipology />} />
                <Route path='/new-project/space-selector' element={<AdminSpaceSelector />} />
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
        </NewProjectProvider>
      </QuotationProvider>
    </AuthProvider>

  )
}

export default App
