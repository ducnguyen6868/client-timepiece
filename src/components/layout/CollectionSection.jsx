import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShoppingCart, Star, TrendingUp, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import collectionApi from '../../api/collectionApi';

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
            setCurrentIndex((prev) => (prev + 1) % collections.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, collections]);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % collections.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + collections.length) % collections.length);
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
        <section className="relative py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 bg-gray-50 w-full">
            <div
                className="
            relative mx-auto
            overflow-hidden
            rounded-xl shadow-xl

            h-[140px]
            xs:h-[165px]
            sm:h-[190px]
            md:h-[220px]
            lg:h-[250px]
            xl:h-[280px]
        "
            >
                {collections.map((collection, index) => (
                    <div
                        key={collection._id}
                        className={`
                    absolute inset-0 transition-all duration-700 ease-in-out
                    ${index === currentIndex
                                ? "opacity-100 translate-x-0 z-10"
                                : index < currentIndex
                                    ? "opacity-0 -translate-x-full z-0"
                                    : "opacity-0 translate-x-full z-0"
                            }
                `}
                    >
                        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 rounded-xl text-white overflow-hidden">
                            <img
                                src={`${process.env.REACT_APP_API_URL}` + `/${collection.banner}`}
                                alt={collection.name}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/800x400/00bcd4/ffffff?text=FEATURED+COLLECTION";
                                }}
                                className="absolute inset-0 w-full h-full object-cover opacity-30"
                            />

                            <div
                                className="
                            absolute inset-0 z-10 w-full
                            px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                            py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8
                            flex flex-col justify-center gap-2
                        "
                            >
                                {/* Featured Label */}
                                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                                    <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-teal-400" />
                                    <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide text-teal-400">
                                        Featured Collection
                                    </span>
                                </div>

                                {/* Title */}
                                <h2
                                    className="
                                font-bold leading-tight mb-1 sm:mb-2
                                text-[10px] xs:text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                                line-clamp-1 sm:line-clamp-2
                            "
                                >
                                    {collection.name}
                                </h2>

                                {/* Description */}
                                <p
                                    className="
                                hidden md:block leading-relaxed
                                md:max-w-lg lg:max-w-xl
                                line-clamp-2 md:line-clamp-3
                                mb-2 sm:mb-3 md:mb-4
                            "
                                >
                                    {collection.description}
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                                    <div className="flex items-center space-x-1 text-[9px] xs:text-[10px] sm:text-xs md:text-sm">
                                        <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold">Premium</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-[9px] xs:text-[10px] sm:text-xs md:text-sm">
                                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-400" />
                                        <span className="font-semibold">{collection.products?.length || 0} Products</span>
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    className=" w-max
                                bg-brand hover:to-brand-hover text-white font-bold rounded-full
                                px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10
                                py-1.5 xs:py-2 sm:py-2.5 md:py-3
                                text-[9px] xs:text-xs sm:text-sm
                                transition-all duration-300
                                flex items-center justify-center space-x-2
                                shadow-lg hover:shadow-xl hover:scale-105
                            "
                                    onClick={() => handleCollection(collection.slug)}
                                >
                                    <ShoppingCart className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                                    <span>Shop Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Indicators */}
                {collections.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 w-full flex justify-center items-center space-x-2 z-20">
                        {collections.map((collection, index) => (
                            <button
                                key={collection._id}
                                onClick={() => goToSlide(index)}
                                className="group relative"
                                aria-label={`Go to ${collection.name}`}
                            >
                                <div
                                    className={`
                                transition-all duration-300 rounded-full
                                ${index === currentIndex
                                            ? "w-5 xs:w-6 sm:w-7 md:w-8 h-1.5 bg-teal-600"
                                            : "w-1.5 sm:w-2 h-1.5 bg-white/60 hover:bg-teal-400"
                                        }
                            `}
                                />
                                <div
                                    className="
                                hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2
                                mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded shadow-lg
                                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                            "
                                >
                                    {collection.name}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Arrows */}
            {collections.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="
                    absolute left-1 xs:left-2 sm:left-3 md:left-4 lg:left-6
                    top-1/2 -translate-y-1/2
                    bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white
                    p-1 xs:p-1.5 sm:p-2 md:p-2.5 rounded-full
                    shadow-lg hover:shadow-xl
                    group z-20 transition-all
                "
                    >
                        <ChevronLeft className="w-4 h-4 xs:w-5 sm:w-5 md:w-6 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="
                    absolute right-1 xs:right-2 sm:right-3 md:right-4 lg:right-6
                    top-1/2 -translate-y-1/2
                    bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white
                    p-1 xs:p-1.5 sm:p-2 md:p-2.5 rounded-full
                    shadow-lg hover:shadow-xl
                    group z-20 transition-all
                "
                    >
                        <ChevronRight className="w-4 h-4 xs:w-5 sm:w-5 md:w-6 group-hover:scale-110 transition-transform" />
                    </button>
                </>
            )}
        </section>

    );
};

export default CollectionSection;