import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';

export default function TermsOfUse() {
  const [activeSection, setActiveSection] = useState('section-1');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    { id: 'section-1', label: '1. Giới thiệu chung' },
    { id: 'section-2', label: '2. Tài khoản & Đăng ký' },
    { id: 'section-3', label: '3. Chính sách đặt hàng' },
    { id: 'section-4', label: '4. Thanh toán & Giá cả' },
    { id: 'section-5', label: '5. Vận chuyển & Giao nhận' },
    { id: 'section-6', label: '6. Đổi trả & Bảo hành' },
    { id: 'section-7', label: '7. Bản quyền thương hiệu' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Search within terms */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:magnify" className="text-slate-400 text-xl" />
              </span>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                placeholder="Tìm kiếm trong điều khoản..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Navigation Links */}
            <nav aria-label="Sidebar" className="space-y-1">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md border-l-4 transition-all cursor-pointer ${
                    activeSection === section.id
                      ? 'bg-teal-100 text-brand border-brand'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent'
                  }`}
                >
                  <span className="truncate">{section.label}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Support Widget */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Bạn cần hỗ trợ thêm?
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Đội ngũ pháp lý và CSKH của chúng tôi luôn sẵn sàng giải đáp thắc mắc.
              </p>
              <button className="w-full py-2 px-4 bg-white border border-slate-200 hover:border-brand text-slate-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                <Icon icon="mdi:email" className="text-sm" />
                Liên hệ ngay
              </button>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="prose prose-slate prose-lg max-w-none">
            {/* Section 1 */}
            <section className="scroll-mt-24 mb-12" id="section-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Giới thiệu chung</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed">
                  Trang web này được vận hành bởi <strong>Timepiece</strong>. Trong toàn bộ trang web, các thuật ngữ "chúng tôi", "của chúng tôi" đề cập đến Timepiece. Chúng tôi cung cấp trang web này, bao gồm tất cả thông tin, công cụ và dịch vụ có sẵn từ trang web này cho bạn, người dùng, với điều kiện bạn chấp nhận tất cả các điều khoản, điều kiện, chính sách và thông báo được nêu tại đây.
                </p>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Bằng cách truy cập trang web của chúng tôi và/hoặc mua hàng từ chúng tôi, bạn tham gia vào "Dịch vụ" của chúng tôi và đồng ý bị ràng buộc bởi các điều khoản và điều kiện sau đây.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="scroll-mt-24 mb-12" id="section-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Tài khoản & Đăng ký</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>
                    Để sử dụng một số tính năng của Website, bạn có thể cần phải tạo một tài khoản. Bạn cam kết rằng mọi thông tin cung cấp là chính xác và đầy đủ.
                  </li>
                  <li>
                    Bạn chịu trách nhiệm bảo mật thông tin đăng nhập tài khoản của mình và mọi hoạt động diễn ra dưới tài khoản đó.
                  </li>
                  <li>
                    Chúng tôi có quyền đình chỉ hoặc khóa tài khoản nếu phát hiện hành vi vi phạm điều khoản hoặc gian lận.
                  </li>
                </ul>
                <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                  <Icon icon="mdi:alert" className="text-yellow-600 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 text-sm mb-1">
                      Lưu ý bảo mật
                    </h4>
                    <p className="text-sm text-yellow-700">
                      Timepiece sẽ không bao giờ yêu cầu mật khẩu của bạn qua email hoặc điện thoại. Vui lòng cảnh giác với các hành vi giả mạo.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="scroll-mt-24 mb-12" id="section-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Chính sách đặt hàng</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed mb-6">
                  Chúng tôi cam kết cung cấp thông tin sản phẩm chính xác nhất có thể. Tuy nhiên, đôi khi có thể xảy ra sai sót về giá cả hoặc tình trạng còn hàng.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:check-circle" className="text-brand text-xl" />
                      Xác nhận đơn hàng
                    </h4>
                    <p className="text-sm text-slate-500">
                      Đơn hàng chỉ được coi là đã xác nhận khi bạn nhận được email hoặc tin nhắn xác nhận từ hệ thống của chúng tôi.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:cancel" className="text-red-500 text-xl" />
                      Hủy đơn hàng
                    </h4>
                    <p className="text-sm text-slate-500">
                      Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì bất kỳ lý do nào như: hết hàng, lỗi giá, hoặc nghi ngờ gian lận.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="scroll-mt-24 mb-12" id="section-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Thanh toán & Giá cả</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed mb-6">
                  Giá sản phẩm được niêm yết bằng Việt Nam Đồng (VND) và đã bao gồm thuế giá trị gia tăng (VAT), trừ khi có ghi chú khác.
                </p>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                    Phương thức thanh toán chấp nhận
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: 'mdi:credit-card', label: 'Thẻ tín dụng/Ghi nợ' },
                      { icon: 'mdi:bank', label: 'Chuyển khoản ngân hàng' },
                      { icon: 'mdi:truck-delivery', label: 'COD (Thanh toán khi nhận hàng)' },
                      { icon: 'mdi:qrcode', label: 'Ví điện tử (Momo, ZaloPay)' },
                    ].map((method, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg"
                      >
                        <Icon icon={method.icon} className="text-brand text-xl" />
                        <span className="text-sm font-medium">{method.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="scroll-mt-24 mb-12" id="section-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Vận chuyển & Giao nhận</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1">
                    <p className="mb-4 text-slate-700 leading-relaxed">
                      Timepiece hợp tác với các đơn vị vận chuyển uy tín để đảm bảo sản phẩm đến tay bạn nhanh chóng và an toàn nhất.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Nội thành Hà Nội & TP.HCM: Giao trong 24h',
                        'Các tỉnh thành khác: 2-4 ngày làm việc',
                        'Miễn phí vận chuyển cho đơn hàng từ 2.000.000đ',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-brand flex-shrink-0"></span>
                          <span className="text-sm text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden relative shadow-lg">
                    <img
                      alt="Shipping logistics map background"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&h=300&fit=crop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-medium flex items-center gap-1">
                        <Icon icon="mdi:truck-delivery" className="text-teal-400 text-base" />
                        Đối tác vận chuyển uy tín
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="scroll-mt-24 mb-12" id="section-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Đổi trả & Bảo hành</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <div className="space-y-4">
                  <details className="group bg-white rounded-xl border border-slate-100" open>
                    <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                      <span className="font-semibold text-slate-900">
                        Chính sách đổi trả 7 ngày
                      </span>
                      <span className="transition group-open:rotate-180">
                        <Icon icon="mdi:chevron-down" className="text-slate-400 text-xl" />
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 text-sm border-t border-slate-100 pt-4">
                      Khách hàng có quyền đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm có lỗi từ nhà sản xuất hoặc hư hỏng do vận chuyển. Sản phẩm đổi trả phải còn nguyên tem mác, hộp và chưa qua sử dụng.
                    </div>
                  </details>
                  <details className="group bg-white rounded-xl border border-slate-100">
                    <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                      <span className="font-semibold text-slate-900">
                        Chế độ bảo hành quốc tế
                      </span>
                      <span className="transition group-open:rotate-180">
                        <Icon icon="mdi:chevron-down" className="text-slate-400 text-xl" />
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 text-sm border-t border-slate-100 pt-4">
                      Tất cả đồng hồ chính hãng bán tại Timepiece đều được hưởng chế độ bảo hành quốc tế theo quy định của hãng (thường là 1-5 năm tùy thương hiệu). Ngoài ra, chúng tôi hỗ trợ bảo hành pin trọn đời cho các dòng máy Quartz.
                    </div>
                  </details>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="scroll-mt-24" id="section-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Bản quyền thương hiệu</h2>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed">
                  Mọi nội dung trên trang web này, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng nút, hình ảnh, đoạn âm thanh, tải xuống kỹ thuật số, biên soạn dữ liệu và phần mềm, là tài sản của Timepiece hoặc nhà cung cấp nội dung của nó và được bảo vệ bởi luật bản quyền Việt Nam và quốc tế.
                </p>
                <p className="mt-4 text-sm text-slate-500 italic">
                  Nghiêm cấm mọi hành vi sao chép, tái bản hoặc sử dụng thương mại mà không có sự đồng ý bằng văn bản của chúng tôi.
                </p>
              </div>
            </section>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Vẫn còn thắc mắc về điều khoản?
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Chúng tôi hiểu rằng các văn bản pháp lý có thể gây khó hiểu. Đừng ngần ngại liên hệ với chúng tôi để được giải thích rõ hơn.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-brand/30">
                  Liên hệ Bộ phận Pháp lý
                </button>
                <button className="px-8 py-3 bg-transparent border border-slate-600 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Xem câu hỏi thường gặp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}