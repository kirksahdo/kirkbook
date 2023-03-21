import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import FeedPage from '../pages/FeedPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import { auth } from '../config/firebase';
import LoadingScreen from '../components/LoadingScreen';

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

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