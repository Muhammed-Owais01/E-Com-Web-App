import { createContext, useContext, useEffect, useState } from "react";
import getCookie from "./getCookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const getCartCount = async () => {
        const token = getCookie('token');
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/cart`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Application": "application/json",
                    "Authorization": `${token}`
                },
            });
            const data = await res.json();
            setCartCount(data.totalQuantity);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        const username = getCookie('username');
        const token = getCookie('token');

        if (token && username) {
            login(username);    
        }
        else {
            setIsLoggedIn(false);
            setUser(null);
        }
        
    }, [])

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        getCartCount();
    }
    const logout = () => {
        document.cookie = "token=; path=/;";
        document.cookie = "username=; path=/;";
        setIsLoggedIn(false);
        setUser(null);
        setCartCount(0);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, cartCount, setCartCount }}>
            { children }
        </AuthContext.Provider>
    );
};