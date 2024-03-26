import './App.css'
import { Admin, AdminEditReference, AdminNewProject, AdminNewReference, AdminNewSupplie, AdminNewTipology, AdminSpaceSelector, EditProject, EditSpace, EditTypology, Login, NewApu, SpaceInfo, SummaryNewProject, Tipologies, } from './pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { AuthProvider, NewProjectProvider } from './context'
import { LoadingProvider } from './context/LoadingContext'
import { NewApuProvider } from './context/NewApuContext'
import {ApusList, BudgetsNav, BudgetsSupplies, ProjectsList } from './components'
import { NewDataSheet } from './pages/Budgets/Apus/NewDataSheet'

function App() {

  return (
    <LoadingProvider>
      <AuthProvider>
        <NewProjectProvider>
          <NewApuProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='/admin' element={<Admin />}>
                    <Route path='projects' element={<ProjectsList />} />
                    <Route path='budgets' element={<BudgetsNav />}>
                      <Route path='apus' element={<ApusList />} />
                      <Route path='referencias' element={<ApusList />} />
                      <Route path='insumos' element={<BudgetsSupplies />} />
                    </Route>
                  </Route>
                  <Route path='/admin/projects/new-project' element={<AdminNewProject />} />
                  <Route path='/admin/projects/:projectid/edit-project' element={<EditProject />} />
                  <Route path='/new-project/:projectid' element={<Tipologies />} />
                  <Route path='/new-project/:projectid/new-tipology' element={<AdminNewTipology />} />
                  <Route path='/new-project/:projectid/:typologyid/edit-typology' element={<EditTypology />} />
                  <Route path='/new-project/:projectid/:typologyid/space-selector' element={<AdminSpaceSelector />} />
                  <Route path='/new-project/:projectid/:typologyid/space-selector/space-info' element={<SpaceInfo />} />
                  <Route path='/new-project/:projectid/:typologyid/summary' element={<SummaryNewProject />} />
                  <Route path='/project/:projectid/typology/:typologyid/space/:spaceid/edit' element={<EditSpace />} />
                  <Route path='/admin/budgets/apus/create' element={<NewApu />} />
                  <Route path='/admin/budgets/apus/create/:apuId/data-sheet' element={<NewDataSheet />} />
                  <Route path='/admin/budgets/apus/create/:apuId/dashboard' element={<NewDataSheet />} />
                  <Route path='/admin/budgets/apus/new-reference' element={<AdminNewReference />} />
                  <Route path='/admin/budgets/referencias/edit' element={<AdminEditReference />} />
                  <Route path='/admin/budgets/apus/new-supplie' element={<AdminNewSupplie />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </NewApuProvider>
        </NewProjectProvider>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default App
