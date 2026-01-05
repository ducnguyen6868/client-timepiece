import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecentContributions() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const contributions = [
        {
            id: 1,
            category: 'Tính năng mới',
            categoryColor: 'blue',
            status: 'completed',
            statusText: 'Đã hoàn thành',
            title: 'Tích hợp thanh toán qua Ví điện tử',
            description: 'Nên thêm các phương thức thanh toán phổ biến như MoMo, ZaloPay để thuận tiện hơn cho người dùng trẻ.',
            author: 'Quốc Bảo',
            authorAvatar: 'QB',
            avatarType: 'gradient',
            gradient: 'from-purple-400 to-indigo-500',
            time: '2 ngày trước'
        },
        {
            id: 2,
            category: 'Báo lỗi',
            categoryColor: 'red',
            status: 'processing',
            statusText: 'Đang xử lý',
            title: 'Lỗi hiển thị ảnh trên Mobile',
            description: 'Ảnh sản phẩm bị vỡ khung khi xem trên iPhone 12 Pro Max ở chế độ ngang. Cần fix gấp.',
            author: 'Hoàng Nam',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1cwCu1seGvvxIan-RLaEJqE3qE7fYeA5xKrU5iCOv6A7JBtRR9s8Vm8cilmBlxZSqXXMlK4rWR6an7EAsPM5xRzRdVVvSIksO7-EOPyq8S4CHo3v_US6Osgp7Z8WEZyFhXazb_1bCDpWStdukcEWMOG-VclRHFst3bqIirq0cPdv-AUaKKWFyhECZDpyEEYZvRDRlSwjdk5J26ZaPeVMGl3IKoONPpar7N6uiuQISqNNF2G2073zySjgCsHY5Bpo8n89EvuMOPYc',
            avatarType: 'image',
            time: '1 tuần trước'
        },
        {
            id: 3,
            category: 'Nội dung',
            categoryColor: 'purple',
            status: 'reviewing',
            statusText: 'Đang xem xét',
            title: 'Thêm video review chi tiết',
            description: 'Mỗi sản phẩm nên có 1 video ngắn 30s quay cận cảnh trên tay để dễ hình dung kích thước.',
            author: 'Lan Anh',
            authorAvatar: 'LA',
            avatarType: 'gradient',
            gradient: 'from-pink-400 to-orange-400',
            time: '12 giờ trước'
        },
        {
            id: 4,
            category: 'Trải nghiệm (UX)',
            categoryColor: 'indigo',
            status: 'completed',
            statusText: 'Đã hoàn thành',
            title: 'Dark Mode cho giao diện',
            description: 'Đã thêm chế độ tối giúp dịu mắt khi mua sắm vào ban đêm. Nút chuyển đổi nằm ở footer.',
            author: 'Dev Team',
            authorAvatar: 'icon',
            avatarType: 'icon',
            time: '2 tuần trước'
        },
        {
            id: 5,
            category: 'Tính năng mới',
            categoryColor: 'blue',
            status: 'reviewing',
            statusText: 'Đang xem xét',
            title: 'So sánh thông số đồng hồ',
            description: 'Cho phép chọn 2-3 mẫu đồng hồ để so sánh chi tiết về đường kính, chất liệu kính, độ chống nước.',
            author: 'Ẩn danh',
            authorAvatar: 'A',
            avatarType: 'text',
            time: '3 giờ trước'
        },
        {
            id: 6,
            category: 'Báo lỗi',
            categoryColor: 'red',
            status: 'completed',
            statusText: 'Đã hoàn thành',
            title: 'Lỗi giỏ hàng không cập nhật',
            description: 'Khi thêm sản phẩm vào giỏ hàng, số lượng trên icon không nhảy số ngay lập tức mà phải reload trang.',
            author: 'Minh Tuấn',
            authorAvatar: 'MT',
            avatarType: 'text',
            textBg: 'bg-teal-100 text-teal-700',
            time: '1 tháng trước'
        }
    ];

    const categoryColors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-100',
        red: 'bg-red-50 text-red-600 border-red-100 group-hover:bg-red-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-100'
    };

    const statusConfig = {
        completed: {
            color: 'text-green-600 bg-green-50 border-green-100/50',
            icon: 'mdi:check-circle'
        },
        processing: {
            color: 'text-yellow-600 bg-yellow-50 border-yellow-100/50',
            icon: 'mdi:cog'
        },
        reviewing: {
            color: 'text-gray-500 bg-gray-100 border-gray-200/50',
            icon: 'mdi:clock-outline'
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Sidebar */}
                <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6 lg:space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-cyan-500">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <Icon icon="mdi:earth" className="text-2xl" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Cộng đồng</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-[#101818] tracking-tight leading-tight">
                            Kiến tạo <br />Trải nghiệm
                        </h1>
                        <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                            Cảm ơn bạn đã đồng hành cùng WatchStore. Chúng tôi trân trọng mọi ý kiến đóng góp để tạo nên trải nghiệm tốt nhất cho cộng đồng.
                        </p>
                    </div>

                    <div className="rounded-3xl p-6 lg:p-8 text-white bg-gradient-to-br from-[#0f2123]/95 to-cyan-500/90 shadow-xl shadow-cyan-500/10 relative overflow-hidden group transform hover:scale-[1.02] transition-all duration-300">
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/30 rounded-full blur-3xl group-hover:bg-cyan-500/40 transition-all duration-700"></div>
                        <div className="relative z-10 flex flex-col gap-6">
                            <div>
                                <div className="text-4xl lg:text-5xl font-bold mb-2">842</div>
                                <div className="text-xs text-white/70 font-bold uppercase tracking-wider">Tổng đóng góp</div>
                            </div>
                            <div className="h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                            <div>
                                <div className="text-4xl lg:text-5xl font-bold mb-2">315</div>
                                <div className="text-xs text-white/70 font-bold uppercase tracking-wider">Đã hiện thực hóa</div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-[#101818] hover:bg-cyan-500 hover:text-white text-white rounded-2xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-3 group active:scale-95">
                        <Icon icon="mdi:plus" className="text-xl group-hover:rotate-90 transition-transform" />
                        <span>Đóng góp ý tưởng mới</span>
                    </button>

                    <div className="hidden lg:block text-xs text-gray-400 leading-relaxed pt-4 border-t border-gray-100">
                        Các đóng góp sẽ được kiểm duyệt trong vòng 24h. Vui lòng tuân thủ <Link className="underline hover:text-cyan-500" to="#">quy tắc cộng đồng</Link>.
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                    {/* Filters */}
                    <div className="sticky top-20 lg:top-24 z-30 -mx-4 px-4 lg:mx-0 lg:px-0">
                        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-3 shadow-sm border border-white/50 ring-1 ring-gray-100 flex flex-col md:flex-row gap-3 justify-between items-center">
                            <div className="relative w-full md:flex-1 group">
                                <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-500 transition-colors text-xl" />
                                <input
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all placeholder:text-gray-400"
                                    placeholder="Tìm kiếm ý tưởng, báo lỗi..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                                <div className="relative min-w-[150px]">
                                    <select
                                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 cursor-pointer hover:bg-gray-50 transition-colors appearance-none shadow-sm"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">Mọi trạng thái</option>
                                        <option value="pending">Chờ duyệt</option>
                                        <option value="developing">Đang phát triển</option>
                                        <option value="completed">Đã hoàn thành</option>
                                    </select>
                                    <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
                                </div>
                                <div className="relative min-w-[150px]">
                                    <select
                                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 cursor-pointer hover:bg-gray-50 transition-colors appearance-none shadow-sm"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="all">Mọi chủ đề</option>
                                        <option value="feature">Tính năng mới</option>
                                        <option value="bug">Cải thiện lỗi</option>
                                        <option value="content">Nội dung</option>
                                        <option value="ux">Trải nghiệm (UX)</option>
                                    </select>
                                    <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
                                </div>
                                <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:text-cyan-500 hover:border-cyan-500/30 transition-colors shadow-sm" title="Bộ lọc nâng cao">
                                    <Icon icon="mdi:tune" className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contributions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {contributions.map((contribution) => (
                            <div key={contribution.id} className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-100/50 hover:border-cyan-500/20 transition-all duration-300 group flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${categoryColors[contribution.categoryColor]}`}>
                                        {contribution.category}
                                    </span>
                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border ${statusConfig[contribution.status].color}`}>
                                        <Icon icon={statusConfig[contribution.status].icon} className="text-sm" />
                                        {contribution.statusText}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-500 transition-colors leading-tight">
                                    {contribution.title}
                                </h4>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed">
                                    {contribution.description}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                                    <div className="flex items-center gap-2">
                                        {contribution.avatarType === 'gradient' && (
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${contribution.gradient} flex items-center justify-center text-white text-xs font-bold ring-2 ring-white`}>
                                                {contribution.authorAvatar}
                                            </div>
                                        )}
                                        {contribution.avatarType === 'image' && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
                                                <img alt="User" className="w-full h-full object-cover" src={contribution.authorAvatar} />
                                            </div>
                                        )}
                                        {contribution.avatarType === 'icon' && (
                                            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 ring-2 ring-white">
                                                <Icon icon="mdi:account-group" className="text-sm" />
                                            </div>
                                        )}
                                        {contribution.avatarType === 'text' && (
                                            <div className={`w-8 h-8 rounded-full ${contribution.textBg || 'bg-gray-100 text-gray-500'} flex items-center justify-center text-xs font-bold ring-2 ring-white`}>
                                                {contribution.authorAvatar}
                                            </div>
                                        )}
                                        <span className="font-medium text-gray-600">{contribution.author}</span>
                                    </div>
                                    <span className="font-medium bg-gray-50 px-2 py-1 rounded-md">{contribution.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center pt-8">
                        <button className="group px-8 py-3.5 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold hover:border-cyan-500 hover:text-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all flex items-center gap-2">
                            Xem thêm đóng góp cũ hơn
                            <Icon icon="mdi:chevron-down" className="text-xl group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}