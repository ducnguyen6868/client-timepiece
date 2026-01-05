import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function OrderDetailPage() {
  const [orderStatus] = useState('shipping');

  const orderData = {
    id: 'ORD-9211',
    date: '20 Tháng 10, 2023',
    time: '14:30',
    status: 'shipping',
    statusLabel: 'Đang vận chuyển',
    statusColor: 'blue',
    timeline: [
      {
        id: 'ordered',
        label: 'Đặt hàng',
        date: '14:30, 20/10',
        icon: 'mdi:clipboard-check',
        completed: true,
      },
      {
        id: 'confirmed',
        label: 'Đã xác nhận',
        date: '09:00, 21/10',
        icon: 'mdi:package-variant',
        completed: true,
      },
      {
        id: 'shipping',
        label: 'Đang vận chuyển',
        date: 'Đang xử lý',
        icon: 'mdi:truck-delivery',
        completed: true,
        active: true,
      },
      {
        id: 'delivered',
        label: 'Giao hàng',
        date: 'Dự kiến',
        icon: 'mdi:home',
        completed: false,
      },
    ],
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '(+84) 912 345 678',
      address: 'Số 15, Ngõ 123, Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội',
    },
    payment: {
      method: 'Thẻ tín dụng (Visa)',
      status: 'paid',
      cardNumber: '**** **** **** 4242',
    },
    shipping: {
      carrier: 'Giao Hàng Nhanh',
      trackingCode: 'GHN88291039',
      note: 'Giao hàng tiêu chuẩn (3-5 ngày). Hàng dễ vỡ, xin nhẹ tay.',
    },
    items: [
      {
        id: 1,
        name: 'Đồng hồ Citizen C7 40mm Nam NH8390-20H Automatic',
        color: 'Xám bạc',
        size: '40mm',
        price: '4.500.000đ',
        quantity: 1,
        total: '4.500.000đ',
      },
      {
        id: 2,
        name: 'Dây da đồng hồ cao cấp size 20mm',
        color: 'Nâu',
        price: '500.000đ',
        quantity: 1,
        total: '500.000đ',
      },
    ],
    pricing: {
      subtotal: '5.000.000đ',
      shipping: '30.000đ',
      discount: '-30.000đ',
      total: '5.000.000đ',
    },
  };

  const getStatusStyles = (color) => {
    const styles = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-100',
      red: 'bg-red-50 text-red-600 border-red-100',
    };
    return styles[color] || 'bg-gray-50 text-gray-600 border-gray-100';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSupport = () => {
    console.log('Liên hệ hỗ trợ');
  };

  const handleTrackingClick = () => {
    console.log('Theo dõi vận đơn:', orderData.shipping.trackingCode);
  };

  return (
    <main className="flex-1 flex flex-col gap-8">
      {/* Back Button */}
      <div>
        <Link
          to="#"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors font-medium"
        >
          <Icon icon="mdi:arrow-left" className="text-base" />
          Quay lại danh sách đơn hàng
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Chi tiết đơn hàng #{orderData.id}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 border ${getStatusStyles(
                orderData.statusColor
              )}`}
            >
              <Icon icon="mdi:truck-delivery" className="text-sm" />
              {orderData.statusLabel}
            </span>
          </div>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            <Icon icon="mdi:clock-outline" className="text-base" />
            Đặt ngày {orderData.date} lúc {orderData.time}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-sm font-bold transition-all shadow-sm"
          >
            <Icon icon="mdi:printer" className="text-lg" />
            In hóa đơn
          </button>
          <button
            onClick={handleSupport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-sm font-bold transition-all shadow-sm"
          >
            <Icon icon="mdi:headset" className="text-lg" />
            Liên hệ hỗ trợ
          </button>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="min-w-[600px] flex items-center justify-between relative">
          {/* Background Progress Line */}
          <div className="absolute top-[18px] left-0 w-full h-1 bg-slate-100 -z-0"></div>
          <div className="absolute top-[18px] left-0 w-[66%] h-1 bg-brand/30 -z-0"></div>

          {/* Timeline Steps */}
          {orderData.timeline.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-3 relative z-10 w-32">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  step.active
                    ? 'bg-brand text-white ring-4 ring-brand/10 shadow-lg shadow-brand/30'
                    : step.completed
                    ? 'bg-brand text-white shadow-brand/20'
                    : 'bg-white border-2 border-slate-200 text-slate-300'
                }`}
              >
                <Icon icon={step.icon} className="text-xl" />
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-bold ${
                    step.active
                      ? 'text-brand'
                      : step.completed
                      ? 'text-slate-900'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-[10px] mt-0.5 ${
                    step.completed ? 'text-slate-500' : 'text-slate-300'
                  }`}
                >
                  {step.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Icon icon="mdi:map-marker" className="text-brand text-xl" />
            <h3 className="font-bold text-slate-900">Địa chỉ nhận hàng</h3>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p className="font-bold text-slate-800">{orderData.shippingAddress.name}</p>
            <p className="text-slate-600">{orderData.shippingAddress.phone}</p>
            <p className="text-slate-600 mt-1 leading-relaxed">
              {orderData.shippingAddress.address}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Icon icon="mdi:credit-card" className="text-brand text-xl" />
            <h3 className="font-bold text-slate-900">Thanh toán</h3>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Phương thức</span>
              <span className="font-medium text-slate-800">{orderData.payment.method}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Trạng thái</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-600 border border-green-100">
                Đã thanh toán
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 bg-slate-50 p-2 rounded border border-slate-100">
              <Icon icon="mdi:credit-card-outline" className="text-slate-400 text-2xl" />
              <span className="font-medium text-slate-600">{orderData.payment.cardNumber}</span>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Icon icon="mdi:truck-delivery" className="text-brand text-xl" />
            <h3 className="font-bold text-slate-900">Vận chuyển</h3>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Đơn vị</span>
              <span className="font-medium text-slate-800">{orderData.shipping.carrier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Mã vận đơn</span>
              <span
                onClick={handleTrackingClick}
                className="font-mono text-brand font-bold hover:underline cursor-pointer"
              >
                {orderData.shipping.trackingCode}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1">{orderData.shipping.note}</div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
            <Icon icon="mdi:shopping" className="text-brand" />
            Sản phẩm ({orderData.items.length})
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-200 font-bold">Sản phẩm</th>
                  <th className="p-4 border-b border-slate-200 font-bold text-center">Đơn giá</th>
                  <th className="p-4 border-b border-slate-200 font-bold text-center">
                    Số lượng
                  </th>
                  <th className="p-4 border-b border-slate-200 font-bold text-right">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {orderData.items.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                          <Icon icon="mdi:watch" className="text-slate-300 text-3xl" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-bold text-slate-800 line-clamp-2 hover:text-brand cursor-pointer transition-colors max-w-xs">
                            {item.name}
                          </h4>
                          <p className="text-slate-500 text-xs mt-1">
                            Màu sắc: {item.color}
                            {item.size && ` | Size: ${item.size}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center text-slate-600">{item.price}</td>
                    <td className="p-4 text-center text-slate-600">x{item.quantity}</td>
                    <td className="p-4 text-right font-bold text-slate-900">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex gap-4 border border-slate-100 rounded-lg p-3">
                <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <Icon icon="mdi:watch" className="text-slate-300 text-4xl" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Màu sắc: {item.color}</p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xs text-slate-500">SL: x{item.quantity}</span>
                    <span className="font-bold text-slate-900">{item.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100">
          <div className="flex flex-col md:items-end gap-3 max-w-sm ml-auto w-full">
            <div className="flex justify-between w-full text-sm">
              <span className="text-slate-600">Tạm tính:</span>
              <span className="font-medium text-slate-900">{orderData.pricing.subtotal}</span>
            </div>
            <div className="flex justify-between w-full text-sm">
              <span className="text-slate-600">Phí vận chuyển:</span>
              <span className="font-medium text-slate-900">{orderData.pricing.shipping}</span>
            </div>
            <div className="flex justify-between w-full text-sm">
              <span className="text-slate-600">Giảm giá:</span>
              <span className="font-medium text-red-500">{orderData.pricing.discount}</span>
            </div>
            <div className="h-px bg-slate-200 w-full my-1"></div>
            <div className="flex justify-between w-full items-center">
              <span className="text-base font-bold text-slate-800">Tổng cộng:</span>
              <span className="text-2xl font-bold text-brand">{orderData.pricing.total}</span>
            </div>
            <p className="text-xs text-slate-500 italic text-right mt-1 w-full">
              *Đã bao gồm thuế VAT
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}