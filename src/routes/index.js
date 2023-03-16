import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';


const PrivateRoute = () => {
    const auth = null;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={ <LoginPage /> } />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route path='/' element={<h1>Logado</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;