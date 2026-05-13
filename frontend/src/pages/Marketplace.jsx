import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // ✅ Added this import
import { postsAPI } from '../services/api';

export default function Marketplace() { // ✅ Removed { currentUser } prop
    const { user } = useAuth(); // ✅ Get user from context
    const [products, setProducts] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: 'clothing'
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await postsAPI.getAll();
                const marketplaceItems = res.data?.filter(post => 
                    post.isMarketplace || post.category === 'marketplace'
                ) || [];
                setProducts(marketplaceItems);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };
        fetchProducts();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!user) { // ✅ Changed from currentUser to user
            alert('Please login to sell items');
            return;
        }
        
        try {
            const res = await postsAPI.create({
                content: formData.description,
                image: formData.image,
                feeling: formData.title,
                visibility: 'public',
                isMarketplace: true,
                category: 'marketplace',
                price: formData.price,
                seller: user._id // ✅ Changed from currentUser._id to user._id
            });
            
            if (res.data) {
                setProducts([res.data, ...products]);
                setShowUpload(false);
                setFormData({ title: '', price: '', description: '', image: '', category: 'clothing' });
                alert('Product listed successfully! 🎉');
            }
        } catch (err) {
            console.error('Failed to list product:', err);
            alert('Could not list product. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-dark-primary pb-20">
            {/* Header */}
            <div className="sticky top-14 z-10 bg-dark-secondary/95 backdrop-blur border-b border-dark-tertiary px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-light-primary">🏪 Marketplace</h1>
                    {user && ( // ✅ Changed from currentUser to user
                        <button 
                            onClick={() => setShowUpload(true)}
                            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                        >
                            + Sell Item
                        </button>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-dark-secondary rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-light-primary">List a Product</h2>
                            <button 
                                onClick={() => setShowUpload(false)}
                                className="text-light-secondary hover:text-light-primary"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpload} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Title *"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full p-3 bg-dark-tertiary rounded-lg text-light-primary outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price ($) *"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className="w-full p-3 bg-dark-tertiary rounded-lg text-light-primary outline-none focus:ring-2 focus:ring-primary"
                                required
                                min="0"
                                step="0.01"
                            />
                            <textarea
                                placeholder="Description *"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full p-3 bg-dark-tertiary rounded-lg text-light-primary outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                                required
                            />
                            <input
                                type="url"
                                placeholder="Image URL *"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full p-3 bg-dark-tertiary rounded-lg text-light-primary outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full p-3 bg-dark-tertiary rounded-lg text-light-primary outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="clothing">👕 Clothing</option>
                                <option value="shoes">👟 Shoes</option>
                                <option value="accessories">👜 Accessories</option>
                                <option value="electronics">📱 Electronics</option>
                                <option value="other">📦 Other</option>
                            </select>
                            <button 
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                            >
                                List Product 🚀
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="p-4">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛍️</div>
                        <h3 className="text-lg font-semibold text-light-primary mb-2">No products yet</h3>
                        <p className="text-light-secondary mb-4">Be the first to list an item!</p>
                        {user && ( // ✅ Changed from currentUser to user
                            <button 
                                onClick={() => setShowUpload(true)}
                                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                                + List Your First Item
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div 
                                key={product._id}
                                className="bg-dark-secondary rounded-2xl overflow-hidden border border-dark-tertiary hover:border-primary/50 transition-all group"
                            >
                                <div className="relative aspect-[3/4] bg-dark-tertiary">
                                    <img 
                                        src={product.image || 'https://via.placeholder.com/400x600?text=No+Image'} 
                                        alt={product.feeling || 'Product'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full font-bold text-sm">
                                        ${product.price || '0.00'}
                                    </div>
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                            {product.author?.name?.charAt(0).toUpperCase() || 'S'}
                                        </div>
                                        <span className="text-white text-sm font-medium drop-shadow-lg">
                                            {product.author?.name || 'Seller'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-light-primary text-lg mb-1">
                                        {product.feeling || 'Untitled Product'}
                                    </h3>
                                    <p className="text-light-secondary text-sm mb-3 line-clamp-2">
                                        {product.content || 'No description'}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-light-secondary">
                                        <span className="flex items-center gap-1">
                                            ❤️ {product.likes?.length || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            💬 {product.comments?.length || 0} reviews
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button className="flex-1 bg-primary/20 text-primary py-2 rounded-lg font-medium hover:bg-primary/30 transition-colors">
                                            💬 Ask Question
                                        </button>
                                        <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                                            🛒 Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}