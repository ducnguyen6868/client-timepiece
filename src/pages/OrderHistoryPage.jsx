import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function OrderHistoryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'shipping', label: 'Đang vận chuyển' },
    { id: 'completed', label: 'Hoàn thành' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

  const orders = [
    {
      id: 'ORD-9211',
      date: '20 Tháng 10, 2023 - 14:30',
      status: 'shipping',
      statusLabel: 'Đang vận chuyển',
      statusColor: 'blue',
      items: [
        {
          name: 'Đồng hồ Citizen C7 40mm Nam NH8390-20H Automatic',
          price: '4.500.000đ',
          color: 'Xám bạc',
          size: '40mm',
          quantity: 1,
        },
        {
          name: 'Dây da đồng hồ cao cấp size 20mm',
          price: '500.000đ',
          color: 'Nâu',
          quantity: 1,
        },
      ],
      total: '5.000.000đ',
      totalColor: 'text-brand',
    },
    {
      id: 'ORD-8832',
      date: '15 Tháng 09, 2023 - 09:15',
      status: 'completed',
      statusLabel: 'Hoàn thành',
      statusColor: 'green',
      items: [
        {
          name: 'Casio G-Shock GA-2100-1A1DR Carbon Core Guard',
          price: '3.200.000đ',
          color: 'Đen Full',
          quantity: 1,
        },
      ],
      total: '3.200.000đ',
      totalColor: 'text-slate-900',
    },
    {
      id: 'ORD-1102',
      date: '01 Tháng 08, 2023 - 18:45',
      status: 'cancelled',
      statusLabel: 'Đã hủy',
      statusColor: 'red',
      items: [
        {
          name: 'Orient Bambino Gen 2 FAC00009N0',
          price: '4.800.000đ',
          color: 'Vàng Cream',
          quantity: 1,
        },
      ],
      total: '4.800.000đ',
      totalColor: 'text-slate-600',
      cancelled: true,
    },
  ];

  const getStatusIcon = (status) => {
    const icons = {
      shipping: 'mdi:truck-delivery',
      completed: 'mdi:check-circle',
      cancelled: 'mdi:cancel',
      pending: 'mdi:clock-outline',
    };
    return icons[status] || 'mdi:package';
  };

  const getStatusStyles = (color) => {
    const styles = {
      blue: 'text-blue-600 bg-blue-50 border-blue-100',
      green: 'text-green-600 bg-green-50 border-green-100',
      red: 'text-red-600 bg-red-50 border-red-100',
      orange: 'text-orange-600 bg-orange-50 border-orange-100',
    };
    return styles[color] || 'text-gray-600 bg-gray-50 border-gray-100';
  };

  return (
    <main className="flex-1 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">Lịch sử mua hàng</h1>
        <p className="text-slate-500 text-sm">
          Theo dõi, kiểm tra và quản lý các đơn hàng của bạn.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${activeFilter === filter.id
                ? 'bg-slate-800 text-white font-bold shadow-lg shadow-slate-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-2.5 text-slate-400 text-xl"
          />
          <input
            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand placeholder-slate-400 transition-colors outline-none"
            placeholder="Tìm kiếm theo tên hoặc ID..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-teal-500 hover:shadow-md transition-all group ${order.cancelled ? 'opacity-75 hover:opacity-100' : ''
              }`}
          >
            {/* Order Header */}
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-100">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-900 text-lg">
                      Đơn hàng #{order.id}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {order.items.length} SP
                    </span>
                  </div>
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Icon icon="mdi:clock-outline" className="text-base" />
                    {order.date}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getStatusStyles(
                    order.statusColor
                  )}`}
                >
                  <Icon icon={getStatusIcon(order.status)} className="text-lg" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {order.statusLabel}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                      <Icon icon="mdi:watch" className="text-slate-300 text-4xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <h4
                          className={`font-medium line-clamp-2 hover:text-brand cursor-pointer transition-colors ${order.cancelled ? 'text-slate-600' : 'text-slate-800'
                            }`}
                        >
                          {item.name}
                        </h4>
                        <span
                          className={`font-semibold whitespace-nowrap ${order.cancelled
                            ? 'text-slate-500 line-through decoration-slate-300'
                            : 'text-slate-900'
                            }`}
                        >
                          {item.price}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 ${order.cancelled ? 'text-slate-400' : 'text-slate-500'
                          }`}
                      >
                        Màu sắc: {item.color}
                        {item.size && ` | Size: ${item.size}`}
                      </p>
                      <p
                        className={`text-sm mt-2 ${order.cancelled ? 'text-slate-500' : 'text-slate-600'
                          }`}
                      >
                        x{item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Footer */}
            <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${order.cancelled ? 'text-slate-500' : 'text-slate-600'
                    }`}
                >
                  Tổng tiền:
                </span>
                <span className={`text-xl font-bold ${order.totalColor}`}>
                  {order.total}
                </span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                {order.status === 'shipping' && (
                  <>
                    <Link className="flex-1 sm:flex-none px-6 py-2 rounded-lg border
                    border-slate-300 bg-white text-slate-700 hover:bg-slate-50
                    hover:border-slate-400 text-sm font-medium transition-colors shadow-sm"
                      to='/user/order-detail/test'>
                      Xem chi tiết
                    </Link>
                    <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-brand text-white text-sm font-bold shadow-lg shadow-brand/20 hover:bg-teal-700 transition-all active:scale-95">
                      Theo dõi đơn
                    </button>
                  </>
                )}
                {order.status === 'completed' && (
                  <>
                    <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 text-sm font-medium transition-colors shadow-sm">
                      Mua lại
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 hover:border-slate-400 transition-all active:scale-95 shadow-sm">
                      Đánh giá
                    </button>
                  </>
                )}
                {order.status === 'cancelled' && (
                  <>
                    <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 text-sm font-medium transition-colors shadow-sm">
                      Chi tiết hủy
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-brand text-white text-sm font-bold shadow-lg shadow-brand/10 hover:bg-teal-700 transition-all active:scale-95">
                      Mua lại
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon icon="mdi:chevron-left" className="text-xl" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${currentPage === page
                ? 'bg-brand text-white shadow-lg shadow-brand/20'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-brand'
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            disabled={currentPage === 3}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon icon="mdi:chevron-right" className="text-xl" />
          </button>
        </nav>
      </div>
    </main>
  );
}