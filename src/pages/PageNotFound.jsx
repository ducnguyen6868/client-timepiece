import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="max-w-3xl w-full relative z-10">
                <div className="text-center space-y-8">
                    {/* Icon and 404 */}

                    <h1 className="text-8xl md:text-9xl font-black mb-4" >
                        404
                    </h1>

                    {/* Message */}
                    <div className="space-y-4">
                        <div className='flex gap-4 justify-center items-center'>
                        <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-gray-900" strokeWidth={1.5} />
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                            Oops! Page Not Found
                        </h2>
                        </div>
                        <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
                            The page you're looking for seems to have vanished into the digital void. Let's get you back on track.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button
                            onClick={() => window.history.back()}
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-gray-50 border-2 border-gray-200 shadow-md hover:shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Go Back
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: '#00bcd4' }}
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <Home className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" />
                            <span className="relative z-10">Back to Home</span>
                        </button>
                    </div>

                    {/* Error Code */}
                    <div className="pt-4 md:pt-6 lg:pt-8">
                        <p className="text-sm text-gray-500 font-mono">
                            ERROR_CODE: 404_NOT_FOUND
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}