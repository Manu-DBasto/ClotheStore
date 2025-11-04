import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    user: {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setuser] = useState({});

    const checkSession = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setuser(parsedUser);
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const login = (userData) => {
        setuser(userData);
        const parsedUser = JSON.stringify(userData);
        localStorage.setItem("user", parsedUser);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setuser({});
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
