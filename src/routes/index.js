import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import FeedPage from '../pages/FeedPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';


const PrivateRoute = () => {
    const auth = true;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={ <LoginPage /> } />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route path='/' element={<HomePage />} >
          <Route path='/' element={<FeedPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;