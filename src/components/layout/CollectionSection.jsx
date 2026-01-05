import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight , ChevronLeft, ChevronRight } from 'lucide-react';
import collectionApi from '../../api/collectionApi';

const CollectionSection = () => {
    const [collections, setCollections] = useState([]);

    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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


    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <section className="relative mb-1 sm:py-3 md:py-4 bg-gray-50 h-28 md:h-52 lg:h-80 mx-4 mt-2 md:mt-4 overflow-hidden">
            {collections.map((collection, index) => (
                    <div
                        key={collection._id}
                        className={`
                    absolute inset-0 transition-all duration-700 ease-in-out rounded-lg overflow-hidden
                    ${index === currentIndex
                                ? "opacity-100 translate-x-0 z-0"
                                : index < currentIndex
                                    ? "opacity-0 -translate-x-full z-0"
                                    : "opacity-0 translate-x-full z-0"
                            }
                `}
                    >
                        <img
                            src={collection.banner}
                            alt={collection.name}
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/800x400/00bcd4/ffffff?text=FEATURED+COLLECTION";
                            }}
                            className="absolute inset-0 w-full h-full object-cover "
                        />
                        {/* Overlay Gradient dày hơn để nổi bật chữ trên nền thấp */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                <div className="max-w-xl space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-left-5 duration-700">

                                    {/* Badge - Nhỏ gọn hơn */}
                                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-xs font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                        BST 2025
                                    </div>

                                    {/* Title - Cỡ chữ tùy chỉnh theo màn hình (Fluid Typography) */}
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                                    {collection.name}
                                    </h1>

                                    {/* Description - Giới hạn dòng để không bị tràn chiều cao */}
                                    <p className="text-sm sm:text-base text-gray-300 max-w-md leading-relaxed line-clamp-2 sm:line-clamp-none">
                                        {collection.description}
                                    </p>

                                    {/* Buttons - Thu nhỏ kích thước button */}
                                    <div className="flex gap-3 pt-2">
                                        <Link  to={`/collection/${collection.slug}`}  className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-lg active:scale-95">
                                            Mua Ngay <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            ))}

            {/* Indicators */}
            {collections.length > 1 && (
                <div className="absolute bottom-0.5 sm:bottom-1 md:bottom-2 w-full flex justify-center items-center space-x-2 z-0">
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

            {/* Arrows */}
            {collections.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="hidden md:block
                    absolute left-1 xs:left-2 sm:left-3 md:left-4 lg:left-6
                    top-1/2 -translate-y-1/2
                    bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white
                    p-0.5 xs:p-1 sm:p-1.5 md:p-2 rounded-full
                    shadow-lg hover:shadow-xl
                    group z-0 transition-all
                "
                    >
                        <ChevronLeft className="w-3 h-3 xs:w-4 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="hidden md:block
                    absolute right-1 xs:right-2 sm:right-3 md:right-4 lg:right-6
                    top-1/2 -translate-y-1/2
                    bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white
                    p-0.5 xs:p-1 sm:p-1.5 md:p-2 rounded-full
                    shadow-lg hover:shadow-xl
                    group z-0 transition-all
                "
                    >
                        <ChevronRight className="w-3 h-3 xs:w-4 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </>
            )}
        </section>
    );
};

export default CollectionSection;