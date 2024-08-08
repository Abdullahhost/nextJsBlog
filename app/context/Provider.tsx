"use client"
import React, { createContext, useState } from 'react'
const INITIAL_DarkMode: any = localStorage.getItem("darkMode");
export const ThemeContextValue = createContext<{ state: any; }>({ state: INITIAL_DarkMode });
const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state] = useState(INITIAL_DarkMode);
    return (
        <ThemeContextValue.Provider value={{ state }}>
            {children}
        </ThemeContextValue.Provider>
    );
};
export default Provider