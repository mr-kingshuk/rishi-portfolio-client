import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//Protecting Routes
import Admin from './protectingRoutes/Admin.jsx';
import User from './protectingRoutes/User.jsx';
import OutAdmin from './protectingRoutes/OutAdmin.jsx';

//User Routes
import Home from './pages/Home/Home.jsx';
import Works from './pages/Works/Works.jsx';
import Project from './pages/Project/Project.jsx';

//Admin Routes
import Login from './pages/Login/Login.jsx';
import AddProject from './pages/AddProject/AddProject.jsx';
import UpdateProject from './pages/UpdateProject/UpdateProject.jsx';
import ReorderProject from './pages/ReorderProject/ReorderProject.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';

import { useAuthContext } from './hooks/useAuthContext.jsx';

function App() {
  const { user } = useAuthContext();
  const [token, setToken] = useState(user && user.token);

  useEffect(() => {
    setToken(user && user.token);
  }, [user])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <User>
              <Home />
            </User>} />
        <Route
          path='/works'
          element={
            <User>
              <Works />
            </User>} />
        <Route
          path='/project/:id'
          element={
            <User>
              <Project />
            </User>} />

        <Route
          path='/login'
          element={
            <OutAdmin>
              <Login />
            </OutAdmin>} />
        <Route
          path='/add-project'
          element={
            <Admin token={token}>
              <AddProject token={token} />
            </Admin>} />
        <Route
          path='/update-project/:id'
          element={
            <Admin token={token}>
              <UpdateProject token={token} />
            </Admin>} />
        <Route
          path='/projects'
          element={
            <Admin token={token}>
              <ReorderProject token={token} />
            </Admin>} />
        <Route
          path='/reset-password/:id'
          element={
            <OutAdmin>
              <ResetPassword/>
            </OutAdmin>} />
        <Route
          path='*'
          element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;