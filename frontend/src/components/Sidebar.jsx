import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const { user } = useAuth();

    const menuItems = [
        { icon: '👤', label: `${user?.name || 'User'}`, path: `/profile/${user?._id}` },
        { icon: '👥', label: 'Friends', path: '/friends' },
        { icon: '🕐', label: 'Memories', path: '/memories' },
        { icon: '💾', label: 'Saved', path: '/saved' },
        { icon: '👥', label: 'Groups', path: '/groups' },
        { icon: '📺', label: 'Video', path: '/video' },
        { icon: '🏪', label: 'Marketplace', path: '/marketplace' },
        { icon: '📰', label: 'Feeds', path: '/feeds' },
        { icon: '🎬', label: 'Reels', path: '/reels' }, // ✅ Added Reels
        { icon: '📅', label: 'Events', path: '/events' },
        { icon: '⚙️', label: 'Settings', path: '/settings' }, // ✅ Added Settings
    ];

    return (
        <aside className="sidebar fixed left-0 top-14 w-72 h-[calc(100vh-3.5rem)] bg-dark-secondary overflow-y-auto p-3 hidden lg:block"
        style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(136,136,136,0.5) transparent'
    }}
    >
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-tertiary cursor-pointer mb-2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="text-light-primary font-semibold text-sm">{user?.name}</div>
                    <div className="text-light-secondary text-xs">See your profile</div>
                </div>
            </div>
            
            <nav className="space-y-1">
                {menuItems.map((item, index) => (
                    <Link 
                        key={index} 
                        to={item.path} 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-tertiary text-light-primary transition-colors"
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}