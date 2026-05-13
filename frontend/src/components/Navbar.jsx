import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ theme, toggleTheme }) {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-14 bg-dark-secondary shadow-lg z-50 px-4 flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                        C
                    </div>
                    <span className="text-light-primary text-xl font-bold hidden sm:block">Convo</span>
                </Link>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-xl mx-4">
                <div className="bg-dark-tertiary rounded-full flex items-center px-4 py-2">
                    <svg className="w-5 h-5 text-light-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Search Convo"
                        className="bg-transparent border-none outline-none text-light-primary w-full"
                    />
                </div>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full bg-dark-tertiary flex items-center justify-center text-light-primary hover:bg-dark-primary transition-colors"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {isAuthenticated ? (
                    <>
                        <Link to="/" className="nav-icon" title="Home">🏠</Link>
                        <Link to="/reels" className="nav-icon" title="Reels">🎬</Link>
                        <Link to={`/profile/${user?._id}`} className="nav-icon" title="Profile">👤</Link>
                        <button onClick={handleLogout} className="nav-icon" title="Logout">🚪</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-icon" title="Login">🔑</Link>
                )}
            </div>
        </nav>
    );
}