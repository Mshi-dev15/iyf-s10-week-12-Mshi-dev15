import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Reels from './pages/Reels';
import Marketplace from './pages/Marketplace';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    const { isAuthenticated } = useAuth(); // ✅ Only get what we need
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="bg-light-primary dark:bg-dark-primary min-h-screen transition-colors duration-300">
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                
                {isAuthenticated && <Sidebar />}
                
                <main className={`pt-14 ${isAuthenticated ? 'lg:ml-72' : ''} min-h-screen`}>
                    <div className="max-w-2xl mx-auto px-4 py-6">
                        <Routes>
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } />
                            <Route path="/reels" element={
                                <ProtectedRoute>
                                    <Reels />
                                </ProtectedRoute>
                            } />
                            {/* ✅ Marketplace Route - No user prop passed */}
                            <Route path="/marketplace" element={
                                <ProtectedRoute>
                                    <Marketplace />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile/:id" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={
                                isAuthenticated ? <Navigate to="/" /> : <Login />
                            } />
                            <Route path="/register" element={
                                isAuthenticated ? <Navigate to="/" /> : <Register />
                            } />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}