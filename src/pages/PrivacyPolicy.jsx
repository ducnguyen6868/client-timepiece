import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('cam-ket');

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

   useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-8">
              <nav className="flex flex-col space-y-1">
                <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Nội dung chính
                </p>
                {[
                  { id: 'cam-ket', icon: 'mdi:handshake', label: 'Cam kết của chúng tôi' },
                  { id: 'thong-tin-thu-thap', icon: 'mdi:folder-open', label: 'Thông tin thu thập' },
                  { id: 'su-dung-du-lieu', icon: 'mdi:cog', label: 'Mục đích sử dụng' },
                  { id: 'bao-mat', icon: 'mdi:lock', label: 'Bảo mật & Lưu trữ' },
                  { id: 'quyen-loi', icon: 'mdi:gavel', label: 'Quyền lợi của bạn' },
                  { id: 'cookie', icon: 'mdi:cookie', label: 'Cookie' },
                ].map((item) => (
                  <Link
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg border-l-4 transition-all cursor-pointer ${
                      activeSection === item.id
                        ? 'text-brand bg-teal-50 border-brand'
                        : 'text-gray-600 hover:text-brand hover:bg-gray-50 border-transparent hover:border-teal-300'
                    }`}
                  >
                    <Icon icon={item.icon} className="text-[20px]" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mini Support Card */}
              <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
                <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center text-brand mb-3">
                  <Icon icon="mdi:headset" className="text-[24px]" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Cần hỗ trợ thêm?</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Đội ngũ pháp lý của chúng tôi luôn sẵn sàng giải đáp thắc mắc của bạn.
                </p>
                <Link className="text-sm font-bold text-brand hover:underline" to="#">
                  Liên hệ ngay →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 flex flex-col gap-12">
            {/* Section: Commitment */}
            <section className="scroll-mt-32" id="cam-ket">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon icon="mdi:eye" className="text-[28px]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-bold mb-2">Minh bạch tuyệt đối</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Chúng tôi luôn rõ ràng về dữ liệu được thu thập và lý do tại sao chúng tôi cần nó.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <Icon icon="mdi:security" className="text-[28px]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-bold mb-2">Tiêu chuẩn an toàn</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Hệ thống bảo mật đa lớp và mã hóa SSL 256-bit bảo vệ mọi giao dịch.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Icon icon="mdi:account-cog" className="text-[28px]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-bold mb-2">Quyền kiểm soát</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Dữ liệu là của bạn. Bạn có toàn quyền truy cập, chỉnh sửa hoặc xóa bỏ.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Information Collection */}
            <section className="scroll-mt-32 bg-white rounded-3xl p-8 border border-teal-50" id="thong-tin-thu-thap">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-brand font-bold text-sm">
                  1
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Thông tin chúng tôi thu thập</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8">
                <div className="py-4 border-t border-dashed border-gray-200 md:border-t-0">
                  <span className="text-sm font-semibold text-brand uppercase tracking-wide">
                    Cá nhân
                  </span>
                </div>
                <div className="py-4 border-t border-gray-100 md:border-t-0">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Khi bạn đăng ký tài khoản hoặc đặt hàng, chúng tôi thu thập:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                    <li>Họ và tên đầy đủ</li>
                    <li>Địa chỉ email và số điện thoại liên hệ</li>
                    <li>Địa chỉ giao hàng và địa chỉ thanh toán</li>
                  </ul>
                </div>

                <div className="py-4 border-t border-dashed border-gray-200">
                  <span className="text-sm font-semibold text-brand uppercase tracking-wide">
                    Thanh toán
                  </span>
                </div>
                <div className="py-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    Dữ liệu thẻ thanh toán (số thẻ, CVV) được mã hóa và xử lý trực tiếp bởi các cổng thanh toán đối tác (VNPay, Momo, Visa).{' '}
                    <strong className="text-gray-900">
                      Chúng tôi không lưu trữ thông tin thẻ của bạn trên hệ thống.
                    </strong>
                  </p>
                </div>

                <div className="py-4 border-t border-dashed border-gray-200">
                  <span className="text-sm font-semibold text-brand uppercase tracking-wide">
                    Thiết bị & Web
                  </span>
                </div>
                <div className="py-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Chúng tôi tự động thu thập một số thông tin kỹ thuật để cải thiện trải nghiệm:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Địa chỉ IP', 'Loại trình duyệt', 'Thời gian truy cập', 'Sản phẩm đã xem'].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Section: How we use data */}
            <section className="scroll-mt-32" id="su-dung-du-lieu">
              <div className="flex items-center gap-3 mb-6 px-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-brand font-bold text-sm">
                  2
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Cách chúng tôi sử dụng dữ liệu</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: 'mdi:package-variant',
                    title: 'Xử lý đơn hàng',
                    desc: 'Đảm bảo sản phẩm được giao đúng người, đúng thời điểm và gửi thông báo cập nhật trạng thái đơn hàng qua Email/SMS.',
                  },
                  {
                    icon: 'mdi:auto-fix',
                    title: 'Cá nhân hóa trải nghiệm',
                    desc: 'Gợi ý các mẫu đồng hồ phù hợp với sở thích của bạn và ghi nhớ giỏ hàng khi bạn quay lại website.',
                  },
                  {
                    icon: 'mdi:bullhorn',
                    title: 'Tiếp thị & Ưu đãi',
                    desc: 'Gửi thông tin về các bộ sưu tập mới hoặc mã giảm giá độc quyền. Bạn có thể hủy đăng ký bất cứ lúc nào.',
                  },
                  {
                    icon: 'mdi:shield-lock',
                    title: 'Phát hiện gian lận',
                    desc: 'Giám sát các giao dịch bất thường để ngăn chặn hành vi lừa đảo và bảo vệ tài khoản của bạn.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-white p-6 rounded-2xl border border-transparent hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 transition-all duration-300"
                  >
                    <div className="mb-4 text-brand">
                      <Icon icon={item.icon} className="text-[32px]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Security & Storage */}
            <section className="scroll-mt-32 bg-white rounded-3xl p-8 border border-teal-50" id="bao-mat">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-brand font-bold text-sm">
                  3
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Bảo mật & Lưu trữ dữ liệu</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Icon icon="mdi:shield-check" className="text-[24px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Mã hóa dữ liệu</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Mọi thông tin nhạy cảm được mã hóa bằng chuẩn SSL/TLS 256-bit khi truyền tải và AES-256 khi lưu trữ. Đây là tiêu chuẩn bảo mật cấp ngân hàng, đảm bảo dữ liệu của bạn được bảo vệ tối đa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon icon="mdi:server-security" className="text-[24px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Hệ thống lưu trữ an toàn</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Dữ liệu được lưu trữ trên các máy chủ bảo mật tại các trung tâm dữ liệu đạt chứng nhận ISO 27001. Chúng tôi thực hiện sao lưu định kỳ và có kế hoạch phục hồi thảm họa để đảm bảo tính liên tục của dịch vụ.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <Icon icon="mdi:account-lock" className="text-[24px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kiểm soát truy cập</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu cá nhân của bạn, và họ phải tuân thủ nghiêm ngặt các cam kết bảo mật. Mọi truy cập đều được ghi lại và kiểm tra thường xuyên.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex gap-3">
                    <Icon icon="mdi:clock-outline" className="text-amber-600 text-[20px] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Thời gian lưu trữ</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Chúng tôi chỉ lưu trữ dữ liệu của bạn trong thời gian cần thiết để cung cấp dịch vụ hoặc theo yêu cầu pháp luật. Dữ liệu không còn cần thiết sẽ được xóa bỏ an toàn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Your Rights */}
            <section className="scroll-mt-32" id="quyen-loi">
              <div className="flex items-center gap-3 mb-6 px-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-brand font-bold text-sm">
                  4
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Quyền lợi của bạn</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: 'mdi:eye',
                    title: 'Quyền truy cập',
                    desc: 'Yêu cầu xem dữ liệu cá nhân mà chúng tôi đang lưu trữ về bạn',
                  },
                  {
                    icon: 'mdi:pencil',
                    title: 'Quyền chỉnh sửa',
                    desc: 'Cập nhật hoặc sửa đổi thông tin không chính xác trong tài khoản',
                  },
                  {
                    icon: 'mdi:delete',
                    title: 'Quyền xóa dữ liệu',
                    desc: 'Yêu cầu xóa bỏ dữ liệu cá nhân của bạn khỏi hệ thống',
                  },
                  {
                    icon: 'mdi:cancel',
                    title: 'Quyền từ chối',
                    desc: 'Từ chối việc sử dụng dữ liệu cho mục đích tiếp thị',
                  },
                  {
                    icon: 'mdi:download',
                    title: 'Quyền di chuyển dữ liệu',
                    desc: 'Tải xuống dữ liệu của bạn dưới định dạng có thể đọc được',
                  },
                  {
                    icon: 'mdi:pause-circle',
                    title: 'Quyền hạn chế xử lý',
                    desc: 'Yêu cầu giới hạn cách chúng tôi sử dụng dữ liệu của bạn',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 text-brand flex items-center justify-center">
                      <Icon icon={item.icon} className="text-[20px]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-5 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:information" className="text-brand text-[24px] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Cách thực hiện quyền của bạn</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      Để thực hiện bất kỳ quyền nào ở trên, vui lòng liên hệ với chúng tôi qua email{' '}
                      <Link to="mailto:privacy@watchstore.vn" className="text-brand font-bold underline">
                        privacy@watchstore.vn
                      </Link>{' '}
                      hoặc gọi hotline{' '}
                      <span className="text-brand font-bold">1900 6868</span>. Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 30 ngày.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Cookie Policy */}
            <section className="scroll-mt-32" id="cookie">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="mdi:cookie" className="text-teal-400 text-[32px]" />
                      <h2 className="text-2xl font-bold">Chính sách Cookie</h2>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      Website của chúng tôi sử dụng cookie để đảm bảo hoạt động ổn định và phân tích lưu lượng truy cập. Bạn có thể tùy chỉnh cài đặt cookie trên trình duyệt của mình.
                    </p>
                    <div className="space-y-3">
                      <details className="group bg-white/5 border border-white/10 rounded-lg open:bg-white/10 transition-all">
                        <summary className="flex items-center justify-between p-4 cursor-pointer">
                          <span className="font-bold text-sm">Cookie thiết yếu</span>
                          <Icon icon="mdi:chevron-down" className="text-gray-400 text-[20px] group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-300 border-t border-white/10 pt-3 mt-1">
                          Bắt buộc để website hoạt động (ví dụ: đăng nhập, giỏ hàng). Không thể tắt.
                        </div>
                      </details>
                      <details className="group bg-white/5 border border-white/10 rounded-lg open:bg-white/10 transition-all">
                        <summary className="flex items-center justify-between p-4 cursor-pointer">
                          <span className="font-bold text-sm">Cookie phân tích</span>
                          <Icon icon="mdi:chevron-down" className="text-gray-400 text-[20px] group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-300 border-t border-white/10 pt-3 mt-1">
                          Giúp chúng tôi hiểu cách bạn tương tác với website thông qua Google Analytics. Dữ liệu được ẩn danh.
                        </div>
                      </details>
                    </div>
                  </div>
                  <div className="md:w-64 flex flex-col justify-center items-start">
                    <div className="p-4 bg-white/10 rounded-xl w-full mb-4">
                      <h4 className="font-bold text-sm mb-1">Trạng thái hiện tại</h4>
                      <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Đang hoạt động
                      </div>
                    </div>
                    <button className="w-full py-3 bg-brand hover:bg-teal-700 text-white text-sm font-bold rounded-lg transition-colors">
                      Quản lý Cookie
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Contact Footer */}
            <section className="mt-8 border-t border-teal-100 pt-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Bạn vẫn còn thắc mắc?</h3>
                  <p className="text-gray-500 text-sm">
                    Liên hệ trực tiếp với bộ phận Bảo mật dữ liệu của WatchStore.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    to="mailto:privacy@watchstore.vn"
                  >
                    <Icon icon="mdi:email" className="text-[18px]" />
                    privacy@watchstore.vn
                  </Link>
                  <Link
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-black transition-colors shadow-lg"
                    to="tel:1900xxxx"
                  >
                    <Icon icon="mdi:phone" className="text-[18px]" />
                    1900 6868
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}