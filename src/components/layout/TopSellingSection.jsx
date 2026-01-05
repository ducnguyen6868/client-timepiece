import { useState, useEffect } from "react";
import { Star, StarHalf } from 'lucide-react';
import watchApi from "../../api/watchApi";
import LoadingAnimations from '../common/LoadingAnimations';
import Notification from '../common/Notification';

export default function TopSellingSection() {

    const [topSellingWatches, setTopSellingWatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getTopSellingWatches = async () => {
            try {
                const page = 1;
                const limit = 3;
                const response = await watchApi.getTrending(page, limit);
                setTopSellingWatches(response.watches);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getTopSellingWatches();
    }, []);

    if(loading){
        return(
            <LoadingAnimations option='dots'/>
        );
    };

    return (
        <>
        <Notification show={show} type={type} message={message} onClose={()=>setShow(false)}/>
        <section className="py-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 lg:p-14 relative overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Decorative Blurs */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
                    <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Lựa chọn từ khách hàng
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-5">
                        Sản Phẩm Bán Chạy
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        Khám phá những tuyệt tác thời gian đã chiếm trọn trái tim của những người yêu đồng hồ trên toàn thế giới.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                    {topSellingWatches.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-gray-800 cursor-pointer rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col border border-transparent hover:border-sky-100 dark:hover:border-gray-600"
                        >
                            {/* Image Area */}
                            <div className="relative h-72 overflow-hidden">
                                {item.tag && (
                                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-gray-900 font-bold px-3 py-1.5 rounded-full text-[10px] z-10 flex items-center gap-1.5 shadow-sm border border-gray-100">
                                        <span className={item.tag === "Best Seller" ? "text-yellow-500" : "text-sky-500"}>
                                            {item.tagIcon}
                                        </span>
                                        {item.tag}
                                    </div>
                                )}
                                <img
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    src={item.thumbnail}
                                    alt={item.name}
                                />
                            </div>

                            {/* Content Area */}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="mb-3">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        {item.category?.name}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold line-clamp-1 text-gray-900 dark:text-white mb-2 group-hover:text-sky-500 transition-colors">
                                    {item.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i}>
                                                {i + 0.5 === item.ratingAverage ? <StarHalf size={14} fill="currentColor" /> :
                                                    i < item.ratingAverage ? <Star size={14} fill="currentColor" /> :
                                                        <Star size={14} className="text-gray-200" />}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium mr-2">{item.ratingAverage}</span>
                                    <span className="text-xs text-gray-400 font-medium">({item.ratingCount} đánh giá)</span>
                                </div>

                                <h6 className="text-gray-700 dark:text-white mb-2 transition-colors">
                                    {item.shortDescription}
                                </h6>

                                {/* Footer Price */}
                                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-700/50">
                                    <p className="text-2xl font-black text-brand">
                                        ${item.variations[0].currentPrice?.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};