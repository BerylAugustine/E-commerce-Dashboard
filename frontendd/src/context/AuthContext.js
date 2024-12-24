import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(token);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setAuth(token);
            return response;  // Ensure it returns the response object
        } catch (error) {
            throw error;  // Throw error to be caught in the SignIn component
        }
    };
    
    const register = async (email, password) => {
        try {
            await axios.post(`http://localhost:8000/api/auth/register`, { email, password });
            alert('Registration successful');

        } catch (error) {
            console.error('Registration failed', error);
            alert('User already Exist');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
