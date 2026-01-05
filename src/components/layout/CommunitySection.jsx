import { useState, useEffect } from "react";
import { Heart ,Instagram , Users } from 'lucide-react';
import communityApi from '../../api/communityApi';
import Notification from '../common/Notification';
import LoadingAnimations from '../common/LoadingAnimations';

// Component phụ cho mỗi Card bài đăng
const CommunityCard = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-gray-100 dark:border-gray-700">
    <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
      <img 
        alt="User Post" 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        src={post.image} 
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white">
          <Instagram size={14} />
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full border border-sky-500 p-0.5">
          <img className="w-full h-full object-cover rounded-full" src={post.avatar} alt={post.name} />
        </div>
        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">@{post.name}</span>
      </div>
      <Heart 
        size={16} 
        className={post.likes ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-400 transition-colors"} 
      />
    </div>
  </div>
);

export default function CommunitySection() {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getCommunites = async () => {
            try {
                const page = 1;
                const limit = 4;
                const response = await communityApi.getCommunities(page, limit);
                setCommunities(response.communities);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        getCommunites();
    }, []);
    
    if(loading){
        return(
            <LoadingAnimations option='dots'/>
        );
    };
    
    return (
        <>
            {/* Notification */}
            <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />

            {/* Community */}
            <section className="py-4 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div className="space-y-8">
                            <div>
                                <span className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                                    <Users size={18} /> Cộng đồng
                                </span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
                                    Gia Nhập Hiệp Hội <br />
                                    <span className="text-sky-500 italic">Timepiece Society</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg leading-relaxed max-w-lg">
                                    Chia sẻ phong cách của bạn và kết nối với những người đam mê đồng hồ khác. Sử dụng thẻ
                                    <span className="font-bold text-sky-500 mx-1">#TimepieceStyle</span>
                                    để có cơ hội xuất hiện trên trang chủ và nhận những phần quà độc quyền.
                                </p>
                            </div>

                            {/* Social Proof (Avatar Stack) */}
                            <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl w-fit">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <img
                                            key={i}
                                            alt="User"
                                            className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 shadow-sm"
                                            src={`https://i.pravatar.cc/150?img=${i + 10}`}
                                        />
                                    ))}
                                    <div className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-sky-500 flex items-center justify-center text-xs font-black text-white shadow-sm">
                                        +2k
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 dark:text-white text-base">2,000+ Thành viên</span>
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Đang hoạt động sôi nổi</span>
                                </div>
                            </div>

                            <button className="group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl active:scale-95">
                                <Instagram size={20} /> Theo dõi @Timepiece
                            </button>
                        </div>

                        {/* Right Image Grid (Floating Style) */}
                        <div className="grid grid-cols-2 gap-6 relative">
                            {/* Cột 1 */}
                            <div className="space-y-6 pt-12">
                                {communities.filter((_,index) => index % 2 !== 0).map((post) => (
                                    <CommunityCard key={post._id} post={post} />
                                ))}
                            </div>
                            {/* Cột 2 */}
                            <div className="space-y-6">
                                {communities.filter((_,index) => index % 2 === 0).map((post) => (
                                    <CommunityCard key={post._id} post={post} />
                                ))}
                            </div>

                            {/* Trang trí nền */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-100/50 dark:bg-sky-900/10 blur-[100px] rounded-full"></div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}