import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';

const useLogin = (email, password) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        //updating state varaiables
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method : 'POST',
            headers : {
                'Content-Type' :'application/json'
            },
            body : JSON.stringify({
                email, 
                password
            })
        });
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        else{
            //save the user to localStorage
            localStorage.setItem('userPort', JSON.stringify(json));

            //update the AuthContext
            dispatch({type : "login", payload : json });

            setIsLoading(false);
        }
    };

  return { login, isLoading, error};
};

export default useLogin;