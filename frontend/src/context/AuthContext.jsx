import { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.clear();
            }
        }

        setLoading(false);
    }, []);

    const login = (userData, tokens) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    };

    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
