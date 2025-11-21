
import { useState, useEffect, useContext } from 'react';
import { Heart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import { Icon } from '@iconify/react';
import productApi from '../../api/productApi';
import userApi from '../../api/userApi';
import Notification from '../common/Notification';
import LoadingAnimations from '../common/LoadingAnimations';

export default function TrendingProduct() {

    const { setInfoUser } = useContext(UserContext);

    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getTrendingProducts = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const page = 1;
                const limit = 5;
                const response = await productApi.getTrending(page, limit);
                setTrendingProducts(response.products);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getTrendingProducts();
    }, []);

    const toggleWishlist = async (code, isRemove = false) => {
        const token = localStorage.getItem("token");

        setShow(true);

        if (!token) {
            let wishlistLocal = JSON.parse(localStorage.getItem("wishlist") || "[]");
            const exists = wishlistLocal.some((item) => item.code === code);

            if (isRemove) {
                wishlistLocal = wishlistLocal.filter((i) => i.code !== code);
                setMessage('Removed from wishlist 💔');
                setType('info');
            } else if (exists) {
                setMessage('Already in wishlist');
                setType('warning');
                return;
            } else {
                wishlistLocal.push({ code });
                setMessage('Added to wishlist ❤️')
                setType('success');
            }

            localStorage.setItem("wishlist", JSON.stringify(wishlistLocal));
            setInfoUser((prev) => ({ ...prev, wishlist: wishlistLocal.length }));
            return;
        }

        try {
            const response = isRemove
                ? await userApi.removeWishlist(code)
                : await userApi.addWishlist(code, 0);
            setMessage(response.message);
            setType('success');
            setInfoUser((prev) => ({ ...prev, wishlist: response.wishlist }));
        } catch (err) {
            setMessage(err.response?.data?.message || err.message);
            setType('error');
            if (err.response?.status === 403) localStorage.removeItem("token");
        }
    };


    const getRankTag = (rank) => {
        switch (rank) {
            case 1: return <Icon icon="noto:1st-place-medal" width="42" height="42" />;
            case 2: return <Icon icon="noto:2nd-place-medal" width="42" height="42" />;
            case 3: return <Icon icon="noto:3rd-place-medal" width="42" height="42" />;
            default: return null;
        }
    };

    return (
        <>
            {/* Notification */}
            {show && (
                <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            )}
            {/* Trending Products */}
            <section className=" min-w-96 flex justify-center py-6 transition-colors duration-500" id='trending-container'>
                <div className="mx-auto py-4 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-blue-500 to-violet-400 rounded-lg">
                    <div
                        id="trending-header"
                        data-animate
                        className={`text-center text-white mb-4 animate-fadeInUp visible`}
                    >
                        <h2 className="text-3xl font-bold mb-2">Our Best Seller</h2>
                        <p className="text-sm">Our top-selling timepieces, trusted by the TIMEPIECE community</p>
                    </div>


                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
                        {loading && (
                            <>
                                <LoadingAnimations option='skeleton'/>
                                <LoadingAnimations option='skeleton'/>

                            </>
                        )}
                        {trendingProducts.map((product, idx) => (
                            <div
                                key={product._id}
                                data-animate
                                className={`bg-bg-primary rounded-lg overflow-hidden border h-max
                                    border-border transition-all duration-300 transform 
                                    hover:translate-y-1 hover:shadow-xl animate-cardSlideInUp visible
                            }`}
                            >

                                <div className="relative bg-bg-secondary overflow-hidden">
                                    <div className='absolute top-2 left-0 z-30'>
                                        {getRankTag(idx + 1)}
                                    </div>
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}` + `/${product?.images[0]}`}
                                        alt={product.name}
                                        loading='lazy'
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/e2e8f0/64748b?text=Watch'; }}
                                        className="w-full aspect-square object-cover transform hover:scale-110 transition-transform duration-500 "

                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    />
                                    <button className="absolute top-2 right-2 w-7 h-7 bg-bg-primary rounded-full flex items-center justify-center shadow hover:bg-error hover:text-text-primary transition-all transform hover:scale-110 animate-badgeSlideIn"
                                        style={{ animationDelay: `${idx * 0.2}s` }}
                                        onClick={() => toggleWishlist(product.code)}
                                    >
                                        <Heart className="w-4 h-4 text-text-primary" />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <Link to={`/product/${product.slug}`}
                                        className="font-semibold text-sm mb-1 text-text-primary truncate animate-textSlideLeft translate-x-6 line-clamp-1"
                                        style={{ animationDelay: `${idx * 0.15}s` }}

                                    >{product.name}</Link>
                                    <p className="text-lg font-bold text-brand animate-fadeInUp">{formatCurrency(product.detail[0]?.currentPrice, 'en-Us', 'USD')}</p>

                                </div>
                            </div >
                        ))
                        }
                    </div >
                </div >
            </section >

        </>

    )
}