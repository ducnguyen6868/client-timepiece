import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({itemDelete, onConfirm ,onClose}) {

    const confirmDelete = () => {
        onConfirm?.();
    };

    const cancelDelete = () => {
        onClose?.();
    };

    return (
        <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
        >
            {/* Modal */}
            <div
             className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-[scale-in_0.2s_ease-out]"
             onClick={(e)=>e.stopPropagation()}
             >
                {/* Close button */}
                <button
                    onClick={cancelDelete}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="text-red-600" size={32} />
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
                    Confirm Deletion
                </h2>
                <p className="text-slate-600 text-center mb-6">
                    Are you sure you want to delete <span className="font-semibold text-slate-800">"{itemDelete}"</span>?.
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={cancelDelete}
                        className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}