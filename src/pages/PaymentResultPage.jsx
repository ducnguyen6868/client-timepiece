import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatCurrency } from '../utils/formatCurrency';
import { CheckCircle2, XCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import orderApi from '../api/orderApi';
import productApi from '../api/productApi';
import LoadingAnimations from '../components/common/LoadingAnimations';
import ProductCard from '../components/common/ProductCard';

export default function PaymentResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  const [checking, setChecking] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const [products, setProducts] = useState([]);

  // ✅ Check transaction status
  useEffect(() => {
    const checkingPayment = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await orderApi.transitionStatus(orderId);
        setChecking(response.resultCode);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    checkingPayment();
  }, [orderId]);

  // ✅ Fetch order details
  useEffect(() => {
    const viewOrder = async () => {
      try {
        const response = await orderApi.viewOrder(orderId);
        setOrder(response.order);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    viewOrder();
  }, [orderId, checking]);

  // ✅ Fetch products
  useEffect(() => {
    const getProducts = async () => {
      const page = 1;
      const limit = 5;
      try {
        const response = await productApi.getProducts(page, limit);
        setProducts(response.products);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    getProducts();
  }, []);

  const handleNavigate = () => {
    const token = localStorage.getItem('token');
    if (token) navigate('/user/orders');
    else navigate('/order');
  };

  // ✅ UI Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col mb-4 items-center justify-start  bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      {loading ? (
        <LoadingAnimations option="dots" />
      ) : (
        <>
          {/* Payment Summary Card */}
          <motion.div
            className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 dark:border-gray-700 animate-fadeInUp mt-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {checking === 0 ? (
              <div className="flex flex-col items-center text-center text-green-500 mb-6">
                <CheckCircle2 className="w-16 h-16 mb-2" />
                <h2 className="text-2xl font-semibold">Payment Successful!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Thank you for your purchase.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center text-red-500 mb-6">
                <XCircle className="w-16 h-16 mb-2 " />
                <h2 className="text-2xl font-semibold">Payment Failed!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Please check your payment method or try again later.
                </p>
              </div>
            )}

            {/* Order Details */}
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-gray-100">
                  Order Total:
                </strong>{' '}
                {formatCurrency(order?.final_amount, 'en-US', 'USD') || '$0'}
              </li>
              <li>
                <strong>Payment:</strong> {order?.paymentMethod} -{' '}
                {order?.payment}
              </li>
              <li>
                <strong>Transaction ID:</strong> {order?.code}
              </li>
              <li>
                <strong>Status:</strong> {order?.status?.at(-1)?.present}
              </li>
            </ul>

            {/* Footer Buttons */}
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => navigate('/')}
                className="px-5 py-2 rounded-lg bg-[#00bcd4] text-white font-medium shadow hover:bg-[#00acc1] transition-all duration-200"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleNavigate}
                className="px-5 py-2 rounded-lg border border-[#00bcd4] text-[#00bcd4] font-medium hover:bg-[#00bcd4]/10 transition-all duration-200"
              >
                View Order History
              </button>
            </div>
          </motion.div>

          {/* Recommended Products */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="w-full px-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6 text-[#00bcd4]" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                You may also like
              </h2>
            </div>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4'>
              {products && (
                products?.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
