import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Reels() {
    const { user } = useAuth();
    const [reels, setReels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        setReels([
            {
                _id: '1',
                author: { name: 'John Doe', avatar: '' },
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                caption: 'My first reel! 🎉 #viral #trending',
                likes: 1240,
                comments: 45,
                shares: 12
            },
            {
                _id: '2',
                author: { name: 'Jane Smith', avatar: '' },
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                caption: 'Having fun! 🎬 #fun #life',
                likes: 856,
                comments: 23,
                shares: 8
            },
            {
                _id: '3',
                author: { name: 'Mike Johnson', avatar: '' },
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                caption: 'Check this out! 🔥 #amazing',
                likes: 2341,
                comments: 89,
                shares: 34
            }
        ]);
    }, []);

    const scrollToReel = (index) => {
        if (index >= 0 && index < reels.length && containerRef.current) {
            const container = containerRef.current;
            const reelHeight = container.clientHeight;
            container.scrollTo({
                top: index * reelHeight,
                behavior: 'smooth'
            });
            setCurrentIndex(index);
        }
    };

    const handleNext = () => {
        if (currentIndex < reels.length - 1) {
            scrollToReel(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            scrollToReel(currentIndex - 1);
        }
    };

    const handleScroll = (e) => {
        const container = e.target;
        const scrollTop = container.scrollTop;
        const reelHeight = container.clientHeight;
        const newIndex = Math.round(scrollTop / reelHeight);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div className="fixed inset-0 top-14 bg-black z-40 flex items-center justify-center">
            {/* External Navigation - Far Right */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white transition-all ${
                        currentIndex === 0 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-white/20 cursor-pointer'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                
                <button
                    onClick={handleNext}
                    disabled={currentIndex === reels.length - 1}
                    className={`w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white transition-all ${
                        currentIndex === reels.length - 1 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-white/20 cursor-pointer'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Reels Container - Hidden scrollbar */}
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="h-[calc(100vh-3.5rem)] w-full max-w-md overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
            >
                {reels.map((reel, index) => (
                    // ✅ FIX: Use h-full to match container, then flex center the card
                    <div 
                        key={reel._id} 
                        className="h-full w-full snap-start relative flex items-center justify-center p-4"
                    >
                        {/* Reel Card with Rounded Corners */}
                        <div className="relative w-full max-w-md h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
                            <video
                                src={reel.videoUrl}
                                className="absolute inset-0 w-full h-full object-cover"
                                loop
                                autoPlay={index === currentIndex}
                                muted
                                playsInline
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                            {/* Right Side Actions */}
                            <div className="absolute right-3 bottom-24 flex flex-col gap-3 z-10">
                                <button className="flex flex-col items-center gap-1 text-white">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <span className="text-xl">❤️</span>
                                    </div>
                                    <span className="text-xs font-semibold drop-shadow-lg">{reel.likes}</span>
                                </button>
                                
                                <button className="flex flex-col items-center gap-1 text-white">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <span className="text-xl">💬</span>
                                    </div>
                                    <span className="text-xs font-semibold drop-shadow-lg">{reel.comments}</span>
                                </button>
                                
                                <button className="flex flex-col items-center gap-1 text-white">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <span className="text-xl">↗️</span>
                                    </div>
                                    <span className="text-xs font-semibold drop-shadow-lg">{reel.shares}</span>
                                </button>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute left-4 bottom-4 right-16 z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-white">
                                        {reel.author.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm drop-shadow-lg">@{reel.author.name.replace(' ', '').toLowerCase()}</div>
                                        <div className="text-white/80 text-xs">2 hours ago</div>
                                    </div>
                                </div>
                                <p className="text-white text-sm mb-2 drop-shadow-lg leading-relaxed">
                                    {reel.caption}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}