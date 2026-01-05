import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Edit2, Trash2, Filter, ChevronDown,
    ChevronUp, Package, DollarSign, TrendingUp, AlertCircle , ShieldCheck ,ShieldX ,Zap
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import watchApi from '../../api/watchApi';
import Notification from '../../components/common/Notification';
import LoadingAnimations from '../../components/common/LoadingAnimations';
import AdminLogin from './AdminLogin';

export default function WatchManagement() {

    const [loading, setLoading] = useState(true);
    const [adminLogged , setAdminLogged] = useState(true);

    const [watches, setWatches] = useState([]);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const [filteredWatches, setFilteredWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [expandedRows, setExpandedRows] = useState(new Set());

    const [filters, setFilters] = useState({
        brand: '',
        category: '',
        status: 'all',
        priceMin: '',
        priceMax: '',
        movement: ''
    });

    useEffect(() => {
        const getWatches = async () => {
            try {
                const response = await watchApi.getWatches(1, 30);
                setWatches(response.watches);
            } catch (err) {
                setAdminLogged(false);
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getWatches();
    }, []);

    useEffect(() => {
        let result = watches;

        if (searchTerm) {
            result = result.filter(w =>
                w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                w.brand?.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters.brand) {
            result = result.filter(w => w.brand?.name === filters.brand);
        }
        if (filters.category) {
            result = result.filter(w => w.category?.name === filters.category);
        }
        if (filters.status !== 'all') {
            result = result.filter(w => w.isActive === (filters.status === 'active'));
        }
        if (filters.movement) {
            result = result.filter(w => w.specs?.movement === filters.movement);
        }
        if (filters.priceMin) {
            result = result.filter(w =>
                w.variations.some(v => v.currentPrice >= Number(filters.priceMin))
            );
        }
        if (filters.priceMax) {
            result = result.filter(w =>
                w.variations.some(v => v.currentPrice <= Number(filters.priceMax))
            );
        }

        setFilteredWatches(result);
    }, [searchTerm, filters, watches]);

    const toggleRow = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this watch?')) {
            setWatches(watches.filter(w => w._id !== id));
        }
    };

    const stats = {
        total: watches.length,
        active: watches.filter(w => w.isActive).length,
        totalValue: watches.reduce((sum, w) =>
            sum + w.variations.reduce((s, v) => s + (v.currentPrice * v.stock), 0), 0
        ),
        totalStock: watches.reduce((sum, w) => sum + w.totalStock, 0)
    };

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        );
    };

    if(!adminLogged){
        return(
            <AdminLogin/>
        );
    };
    
    return (
        <>
            <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 md:gap-4">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <Package className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active Products</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Stock</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalStock}</p>
                                </div>
                                <Package className="w-8 h-8 text-purple-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Inventory Value</p>
                                    <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalValue, 'en-US', 'USD')}</p>
                                </div>
                                <DollarSign className="w-8 h-8 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow mb-6 p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search watches by name or brand..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className='flex gap-4' >
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Filter className="w-5 h-5" />
                                    Filters
                                </button>
                                <button
                                    className="w-max px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Watch
                                </button>
                            </div>
                        </div>

                        {showFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div class='flex-1 flex gap-4'>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <select
                                        value={filters.movement}
                                        onChange={(e) => setFilters({ ...filters, movement: e.target.value })}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Movements</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Quartz">Quartz</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 w-full">
                                    <input
                                        type="number"
                                        placeholder="Min Price"
                                        value={filters.priceMin}
                                        onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                                        className="w-full min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Max Price"
                                        value={filters.priceMax}
                                        onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                                        className="w-full min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Watch
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price Range
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 w-max py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredWatches.map((watch) => (
                                        <React.Fragment key={watch._id}>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-2 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => toggleRow(watch._id)}
                                                            className="text-gray-400 hover:text-gray-600"
                                                        >
                                                            {expandedRows.has(watch._id) ? (
                                                                <ChevronUp className="w-5 h-5" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                        <div>
                                                            <img
                                                                src={watch.thumbnail}
                                                                alt={watch.name}
                                                                title={watch.name}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=WATCH";
                                                                }}
                                                                loading='lazy'
                                                                className="w-12 h-12 object-cover rounded-md"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <div className="text-sm flex gap-2">
                                                        {watch.variations.length > 0 && (
                                                            <>
                                                                <p className="font-medium text-gray-900">
                                                                    {formatCurrency(Math.min(...watch.variations.map(v => v.currentPrice)), 'en-US', 'USD')}
                                                                </p>
                                                                {watch.variations.length > 1 && (
                                                                    <p className="text-gray-500">
                                                                        {formatCurrency(Math.max(...watch.variations.map(v => v.currentPrice)), 'en-US', 'USD')}
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <span className={`text-sm font-medium ${watch.totalStock > 10 ? 'text-green-600' :
                                                        watch.totalStock > 0 ? 'text-yellow-600' :
                                                            'text-red-600'
                                                        }`}>
                                                        {watch.totalStock}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <div className="text-sm flex gap-2">
                                                        <p className="font-medium text-gray-900">★ {watch.ratingAverage}</p>
                                                        <p className="text-gray-500">({watch.ratingCount})</p>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <div className="flex gap-1">
                                                        {watch.isActive ? (
                                                            <ShieldCheck title='Active' className='inline-flex items-center 
                                                            justify-center px-2 py-1 rounded-md w-8 h-8  bg-green-100 text-green-800'/>
                                                        ) : (
                                                            <ShieldX title='InActive' className='inline-flex items-center 
                                                            justify-center px-2 py-1 rounded-md w-8 h-8  bg-gray-100 text-gray-800'/>
                                                        )}
                                   
                                                        {watch.flashSale && (
                                                            <Zap title='FLASH SALE' className="inline-flex items-center 
                                                            justify-center px-2 py-1 rounded-md w-8 h-8 bg-red-100 text-red-800"/>
                                                                
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(watch._id)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedRows.has(watch._id) && (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-4 bg-gray-50">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                                                    <div>
                                                                        <span className="text-gray-500">Origin:</span>
                                                                        <span className="ml-2 text-gray-900">{watch.origin}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500">Movement:</span>
                                                                        <span className="ml-2 text-gray-900">{watch.specs?.movement}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500">Water Resistance:</span>
                                                                        <span className="ml-2 text-gray-900">{watch.specs?.waterResistance}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500">Diameter:</span>
                                                                        <span className="ml-2 text-gray-900">{watch.specs?.caseDiameter}mm</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500">Glass:</span>
                                                                        <span className="ml-2 text-gray-900">{watch.specs?.glass}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {watch.variations.length > 0 && (
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900 mb-2">Variations</h4>
                                                                    <div className="space-y-2">
                                                                        {watch.variations.map((v, idx) => (
                                                                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                                                                                <div className="flex items-center gap-4">
                                                                                    <span className="text-sm font-medium text-gray-900">{v.sku}</span>
                                                                                    <span className="text-sm text-gray-600">{v.material} - {v.strapType} - {v.color}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-6">
                                                                                    <div className="text-sm">
                                                                                        <span className="text-gray-500">Price:</span>
                                                                                        <span className="ml-2 font-medium text-gray-900">{formatCurrency(v.currentPrice, 'en-US', 'USD')}</span>
                                                                                    </div>
                                                                                    <div className="text-sm">
                                                                                        <span className="text-gray-500">Stock:</span>
                                                                                        <span className="ml-2 font-medium text-gray-900">{v.stock}</span>
                                                                                    </div>
                                                                                    <div className="text-sm">
                                                                                        <span className="text-gray-500">Sold:</span>
                                                                                        <span className="ml-2 font-medium text-gray-900">{v.sold}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredWatches.length === 0 && (
                            <div className="text-center py-12">
                                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No watches found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}