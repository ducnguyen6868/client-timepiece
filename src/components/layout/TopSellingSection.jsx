import { useState, useEffect } from "react";
import watchApi from "../../api/watchApi";
import LoadingAnimations from '../common/LoadingAnimations';
import Notification from '../common/Notification';
import WatchCard from '../common/WatchCard';

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                    {topSellingWatches.map((watch) => (
                        <WatchCard key={watch._id} watch={watch}/>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};