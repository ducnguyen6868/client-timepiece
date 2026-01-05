import {
  Watch, X, Bot, Sparkles, Headphones,
  ChevronRight, PlusCircle, Smile, Send
} from 'lucide-react';

export default function ChatWidget({onClose}) {
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mock Background (Giả lập trang web phía sau) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 blur-[2px] overflow-hidden bg-white">
        <header className="h-20 border-b border-gray-200 flex items-center px-10 justify-between">
          <div className="w-32 h-8 bg-gray-300 rounded"></div>
          <div className="flex gap-8">
            {[1, 2, 3].map((i) => <div key={i} className="w-20 h-4 bg-gray-200 rounded"></div>)}
          </div>
          <div className="flex gap-4">
            <div className="size-8 rounded-full bg-gray-200"></div>
            <div className="size-8 rounded-full bg-gray-200"></div>
          </div>
        </header>
        <div className="p-10 flex gap-10">
          <div className="w-1/2 h-[500px] bg-gray-100 rounded-xl"></div>
          <div className="w-1/2 flex flex-col gap-6 pt-20">
            <div className="w-3/4 h-12 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-100 rounded"></div>
            <div className="w-full h-4 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>

      {/* Chat Widget Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col w-[440px] h-[calc(100vh-2rem)] max-h-[720px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#e6f3f4] z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                <Watch size={20} />
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-[#0c1b1d] text-base font-bold leading-tight">CSKH - Đồng hồ Chính hãng</h2>
              <p className="text-[#4596a1] text-xs font-medium">Luôn sẵn sàng hỗ trợ</p>
            </div>
          </div>
          <button className="flex items-center justify-center size-9 rounded-full bg-[#f0f7f8] hover:bg-[#e6f3f4] text-[#0c1b1d] transition-colors" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto bg-[#f8fbfc] p-5 flex flex-col gap-6">
          <div className="flex justify-center">
            <span className="text-xs font-medium text-gray-400 px-3 py-1 bg-gray-100 rounded-full">Hôm nay, 10:23 AM</span>
          </div>

          {/* Greeting Message */}
          <div className="flex items-end gap-3">
            <div className="size-8 rounded-full bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Bot size={18} />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-[#eef6f7] max-w-[85%]">
              <h3 className="text-[#0c1b1d] text-lg font-bold leading-tight mb-1">Chào bạn! 👋</h3>
              <p className="text-[#0c1b1d]/80 text-[15px] leading-relaxed">Mình giúp gì được cho bạn hôm nay? Vui lòng chọn một trong các tùy chọn bên dưới.</p>
            </div>
          </div>

          {/* Options */}
          <div className="pl-11 grid gap-3">
            <button className="group w-full text-left bg-white hover:bg-sky-50 border border-transparent hover:border-sky-200 p-3 rounded-xl shadow-sm transition-all flex items-center gap-4">
              <div className="size-12 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[#0c1b1d] text-[15px] font-bold leading-tight mb-0.5">Chat với trợ lý AI</p>
                <p className="text-[#4596a1] text-xs font-medium">Tư vấn sản phẩm & gợi ý thông minh</p>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-sky-500" />
            </button>

            <button className="group w-full text-left bg-white hover:bg-sky-50 border border-transparent hover:border-sky-200 p-3 rounded-xl shadow-sm transition-all flex items-center gap-4">
              <div className="size-12 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 transition-transform">
                <Headphones size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[#0c1b1d] text-[15px] font-bold leading-tight mb-0.5">Chat trực tiếp</p>
                <p className="text-[#4596a1] text-xs font-medium">Hỗ trợ đơn hàng & bảo hành</p>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-sky-500" />
            </button>
          </div>

          {/* User Message */}
          <div className="flex flex-col items-end gap-1 mt-2">
            <div className="max-w-[85%] rounded-2xl rounded-br-none px-4 py-3 bg-sky-500 text-white shadow-md">
              <p className="text-[15px] leading-relaxed">Tôi muốn tìm đồng hồ nam chống nước dưới 5 triệu.</p>
            </div>
            <p className="text-[#4596a1] text-[11px] font-medium pr-1">Đã xem</p>
          </div>

          {/* AI Product Response */}
          <div className="flex flex-col gap-3 pb-2">
            <div className="flex items-end gap-3">
              <div className="size-8 rounded-full bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot size={18} />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-[#eef6f7] max-w-[85%]">
                <p className="text-[#0c1b1d]/80 text-[15px] leading-relaxed">
                  Dựa trên yêu cầu của bạn, mình tìm thấy mẫu <span className="font-bold text-[#0c1b1d]">Casio Edifice</span> này rất phù hợp:
                </p>
              </div>
            </div>

            {/* Product Card */}
            <div className="pl-11">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-[#e6f3f4] w-64 group cursor-pointer hover:border-sky-400 transition-colors">
                <div
                  className="h-32 w-full bg-gray-200 bg-cover bg-center relative"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold bg-sky-500 px-2 py-0.5 rounded">Bán chạy</span>
                </div>
                <div className="p-3">
                  <h4 className="text-[#0c1b1d] font-bold text-sm mb-1 truncate">Casio Edifice EFR-556D</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-600 font-bold text-sm">4.200.000₫</span>
                    <button className="text-[10px] font-bold text-[#0c1b1d] bg-[#f0f7f8] hover:bg-sky-100 px-2 py-1 rounded transition-colors">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Input Area */}
        <div className="p-4 bg-white border-t border-[#e6f3f4]">
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {['Có màu đen không?', 'Chính sách bảo hành'].map((text) => (
              <button key={text} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#f5f8f8] border border-[#e6f3f4] text-xs font-medium text-[#4596a1] hover:bg-sky-50 hover:text-sky-600 transition-colors">
                {text}
              </button>
            ))}
          </div>

          <div className="relative flex items-center gap-2">
            <button className="text-gray-400 hover:text-sky-500 transition-colors p-2 rounded-full">
              <PlusCircle size={22} />
            </button>
            <div className="flex-1 relative">
              <input
                className="w-full bg-[#f5f8f8] text-[#0c1b1d] placeholder-gray-400 text-[15px] rounded-full py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500/20 border-none"
                placeholder="Nhập tin nhắn..."
                type="text"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 p-1">
                <Smile size={20} />
              </button>
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg shadow-sky-200 transition-all active:scale-95 flex items-center justify-center">
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Powered by AI Chat & CSKH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

