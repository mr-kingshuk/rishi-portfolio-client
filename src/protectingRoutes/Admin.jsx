import React, { useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar.jsx';

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const Admin = ({ children }) => {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    }, [user]);
    
    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
};

export default Admin;