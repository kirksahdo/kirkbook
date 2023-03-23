import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import FeedPage from '../pages/FeedPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import { auth } from '../config/firebase';
import LoadingScreen from '../components/LoadingScreen';
import SearchUserPage from '../pages/SearchUserPage';
import Error404Page from '../pages/Error404Page';

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
          <Route path='procurar' element={<SearchUserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default AppRoutes;