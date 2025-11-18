import { useState } from 'react';
import { Star, X, Image, Video, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import reviewApi from '../../api/reviewApi';

export default function ReviewModal({ data, onClose, onChange }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: 'image',
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: 'video',
    }));
    setVideos((prev) => [...prev, ...newVideos].slice(0, 2));
  };

  const removeMedia = (index, type) => {
    if (type === 'image') {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('user', data.user);
      formData.append('name', data.name);
      formData.append('codeProduct', data.codeProduct);
      formData.append('codeOrder', data.codeOrder);
      formData.append('rating', rating);
      formData.append('reviewText', reviewText);

      images.forEach((img) => formData.append('images', img.file));
      videos.forEach((vid) => formData.append('videos', vid.file));

      const response = await reviewApi.post(formData);
      toast.success(response.message);
      onChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Write a Review
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share your experience with this product
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Rating */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer transition-transform duration-200 ${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 scale-110'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                fill={star <= (hoveredRating || rating) ? '#facc15' : 'none'}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          {rating > 0 && (
            <span className="text-sm text-brand font-medium">
              {rating === 5
                ? 'Excellent!'
                : rating === 4
                ? 'Great!'
                : rating === 3
                ? 'Good'
                : rating === 2
                ? 'Fair'
                : 'Poor'}
            </span>
          )}
        </div>

        {/* Review Text */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full h-28 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition resize-none text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
            placeholder="Tell us about your experience..."
            maxLength={500}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <span
            className={`block text-xs text-right mt-1 ${
              reviewText.length > 400 ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            {reviewText.length}/500 characters
          </span>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Add Photos & Videos (Optional)
          </label>
          <div className="flex gap-3 flex-wrap">
            <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand transition">
              <Image size={18} className="text-brand" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Upload Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </label>

            <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand transition">
              <Video size={18} className="text-brand" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Upload Videos</span>
              <input
                type="file"
                accept="video/*"
                multiple
                hidden
                onChange={handleVideoUpload}
              />
            </label>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            • Images: Up to 5 files (JPG, PNG, max 5MB each) <br />
            • Videos: Up to 2 files (MP4, MOV, max 50MB each)
          </p>

          {(images.length > 0 || videos.length > 0) && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {images.map((img, idx) => (
                <div
                  key={`img-${idx}`}
                  className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={img.preview}
                    alt=""
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    onClick={() => removeMedia(idx, 'image')}
                    className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {videos.map((vid, idx) => (
                <div
                  key={`vid-${idx}`}
                  className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <video
                    src={vid.preview}
                    className="w-full h-24 object-cover rounded-md"
                    controls
                  />
                  <button
                    onClick={() => removeMedia(idx, 'video')}
                    className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!rating || !reviewText.trim() || isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand/90 transition transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
}
