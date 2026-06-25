import Login from './Page/Login'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import AdminPage from './Page/AdminPage'
import UserPage from './Page/UserPage'
import ProtectedRoute from './Components/ProtectedRoute'
import ViewDoc from './Page/ViewDoc'
import UploadPage from './Page/UploadPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} /> 
        <Route path="/chat" element={<UserPage />} />
        <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN"><AdminPage /></ProtectedRoute>}>
          <Route index element={<Navigate to="upload"/>}/>
          <Route path="upload" element={<UploadPage />} />
          <Route path="documents" element={<ViewDoc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
