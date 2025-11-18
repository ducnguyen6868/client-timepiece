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
        <div className="w-full h-max bg-gray-50 py-4 px-12">
            {/* collection Banner */}
            <div className='relative overflow-hidden w-full mb-4 rounded-2xl'>
                <img
                    src={`http://localhost:5000${collection.banner}` || "https://placehold.co/1200x400/e2e8f0/64748b?text=Collection+Banner"}
                    alt={collection.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/1200x400/e2e8f0/64748b?text=Collection+Banner";
                    }}
                    loading='lazy'
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 z-8 w-full bg-black opacity-30 ">
                </div>
                {/* collection Info Section */}
                <div className="absolute inset-0 z-10 w-full ">
                    <div className="flex items-start space-x-6 p-8 rounded-3xl h-full">
                        {/* collection Logo */}
                        {collection.logo && (
                            <div className="flex-shrink-0">
                                <img
                                    src={collection.logo}
                                    alt={`${collection.name} logo`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/120x120/e2e8f0/64748b?text=Logo";
                                    }}
                                    className="w-32 h-32 object-contain rounded-lg border-2 border-gray-200 bg-white p-2"
                                />
                            </div>
                        )}

                        {/* collection Details */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-3">{collection.name}</h1>

                            {collection.description && (
                                <p className="text-white max-w-[800px] mb-4 leading-relaxed line-clamp-4">{collection.description}</p>
                            )}

                            <div className="flex flex-row gap-4 mt-6">
                                {collection.founding_year && (
                                    <div className="bg-gray-50 rounded-lg px-4 py-2">
                                        <span className="text-xs text-gray-500 uppercase">Founded : </span>
                                        <span className="text-lg font-semibold text-gray-900">{collection.founding_year}</span>
                                    </div>
                                )}

                                {collection.headequaters && (
                                    <div className="bg-gray-50 rounded-lg px-4 py-2">
                                        <p className="text-xs text-gray-500 uppercase mb-1">Headquarters</p>
                                        <p className="text-lg font-semibold text-gray-900">{collection.headequaters}</p>
                                    </div>
                                )}

                                {collection.website && (
                                    <div className="bg-gray-50 rounded-lg px-4 py-2  ">
                                        <span className="text-xs text-gray-500 uppercase">Website : </span>
                                        <a
                                            href={collection.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-teal-600 hover:text-teal-700 transition truncate"
                                        >
                                            {collection.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-4 gap-4'>

                {products && (
                    products?.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}