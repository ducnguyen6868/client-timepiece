import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/formatDate';
import { ChevronsLeft, ChevronsRight, CheckCircle } from 'lucide-react';
import reviewApi from '../../api/reviewApi';

export default function Review({ code }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const limit=10;
        const response = await reviewApi.get(code, page, limit);
        setReviews(response.reviews);
        setTotal(response.total);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    getReviews();
  }, [code, page]);

  const pages = Math.ceil(total / 10);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pages) setPage(page);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {reviews?.map((review) => (
        <div
          key={review._id}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-brand/20 to-brand/40 flex items-center justify-center text-brand font-bold text-sm uppercase">
              {review?.avatar ? (
                <img
                  src={`${process.env.API_URL}`+`/${review.avatar}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{review.name?.slice(0, 2) || 'JD'}</span>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                {review.name || 'John Wick'}
                <span className="flex items-center gap-1 text-brand text-xs font-medium bg-brand/10 px-2 py-0.5 rounded-full">
                  <CheckCircle size={12} />
                  Verified
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {formatDate(review?.createdAt) || '08/08/1988'}
              </div>
              <div className="text-yellow-400 text-lg">
                {renderStars(review?.rating)}
              </div>
            </div>
          </div>

          {/* Comment */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            {review?.comment || 'No comment provided.'}
          </p>

          {/* Images */}
          {review.images?.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {review.images.map((src, index) => (
                <img
                  key={index}
                  src={`${process.env.API_URL}`+`${src}`}
                  alt="Review"
                  className="w-24 h-24 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )}

          {/* Videos */}
          {review.videos?.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {review.videos.map((src, index) => (
                <video
                  key={index}
                  src={`${process.env.API_URL}`+`/${src}`}
                  controls
                  preload="metadata"
                  className="w-40 h-24 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end">
            <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-brand transition">
              👍 Helpful 999+
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-brand/10 hover:text-brand transition disabled:opacity-40"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronsLeft size={16} />
          </button>

          <div className="flex gap-2">
            {[...Array(pages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition ${
                  page === index + 1
                    ? 'bg-brand text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand/10 hover:text-brand'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-brand/10 hover:text-brand transition disabled:opacity-40"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pages}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
