import { useState , useEffect} from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function ReturnAndWarranty() {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    const handleSearch = () => {
        console.log('Tìm kiếm:', searchQuery);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-100 font-sans">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(15, 33, 35, 0.7), rgba(15, 33, 35, 0.8)), url("https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&h=600&fit=crop")',
                    }}
                ></div>
                <div className="relative max-w-[960px] mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center">
                    <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
                        Cam Kết An Tâm Tuyệt Đối
                    </h1>
                    <p className="text-gray-200 text-lg sm:text-xl font-normal max-w-2xl mb-10">
                        Chúng tôi tin tưởng vào chất lượng đồng hồ của mình. Khám phá chính sách minh bạch về đổi trả, trao đổi và bảo hành.
                    </p>
                    <div className="w-full max-w-xl">
                        <div className="relative flex items-center w-full h-14 rounded-xl focus-within:ring-2 ring-teal-500 shadow-lg bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-brand">
                                <Icon icon="mdi:magnify" className="text-2xl" />
                            </div>
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-900 pr-2 bg-transparent"
                                placeholder="Tìm kiếm (ví dụ: 'Thời gian đổi trả', 'Bảo hành pin')"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-brand hover:bg-brand-hover text-white font-bold h-full px-8 transition-colors"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">
                {/* Quick Navigation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {[
                        {
                            icon: 'mdi:calendar-month',
                            title: 'Đổi trả 30 ngày',
                            desc: 'Đổi trả dễ dàng trong vòng 30 ngày kể từ ngày nhận hàng.',
                        },
                        {
                            icon: 'mdi:shield-check',
                            title: 'Yêu cầu bảo hành',
                            desc: 'Bảo hành toàn diện 2 năm cho bộ máy đồng hồ.',
                        },
                        {
                            icon: 'mdi:tools',
                            title: 'Dịch vụ sửa chữa',
                            desc: 'Kỹ thuật viên được chứng nhận cho mọi thương hiệu.',
                        },
                        {
                            icon: 'mdi:sync',
                            title: 'Chính sách đổi hàng',
                            desc: 'Quy trình đơn giản để đổi sang kiểu dáng khác.',
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:border-brand transition-colors cursor-pointer group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                                <Icon icon={item.icon} className="text-[28px]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Main Policy Content */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        {/* Timeline Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Icon icon="mdi:information" className="text-brand text-3xl" />
                                <h2 className="text-2xl font-bold text-gray-900">Cách Đổi Trả Đồng Hồ</h2>
                            </div>
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                                <div className="relative">
                                    {/* Vertical line on mobile */}
                                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200 lg:hidden"></div>
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
                                        {[
                                            {
                                                icon: 'mdi:clipboard-text',
                                                title: 'Yêu cầu trực tuyến',
                                                desc: 'Gửi biểu mẫu đổi trả trong trang quản lý tài khoản.',
                                                active: true,
                                            },
                                            {
                                                icon: 'mdi:package-variant',
                                                title: 'Đóng gói & Gửi',
                                                desc: 'Sử dụng bao bì gốc và tem gửi trả trước.',
                                                active: false,
                                            },
                                            {
                                                icon: 'mdi:magnify-scan',
                                                title: 'Kiểm tra',
                                                desc: 'Chuyên gia kiểm tra tình trạng (2-3 ngày).',
                                                active: false,
                                            },
                                            {
                                                icon: 'mdi:credit-card',
                                                title: 'Hoàn tiền',
                                                desc: 'Tiền được hoàn về phương thức thanh toán gốc.',
                                                active: false,
                                            },
                                        ].map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-3 lg:text-center z-10"
                                            >
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0 ${step.active
                                                            ? 'bg-brand text-white'
                                                            : 'bg-white border-2 border-gray-300 text-gray-400'
                                                        }`}
                                                >
                                                    <Icon icon={step.icon} className="text-xl" />
                                                </div>
                                                {idx < 3 && (
                                                    <div className="hidden lg:block absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Detailed Policies (Accordion) */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Icon icon="mdi:gavel" className="text-brand text-3xl" />
                                <h2 className="text-2xl font-bold text-gray-900">Chính Sách Chi Tiết</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Accordion Item 1 */}
                                <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden open:ring-1 open:ring-teal-300 transition-all">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <span className="text-lg font-bold text-gray-900">
                                            Điều Kiện Đổi Trả Chung
                                        </span>
                                        <Icon
                                            icon="mdi:chevron-down"
                                            className="text-gray-600 text-xl group-open:rotate-180 transition-transform"
                                        />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-200 pt-4 bg-gray-50">
                                        <p className="mb-3">
                                            Để đủ điều kiện đổi trả, sản phẩm của bạn phải ở tình trạng như khi nhận hàng, chưa đeo hoặc sử dụng, còn nguyên tem và trong bao bì gốc. Bạn cũng cần có hóa đơn hoặc bằng chứng mua hàng.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                            <li>Sản phẩm phải được đổi trả trong vòng 30 ngày kể từ ngày mua.</li>
                                            <li>Đồng hồ phải còn nguyên màng bảo vệ.</li>
                                            <li>Nếu dây đã được cắt gọn, phải bao gồm tất cả các mắt xích đã tháo.</li>
                                        </ul>
                                    </div>
                                </details>

                                {/* Accordion Item 2 */}
                                <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden open:ring-1 open:ring-teal-300 transition-all">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <span className="text-lg font-bold text-gray-900">
                                            Chi Tiết Phạm Vi Bảo Hành
                                        </span>
                                        <Icon
                                            icon="mdi:chevron-down"
                                            className="text-gray-600 text-xl group-open:rotate-180 transition-transform"
                                        />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-200 pt-4 bg-gray-50">
                                        <p className="mb-3">
                                            Bảo hành giới hạn của chúng tôi bao gồm các lỗi về vật liệu hoặc chế tác trong điều kiện sử dụng bình thường trong thời gian bảo hành.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                                <h5 className="font-bold text-green-700 flex items-center gap-2 mb-2">
                                                    <Icon icon="mdi:check-circle" className="text-sm" />
                                                    Được bảo hành
                                                </h5>
                                                <ul className="text-sm text-gray-700 space-y-1">
                                                    <li>Lỗi bộ máy đồng hồ</li>
                                                    <li>Khuyết tật chế tạo trên mặt số/kim</li>
                                                    <li>Pin (12 tháng đầu)</li>
                                                </ul>
                                            </div>
                                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                                <h5 className="font-bold text-red-700 flex items-center gap-2 mb-2">
                                                    <Icon icon="mdi:cancel" className="text-sm" />
                                                    Không được bảo hành
                                                </h5>
                                                <ul className="text-sm text-gray-700 space-y-1">
                                                    <li>Hư hỏng do tai nạn (rơi, va đập)</li>
                                                    <li>Hư hỏng do nước nếu vặn núm để mở</li>
                                                    <li>Hao mòn thông thường của dây đeo</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                {/* Accordion Item 3 */}
                                <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden open:ring-1 open:ring-teal-300 transition-all">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <span className="text-lg font-bold text-gray-900">
                                            Đổi Trả Quốc Tế
                                        </span>
                                        <Icon
                                            icon="mdi:chevron-down"
                                            className="text-gray-600 text-xl group-open:rotate-180 transition-transform"
                                        />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-200 pt-4 bg-gray-50">
                                        <p>
                                            Đối với đơn hàng quốc tế, khách hàng chịu trách nhiệm về chi phí vận chuyển đổi trả. Chúng tôi khuyến nghị sử dụng dịch vụ vận chuyển có theo dõi hoặc mua bảo hiểm vận chuyển. Chúng tôi không đảm bảo rằng chúng tôi sẽ nhận được hàng trả của bạn. Thuế quan và thuế không được hoàn lại.
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="lg:col-span-4 flex flex-col gap-6">
                        {/* Support Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 ">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Cần Hỗ Trợ?</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Chuyên gia đồng hồ của chúng tôi sẵn sàng hỗ trợ Thứ 2 - Thứ 6, 9h - 17h.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:bg-teal-50 hover:border-brand transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon icon="mdi:chat" className="text-lg" />
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">Bắt đầu Chat</span>
                                </button>
                                <Link
                                    className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:bg-teal-50 hover:border-brand transition-all group"
                                    to="mailto:support@watchstore.vn"
                                >
                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon icon="mdi:email" className="text-lg" />
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">Gửi Email</span>
                                </Link>
                                <Link
                                    className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:bg-teal-50 hover:border-brand transition-all group"
                                    to="tel:1900xxxx"
                                >
                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon icon="mdi:phone" className="text-lg" />
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">1900 6868</span>
                                </Link>
                            </div>
                        </div>

                        {/* Downloadable Forms */}
                        <div className="bg-gradient-to-br from-teal-50 to-transparent rounded-xl p-6 border border-teal-200">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Icon icon="mdi:file-document" className="text-brand text-2xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Tài Liệu</h4>
                                    <p className="text-xs text-gray-600 mt-1 mb-3">
                                        Tải biểu mẫu offline nếu bạn muốn gửi yêu cầu qua đường bưu điện.
                                    </p>
                                    <Link className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brand-hover transition-colors">
                                        Tải Biểu Mẫu PDF <Icon icon="mdi:arrow-right" className="text-sm" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                            <Icon icon="mdi:medal" className="text-4xl text-yellow-500 mb-2 mx-auto" />
                            <h4 className="font-bold text-gray-900">Đại Lý Ủy Quyền</h4>
                            <p className="text-xs text-gray-600 mt-2">
                                Chúng tôi là nhà bán lẻ được chứng nhận cho mọi thương hiệu chúng tôi mang. Tất cả bảo hành được hãng bảo trợ.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}