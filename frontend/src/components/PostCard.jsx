import { useState } from 'react';
import { postsAPI, commentsAPI } from '../services/api';

export default function PostCard({ post, currentUser }) {
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    const isAuthor = currentUser?._id === post.author?._id;
    const isLiked = post.likes?.includes(currentUser?._id);

    const handleLike = async () => {
        try {
            const res = await postsAPI.like(post._id);
            // Update UI optimistically
        } catch (err) {
            console.error('Failed to like post:', err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this post?')) return;
        try {
            await postsAPI.delete(post._id);
        } catch (err) {
            console.error('Failed to delete post:', err);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        try {
            const res = await commentsAPI.create(post._id, { content: comment });
            setComment('');
        } catch (err) {
            console.error('Failed to add comment:', err);
        }
    };

    return (
        <article className="bg-dark-secondary rounded-xl p-4 mb-4 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {post.author?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <div className="font-semibold text-light-primary text-sm">
                            {post.author?.name || 'Unknown User'}
                        </div>
                        <div className="text-light-secondary text-xs">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                {isAuthor && (
                    <button 
                        onClick={handleDelete}
                        className="text-light-secondary hover:text-red-500 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Content */}
            {post.feeling && (
                <div className="text-light-secondary text-sm mb-2">
                    Feeling: {post.feeling}
                </div>
            )}
            
            {post.content && (
                <p className="text-light-primary mb-3 leading-relaxed">
                    {post.content}
                </p>
            )}

            {/* Image - Changed to object-contain */}
            {post.image && (
            <div className="mb-3 rounded-lg overflow-hidden bg-dark-tertiary">
                        <img 
                            src={post.image} 
                                alt="Post content" 
                        className="w-full max-h-[600px] object-contain"
                        />
                    </div>
                    )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-dark-tertiary">
                <div className="flex gap-6">
                    <button 
                        onClick={handleLike}
                        className={`flex items-center gap-2 transition-colors ${
                            isLiked ? 'text-red-500' : 'text-light-secondary hover:text-red-500'
                        }`}
                    >
                        <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-medium">{post.likes?.length || 0}</span>
                    </button>
                    
                    <button 
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 text-light-secondary hover:text-primary transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm font-medium">{post.comments?.length || 0}</span>
                    </button>
                </div>
                
                <button className="text-light-secondary hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-3 pt-3 border-t border-dark-tertiary">
                    {post.comments?.map((cmt) => (
                        <div key={cmt._id} className="flex gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                {cmt.author?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="bg-dark-tertiary rounded-2xl px-3 py-2 flex-1">
                                <div className="font-semibold text-light-primary text-sm">
                                    {cmt.author?.name || 'Unknown'}
                                </div>
                                <div className="text-light-primary text-sm">
                                    {cmt.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <form onSubmit={handleAddComment} className="flex gap-2 mt-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 bg-dark-tertiary rounded-full px-4 py-2 text-light-primary text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button 
                            type="submit"
                            disabled={!comment.trim()}
                            className="text-primary font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Post
                        </button>
                    </form>
                </div>
            )}
        </article>
    );
}