import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin, AdminEditReference, AdminNewProject, AdminNewReference, AdminNewSupplie, AdminNewTipology, AdminSpaceSelector, ApusDashboard, EditProject, EditSpace, EditTypology, Login, NewApu, NewDataSheet, SpaceInfo, SummaryNewProject, Tipologies, } from './pages'
import { ProtectedRoutes } from './ProtectedRoutes'
import { AuthProvider, NewProjectProvider } from './context'
import { LoadingProvider } from './context/LoadingContext'
import { NewApuProvider } from './context/NewApuContext'
import { ApusList, ProjectsList } from './components'
import { EditApu } from './pages/Budgets/Apus/EditApu'
import { GeneralInfoTab } from './components/Budgets/GeneralInfoTab'
import { ReferencesTab } from './components/Budgets/ReferencesTab'
import { DataSheetTab } from './components/Budgets/DataSheetTab'

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
                    <Route path='budgets' element={<ApusList />} />

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
                  <Route path='/admin/budgets/apus/create' element={<NewApu />}>
                    <Route path='general-info' element={<GeneralInfoTab />} />
                    <Route path='references' element={<ReferencesTab />} />
                    <Route path='data-sheet' element={<DataSheetTab />} />

                  </Route>
                  <Route path='/admin/budgets/apus/create/:id/data-sheet' element={<NewDataSheet />} />
                  <Route path='/admin/budgets/apus/create/:id/dashboard' element={<ApusDashboard />} />
                  <Route path='/admin/apus/edit/:id' element={<EditApu />} />
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
