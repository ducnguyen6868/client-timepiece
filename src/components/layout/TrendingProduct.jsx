
import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Zap } from 'lucide-react';
import productApi from '../../api/productApi';
import Notification from '../common/Notification';
import LoadingAnimations from '../common/LoadingAnimations';

export default function TrendingProduct() {

    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getTrendingProducts = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                const page = 1;
                const limit = 6;
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
            <section className="w-full flex justify-center py-6 transition-colors duration-500" id='trending-container'>
                <div className="w-full mx-auto py-4 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-blue-500 to-violet-400 rounded-lg">
                    <div
                        id="trending-header"
                        data-animate
                        className={`text-center text-white mb-4 animate-fadeInUp visible`}
                    >
                        <h2 className="text-3xl font-bold mb-2">Our Best Seller</h2>
                        <p className="text-sm">Our top-selling timepieces, trusted by the TIMEPIECE community</p>
                    </div>

                    {loading && (
                        <>
                            <div className='w-full'>
                                <LoadingAnimations option='skeleton' />
                            </div>
                        </>
                    )}
                    <div className="grid lg:grid-cols-6 lg:gap-3 md:grid-cols-3 grid-cols-2 gap-4">
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
                                    {product?.flashSale && (
                                        <span className='absolute top-0 right-0 p-2' title='FLASHSALE'><Zap className='text-brand' /></span>
                                    )}
                                </div>
                                <div className="p-3">
                                    <Link to={`/product/${product.slug}`}
                                        className="font-semibold text-sm mb-1 text-text-primary truncate animate-textSlideLeft translate-x-6 line-clamp-1"
                                        style={{ animationDelay: `${idx * 0.15}s` }}

                                    >{product.name}</Link>
                                    {product.flashSale ? (
                                        <p className="text-lg font-bold text-brand animate-fadeInUp">
                                            {formatCurrency(product.detail[0]?.flashSalePrice, 'en-Us', 'USD')}
                                            <span className='pl-1 text-sm font-semibold line-through text-red-500 italic'>{formatCurrency(product.detail[0]?.originalPrice, 'en-Us', 'USD')}</span>
                                        </p>
                                    ) : (
                                        <p className="text-lg font-bold text-brand animate-fadeInUp">
                                            {formatCurrency(product.detail[0]?.currentPrice, 'en-Us', 'USD')}

                                        </p>
                                    )}


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