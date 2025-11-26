import { Link } from 'react-router-dom';
import { SearchX, Search, Home } from 'lucide-react';

export default function WatchNotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-100 rounded-full blur-2xl opacity-60"></div>
                        <SearchX className="w-24 h-24 relative" style={{ color: '#00bcd4' }} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Main Message */}
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Watch Not Found
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    We couldn't find the timepiece you're looking for. It may have been discontinued or the link might be broken.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to='/'
                        className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md"
                        style={{ backgroundColor: '#00bcd4' }}
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <button
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md"
                        style={{ color: '#00bcd4', border: '2px solid #00bcd4' }}
                    >
                        <Search className="w-5 h-5" />
                        Browse Collection
                    </button>
                </div>

                {/* Suggestion */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">Popular Collections</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200">
                            Luxury
                        </span>
                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200">
                            Sport
                        </span>
                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200">
                            Classic
                        </span>
                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200">
                            Smart Watches
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}