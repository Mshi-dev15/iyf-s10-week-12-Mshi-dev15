import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authAPI.getMe()
                .then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const res = await authAPI.login(credentials);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data.user;
    };

    const register = async (userData) => {
        const res = await authAPI.register(userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data.user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};