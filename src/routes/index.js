import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import FeedPage from '../pages/FeedPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import { auth } from '../config/firebase';


const PrivateRoute = () => {
    const user = auth.currentUser;
    return user ? <Outlet /> : <Navigate to="/login" />;
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={ <LoginPage /> } />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route path='/' element={<HomePage />} >
          <Route path='/' element={<FeedPage />} />
          <Route path='user/:id' element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;