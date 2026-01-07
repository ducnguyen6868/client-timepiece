import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import watchApi from '../api/watchApi';
import WatchCard from '../components/common/WatchCard';

export default function FlashSalePage() {

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [watches, setWatches] = useState([]);

  const [limit, setLimit] = useState(8);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer for flash sale
  useEffect(() => {
    if (watches?.length === 0) return;
    const timer = setInterval(() => {
      if (watches?.length > 0) {
        const endTime = new Date(watches[0].flashSaleEnd);
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
  }, [watches]);

  useEffect(() => {
    const getwatches = async () => {
      try {
        const response = await watchApi.getFlashSale(1, limit);
        setWatches(response.flashsales);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    }
    getwatches();
  }, [limit]);

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'luxury', label: 'Cao Cấp' },
    { id: 'sport', label: 'Thể Thao' },
    { id: 'smart', label: 'Thông Minh' },
    { id: 'under5m', label: 'Dưới 5 triệu' },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-600 to-orange-500 text-white overflow-hidden relative font-sans">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/30">
              <Icon icon="mdi:lightning-bolt" className="text-yellow-300 w-5 h-5 animate-pulse" />
              <span className="font-bold text-sm tracking-wide uppercase">
                Ưu Đãi Có Hạn
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">
              FLASH
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
                SALE
              </span>
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-md mx-auto md:mx-0 font-medium">
              Sở hữu đồng hồ cao cấp với giá không thể tốt hơn. Deals mới mỗi giờ.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl transform md:-rotate-2 border-4 border-yellow-400">
              <h3 className="text-center font-bold text-slate-500 uppercase tracking-widest text-xs mb-6">
                Kết Thúc Sau
              </h3>
              <div className="flex items-center justify-center gap-4 text-center">
                <div>
                  <div className="bg-slate-900 text-white text-4xl md:text-5xl font-black rounded-xl w-16 md:w-20 h-20 md:h-24 flex items-center justify-center shadow-lg">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-2 block">GIỜ</span>
                </div>
                <span className="text-4xl font-black text-slate-300">:</span>
                <div>
                  <div className="bg-slate-900 text-white text-4xl md:text-5xl font-black rounded-xl w-16 md:w-20 h-20 md:h-24 flex items-center justify-center shadow-lg">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-2 block">PHÚT</span>
                </div>
                <span className="text-4xl font-black text-slate-300">:</span>
                <div>
                  <div className="bg-rose-600 text-white text-4xl md:text-5xl font-black rounded-xl w-16 md:w-20 h-20 md:h-24 flex items-center justify-center shadow-lg animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-2 block">GIÂY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 -mt-10 relative z-20 font-sans">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-10 flex flex-wrap items-center justify-between gap-4 border border-gray-100">
          <div className="flex items-center gap-2 pb-1 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === category.id
                  ? 'bg-slate-900 text-white shadow-md hover:scale-105'
                  : 'bg-white border border-gray-200 text-slate-600 hover:border-rose-600 hover:text-rose-600'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm font-medium text-slate-500">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-gray-50 rounded-lg text-sm font-bold text-slate-700 focus:ring-rose-600 cursor-pointer py-2 pl-3 pr-8 outline-none"
            >
              <option value="discount">Giảm Giá Cao Nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="popular">Phổ Biến Nhất</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {watches.length > 0 && (
            watches.map(watch => (
              <WatchCard key={watch._id} watch={watch} />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          {limit < 20 && (
            <button className="px-8 py-3 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold
          rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
              onClick={() => setLimit(limit + 4)}
            >
              <Icon icon="mdi:refresh" className="text-xl" />
              Xem Thêm Sản Phẩm
            </button>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Icon
              icon="mdi:lightning-bolt"
              className="absolute top-4 right-4 text-yellow-400 text-9xl"
            />
          </div>
          <div className="relative z-10">
            <Icon icon="mdi:bell-ring" className="text-yellow-400 text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-black text-white mb-3">
              Đừng Bỏ Lỡ Deal Tiếp Theo!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Đăng ký nhận thông báo để không bỏ lỡ các chương trình Flash Sale hấp dẫn
            </p>
            <button className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105">
              Đăng Ký Ngay
            </button>
          </div>
        </div>
      </main>
    </>
  );
}