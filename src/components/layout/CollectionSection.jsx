import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShoppingCart, Star, TrendingUp, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import collectionApi from '../../api/collectionApi';


// Main Collection Section Component
const CollectionSection = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const navigate = useNavigate();

    // Auto-play slider
    useEffect(() => {
        if (!isAutoPlaying || collections.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % collections.length;
                return nextIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, collections]);

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % collections.length;
        setCurrentIndex(nextIndex);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + collections.length) % collections.length;
        setCurrentIndex(prevIndex);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    useEffect(() => {
        const getCollections = async () => {
            try {
                const response = await collectionApi.getCollections();
                setCollections(response.collections);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getCollections();
    }, []);

    const handleCollection = (slug) => {
        navigate(`/collection/${slug}`);
    }
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <section className="relative py-4 px-4 bg-gray-50 w-full">
            {/* Slides Container - relative with fixed height */}
            <div className="relative max-h-80 h-72 overflow-hidden rounded-2xl">
                {collections.map((collection, index) => (
                    <div
                        key={collection._id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                            ? 'opacity-100 translate-x-0 z-10'
                            : index < currentIndex
                                ? 'opacity-0 -translate-x-full z-0'
                                : 'opacity-0 translate-x-full z-0'
                            }`}
                    >
                        <div className="bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 rounded-2xl text-white relative overflow-hidden w-full h-full">
                            {/* Background Image */}
                            <img
                                src={`http://localhost:5000${collection.banner}`}
                                alt={collection.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/300x300/00bcd4/ffffff?text=FEATURED+COLLECTION";
                                }}
                                loading='lazy'
                                className="absolute inset-0 w-full h-full object-cover opacity-30"
                            />
                            {/* Content */}
                            <div className="absolute z-10 inset-0 py-4 px-16 flex flex-col gap-2 justify-center w-full overflow-hidden">
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="w-6 h-6 text-brand" />
                                    <span className="text-brand font-semibold text-lg">FEATURED COLLECTION</span>
                                </div>

                                <h2 className="text-xl md:text-5xl font-bold">{collection.name}</h2>
                                <p className="text-gray-300 text-base mb-6 max-w-xl">{collection.description}</p>

                                <div className="flex items-center space-x-4 mb-2">
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold text-base">Premium Quality</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="w-5 h-5 text-teal-400" />
                                        <span className="font-semibold text-base">{collection.products?.length || 0} Products</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button className="bg-brand text-white px-8 py-2 
                                    rounded-full font-bold hover:bg-brand-hover hover:text-white
                                    transition-all flex items-center justify-center space-x-2"
                                    onClick={() => handleCollection(collection.slug)}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Shop Now</span>
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows - Only show if multiple collections */}
            {collections.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all z-20 group"
                        aria-label="Previous collection"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all z-20 group"
                        aria-label="Next collection"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                </>
            )}

            {/* Dot Indicators - Only show if multiple collections */}
            {collections.length > 1 && (
                <div className="absolute bottom-4 z-40 pb-4 
                    w-full flex justify-center items-center space-x-3 mt-6">
                    {collections.map((collection, index) => (
                        <button
                            key={collection._id}
                            onClick={() => goToSlide(index)}
                            className="group relative"
                            aria-label={`Go to ${collection.name}`}
                        >
                            <div
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'w-8 h-2 bg-teal-600'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-teal-400'
                                    }`}
                            />
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                                {collection.name}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CollectionSection;