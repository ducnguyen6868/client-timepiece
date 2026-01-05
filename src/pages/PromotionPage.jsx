import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';

export default function PromotionPage() {

  return (
    <main class="layout-container flex h-full grow flex-col px-4 sm:px-8 py-6 mx-auto w-full max-w-[1440px] font-sans">
      <section class="relative w-full rounded-3xl overflow-hidden bg-bg-subtle min-h-[220px] lg:min-h-[280px] mb-12 shadow-soft group">
        <div class="absolute inset-0 bg-gradient-to-r from-brand/20 via-white/50 to-bg-subtle"></div>
        <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-brand/30 rounded-l-full transform translate-x-1/2"></div>
        <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 lg:px-16 py-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff9800]/10 text-[#ff9800] text-xs font-bold uppercase tracking-wider border border-[#ff9800]/20 mb-4">
            <Icon icon="material-symbols:redeem-rounded" width="24" height="24" style={{ color: "#ff9800" }} />
            Ưu đãi đặc biệt
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-text-main mb-4 leading-tight">
            Kho Voucher &amp; <span class="text-gradient">Quà Tặng Độc Quyền</span>
          </h1>
          <p class="text-text-muted text-base md:text-lg font-medium max-w-2xl">
            Săn ngay mã giảm giá hấp dẫn và nhận quà tặng giá trị khi mua sắm tại WatchStore. Số lượng có hạn mỗi ngày!
          </p>
          <div class="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div class="bg-white p-3 rounded-2xl shadow-lg border border-border-light rotate-[-12deg] ">
              <Icon icon="material-symbols:confirmation-number-outline" width="24" height="24" style={{ color: '#00bcd4' }} />
            </div>
          </div>
          <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div class="bg-white p-3 rounded-2xl shadow-lg border border-border-light rotate-[12deg] animate-[bounce_4s_infinite]">
              <Icon icon="material-symbols:redeem-rounded" width="24" height="24" style={{ color: '#ff9800' }} />            </div>
          </div>
        </div>
      </section>
      <div class="flex flex-col gap-8">
        <section class="scroll-mt-24" id="voucher-section">
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2 rounded-lg bg-brand/10 text-brand">
                  <Icon icon="material-symbols:local-activity-outline" width="24" height="24" style={{ color: '#00bcd4' }} />                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-text-main">Mã Giảm Giá</h2>
              </div>
              <p class="text-text-muted">Lưu mã ngay để áp dụng ở bước thanh toán.</p>
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 rounded-full bg-brand text-white text-sm font-bold shadow-md shadow-brand/20">Tất cả</button>
              <button class="px-4 py-2 rounded-full bg-white border border-border-light text-text-muted hover:text-brand hover:border-brand text-sm font-bold transition-all">Vận chuyển</button>
              <button class="px-4 py-2 rounded-full bg-white border border-border-light text-text-muted hover:text-brand hover:border-brand text-sm font-bold transition-all">Thương hiệu</button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div class="group relative flex bg-white rounded-2xl 
            shadow-card overflow-hidden border border-border-light
            hover:border-brand/40 hover:shadow-soft transition-all
            duration-300 h-[160px]">
              <div class="w-[30%] bg-gradient-to-br from-brand to-brand-light flex flex-col items-center justify-center p-2 text-white relative">
                <span class="text-2xl font-black tracking-tight">10%</span>
                <span class="text-xs font-bold uppercase opacity-90 text-center">Giảm tối đa<br />500k</span>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white rounded-full z-10"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white rounded-full z-10"></div>
                <div class="absolute right-0 top-2 bottom-2 border-r-2 border-dashed border-white/30"></div>
              </div>
              <div class="w-[70%] p-5 flex flex-col justify-between pl-6 ">
                <div className=''>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded border border-orange-200">HOT</span>
                    <span class="text-xs text-text-muted">Toàn sàn</span>
                  </div>
                  <h3 class="font-bold text-text-main leading-snug">Giảm 10% cho đơn từ 2 triệu</h3>
                  <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-clock-rounded" width="24" height="24"  style={{color: '#6b7280'}} /> HSD: 30/11/2023
                  </p>
                </div>
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-gray-100">
                  <div class="text-xs font-mono text-text-muted bg-gray-50 px-2 py-1 rounded border border-gray-100 select-all cursor-pointer hover:border-brand/30 transition-colors">WATCH10</div>
                  <button class="text-xs font-bold text-white bg-brand hover:bg-brand-light px-4 py-2 rounded-lg transition-colors shadow-sm active:scale-95">Lưu Mã</button>
                </div>
              </div>
            </div>
            <div class="group relative flex bg-white rounded-2xl shadow-card overflow-hidden border border-border-light hover:border-brand/40 hover:shadow-soft transition-all duration-300 h-[160px]">
              <div class="w-[30%] bg-bg-subtle flex flex-col items-center justify-center p-2 text-brand relative border-r border-dashed border-brand/20">
                <span class="text-xl font-black tracking-tight">50K</span>
                <span class="text-xs font-bold uppercase opacity-80 text-center mt-1">Voucher<br />vận chuyển</span>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-b border-border-light/50"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-t border-border-light/50"></div>
              </div>
              <div class="w-[70%] p-5 flex flex-col justify-between pl-6">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold bg-green-100 text-green-600 px-1.5 py-0.5 rounded border border-green-200">Freeship</span>
                  </div>
                  <h3 class="font-bold text-text-main leading-snug">Giảm 50k phí vận chuyển</h3>
                  <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-clock-rounded" width="24" height="24"  style={{color: '#6b7280'}} /> HSD: 31/12/2023
                  </p>
                </div>
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-gray-100">
                  <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mr-3 relative group-hover:h-2 transition-all">
                    <div class="bg-[#ff9800] h-full w-[80%] rounded-full"></div>
                  </div>
                  <button class="text-xs font-bold text-brand bg-brand/10 hover:bg-brand hover:text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">Dùng ngay</button>
                </div>
              </div>
            </div>
            <div class="group relative flex bg-white rounded-2xl shadow-card overflow-hidden border border-border-light hover:border-brand/40 hover:shadow-soft transition-all duration-300 h-[160px]">
              <div class="w-[30%] bg-white flex flex-col items-center justify-center p-2 text-text-main relative border-r border-dashed border-gray-200">
                <img alt="Brand Logo" class="w-12 h-12 object-contain mb-1 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1PxWDfaZnZP8FHo3h3Qu60yBJxItvTi-k3pS2O_KdPn5a7iIe3ZnwabphimiH8j0K2gZKnI0i9di7MIjNXlB6aOhOfX3NzjcfYqbJihKSbco4TYbe_1OiaqfsLyUbjbGHzH0e6lOYkuzWpe54dyixFcfFl3xp0_fEQh23LLGVjWKZ4dtyeqQSZEkUCRcKr7YlTagP4MlstBOyGdtsIu7VKH8Xy4_FvS-vP97mIqIto3Q9Baon80KtakjAw0W1s17HaOps1Fq25zo" />
                <span class="text-lg font-black tracking-tight text-brand">-500K</span>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white border border-border-light rounded-full z-10 clip-half"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white border border-border-light rounded-full z-10"></div>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white rounded-full z-20 border-b border-l border-border-light/50"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white rounded-full z-20 border-t border-l border-border-light/50"></div>
              </div>
              <div class="w-[70%] p-5 flex flex-col justify-between pl-6">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold bg-gray-100 text-text-muted px-1.5 py-0.5 rounded border border-gray-200">Thương hiệu</span>
                  </div>
                  <h3 class="font-bold text-text-main leading-snug">Giảm 500k cho đồng hồ Orient</h3>
                  <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-clock-rounded" width="24" height="24"  style={{color: '#6b7280'}} /> HSD: 15/11/2023
                  </p>
                </div>
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-gray-100">
                  <div class="text-xs font-mono text-text-muted bg-gray-50 px-2 py-1 rounded border border-gray-100">ORIENT500</div>
                  <button class="text-xs font-bold text-white bg-text-main hover:bg-brand px-4 py-2 rounded-lg transition-colors shadow-sm">Lưu Mã</button>
                </div>
              </div>
            </div>
            <div class="group relative flex bg-white rounded-2xl shadow-card overflow-hidden border border-border-light hover:border-brand/40 hover:shadow-soft transition-all duration-300 h-[160px] opacity-70 grayscale hover:grayscale-0 hover:opacity-100">
              <div class="absolute inset-0 z-20 bg-white/40 backdrop-blur-[1px] flex items-center justify-center group-hover:hidden transition-all">
                <span class="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">Hết lượt sử dụng</span>
              </div>
              <div class="w-[30%] bg-[#ff9800]/10 flex flex-col items-center justify-center p-2 text-[#ff9800] relative border-r border-dashed border-[#ff9800]/30">
                <span class="text-xl font-black tracking-tight">1 TRIỆU</span>
                <span class="text-xs font-bold uppercase opacity-80 text-center mt-1">Luxury</span>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-b border-border-light/50"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-t border-border-light/50"></div>
              </div>
              <div class="w-[70%] p-5 flex flex-col justify-between pl-6">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded border border-purple-200">VIP</span>
                  </div>
                  <h3 class="font-bold text-text-main leading-snug">Giảm 1 triệu cho đơn &gt; 20tr</h3>
                  <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-clock-rounded" width="24" height="24"  style={{color: '#6b7280'}} /> HSD: 31/12/2023
                  </p>
                </div>
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-gray-100">
                  <div class="text-xs font-mono text-text-muted bg-gray-50 px-2 py-1 rounded border border-gray-100">VIPMEMBER</div>
                  <button class="text-xs font-bold text-white bg-[#ff9800] cursor-not-allowed px-4 py-2 rounded-lg transition-colors">Đã hết</button>
                </div>
              </div>
            </div>
            <div class="group relative flex bg-white rounded-2xl shadow-card overflow-hidden border border-border-light hover:border-brand/40 hover:shadow-soft transition-all duration-300 h-[160px]">
              <div class="w-[30%] bg-gradient-to-b from-gray-800 to-black flex flex-col items-center justify-center p-2 text-white relative">
                <span class="text-xl font-black tracking-tight">BLACK</span>
                <span class="text-xs font-bold uppercase opacity-80 text-center mt-1">Friday</span>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-b border-border-light/50"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-t border-border-light/50"></div>
              </div>
              <div class="w-[70%] p-5 flex flex-col justify-between pl-6">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold bg-black text-white px-1.5 py-0.5 rounded border border-black">Sắp diễn ra</span>
                  </div>
                  <h3 class="font-bold text-text-main leading-snug">Săn sale Black Friday sớm</h3>
                  <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-clock-rounded" width="24" height="24"  style={{color: '#6b7280'}} /> Mở lúc: 00:00 24/11
                  </p>
                </div>
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-gray-100">
                  <div class="flex items-center gap-1 text-xs text-[#ff9800] font-bold">
                    <Icon icon="material-symbols:notifications-active-outline" width="24" height="24" style={{ color: '#ff9800' }} />
                    Nhắc tôi
                  </div>
                  <button class="text-xs font-bold text-white bg-gray-800 hover:bg-black px-4 py-2 rounded-lg transition-colors">Chi tiết</button>
                </div>
              </div>
            </div>
            <div class="group relative flex bg-white rounded-2xl shadow-card overflow-hidden border border-border-light hover:border-brand/40 hover:shadow-soft transition-all duration-300 h-[160px]">
              <div class="w-[30%] bg-brand/10 flex flex-col items-center justify-center p-2 text-brand relative border-r border-dashed border-brand/20">
                <span class="text-xl font-black tracking-tight">15%</span>
                <span class="text-xs font-bold uppercase opacity-80 text-center mt-1">Khách mới</span>
                <div class="absolute -right-3 top-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-b border-border-light/50"></div>
                <div class="absolute -right-3 bottom-[-12px] w-6 h-6 bg-white rounded-full z-10 border-l border-t border-border-light/50"></div>
              </div>
              <div class="w-[70%] p-5 flex flex-col justify-between pl-6">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200">New</span>
                  </div>
                  <h3 class="font-bold text-text-main leading-snug line-clamp-1">Giảm 15% cho đơn hàng đầu tiên</h3>
                  <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-clock-rounded" width="24" height="24"  style={{color: '#6b7280'}} /> HSD: 30 ngày từ khi đk
                  </p>
                </div>
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-gray-100">
                  <div class="text-xs font-mono text-text-muted bg-gray-50 px-2 py-1 rounded border border-gray-100">WELCOME</div>
                  <button class="text-xs font-bold text-white bg-brand hover:bg-brand-light px-4 py-2 rounded-lg transition-colors shadow-sm">Lưu Mã</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="scroll-mt-24" id="gift-section">
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2 rounded-lg bg-[#ff9800]/10 text-[#ff9800]">
                  <Icon icon="material-symbols:redeem-rounded" width="24" height="24" style={{ color: '#ff9800' }} />                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-text-main">Quà Tặng Kèm</h2>
              </div>
              <p class="text-text-muted">Mua đồng hồ, nhận thêm quà giá trị. Số lượng có hạn.</p>
            </div>
            <Link class="text-brand font-bold hover:underline flex items-center gap-1" to="#">
              Xem tất cả <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />
            </Link>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-[#ff9800]/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1 relative">
              <div class="absolute top-0 left-0 bg-[#ff9800] text-white text-[10px] font-bold px-3 py-1 rounded-br-xl z-20 shadow-md">
                TẶNG KÈM
              </div>
              <div class="relative aspect-[4/3] w-full overflow-hidden bg-bg-subtle p-6 flex items-center justify-center">
                <img alt="Gift Box" class="object-contain w-3/4 h-3/4 group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb01KF5Y2kACAkiP63I71WLad1AnGospSoodeobAPfti1hAf34tTQaXXNsc-wRAbHFS_43ivS8INxJ6BFARbg43-pSglPtgMZvpOFikNd-p9wg6wJyY7JfmLIjzQ0UCFhqPzLhsXJrcnlc9n7NHQow67gsMZQ0z0T7L8mqqhbRGrE6tq0WTYC0xqpMqkNLyFzj25WZQSTQicUY4Gvw8j4Rb-Ql7E9AuV8Lk1ahmqZbxAGVP_puVuUEozeGgW3kfZVBDOIyYOjnTVQ" />
                <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-gray-100 text-text-muted">Trị giá 500k</div>
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 class="font-bold text-text-main text-lg mb-1 group-hover:text-[#ff9800] transition-colors">Bộ Vệ Sinh Cao Cấp</h3>
                  <p class="text-sm text-text-muted line-clamp-2">Gồm khăn lau chuyên dụng, dung dịch làm sạch và chổi quét bụi mịn.</p>
                </div>
                <div class="mt-auto pt-4 border-t border-dashed border-gray-100">
                  <p class="text-xs font-bold text-[#ff9800] uppercase tracking-wider mb-2">Điều kiện nhận quà:</p>
                  <div class="bg-[#ff9800]/5 border border-[#ff9800]/20 rounded-lg p-2.5 flex items-center justify-center gap-2">
                    <Icon icon="material-symbols:check-circle-outline-rounded" width="24" height="24" style={{ color: '#ff9800' }} />
                    <span class="text-sm font-medium text-text-main">Đơn hàng từ 3.000.000₫</span>
                  </div>
                  <button class="w-full mt-4 py-2.5 rounded-xl bg-white border border-[#ff9800] text-[#ff9800] font-bold hover:bg-[#ff9800] hover:text-white transition-all text-sm shadow-sm">Mua Ngay</button>
                </div>
              </div>
            </div>
            <div class="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-[#ff9800]/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1 relative">
              <div class="absolute top-0 left-0 bg-[#ff9800] text-white text-[10px] font-bold px-3 py-1 rounded-br-xl z-20 shadow-md">
                TẶNG KÈM
              </div>
              <div class="relative aspect-[4/3] w-full overflow-hidden bg-bg-subtle p-6 flex items-center justify-center">
                <img alt="Leather Strap" class="object-contain w-3/4 h-3/4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgijQ1xMDDEhY5HFNH8bv6PW2Qu1gJ64WcxIIPi4WDQWCCYkeiqpMG0-bL-ORAkbtSm1aJ4fum5yija977XnE1uAMiyLOqxFq5eNbPM6aKplHHNlS3Bohay2kMXoCEFCS1uAkXKL-NlFBUITXXPlwQsuwuMD9hA-TJCmDXBVkF6z1i9WwWUO_USciH8WC0YG7E1Fj_5ITTH0Pir502cx_40V-OJ6IKPVDs4UyP9rvfd1BFqEqYgahSbZH2k9b0Wiv-FRNEVKF-gV4" />
                <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-gray-100 text-text-muted">Trị giá 850k</div>
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 class="font-bold text-text-main text-lg mb-1 group-hover:text-[#ff9800] transition-colors">Dây Da Cá Sấu</h3>
                  <p class="text-sm text-text-muted line-clamp-2">Dây da thật 100%, thiết kế sang trọng, phù hợp với mọi loại đồng hồ.</p>
                </div>
                <div class="mt-auto pt-4 border-t border-dashed border-gray-100">
                  <p class="text-xs font-bold text-[#ff9800] uppercase tracking-wider mb-2">Điều kiện nhận quà:</p>
                  <div class="bg-[#ff9800]/5 border border-[#ff9800]/20 rounded-lg p-2.5 flex items-center justify-center gap-2">
                    <Icon icon="material-symbols:check-circle-outline-rounded" width="24" height="24" style={{ color: '#ff9800' }} />
                    <span class="text-sm font-medium text-text-main">Mua đồng hồ Tissot bất kỳ</span>
                  </div>
                  <button class="w-full mt-4 py-2.5 rounded-xl bg-white border border-[#ff9800] text-[#ff9800] font-bold hover:bg-[#ff9800] hover:text-white transition-all text-sm shadow-sm">Xem Sản Phẩm</button>
                </div>
              </div>
            </div>
            <div class="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-[#ff9800]/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1 relative">
              <div class="absolute top-0 left-0 bg-[#ff9800] text-white text-[10px] font-bold px-3 py-1 rounded-br-xl z-20 shadow-md">
                TẶNG KÈM
              </div>
              <div class="relative aspect-[4/3] w-full overflow-hidden bg-bg-subtle p-6 flex items-center justify-center">
                <img alt="Watch Winder" class="object-contain w-3/4 h-3/4 group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCczKYx2lBs1YlZ-WDnXQtLfnWN4U4GT1oM2QpKBmpdPn_xbjX_YJdEWtyHNwEkoOLul0jgrbO-Az7NeHnurlLcZfd1MvC6PNlpZKVdSTXSsc9xm94AnAH_azClbhwdSnvd2OH2oIvbQy4Bxy48Fd-FAPrkBSwGB-oei0e31NiYrjxAi4WdxEiZsidtUyETvB9EDgagyrmwsZ_WWzWTGrK_nLcy3SBR72jlwvrhX1Fgtsz088pbskxUkMQuvMd3drkzQ3mxgPeoRqQ" />
                <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-gray-100 text-text-muted">Trị giá 2.5tr</div>
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 class="font-bold text-text-main text-lg mb-1 group-hover:text-[#ff9800] transition-colors">Hộp Xoay Đồng Hồ</h3>
                  <p class="text-sm text-text-muted line-clamp-2">Hộp xoay (Watch Winder) cao cấp 1 xoay, giữ đồng hồ cơ luôn chạy đúng giờ.</p>
                </div>
                <div class="mt-auto pt-4 border-t border-dashed border-gray-100">
                  <p class="text-xs font-bold text-[#ff9800] uppercase tracking-wider mb-2">Điều kiện nhận quà:</p>
                  <div class="bg-[#ff9800]/5 border border-[#ff9800]/20 rounded-lg p-2.5 flex items-center justify-center gap-2">
                    <Icon icon="material-symbols:check-circle-outline-rounded" width="24" height="24" style={{ color: '#ff9800' }} />
                    <span class="text-sm font-medium text-text-main">Đơn hàng &gt; 20.000.000₫</span>
                  </div>
                  <button class="w-full mt-4 py-2.5 rounded-xl bg-white border border-[#ff9800] text-[#ff9800] font-bold hover:bg-[#ff9800] hover:text-white transition-all text-sm shadow-sm">Mua Ngay</button>
                </div>
              </div>
            </div>
            <div class="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-[#ff9800]/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1 relative">
              <div class="absolute top-0 left-0 bg-[#ff9800] text-white text-[10px] font-bold px-3 py-1 rounded-br-xl z-20 shadow-md">
                TẶNG KÈM
              </div>
              <div class="relative aspect-[4/3] w-full overflow-hidden bg-bg-subtle p-6 flex items-center justify-center">
                <img alt="Cap" class="object-contain w-3/4 h-3/4 group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3gwfJye9XzEmKwvG4QspZWW1C37tN69GvSZquglJzQz4bPcfgEUeDZlIaQWV9Tlg87gA6b-9vEV-voX4HsCokcn_Zv93vnPWsGOyxlHGwD85sWxN00iyD33LH-9ws2Hb6oj9i4a4FSdO9MTEYdKo1CMjG62Xa1lDLP0UQiUZKeipxugcpIhLBrrYqIf3LzZqBcF-eucQdPAWhGg3iHHCK1La5Q2UOuQmZ12GBSxfq59uUbg47Dcc8CCQbx3qeWHEfY2mMRpmILz0" />
                <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-gray-100 text-text-muted">Trị giá 300k</div>
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 class="font-bold text-text-main text-lg mb-1 group-hover:text-[#ff9800] transition-colors">Nón Kết Thời Trang</h3>
                  <p class="text-sm text-text-muted line-clamp-2">Nón kết độc quyền in logo WatchStore, chất liệu kaki cao cấp.</p>
                </div>
                <div class="mt-auto pt-4 border-t border-dashed border-gray-100">
                  <p class="text-xs font-bold text-[#ff9800] uppercase tracking-wider mb-2">Điều kiện nhận quà:</p>
                  <div class="bg-[#ff9800]/5 border border-[#ff9800]/20 rounded-lg p-2.5 flex items-center justify-center gap-2">
                    <Icon icon="material-symbols:check-circle-outline-rounded" width="24" height="24" style={{ color: '#ff9800' }} />
                    <span class="text-sm font-medium text-text-main">Mua đồng hồ G-Shock</span>
                  </div>
                  <button class="w-full mt-4 py-2.5 rounded-xl bg-white border border-[#ff9800] text-[#ff9800] font-bold hover:bg-[#ff9800] hover:text-white transition-all text-sm shadow-sm">Xem Sản Phẩm</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="mt-4 rounded-3xl bg-gradient-to-r from-black to-gray-800 p-8 md:p-12 relative overflow-hidden text-white shadow-card">
          <div class="absolute top-0 right-0 w-64 h-64 bg-brand rounded-full blur-[100px] opacity-20"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#ff9800] rounded-full blur-[80px] opacity-20"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-2xl md:text-3xl font-bold mb-3">Đăng ký nhận mã VIP</h2>
              <p class="text-gray-300 text-sm md:text-base max-w-lg">Nhận ngay voucher độc quyền và thông tin về quà tặng mới nhất trực tiếp vào email của bạn mỗi tuần.</p>
            </div>
            <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input class="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/20 focus:border-white w-full sm:w-80 backdrop-blur-sm" placeholder="Email của bạn" type="email" />
              <button class="px-6 py-3 rounded-xl bg-brand text-white font-bold hover:bg-white hover:text-brand transition-all shadow-lg shadow-brand/30">Đăng ký</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
