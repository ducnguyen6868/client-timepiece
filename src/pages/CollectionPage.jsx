import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import collectionApi from '../api/collectionApi';
import ProductCard from '../components/common/ProductCard';


// Main collection Page Component
export default function CollectionPage() {

    const { slug } = useParams();
    const [collection, setCollection] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!slug) return;
        const getCollection = async () => {
            try {
                const response = await collectionApi.getCollection(slug);
                setCollection(response.collection);
                setProducts(response.products);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getCollection();
    }, [slug]);

    return (
        <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
            {/* Collection Banner */}
            <div className="relative mx-auto h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px] 
                overflow-hidden rounded-lg sm:rounded-xl shadow-xl mb-4 sm:mb-6 md:mb-8"
            >
                {/* Background Image */}
                <img
                    src={`${process.env.REACT_APP_API_URL}/${collection.banner}`}
                    alt={collection.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/1200x400/e2e8f0/64748b?text=Collection+Banner";
                    }}
                    loading='lazy'
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 z-8 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

                {/* Collection Info Section */}
                <div className="absolute inset-0 z-10 flex items-center">
                    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6">
                            {/* Collection Logo - Hidden on very small screens */}
                            {collection.logo && (
                                <div className="flex-shrink-0 hidden xs:block">
                                    <img
                                        src={collection.logo}
                                        alt={`${collection.name} logo`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/120x120/e2e8f0/64748b?text=Logo";
                                        }}
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 
                                            object-contain rounded-lg border-2 border-white/30 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2"
                                    />
                                </div>
                            )}

                            {/* Collection Details */}
                            <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                                {/* Title */}
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                                    font-bold text-white drop-shadow-lg line-clamp-2">
                                    {collection.name}
                                </h1>

                                {/* Description - Hidden on mobile */}
                                {collection.description && (
                                    <p className="hidden sm:block text-xs sm:text-sm md:text-base text-white/90 
                                        max-w-[800px] leading-relaxed line-clamp-2 md:line-clamp-3 drop-shadow">
                                        {collection.description}
                                    </p>
                                )}

                                {/* Info Cards */}
                                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                                    {collection.founding_year && (
                                        <div className="bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg 
                                            px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 shadow-md">
                                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
                                                Founded
                                            </p>
                                            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                                                {collection.founding_year}
                                            </p>
                                        </div>
                                    )}

                                    {collection.headequaters && (
                                        <div className="bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg 
                                            px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 shadow-md">
                                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
                                                Headquarters
                                            </p>
                                            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
                                                {collection.headequaters}
                                            </p>
                                        </div>
                                    )}

                                    {collection.website && (
                                        <div className="hidden md:flex bg-white/95 backdrop-blur-sm rounded-lg 
                                            px-3 md:px-4 py-2 shadow-md items-center gap-2">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-medium mb-0.5">
                                                    Website
                                                </p>
                                                <a
                                                    href={collection.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-base md:text-lg font-bold text-teal-600 hover:text-teal-700 
                                                        transition truncate block max-w-[150px] lg:max-w-[250px]"
                                                >
                                                    {collection.website.replace(/^https?:\/\//i, '')}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Website Link */}
                                {collection.website && (
                                    <div className="md:hidden">
                                        <a
                                            href={collection.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold 
                                                text-white bg-teal-600 hover:bg-teal-700 transition 
                                                px-3 py-1.5 rounded-full shadow-lg"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span>Visit Website</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                gap-2 sm:gap-3 md:gap-4 lg:gap-5'>
                {products && products.map((product, index) => (
                    <ProductCard key={product._id || index} product={product} />
                ))}
            </div>
        </div>
    );
};

 