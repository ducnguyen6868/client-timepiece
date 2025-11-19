import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import brandApi from '../api/brandApi';
import ProductCard from '../components/common/ProductCard';


// Main Brand Page Component
export default function BrandPage() {

    const { slug } = useParams();
    const [brand, setBrand] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!slug) return;
        const getBrand = async () => {
            try {
                const response = await brandApi.getBrand(slug);
                setBrand(response.brand);
                setProducts(response.products);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getBrand();
    }, [slug]);

    return (
        <div className="w-full h-max bg-gray-50 py-4 px-12">
            {/* Brand Banner */}
            <div className='relative overflow-hidden w-full mb-4 rounded-2xl'>
                <img
                    src={`${API_URL}`+`/${brand.banner}`}
                    alt={brand.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/1200x400/e2e8f0/64748b?text=Brand+Banner";
                    }}
                    loading='lazy'
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 z-8 w-full bg-black opacity-30 ">
                </div>
                {/* Brand Info Section */}
                <div className="absolute inset-0 z-10 w-full ">
                    <div className="flex items-start space-x-6 p-8 rounded-3xl h-full">
                        {/* Brand Logo */}
                        {brand.logo && (
                            <div className="flex-shrink-0">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/120x120/e2e8f0/64748b?text=Logo";
                                    }}
                                    className="w-32 h-32 object-contain rounded-lg border-2 border-gray-200 bg-white p-2"
                                />
                            </div>
                        )}

                        {/* Brand Details */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-3">{brand.name}</h1>

                            {brand.description && (
                                <p className="text-white max-w-[800px] mb-4 leading-relaxed line-clamp-4">{brand.description}</p>
                            )}

                            <div className="flex flex-row gap-4 mt-6">
                                {brand.founding_year && (
                                    <div className="bg-gray-50 rounded-lg px-4 py-2">
                                        <span className="text-xs text-gray-500 uppercase">Founded : </span>
                                        <span className="text-lg font-semibold text-gray-900">{brand.founding_year}</span>
                                    </div>
                                )}

                                {brand.headequaters && (
                                    <div className="bg-gray-50 rounded-lg px-4 py-2">
                                        <p className="text-xs text-gray-500 uppercase mb-1">Headquarters</p>
                                        <p className="text-lg font-semibold text-gray-900">{brand.headequaters}</p>
                                    </div>
                                )}

                                {brand.website && (
                                    <div className="bg-gray-50 rounded-lg px-4 py-2  ">
                                        <span className="text-xs text-gray-500 uppercase">Website : </span>
                                        <a
                                            href={brand.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-teal-600 hover:text-teal-700 transition truncate"
                                        >
                                            {brand.website}
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