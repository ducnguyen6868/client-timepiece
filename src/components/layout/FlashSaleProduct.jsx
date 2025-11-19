import { useState, useEffect } from "react";
import { Flame, BadgePercent,ChevronsRight } from "lucide-react";
import { formatCurrency } from '../../utils/formatCurrency';
import { Link ,useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import productApi from "../../api/productApi";

export default function FlashSale() {
    const navigate = useNavigate();

    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // Countdown timer for flash sale
    useEffect(() => {
        if (flashSaleProducts?.length === 0) return;
        const timer = setInterval(() => {
            if (flashSaleProducts?.length > 0) {
                const endTime = new Date(flashSaleProducts[0].flashSaleEnd);
                const now = new Date();
                const diff = endTime - now;

                if (diff > 0) {
                    setTimeLeft({
                        hours: Math.floor(diff / (1000 * 60 * 60)),
                        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((diff % (1000 * 60)) / 1000)
                    });
                } else {
                    setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [flashSaleProducts]);

    useEffect(() => {
        const getFlashSales = async () => {
            try {
                const page = 1;
                const limit = 5;
                const response = await productApi.getFlashSale(page, limit);
                let updatedProducts = response.flashsales;

                updatedProducts = updatedProducts.map(product => {
                    const detail = product.detail;
                    const sold = detail.reduce((t, d) => t + d.sold, 0);
                    const quantity = detail.reduce((t, d) => t + d.quantity, 0);
                    const percent = sold / quantity * 100;
                    return { ...product, percent, sold };
                });

                setFlashSaleProducts(updatedProducts);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getFlashSales();
    }, []);

    const handleNavigate = (slug) => {
        navigate(`/product/${slug}`);
    }

    return (
        <>

            {/* Flash Sale Products (NEW SECTION) */}
            <section className="py-6 bg-bg-secondary transition-colors duration-500 bg-gradient-to-r from-red-500 to-orange-400">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-1.5 relative text-white">
                        <Icon icon="noto:fire" width="18" height="18" />
                        <span className='font-bold text-xl '>FLASH SALE</span>
                        <Icon icon="noto:fire" width="18" height="18" />

                        {/* Hours */}
                        <span className="text-base bg-gray-200 font-bold text-brand px-2 rounded ">{String(timeLeft.hours).padStart(2, '0')}</span>

                        {/* Minutes */}
                        <span className="text-base bg-gray-200 font-bold text-brand px-2 rounded ">{String(timeLeft.minutes).padStart(2, '0')}</span>


                        {/* Seconds */}
                        <span className="text-base bg-gray-200 font-bold text-brand px-2 rounded ">{String(timeLeft.seconds).padStart(2, '0')}</span>

                        <Link to='#' className='absolute right-0 flex flex-row gap-1 text-base hover:text-red-600 hover:underline'>
                        View all <ChevronsRight/>
                        </Link>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-2 mt-2">
                        {flashSaleProducts?.map((product, idx) => (
                            <div
                                key={product._id}
                                data-animate
                                className={`bg-white cursor-pointer rounded-xl max-w-80 overflow-hidden shadow-2xl border border-sale-color/30 transform transition-all duration-500 hover:scale-[1.02] animate-fadeInUp visible`}
                                style={{ animationDelay: `${idx * 0.15 + 0.3}s` }}
                                onClick={() => handleNavigate(product.slug)}
                            >

                                <div className="relative group overflow-hidden shadow-lg bg-white border border-gray-100">
                                    {/* Discount Badge */}
                                    <span
                                        className="absolute top-0 right-0 flex items-center gap-1
                                     text-white text-xs font-bold px-3 py-1 z-20
                                        bg-gradient-to-r from-red-500 to-orange-400 shadow-lg rounded-bl-lg">
                                        <BadgePercent size={14} />
                                        - {Math.ceil((1 - product.detail[0].flashSalePrice / product.detail[0].originalPrice) * 100)}%
                                    </span>

                                    {/* Product Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}`+`/${product?.images[0]}`}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/300x300/dc2626/ffffff?text=FLASH+SALE";
                                            }}
                                            loading='lazy'
                                            className="w-full aspect-square object-cover transition-all duration-700 group-hover:scale-110"
                                        />

                                    </div>

                                    {/* Flash Sale Ribbon */}
                                    <span className="absolute bottom-1 left-1 bg-orange-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-xs shadow-md">
                                        <Flame size={14} className="text-yellow-300" />
                                        Flash Sale
                                    </span>
                                </div>


                                <div className="p-4 flex flex-col items-center text-center">
                                    <div className="text-2xl font-black text-red-600">
                                        {formatCurrency(product.detail[0]?.flashSalePrice, 'en-Us', 'USD')}
                                    </div>
                                    <div
                                        className="w-full relative rounded-full bg-gray-300 h-5 mt-2 overflow-hidden shadow-inner"
                                    >
                                        <div
                                            className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center"
                                            style={{ width: `${product.percent}%` }}
                                        >
                                            {product.percent !== '0%' && (
                                                <Icon icon="noto:fire" width="12" height="12" />
                                            )}
                                        </div>
                                        {/* Hiển thị văn bản "Đã bán" */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-xs font-semibold text-gray-800">
                                                SOLD <span className='text-red-700'>{product.sold}</span>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
        </>
    )
}