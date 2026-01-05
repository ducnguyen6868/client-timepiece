import { useState, useEffect } from "react";
import { BadgePercent, Flame } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import watchApi from "../../api/watchApi";
import Notification from '../common/Notification';
import LoadingAnimations from '../common/LoadingAnimations';

export default function FlashSaleSection() {

    const navigate = useNavigate();

    const [flashSaleWatches, setFlashSaleWatches] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    // Countdown timer for flash sale
    useEffect(() => {
        if (flashSaleWatches?.length === 0) return;
        const timer = setInterval(() => {
            if (flashSaleWatches?.length > 0) {
                const endTime = new Date(flashSaleWatches[0].flashSaleEnd);
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
    }, [flashSaleWatches]);

    useEffect(() => {
        const getFlashSales = async () => {
            try {
                const page = 1;
                const limit = 6;
                const response = await watchApi.getFlashSale(page, limit);
                const updateWatches = response.flashsales.map(watch => {
                    const discountPercent = watch.flashSale ?
                        (1 - watch.variations[0].flashSalePrice / watch.variations[0].originalPrice || 0) * 100 :
                        (1 - watch.variations[0].currentPrice / watch.variations[0].originalPrice || 0) * 100;
                    return { ...watch, discountPercent }
                });
                setFlashSaleWatches(updateWatches);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getFlashSales();
    }, []);

    const handleNavigate=()=>{
        navigate(`/flash-sale`);
    };

    return (
        <>
            {/* Notification */}
            {show && (
                <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            )}

            {/* Flash Sale Watches (NEW SECTION) */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl mx-8 -mt-12 relative z-10  shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 flex flex-col md:flex-row justify-between items-center text-white gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg animate-pulse">
                            <Flame size={28} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Flash Sale</h2>
                            <p className="text-white/80 text-xs font-medium uppercase tracking-widest">Ưu đãi giới hạn mỗi ngày</p>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex items-center gap-4 bg-black/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Kết thúc sau</span>
                        <div className="flex gap-2 font-mono font-bold text-lg">
                            <span className="bg-white text-orange-600 w-9 h-9 flex items-center justify-center rounded-lg shadow-inner">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                            <span className="flex items-center animate-pulse">:</span>
                            <span className="bg-white text-orange-600 w-9 h-9 flex items-center justify-center rounded-lg shadow-inner">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                            <span className="flex items-center animate-pulse">:</span>
                            <span className="bg-white text-orange-600 w-9 h-9 flex items-center justify-center rounded-lg shadow-inner">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-50/50 dark:bg-transparent">
                    {flashSaleWatches.map((watch) => {
                        const progress = (watch.variations[0].sold / watch.variations[0].stock) * 100;

                        return (
                            <div key={watch._id} className="group relative bg-white dark:bg-gray-800 rounded-2xl
                            overflow-hidden transition-all shadow-2xl border border-transparent hover:border-orange-100
                            dark:hover:border-gray-700 cursor-pointer"
                            onClick={handleNavigate}>
                                {/* Sale Tag */}
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-md shadow-lg z-10">
                                   - {((1-watch.variations[0].flashSalePrice/watch.variations[0].originalPrice)*100).toFixed(2)} %
                                </div>

                                {/* Image Container */}
                                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-950 flex items-center justify-center relative">
                                    <img
                                        alt={watch.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={watch.thumbnail}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1 p-2">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs truncate uppercase tracking-tight">
                                        {watch.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-red-600 dark:text-orange-500 font-black text-base">
                                            ${watch.variations[0].flashSalePrice}
                                        </span>
                                        <span className="text-gray-400 text-[10px] line-through">
                                            ${watch.variations[0].originalPrice}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="pt-2">
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-orange-500 to-red-600 h-full transition-all duration-1000"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-1.5 px-0.5">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">Còn {watch.variations[0].stock - watch.variations[0].sold}</span>
                                            <span className="text-[9px] font-bold text-red-500 uppercase italic">Đã bán {watch.variations[0].sold}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}