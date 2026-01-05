import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function FlashSalePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 15,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'luxury', label: 'Cao Cấp' },
    { id: 'sport', label: 'Thể Thao' },
    { id: 'smart', label: 'Thông Minh' },
    { id: 'under5m', label: 'Dưới 5 triệu' },
  ];

  const products = [
    {
      id: 1,
      name: 'Navigator Pro Bạc',
      category: 'Dòng Hàng Không',
      price: '12.850.000₫',
      originalPrice: '21.420.000₫',
      discount: 40,
      soldPercent: 85,
      stock: 3,
      hot: true,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop',
    },
    {
      id: 2,
      name: 'Tối Giản Cổ Điển',
      category: 'Bộ Sưu Tập Di Sản',
      price: '8.100.000₫',
      originalPrice: '10.800.000₫',
      discount: 25,
      soldPercent: 45,
      stock: 22,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=500&fit=crop',
    },
    {
      id: 3,
      name: 'Vàng Elite II',
      category: 'Dòng Xa Xỉ',
      price: '42.840.000₫',
      originalPrice: '50.400.000₫',
      discount: 15,
      soldPercent: 15,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=500&fit=crop',
    },
    {
      id: 4,
      name: 'Thợ Lặn Sâu 300',
      category: 'Dòng Đại Dương',
      price: '11.400.000₫',
      originalPrice: '22.800.000₫',
      discount: 50,
      soldPercent: 95,
      stock: 1,
      image: 'https://images.unsplash.com/photo-1606390040921-81a5c07c62a5?w=400&h=500&fit=crop',
    },
    {
      id: 5,
      name: 'Chronograph X',
      category: 'Dòng Master',
      price: '21.000.000₫',
      originalPrice: '30.000.000₫',
      discount: 30,
      soldPercent: 60,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1587836374619-6c8a0b8c2b84?w=400&h=500&fit=crop',
    },
    {
      id: 6,
      name: 'Tactical Stealth',
      category: 'Tác Chiến',
      price: '4.800.000₫',
      originalPrice: '6.000.000₫',
      discount: 20,
      soldPercent: 35,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=500&fit=crop',
    },
    {
      id: 7,
      name: 'Moonphase Royal',
      category: 'Bộ Sưu Tập Hoàng Gia',
      price: '27.500.000₫',
      originalPrice: '50.000.000₫',
      discount: 45,
      soldPercent: 70,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1533139142390-e5ded0b3a39e?w=400&h=500&fit=crop',
    },
    {
      id: 8,
      name: 'Carbon Sport GT',
      category: 'Thể Thao Cao Cấp',
      price: '15.900.000₫',
      originalPrice: '26.500.000₫',
      discount: 40,
      soldPercent: 55,
      stock: 18,
      image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400&h=500&fit=crop',
    },
  ];

  const getStockStatus = (stock) => {
    if (stock === 1) return { text: 'Chiếc cuối!', color: 'text-rose-600 font-bold animate-pulse' };
    if (stock <= 3) return { text: `Chỉ còn ${stock}`, color: 'text-orange-500' };
    if (stock <= 20) return { text: `${stock} Còn hàng`, color: 'text-slate-500' };
    return { text: 'Còn nhiều', color: 'text-slate-500' };
  };

  const getProgressColor = (percent) => {
    if (percent >= 90) return 'bg-rose-600';
    if (percent >= 70) return 'bg-orange-500';
    if (percent >= 40) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getDiscountColor = (discount) => {
    if (discount >= 40) return 'bg-rose-600';
    if (discount >= 30) return 'bg-orange-500';
    if (discount >= 20) return 'bg-blue-600';
    return 'bg-slate-800';
  };

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
              Sở hữu đồng hồ cao cấp với giá không thể tốt hơn. Deals mới mỗi 24 giờ.
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
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === category.id
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
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 relative"
              >
                {/* Hot Badge */}
                {product.hot && (
                  <div className="absolute top-0 left-0 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 z-20 rounded-br-xl shadow-lg flex items-center gap-1">
                    <Icon icon="mdi:fire" className="w-3 h-3" /> HOT
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div
                    className={`${getDiscountColor(
                      product.discount
                    )} text-white font-black text-xs h-12 w-12 flex flex-col items-center justify-center rounded-full shadow-lg transform ${
                      product.id % 2 === 0 ? '-rotate-12' : 'rotate-12'
                    } group-hover:rotate-0 transition-transform`}
                  >
                    <span>{product.discount}%</span>
                    <span>OFF</span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 p-6">
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                
                </div>

                {/* Product Info */}
                <div className="p-5">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full ${getProgressColor(
                          product.soldPercent
                        )} rounded-full transition-all`}
                        style={{ width: `${product.soldPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Đã bán: {product.soldPercent}%</span>
                      <span className={stockStatus.color}>{stockStatus.text}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">{product.category}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-rose-600">{product.price}</span>
                    <span className="text-sm font-medium text-slate-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
            <Icon icon="mdi:refresh" className="text-xl" />
            Xem Thêm Sản Phẩm
          </button>
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