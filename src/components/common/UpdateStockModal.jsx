import { useState } from 'react';
import { TrendingUp, TrendingDown, Check, ArrowBigRight } from 'lucide-react';

export default function UpdateStockModal({ stock, onClose, onConfirm }) {
    const [adjustmentType, setAdjustmentType] = useState('add');
    const [quantity, setQuantity] = useState('');

    const closeModal = () => {
        onClose?.();
    };

    const handleSubmit = async () => {
        const newQuantity = adjustmentType === 'add' ? stock + (parseInt(quantity) || 0)
            : Math.max(0, stock - (parseInt(quantity) || 0));
         onConfirm?.(newQuantity);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
        onClick={onClose}
        >
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-[slideUp_0.3s_ease-out]"
            onClick={(e)=>e.stopPropagation()}
            >
                <div className='flex gap-4 flex-row items-center'>
                    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 text-center border border-blue-100">
                        <p className="text-gray-600 text-sm mb-1">Current Stock</p>
                        <p className="text-4xl font-bold text-gray-900">{stock}</p>
                    </div>
                    <ArrowBigRight />
                    <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 text-center border-indigo-200 rounded-xl p-4 mb-6">
                        <p className="text-indigo-700 text-sm mb-1">New Stock Level</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {adjustmentType === 'add'
                                ? stock + (parseInt(quantity) || 0)
                                : Math.max(0, stock - (parseInt(quantity) || 0))
                            }
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setAdjustmentType('add')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${adjustmentType === 'add'
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <TrendingUp size={20} />
                        Add Stock
                    </button>
                    <button
                        onClick={() => setAdjustmentType('remove')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${adjustmentType === 'remove'
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <TrendingDown size={20} />
                        Remove Stock
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                        min="0"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={closeModal}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={()=>handleSubmit()}
                        disabled={!quantity || parseInt(quantity) === 0}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Check size={20} />
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}