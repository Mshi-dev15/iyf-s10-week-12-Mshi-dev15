// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';

export default function Profile() {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If viewing own profile, use current user data
        if (id === currentUser?._id || !id) {
            setProfileUser(currentUser);
            fetchUserPosts(currentUser?._id);
        } else {
            // TODO: Fetch other user's profile from API
            // For now, just show loading
            setLoading(false);
        }
    }, [id, currentUser]);

    const fetchUserPosts = async (userId) => {
        if (!userId) return;
        try {
            const res = await postsAPI.getAll();
            // Filter posts by this user
            const posts = res.data.filter(post => post.author._id === userId);
            setUserPosts(posts);
        } catch (err) {
            console.error('Failed to fetch user posts:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (!profileUser) return <p>User not found</p>;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="avatar">
                    {profileUser.name?.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                    <h2>{profileUser.name}</h2>
                    <p>{profileUser.email}</p>
                    {profileUser.bio && <p className="bio">{profileUser.bio}</p>}
                </div>
            </div>

            <div className="profile-posts">
                <h3>My Posts ({userPosts.length})</h3>
                {userPosts.length === 0 ? (
                    <p className="empty">No posts yet. Start sharing! 🚀</p>
                ) : (
                    userPosts.map(post => (
                        <article key={post._id} className="post-card">
                            
                              {/* ✅ ADD THIS: Show image if exists */}
                                     {post.image && (
                                    <div className="mb-3 rounded-lg overflow-hidden">
                                        <img 
                                             src={post.image} 
                                                 alt="Post" 
                                                className="w-full max-h-96 object-contain rounded-lg"
                                                />
                                            </div>
        )                                   }
                            
                            <p>{post.content}</p>
                            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                            <div className="post-stats">
                                <span>❤️ {post.likes?.length || 0}</span>
                                <span>💬 {post.comments?.length || 0}</span>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}