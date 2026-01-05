import { useState } from 'react';
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';

export default function MyPromotion() {
    const [voucherCode, setVoucherCode] = useState('');
    const [activeTab, setActiveTab] = useState('valid');
    const [sortBy, setSortBy] = useState('newest');
    const [showEmptyState, setShowEmptyState] = useState(false);

    const tabs = [
        { id: 'valid', label: 'Có hiệu lực', count: 4 },
        { id: 'used', label: 'Đã sử dụng', count: null },
        { id: 'expired', label: 'Hết hạn', count: null },
    ];

    const vouchers = [
        {
            id: 1,
            type: 'percentage',
            value: '10%',
            title: 'Giảm 10% tối đa 500k cho đơn từ 2 triệu',
            expiry: '31/12/2023',
            category: 'Toàn sàn',
            categoryColor: 'green',
            bgColor: 'bg-teal-50',
            iconColor: 'text-brand',
            icon: 'mdi:percent',
            borderColor: 'border-brand/30',
            eligible: true,
            progress: 100,
        },
        {
            id: 2,
            type: 'freeship',
            value: 'Free Ship',
            title: 'Miễn phí vận chuyển cho đơn hàng từ 500k',
            expiry: '15/11/2023',
            category: 'Vận chuyển',
            categoryColor: 'blue',
            bgColor: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            icon: 'mdi:truck-delivery',
            borderColor: 'border-indigo-600/30',
            eligible: true,
            progress: 100,
        },
        {
            id: 3,
            type: 'fixed',
            value: '50K',
            valueLabel: 'GIẢM',
            title: 'Giảm ngay 50k cho thành viên mới',
            expiry: '30/12/2023',
            category: 'Độc quyền',
            categoryColor: 'orange',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            icon: 'mdi:currency-usd',
            borderColor: 'border-orange-600/30',
            eligible: true,
            progress: 100,
            progressText: 'Đủ điều kiện sử dụng',
        },
        {
            id: 4,
            type: 'fixed',
            value: '200K',
            valueLabel: 'OFF',
            title: 'Voucher 200k cho đơn từ 5 triệu',
            expiry: '31/12/2023',
            category: 'Đồng hồ cao cấp',
            categoryColor: 'gray',
            bgColor: 'bg-teal-50',
            iconColor: 'text-brand',
            icon: 'mdi:diamond',
            borderColor: 'border-brand/30',
            eligible: false,
            progress: 60,
            progressText: 'Mua thêm 2.000.000đ để dùng',
            opacity: 'opacity-70',
        },
    ];

    const handleAddVoucher = () => {
        if (voucherCode.trim()) {
            console.log('Thêm voucher:', voucherCode);
            setVoucherCode('');
        }
    };

    const handleUseVoucher = (id) => {
        console.log('Sử dụng voucher:', id);
    };

    const handleViewConditions = (id) => {
        console.log('Xem điều kiện voucher:', id);
    };

    const getCategoryStyles = (color) => {
        const styles = {
            green: 'bg-green-50 text-green-700 ring-green-600/20',
            blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
            orange: 'bg-orange-50 text-orange-700 ring-orange-600/20',
            gray: 'bg-gray-100 text-gray-600 ring-gray-500/10',
        };
        return styles[color] || styles.gray;
    };

    return (
        <main className="flex-1 p-4 pb-20 font-sans">
            {/* Page Heading */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-gray-900 text-3xl md:text-4xl font-extrabold tracking-tight">
                    Kho Voucher của tôi
                </h1>
                <p className="text-gray-600 text-base">
                    Quản lý và sử dụng mã giảm giá của bạn để tiết kiệm hơn khi mua sắm
                </p>
            </div>

            {/* Add Voucher Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-1 w-full md:w-auto">
                    <h3 className="text-lg font-bold text-gray-900">Thêm Voucher mới</h3>
                    <p className="text-sm text-gray-600">Nhập mã voucher bạn có để lưu vào kho</p>
                </div>
                <div className="flex w-full md:max-w-md gap-3">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon icon="mdi:ticket" className="text-gray-500" />
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-3 border-none bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:bg-white transition-all outline-none"
                            placeholder="Nhập mã voucher (VD: SUMMER2024)"
                            type="text"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddVoucher()}
                        />
                    </div>
                    <button
                        onClick={handleAddVoucher}
                        className="bg-brand hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center min-w-[100px]"
                    >
                        Lưu
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 mb-8">
                <nav aria-label="Tabs" className="flex gap-8 -mb-px overflow-x-auto">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`border-b-[3px] whitespace-nowrap py-4 px-1 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${activeTab === tab.id
                                    ? 'border-brand text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            <span>{tab.label}</span>
                            {tab.count && (
                                <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                    {tab.count}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Filter & Sort */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">Hiển thị {vouchers.length} mã giảm giá</p>
                <div className="flex gap-3">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand focus:border-brand block p-2.5 outline-none"
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="expiring">Sắp hết hạn</option>
                        <option value="value">Giá trị giảm dần</option>
                    </select>
                </div>
            </div>

            {/* Voucher Grid */}
            {!showEmptyState ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {vouchers.map((voucher) => (
                        <div
                            key={voucher.id}
                            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex min-h-[160px] relative hover:shadow-md transition-shadow"
                        >
                            {/* Left Side (Visual) */}
                            <div
                                className={`w-[30%] md:w-[140px] ${voucher.bgColor} flex flex-col items-center justify-center p-4 text-center relative flex-shrink-0 border-r border-dashed ${voucher.borderColor} ${voucher.opacity || ''}`}
                            >
                                <Icon icon={voucher.icon} className={`text-4xl ${voucher.iconColor} mb-2`} />
                                <span className={`text-xl font-black ${voucher.iconColor} leading-none`}>
                                    {voucher.value}
                                </span>
                                {voucher.valueLabel && (
                                    <span className={`text-xs font-bold ${voucher.iconColor} mt-1`}>
                                        {voucher.valueLabel}
                                    </span>
                                )}
                                {/* Decorative Notches */}
                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-50 rounded-full z-10"></div>
                                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50 rounded-full z-10"></div>
                            </div>

                            {/* Right Side (Content) */}
                            <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <span
                                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset mb-2 ${getCategoryStyles(
                                                voucher.categoryColor
                                            )}`}
                                        >
                                            {voucher.category}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                                        {voucher.title}
                                    </h3>

                                    {/* Progress Bar */}
                                    {voucher.progress !== undefined && (
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className={`${voucher.eligible ? voucher.iconColor.replace('text', 'bg') : 'bg-brand'
                                                        } h-1.5 rounded-full transition-all`}
                                                    style={{ width: `${voucher.progress}%` }}
                                                ></div>
                                            </div>
                                            {voucher.progressText && (
                                                <p
                                                    className={`text-[10px] mt-1 font-medium ${voucher.eligible ? voucher.iconColor : 'text-gray-600'
                                                        }`}
                                                >
                                                    {voucher.eligible ? (
                                                        voucher.progressText
                                                    ) : (
                                                        <>
                                                            Mua thêm <span className="text-brand font-bold">2.000.000đ</span>{' '}
                                                            để dùng
                                                        </>
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {!voucher.progressText && (
                                        <p className="text-xs text-gray-600 mt-1">HSD: {voucher.expiry}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-gray-100">
                                    <button
                                        onClick={() => handleViewConditions(voucher.id)}
                                        className="text-xs font-medium text-gray-600 underline hover:text-brand transition-colors"
                                    >
                                        Điều kiện
                                    </button>
                                    <button
                                        onClick={() => handleUseVoucher(voucher.id)}
                                        disabled={!voucher.eligible}
                                        className={`text-sm font-bold py-1.5 px-4 rounded-lg transition-colors ${voucher.eligible
                                                ? 'bg-brand hover:bg-teal-700 text-white'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {voucher.eligible ? 'Dùng ngay' : 'Chưa đạt'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Icon icon="mdi:ticket" className="text-6xl text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có voucher nào</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Bạn hiện chưa có mã giảm giá nào. Hãy theo dõi các chương trình khuyến mãi của
                        WatchStore nhé!
                    </p>
                    <button className="bg-brand text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors">
                        Tìm mã ngay
                    </button>
                </div>
            )}

            {/* FAQ / Helper Text */}
            <div className="mt-12 p-6 bg-teal-50 rounded-xl border border-brand/10">
                <div className="flex gap-4 items-start">
                    <Icon icon="mdi:help-circle" className="text-brand mt-1 text-xl" />
                    <div>
                        <h4 className="font-bold text-gray-900 text-base mb-2">
                            Lưu ý khi sử dụng Voucher
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Mã giảm giá có thể có số lượng giới hạn.</li>
                            <li>Mỗi đơn hàng chỉ có thể áp dụng 01 Mã giảm giá (trừ mã Freeship).</li>
                            <li>Voucher không có giá trị quy đổi thành tiền mặt.</li>
                        </ul>
                        <Link
                            to="#"
                            className="inline-block mt-3 text-sm text-brand font-bold hover:underline"
                        >
                            Xem chính sách đầy đủ →
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}