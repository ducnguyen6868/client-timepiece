import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'react-toastify';
import { Search, Calendar, CheckCircle2 } from 'lucide-react';
import { Icon } from '@iconify/react';
import promotionApi from '../../api/promotionApi';
import LoadingAnimations from './LoadingAnimations';

export default function SearchPromotion({ brands }) {
  
  const [promotion, setPromotion] = useState({});
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // kiểm tra hợp lệ brand
  useEffect(() => {
    const brand = brands.filter((brand) => brand === promotion?.brand);
    setIsValid(brand.length > 0);
  }, [promotion, brands]);

  // submit code
  const handleSubmitCode = async () => {
    if (!code.trim()) return toast.warn('Please enter a promo code!');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await promotionApi.searchPromotion(code);
      setPromotion(response.promotion);
      setResult(true);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto dark:bg-gray-900 rounded-2xl transition-all duration-300">

      {/* Input search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={15}
            disabled={loading}
            value={code}
            placeholder="Enter promotion code..."
            onChange={(e) => {
              setCode(e.target.value);
              setResult(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitCode()}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm focus:ring-2 focus:ring-[#00bcd4] outline-none transition-all"
          />
          <Search
            onClick={() => handleSubmitCode()}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-[#00bcd4] cursor-pointer transition-transform hover:scale-110"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-4 flex justify-center">
          <LoadingAnimations option="dots" />
        </div>
      )}

      {/* Result */}
      {result && (
        <>
          {promotion?.code ? (
            <div className="promo-card mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm animate-fadeIn">
              <div className="flex">
                {/* Image */}
                <div className="w-1/3 relative overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_API_URL}`+`/${promotion.image}`}
                    alt="Promotion"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                </div>

                {/* Info */}
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      {promotion.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {promotion.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-[#00bcd4] font-semibold">
                      <Icon icon="mdi:ticket-percent" width="18" />
                      {promotion.code}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <Calendar className="w-4 h-4 text-[#00bcd4]" />
                    <span>Expires on: {formatDate(promotion.end)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              No promotions found.{' '}
              <span className="text-[#00bcd4] cursor-pointer hover:underline">
                Try another code?
              </span>
            </p>
          )}

          {/* Invalid notice */}
          {!isValid && promotion?.code && (
            <div className="mt-3 flex items-center gap-2 text-red-500 animate-shake">
              <Icon icon="mdi:alert-circle" width="18" />
              <span className="text-sm">Promo code does not apply to this order</span>
            </div>
          )}

          {isValid && promotion?.code && (
            <div className="mt-3 flex items-center gap-2 text-green-500 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Promo code applied successfully!</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
