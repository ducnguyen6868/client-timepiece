import { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import brandApi from '../api/brandApi';
import WatchCard from '../components/common/WatchCard';
import LoadingAnimations from '../components/common/LoadingAnimations';
import Notification from '../components/common/Notification';
import { Globe, Calendar, MapPin } from 'lucide-react';

// Main Brand Page Component
export default function BrandPage() {

    const { slug } = useParams();
    const [brand, setBrand] = useState({});
    const [watches, setWatches] = useState([]);

    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!slug) return;
        const getBrand = async () => {
            try {
                const response = await brandApi.getBrand(slug);
                setBrand(response.brand);
                setWatches(response.watches);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getBrand();
    }, [slug]);

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        );
    }

    return (
        <>
            <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            <div className="w-full h-max bg-gray-50 p-4 md:px-8">
                {/* Banner */}
                <div className="">
                    <img
                        src={brand.banner}
                        alt={brand.name}
                        title={brand.name}
                        loading='lazy'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/300x300/e2e8f0/64748b?text=${brand.name}`;
                        }}
                        className="w-full h-full max-h-60 object-cover rounded-xl relative z-0"
                    />
                    {/* Logo and Brand Name */}
                    <div className="p-4 md:p-6 lg:p-8 -mt-12 z-[2] relative">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-end space-x-6">
                                <div className="p-1 rounded-lg bg-white shadow-xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                                    <img
                                        src={brand.logo}
                                        alt={`${brand.name} logo`}
                                        loading='lazy'
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/300x300/e2e8f0/64748b?text=${brand.name}`;
                                        }}
                                        className="w-full h-auto object-cover rounded-lg"
                                    />
                                </div>
                                <div className="pb-2">
                                    <h1 className="text-4xl font-bold text-black mb-2">{brand.name}</h1>
                                    <div className="flex items-center space-x-4 text-black/90">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span className="text-sm">Est. {brand.founding_year}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{brand.headquarters}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    {/* About Section */}
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-8 md:mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About {brand.name}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-justify indent-5 md:indent-8 lg:inset-10">{brand.description}</p>

                        <div className="border-t pt-6">
                            <Link
                                to={brand.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
                            >
                                <Globe className="w-5 h-5 mr-2" />
                                Visit Official Website
                            </Link>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="rounded-lg shadow-sm md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                            <button className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">
                                View All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {watches?.length > 0 ? (
                                watches?.map((watch, index) => (
                                    <WatchCard key={index} watch={watch} />
                                ))
                            ) : (
                                <p>No watch found...</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}