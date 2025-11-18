import { useState } from 'react';
import { Edit, Trash2, Eye, Star, Clock, Tag, Zap } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import ComfirmDeleteModal from './ConfirmDeleteModal';
import UpdateStockModal from './UpdateStockModal';
import productApi from '../../api/productApi';


export default function ProductCard2({ product, onChange }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productName, setProductName] = useState();
    const [productId, setProductId] = useState();

    const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
    const [stock, setStock] = useState(0);

    const handleDelete = (product) => {
        setProductName(product.name);
        setProductId(product._id)
        setShowConfirmModal(true);
    }

    const handleConfirmDelete = async () => {
        try {
            await productApi.deleteProduct(productId);
            setShowConfirmModal(false);
            onChange?.();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    }
    const handleChangeStock = (product) => {
        setStock(product.detail[selectedIndex].quantity);
        setProductId(product._id);
        setShowUpdateStockModal(true);
    }

    const handleSubmitStock = async (quantity) => {
        try {
            await productApi.patchStock(productId, selectedIndex, quantity);
            onChange?.();
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        } finally {
            setShowUpdateStockModal(false);
        }
    }

    return (
        <>
            <div className="bg-white p-5 flex flex-col rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-cardSlideInUp">
                {/* Product Header */}
                <div className="border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-full mb-2">
                                {product.code}
                            </span>
                            <h3 className="font-bold line-clamp-1 text-gray-900 text-lg mb-1 translate-x-8 animate-fadeInUp">{product.name}</h3>
                            <p className="text-sm text-gray-500 translate-x-8 animate-fadeInDown">{product.brand?.name}</p>
                        </div>
                        {product.flashSale && (
                            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-lg shadow-lg" title='Flash Sale'>
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm mb-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold text-gray-900">{product.ratings.toFixed(2)}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{product.reviews} reviews</span>
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                    {/* Color Selection and Price */}
                    <div className="space-y-3">
                        {/* Selected Color with Price */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                            <div >
                                <img className='w-10 rounded' src={`http://localhost:5000/${product.images[selectedIndex]}`}
                                    alt={product?.name} title={product?.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                                    }}
                                    loading='lazy'

                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                                    style={{ backgroundColor: product.detail[selectedIndex]?.colorCode }}
                                ></div>
                                <span className="text-sm font-semibold text-gray-800">
                                    {product.detail[selectedIndex]?.color}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-cyan-600">
                                    {formatCurrency(product.detail[selectedIndex]?.currentPrice, 'en-US', 'USD')}
                                </div>
                                <div className="text-xs text-gray-500 line-through">
                                    {formatCurrency(product.detail[selectedIndex]?.originalPrice, 'en-US', 'USD')}
                                </div>
                            </div>
                        </div>

                        {/* Color Options */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 font-medium">Colors:</span>
                            <div className="flex gap-2">
                                {product.detail?.map((detail, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedIndex(idx)}
                                        className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${selectedIndex === idx
                                            ? 'border-cyan-500 ring-2 ring-cyan-200'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: detail.colorCode }}
                                        title={detail.color}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stock Info */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-200 rounded-lg animate-cardSlideInUp">
                            <div className="text-xs text-green-600 font-medium mb-1">In Stock</div>
                            <div className="flex gap-4 items-center text-xl font-bold text-green-700"
                                onClick={() => handleChangeStock(product)}
                            >
                                {product.detail[selectedIndex]?.quantity}
                                <Edit className="w-4 h-4 text-gray-600" />
                            </div>
                        </div>
                        <div className="p-3 bg-blue-200 rounded-lg animate-cardSlideInUp">
                            <div className="text-xs text-blue-600 font-medium mb-1">Sold</div>
                            <div className="text-xl font-bold text-blue-700">{product.detail[selectedIndex]?.sold}</div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            <span>{product.category?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(product.createdAt)?.toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>

                </div>
                {/* Footer--->Actions */}
                <div className="flex gap-2 pt-2">
                    <button className="flex-1 flex items-center justify-center
                 gap-2 px-4 py-2.5 border border-cyan-500 text-cyan-600
                 hover:bg-cyan-50 rounded-lg font-medium transition-colors
                  animate-fadeInUp">
                        <Eye className="w-4 h-4" />
                        View
                    </button>
                    <button
                        className="flex items-center justify-center px-4 py-2.5
                     border border-gray-300 text-gray-600 hover:bg-gray-50
                     rounded-lg transition-colors animate-fadeInUp">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        className="flex items-center justify-center px-4 py-2.5
                     border border-red-300 text-red-600 hover:bg-red-50
                    rounded-lg transition-colors animate-fadeInUp"
                        onClick={() => handleDelete(product)}>
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

            </div>
            {
                showConfirmModal &&
                <ComfirmDeleteModal onClose={() => setShowConfirmModal(false)} itemDelete={productName} onConfirm={handleConfirmDelete} />
            }
            {
                showUpdateStockModal &&
                <UpdateStockModal onClose={() => setShowUpdateStockModal(false)} stock={stock} onConfirm={handleSubmitStock} />
            }
        </>
    )
}