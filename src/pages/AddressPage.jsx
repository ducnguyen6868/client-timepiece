import { Icon } from '@iconify/react';

export default function AddressPage() {
  return (
    <>
      <main class="flex-1 flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-slate-900">Sổ địa chỉ</h1>
            <p class="text-slate-500 text-sm mt-1">Quản lý danh sách địa chỉ nhận hàng và hóa đơn của bạn</p>
          </div>
          <button class="flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white text-sm font-semibold py-2.5 px-5 rounded-lg shadow-lg shadow-brand/20 transition-all hover:scale-105 active:scale-95">
            <Icon icon="material-symbols:add-2-rounded" className="text-[18px]" />            Thêm địa chỉ mới
          </button>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white rounded-xl p-6 border border-brand/30 shadow-[0_0_0_1px_rgba(236,19,55,0.1)] relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Icon icon="material-symbols:location-on-outline-rounded"  className='text-brand text-[100px]'/>
            </div>
            <div class="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div class="flex flex-col gap-3">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="text-lg font-bold text-slate-900">Nguyễn Văn A</span>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-700 border border-green-200">Mặc định</span>
                    <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Nhà riêng</span>
                  </div>
                </div>
                <div class="text-sm text-slate-600 space-y-2">
                  <div class="flex items-center gap-2">
                    <Icon icon="material-symbols:call" className="text-[18px] text-slate-400 mt-0.5" />
                    <span class="font-medium">(+84) 912 345 678</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <Icon icon="material-symbols:home" className="text-[18px] text-slate-400 mt-0.5" />
                    <span class="leading-relaxed">Số 15, Ngõ 68, Đường Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Thành phố Hà Nội</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                <div class="flex items-center gap-3">
                  <button class="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">Cập nhật</button>
                </div>
                <button class="hidden md:inline-flex px-3 py-1.5 rounded bg-gray-50 text-gray-400 text-xs font-medium cursor-not-allowed select-none border border-gray-100" disabled="">
                  Đã là mặc định
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-brand/30 hover:shadow-md transition-all relative group">
            <div class="flex flex-col md:flex-row justify-between gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="text-lg font-bold text-slate-900">Văn phòng Công ty</span>
                  <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Văn phòng</span>
                </div>
                <div class="text-sm text-slate-600 space-y-2">
                  <div class="flex items-center gap-2">
                    <Icon icon="material-symbols:call" className="text-[18px] text-slate-400 mt-0.5" />
                    <span class="font-medium">(+84) 987 654 321</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <Icon icon="material-symbols:home" className="text-[18px] text-slate-400 mt-0.5" />
                    <span class="leading-relaxed">Tầng 12, Tòa nhà Keangnam, Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Thành phố Hà Nội</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                <div class="flex items-center gap-4">
                  <button class="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">Cập nhật</button>
                  <span class="text-gray-300">|</span>
                  <button class="text-sm font-medium text-red-500 hover:text-red-600 hover:underline transition-colors">Xóa</button>
                </div>
                <button class="px-3 py-1.5 rounded border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-brand hover:border-brand/30 text-xs font-medium transition-all">
                  Thiết lập mặc định
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-brand/30 hover:shadow-md transition-all relative group">
            <div class="flex flex-col md:flex-row justify-between gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="text-lg font-bold text-slate-900">Nhà Bố Mẹ</span>
                  <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Khác</span>
                </div>
                <div class="text-sm text-slate-600 space-y-2">
                  <div class="flex items-center gap-2">
                    <Icon icon="material-symbols:call" className="text-[18px] text-slate-400 mt-0.5" />
                    <span class="font-medium">(+84) 901 222 333</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <Icon icon="material-symbols:home" className="text-[18px] text-slate-400 mt-0.5" />
                    <span class="leading-relaxed">Số 5, Đường Trần Hưng Đạo, Phường 1, Thành phố Thái Bình, Tỉnh Thái Bình</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                <div class="flex items-center gap-4">
                  <button class="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">Cập nhật</button>
                  <span class="text-gray-300">|</span>
                  <button class="text-sm font-medium text-red-500 hover:text-red-600 hover:underline transition-colors">Xóa</button>
                </div>
                <button class="px-3 py-1.5 rounded border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-brand hover:border-brand/30 text-xs font-medium transition-all">
                  Thiết lập mặc định
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
