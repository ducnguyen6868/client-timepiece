import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { formatCurrency } from '../utils/formatCurrency';
import orderApi from '../api/orderApi';
import profileApi from '../api/profileApi';
import pointApi from '../api/pointApi';
import InfoPayment from '../components/common/InfoPayment';
import SearchPromotion from '../components/common/SearchPromotion';
import { Truck, Tag, Gift, X, BadgeDollarSign, Coins, } from 'lucide-react';

export default function CheckoutPage() {

  const { setInfoUser } = useContext(UserContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromCart = queryParams.get('cart') || null;

  const productData = location.state?.productData || [];

  const brands = productData.map((p) => p.brand);
  const [point, setPoint] = useState();
  const [usePoint, setUsePoint] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [availablePoint, setAvailablePoint] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const getPoint = async () => {
      try {
        const res = await profileApi.profile();
        setPoint(res.point);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    };
    getPoint();
  }, []);

  const subtotal = productData.reduce((t, p) => t + p.price * p.quantity, 0);
  const shipping = 0;
  const total = (parseFloat(subtotal) + shipping - discount)?.toFixed(2);

  useEffect(() => {
    const maxUse = subtotal * 0.1;
    const usable = point?.quantity < maxUse ? point?.quantity : maxUse;
    setAvailablePoint(usable || 0);
  }, [point?.quantity, subtotal]);

  useEffect(() => {
    if (usePoint) {
      const usable = point?.quantity < subtotal * 0.1 ? point?.quantity : subtotal * 0.1;
      setDiscount(usable);
    } else setDiscount(0);
  }, [usePoint, point, subtotal]);

  const handleSubmit = async (infoPayment) => {
    const orderData = {
      infoPayment,
      productData,
      total_amount: subtotal,
      discount_amount: discount,
      final_amount: total,
    };
    try {
      let orderId;
      let link;
      if (infoPayment.payment === 'MOMO') {
        const response = await orderApi.payment(total);
        orderId = response.orderId;
        link = response.payUrl;
      }
      const res = await orderApi.createOrder(orderData, orderId, fromCart);
      if (!infoPayment.userId) {
        const code = res.order?.code;
        let order = localStorage.getItem('order');
        order = order ? JSON.parse(order) : [];
        order.push(code);
        localStorage.setItem('order', JSON.stringify(order));
        if (fromCart) {
          setInfoUser((prev) => ({ ...prev, cart: 0 }));
          localStorage.removeItem('cart');
        }
      } else {
        setInfoUser((prev) => ({ ...prev, cart: res.cart }));
      }
      orderId = res.order?.code;
      if (discount > 0) await pointApi.put(infoPayment.userId, orderId, discount);
      
      if(infoPayment.payment==='MOMO'){
        window.location.href=link;
      }else{
        window.location.href=process.env.REACT_APP_FRONTEND_URL||'http://localhost:3000'+`/payment-result?orderId=${orderId}`;
      }

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-4 ">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* -------- Left Section: Order Summary -------- */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BadgeDollarSign className="w-6 h-6 text-emerald-500" />
            Order Summary
          </h2>

          {/* Product List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {productData.map((p, i) => (
              <div key={i} className="flex py-4 gap-4">
                <img
                  src={`${process.env.REACT_APP_API_URL}` + `/${p.image}`}
                  alt={p.name}
                  loading='lazy'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                  }}
                  className="w-20 h-20 rounded-md object-cover border border-gray-200 dark:border-gray-700"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.name}</p>
                    <p className="text-xs text-gray-500">Color: {p.color}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Qty: {p.quantity}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      ${p.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mt-4">
            <Truck className="w-4 h-4" />
            Free Shipping Worldwide
          </div>

          {/* Promotions */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <Tag className="w-4 h-4 text-orange-500" />
              Have a promotion?
            </span>
            <button
              onClick={() => setPromotion(true)}
              className="text-emerald-600 font-medium hover:underline"
            >
              Use
            </button>
          </div>

          {/* Points */}
          {point && point.quantity > 0 && (
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-500" />
                You have <strong>{point.quantity}</strong> points (
                {availablePoint?.toFixed(2)} available)
              </span>
              <button
                onClick={() => setUsePoint(!usePoint)}
                className="text-emerald-600 font-medium hover:underline"
              >
                {usePoint ? 'Cancel' : 'Use'}
              </button>
            </div>
          )}

          {/* Summary */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-emerald-600 font-medium">FREE</span>
            </div>
            {usePoint && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ${discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span className="text-emerald-600">
                ${total} <span className="text-gray-400">(~{formatCurrency(total, 'vi-VN', 'VND')})</span>
              </span>
            </div>
          </div>
        </div>

        {/* -------- Right Section: Payment Info -------- */}

        <InfoPayment onSubmit={handleSubmit} total={total} />
      </div>

      {/* -------- Promotion Modal -------- */}
      {promotion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setPromotion(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-pink-500" />
              Apply Promotion
            </h3>
            <SearchPromotion brands={brands} />
          </div>
        </div>
      )}
    </div>
  );
}
