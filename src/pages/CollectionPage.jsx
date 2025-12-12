import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import collectionApi from '../api/collectionApi';
import WatchCard from '../components/common/WatchCard';
import LoadingAnimations from '../components/common/LoadingAnimations';
import Notification from '../components/common/Notification';


// Main collection Page Component
export default function CollectionPage() {

    const { slug } = useParams();
    const [collection, setCollection] = useState({});
    const [watches, setWatches] = useState([]);

    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!slug) return;
        const getCollection = async () => {
            try {
                const response = await collectionApi.getCollection(slug);
                setCollection(response.collection);
                setWatches(response.watches);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getCollection();
    }, [slug]);

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        );
    }

    return (
        <>
            <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-3 md:p-4">
                {/* Collection Banner */}
                <div className="">
                    <img
                        src={collection.banner}
                        alt={collection.name}
                        loading='lazy'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/300x300/e2e8f0/64748b?text=${collection.name}`;
                        }}
                        className="w-full h-full object-cover rounded-xl relative z-0"
                    />
                    {/* Logo and collection Name */}
                    <div className="p-8 -mt-12 z-10 relative">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-end space-x-6">
                                <div className="p-1 rounded-lg bg-white shadow-xl">
                                    <img
                                        src={collection.thumbnail}
                                        alt={`${collection.name}`}
                                        loading='lazy'
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/300x300/e2e8f0/64748b?text=Collection`;
                                        }}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="pb-2">
                                    <h1 className="text-4xl font-bold text-black mb-2">{collection.name}</h1>
                                    <h3 className="text-black/80">{collection.description}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Watches Grid */}

                {watches?.length > 0 ? (
                    <div className='grid grid-cols-2
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5'>
                        {
                            watches.map((watch, index) => (
                                <WatchCard key={watch._id || index} watch={watch} />
                            ))
                        }
                    </div>
                ) : (
                    <p>No watch found...</p>
                )}

            </div>
        </>
    );
};

