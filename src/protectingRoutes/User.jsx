import React from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar.jsx';

const User =({ children }) => {
  return (
    <div style={{background: "black"}}>
        <UserNavbar />
        {children}
    </div>
  );
};

export default User;