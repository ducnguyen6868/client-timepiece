import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import categoryApi from '../api/categoryApi';
import WatchCard from '../components/common/WatchCard';
import Notification from '../components/common/Notification';
import LoadingAnimations from '../components/common/LoadingAnimations';

export default function CategoryPage() {

    const { slug } = useParams();
    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const [sortBy, setSortBy] = useState('featured');
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState();
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        const getWatches = async () => {
            try {
                const response = await categoryApi.getCategory(slug);
                setCategory(response.category);
                setWatches(response.category.watches);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getWatches();
    }, [slug]);
    
    const processedWatches = useMemo(() => {
        if (!Array.isArray(watches)) return [];

        // 1. SPREAD
        let result = [...watches];

        // 2. SEARCH
        if (keyword.trim() !== "") {
            const lower = keyword.toLowerCase();
            result = result.filter(w =>
                (w.name?.toLowerCase() ?? "").includes(lower) ||
                (w.description?.toLowerCase() ?? "").includes(lower)
            );
        }

        // 3. SORT
        const sortMap = {
            "price-low": () =>
                result.sort((a, b) =>
                    (a?.variations[0]?.currentPrice ?? 0) -
                    (b?.variations[0]?.currentPrice ?? 0)
                ),
            "price-high": () =>
                result.sort((a, b) =>
                    (b?.variations[0]?.currentPrice ?? 0) -
                    (a?.variations[0]?.currentPrice ?? 0)
                ),
            "name": () =>
                result.sort((a, b) =>
                    (a?.name ?? "").localeCompare(b?.name ?? "")
                )
        };

        return sortMap[sortBy]?.() || result;

    }, [watches, keyword, sortBy]);

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        );
    }

    return (
        <>
            <Notification show={show} type={type} message={message} onClose={() => { setShow(false) }} />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-48 md:h-52 lg:h-60 overflow-hidden">
                    <div className="absolute inset-0 opacity-95">
                        <img
                            src={category.thumbnail}
                            alt={category.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative px-4 
                        sm:px-6 lg:px-16 h-full flex flex-col justify-center
                        backdrop-blur-sm">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">{category.name}</h1>
                        <p className="text-base md:text-lg lg:text-xl text-cyan-50 max-w-2xl">{category.description}</p>
                        <div className="mt-6 text-cyan-100">
                            <span className="font-semibold">{watches.length}</span> exquisite timepieces available
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 disabled:cursor-not-allowed" disabled={keyword === ''} size={20}  />
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Search watches..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Filter Button */}
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <SlidersHorizontal size={18} />
                                    <span className="hidden sm:inline">Filters</span>
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name">Name A-Z</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {processedWatches.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {processedWatches.map((watch, index) => (
                                <WatchCard key={index} watch={watch} />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center'>
                            <p>No watches have been added to this category yet.</p>
                            <button className='mt-2' >
                                <Link to='/' className='text-white bg-brand px-8 py-2 rounded-lg'>Back</Link>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}