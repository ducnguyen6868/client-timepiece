import { useState, useEffect } from "react";
import { BadgePercent } from "lucide-react";
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
                await new Promise(resolve => setTimeout(resolve, 200));
                const page = 1;
                const limit = 4;
                const response = await watchApi.getFlashSale(page, limit);
                const updateWatches = response.flashsales.map(watch=>{
                    const discountPercent = watch.flashSale?
                    (1-watch.variations[0].flashSalePrice/watch.variations[0].originalPrice||0)*100:
                    (1-watch.variations[0].currentPrice/watch.variations[0].originalPrice||0)*100;
                    return {...watch,discountPercent}
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

    const handleView= async(slug)=>{
        try{
            await watchApi.patchViewCount(slug);
        }catch(err){
            setShow(true);
            setType('error');
            setMessage(err.response?.data?.message||err.message);
        }finally{
            navigate(`/watch/${slug}`);
        }
    }
    return (
        <>
            {/* Notification */}
            {show && (
                <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            )}

            {/* Flash Sale Watches (NEW SECTION) */}
            <section className="p-4 mx-4 md:my-4 bg-bg-secondary transition-colors duration-500 bg-gradient-to-r from-red-500 to-orange-400 rounded-xl">
                <div className="flex items-center gap-1 relative text-white">
                    <Icon icon="noto:fire" width="18" height="18" />
                    <span className='font-bold text-base md:text-xl '>FLASH SALE</span>
                    <Icon icon="noto:fire" width="18" height="18" />

                    {/* Hours */}
                    <span className="text-sm md:text-base bg-gray-200 font-bold text-brand px-2 rounded ">{String(timeLeft.hours).padStart(2, '0')}</span>
                    {/* Minutes */}
                    <span className="text-sm md:text-base bg-gray-200 font-bold text-brand px-2 rounded ">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    {/* Seconds */}
                    <span className="text-sm md:text-base bg-gray-200 font-bold text-brand px-2 rounded ">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>

                {loading && (
                    <div className="mt-4 w-full">
                        <LoadingAnimations option='skeleton' />
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4  justify-center items-center gap-2 mt-2">

                    {flashSaleWatches?.map((watch, idx) => (
                        <div 
                            key={watch._id}
                            data-animate
                            className='bg-white cursor-pointer rounded-md max-w-80 relative
                            overflow-hidden border border-sale-color/30 transform
                            transition-all duration-500 hover:scale-[1.02] animate-fadeInUp visible'
                            style={{ animationDelay: `${idx * 0.15 + 0.3}s` }}
                            onClick={()=>handleView(watch.slug)}
                        >

                            {/* Discount Badge */}
                            <span
                                className="absolute top-0 right-0 flex items-center gap-1
                                     text-white text-xs font-bold px-3 py-1 z-20
                                        bg-gradient-to-r from-red-500 to-orange-400 shadow-lg rounded-bl-lg">
                                <BadgePercent size={14} />
                                - {watch.discountPercent.toFixed(2)}%
                            </span>

                            {/* Watches Image */}
                            <img
                                src={watch?.thumbnail}
                                alt={watch.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/300x300/dc2626/ffffff?text=FLASH+SALE";
                                }}
                                loading='lazy'
                                className="w-full aspect-square object-cover transition-all duration-700 group-hover:scale-110"
                            />

                            <div className="p-2 md:p-3 xl:p-4 flex flex-col items-center text-center">
                                <div className="text-lg xl:text-xl lg:text-2xl font-black text-red-600">
                                    {formatCurrency(watch.variations[0]?.flashSalePrice, 'en-Us', 'USD')}
                                </div>
                                <div
                                    className="w-full relative rounded-full bg-gray-300 h-2 sm:h-3 md:h-4 xl:h-5  mt-2 shadow-inner"
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-500 ease-out 
                                        bg-gradient-to-r from-red-600 to-orange-400 
                                        flex items-center justify-start"
                                        style={{ width: `${Math.ceil(watch.variations[0]?.sold / watch.variations[0]?.stock * 100)}%` }}
                                    >
                                        <Icon icon="noto:fire" width="18" height="18" className="mb-1" />
                                        {Math.ceil(watch.variations[0]?.sold / watch.variations[0]?.stock * 100) > 50 && (
                                            <span className="text-[10px] sm:text-xs md:text-sm flex-1 text-center text-white">SOLD {watch?.variations[0].sold}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

        </>
    )
}