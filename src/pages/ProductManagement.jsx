
import { useState, useEffect } from 'react';
import {
    Plus, Search, Filter, ChevronDown, ChevronLeftCircle, ChevronRightCircle,
} from 'lucide-react';
import ProductCard2 from '../components/common/ProductCard2';
import AddProduct from '../components/layout/AddProduct';
import productApi from '../api/productApi';

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [addModal, setAddModal] = useState(false);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const pages = Math.ceil(total / 3);

    const getProducts = async () => {
        try {
            const limit = 3;
            const response = await productApi.getProducts(page, limit);
            setProducts(response.products);
            setTotal(response.total);
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    }
    useEffect(() => {
        getProducts();
    }, [page]);

    const filteredProducts = products?.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {addModal ? (
                <AddProduct onClose={() => setAddModal(false)} onChange={() => getProducts()} />
            ) : (
                <div className="min-h-screen bg-gray-50">

                    {/* Search and Filter Bar */}
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, code, or brand..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-700">Filter</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>
                            <button onClick={() => setAddModal(true)}
                                className="flex items-center gap-2 bg-gradient-to-r
                        from-cyan-500 to-cyan-600 hover:from-cyan-600 
                        hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-medium
                        shadow-lg hover:shadow-xl transition-all duration-200 animate-fadeInUp">
                                <Plus className="w-5 h-5" />
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="max-w-7xl mx-auto py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((product, index) => (
                                <ProductCard2 key={index} product={product} onChange={() => getProducts()} />
                            ))}
                        </div>
                    </div>
                    <div className='flex gap-2 justify-center p-2'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} >
                            <ChevronLeftCircle />
                        </button>
                        <span>{page}/{pages}</span>
                        <button onClick={() => setPage(page + 1)} disabled={page === pages} >
                            <ChevronRightCircle />
                        </button>
                        <span>({total})</span>
                    </div>

                </div>
            )}
        </>
    );
}