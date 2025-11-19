import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Search, User, ShoppingCart, Heart, Camera } from 'lucide-react';
import websiteLogo from '../../assets/website-logo.png'
import productApi from '../../api/productApi';
import Notification from '../common/Notification';

export default function Header() {
    // Mock user data for demo
    const { infoUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);
    const [keyword, setKeyword] = useState('');

    const [scanning, setScanning] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const fileInputRef = useRef(null);

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (infoUser.name !== '') {
            setLogged(true);
        }
    }, [infoUser]);

    const handleSearch = async () => {
        if (keyword !== '') {
            navigate(`/search?keyword=${keyword}`);
        }
    }

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
                setScanning(true);

                setTimeout(() => {
                    setScanning(false);
                }, 2500);
            };
            reader.readAsDataURL(file);

            try {
                new Promise(resolve => setTimeout(resolve, 2500));
                const formData = new FormData();
                formData.append('image', file);
                const response = await productApi.postImgToSearch(formData);
                const products = response.products;
                navigate(`/search`, { state: { products } });
            } catch (err) {
                setType('error');
                setMessage(err.response?.data?.message || err.message);
                setShow(true);
            } finally {
                closeScanModal?.();
            }

        }

    };

    const closeScanModal = () => {
        setScanning(false);
        setUploadedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <Notification show={show} message={message} type={type} onClose={() => setShow(false)} />
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-6">

                        {/* Logo & Brand */}
                        <Link to="/" className="flex items-center gap-2 shrink-0">
                            <img className='w-8' src={websiteLogo} title="Website Logo" alt="Website Logo" />
                            <span className="hidden sm:inline text-sm  md:text-xl font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                TIMEPIECE
                            </span>
                        </Link>

                        {/* Search & Actions */}
                        <div className="flex flex-1 items-center justify-end gap-4">

                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-2xl">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                                    onClick={handleSearch}
                                />
                                <input
                                    type="text"
                                    placeholder="Search watches, collections, promotions..."
                                    className="w-full pl-10 pr-12 py-2 text-sm border border-cyan-500 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                           transition-all"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    name='image'

                                />
                                <Camera
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-500 transition-colors"
                                    onClick={handleCameraClick}
                                />
                            </div>

                            {/* User Actions */}
                            <div className="flex items-center gap-3">

                                {/* User Avatar / Login */}
                                <div className="relative group flex items-center">
                                    {logged ? (
                                        <Link to="/user/profile" className="block">
                                            <img className="w-9 h-9 rounded-ful shadow-sm hover:shadow-md transition-all duration-300"
                                                src={`${process.env.REACT_APP_API_URL}`+`/${infoUser.avatar}`}
                                                title='Avatar'
                                                alt='Avatar'
                                                loading='lazy'
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =infoUser.avatar;
                                                }}

                                            />

                                        </Link>
                                    ) : (
                                        <Link to="/login">
                                            <User className="w-6 h-6 text-gray-600" />
                                        </Link>
                                    )}
                                </div>

                                {/* Cart */}
                                <Link to="/cart" className="relative group">
                                    <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-cyan-500 transition-colors duration-300" />
                                    {infoUser.cart > 0 && (
                                        <span className="absolute -top-2 -right-2 min-w-[20px] h-5 
                                   bg-cyan-500 text-white text-xs font-semibold 
                                   rounded-full px-1.5 flex items-center justify-center 
                                   shadow-sm">
                                            {infoUser.cart}
                                        </span>
                                    )}
                                </Link>

                                {/* Wishlist */}
                                <Link to="/wishlist" className="relative group">
                                    <Heart className="w-6 h-6 text-gray-600 group-hover:text-rose-500 transition-colors duration-300" />
                                    {infoUser.wishlist > 0 && (
                                        <span className="absolute -top-2 -right-2 min-w-[20px] h-5 
                                   bg-cyan-500 text-white text-xs font-semibold 
                                   rounded-full px-1.5 flex items-center justify-center 
                                   shadow-sm">
                                            {infoUser.wishlist}
                                        </span>
                                    )}
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Scan Modal */}
            {uploadedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => closeScanModal()}
                >
                    <div className="relative bg-gray-100 rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                {scanning ? 'Scanning Image...' : ''}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {scanning ? 'Analyzing your watch image' : ''}
                            </p>
                        </div>

                        {/* Image Container with Scan Effect */}
                        <div className="relative rounded-xl overflow-hidden ">
                            <img
                                src={uploadedImage}
                                alt="Uploaded watch"
                                className="w-full h-64 object-contain"
                            />

                            {/* Scanning Line Effect */}
                            {scanning && (
                                <>
                                    {/* Animated scan line */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan"></div>
                                    </div>

                                    {/* Corner brackets */}
                                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
                                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
                                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
                                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

                                    {/* Scanning grid overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
                                </>
                            )}
                        </div>

                        {/* Progress */}
                        {scanning && (
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-progress"></div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}

        </>
    );
}