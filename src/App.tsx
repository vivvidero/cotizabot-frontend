import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin, AdminNewProject, AdminNewTipology, AdminSpaceSelector, EditApu, EditProject, EditSpace, EditTypology, Login, NewApu, SpaceInfo, SummaryNewProject, Tipologies, } from './pages'
import { ProtectedRoutes } from './ProtectedRoutes'
import { AuthProvider, NewProjectProvider } from './context'
import { LoadingProvider } from './context/LoadingContext'
import { ApusList, ProjectsList } from './components'
import { GeneralInfoTab } from './components/Budgets/GeneralInfoTab'
import { ReferencesTab } from './components/Budgets/ReferencesTab'
import { DataSheetTab } from './components/Budgets/DataSheetTab'
import { ApusProvider } from './context/ApusContext'
import { EditGeneralInfoTab } from './components/Budgets/GeneralInfoTab/EditGeneralInfoTab'
import { EditReferencesTab } from './components/Budgets/ReferencesTab/EditReferencesTab'

function App() {

  return (
    <LoadingProvider>
      <AuthProvider>
        <NewProjectProvider>
          <ApusProvider>
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
                  <Route path='/admin/budgets/apus/edit/:apuId' element={<EditApu />}>
                    <Route path='general-info' element={<EditGeneralInfoTab />} />
                    <Route path='references' element={<EditReferencesTab />} />
                    <Route path='data-sheet' element={<DataSheetTab />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ApusProvider>
        </NewProjectProvider>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default App
