import { Box } from '@mui/material';
import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from './pages/landing/HomePage';
import AboutPage from './pages/landing/AboutPage';
import ContactPage from './pages/landing/ContactPage';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/Navbar';
import RoleSelection from './pages/landing/RoleSelection';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminLogin from './pages/auth/AdminLogin';
import AvailableDoctors from './components/common/AvailableDoctors';
import DashboardLayout from './dashboardLayout/DashboardLayout';
import ProtectedRoute from './components/routes/ProtectedRoute';

const App = () => {
  const { pathname } = useLocation();
  const isDashboard = ["/patient", "/doctor", "/admin"].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <Box>
    <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/allDoctors' element={<AvailableDoctors/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/roleSelection' element={<RoleSelection/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/register' element={<SignupPage/>}/>

         {/* Protected Dashboard Routes */}
         {["patient", "doctor", "admin"].map((role) => (
            <Route
              key={role}
              element={<ProtectedRoute allowedRoles={[role]} />}
            >
              <Route
                path={`/${role}/*`}
                element={<DashboardLayout role={role} />}
              />
            </Route>
          ))}
      </Routes>
     {!isDashboard &&  <Footer/>}
    </Box>
  )
}

export default App