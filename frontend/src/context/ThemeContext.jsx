import { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get theme from localStorage or system preference
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);

        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Apply theme to document
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem(STORAGE_KEYS.THEME, 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const value = {
        isDarkMode,
        isLoading,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
