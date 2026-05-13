import { useEffect, useState } from 'react';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await postsAPI.getAll();
            setPosts(res.data);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <CreatePost onPostCreated={handlePostCreated} />
            
            {loading ? (
                <div className="text-center py-8 text-light-secondary dark:text-dark-secondary">Loading feed...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-8 text-light-secondary dark:text-dark-secondary bg-dark-secondary rounded-xl">
                    No posts yet. Be the first to share! 🚀
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <PostCard key={post._id} post={post} currentUser={user} />
                    ))}
                </div>
            )}
        </div>
    );
}