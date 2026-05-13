import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';

export default function CreatePost({ onPostCreated }) {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [feeling, setFeeling] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !image) return;
        
        setLoading(true);
        try {
            // For now, we'll send text only
            // Image upload requires backend storage (Cloudinary/AWS S3)
            const postData = { content, feeling };
            if (image) {
                postData.image = imagePreview; // Base64 for demo
            }
            
            const res = await postsAPI.create(postData);
            onPostCreated(res.data);
            setContent('');
            setFeeling('');
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            console.error('Failed to create post:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark-secondary rounded-xl p-4 mb-4 shadow-lg">
            <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <input
                    type="text"
                    placeholder={`What's on your mind, ${user?.name?.split(' ')[0]}?`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 bg-dark-tertiary rounded-full px-4 py-2 text-light-primary outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

           {imagePreview && (
    <div className="relative mb-3 rounded-lg overflow-hidden w-full">
        <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full max-h-96 object-cover"
        />
        <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-dark-secondary text-white rounded-full p-1 hover:bg-red-500 transition-colors"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
)}
            <div className="border-t border-dark-tertiary pt-3">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2">
                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-dark-tertiary cursor-pointer transition-colors">
                            <span className="text-red-500 text-xl">📹</span>
                            <span className="text-light-primary font-medium text-sm">Live video</span>
                            <input type="file" accept="video/*" className="hidden" />
                        </label>
                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-dark-tertiary cursor-pointer transition-colors">
                            <span className="text-green-500 text-xl">📷</span>
                            <span className="text-light-primary font-medium text-sm">Photo/video</span>
                            <input 
                                type="file" 
                                accept="image/*,video/*" 
                                onChange={handleImageChange}
                                className="hidden" 
                            />
                        </label>
                        <button 
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-dark-tertiary transition-colors"
                            onClick={() => setFeeling(feeling === '' ? 'happy' : '')}
                        >
                            <span className="text-yellow-500 text-xl">😊</span>
                            <span className="text-light-primary font-medium text-sm">Feeling</span>
                        </button>
                    </div>
                    
                    {content && (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Posting...' : 'Post'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}