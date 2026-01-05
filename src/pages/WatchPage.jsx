import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ShoppingCart, Minus, Plus, Star, Heart, X,
  ChevronLeft, ChevronRight, Check, Clock, Award, Eye,
} from 'lucide-react';
import { Icon } from '@iconify/react';
import { UserContext } from '../contexts/UserContext';
import { formatCurrency } from '../utils/formatCurrency';
import userApi from '../api/userApi';
import watchApi from '../api/watchApi';
import Review from '../components/common/Review';
import WatchNotFound from '../components/layout/WatchNotFound';
import LoadingAnimations from '../components/common/LoadingAnimations';
import Notification from '../components/common/Notification';

const Login = ({ onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm'
      onClick={onClose}
    >
      <div className='bg-white p-4 rounded-lg relative w-full max-w-80'
        onClick={(e) => e.stopPropagation()}>
        <button className='absolute top-2 right-2'>
          <X className='w-5 h-5' />
        </button>
        <p className='mb-4 pt-2'>Please login to complete this action.</p>
        <p className='flex gap-4'>
          <button className='flex-1 text-gray-900 bg-slate-200 py-2 px-6 rounded-lg'
            onClick={onClose}>
            Back
          </button>
          <Link to='/login' className='flex-1 text-center bg-brand text-white py-2 px-6 rounded-lg'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
};

export default function WatchPage() {

  const { infoUser, setInfoUser, locale, currency } = useContext(UserContext);

  const { slug } = useParams();
  const navigate = useNavigate();

  const [logged, setLogged] = useState(false);
  const [alert, setAlert] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [watch, setWatch] = useState();
  const [timeLeft, setTimeLeft] = useState({
    minutesLeft: 0,
    secondsLeft: 0
  });

  const [isWish, setIsWish] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const [selectedVariation, setSelectedVariation] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const variation = watch?.variations[selectedVariation];
  const isInStock = variation?.quantity > 0;


  const handleVariationChange = (index) => {
    setSelectedVariation(index);
    setSelectedImage(0);
    setQuantity(1);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % variation.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + variation.images.length) % variation.images.length);
  };

  useEffect(() => {
    if (!slug || slug === '') return;
    const getWatch = async () => {
      try {
        const response = await watchApi.getWatch(slug);
        setWatch(response.watch);
        setWishCount(response.watch?.wishlisted);
      } catch (err) {
        setShow(true);
        setType('error');
        setMessage(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getWatch();
  }, [slug]);

  useEffect(() => {
    if (!watch?.flashSaleEnd) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const end = new Date(watch.flashSaleEnd);
      const diff = end-now;
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft =  Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ minutesLeft, secondsLeft });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [watch?.flashSaleEnd]);

  useEffect(() => {
    if (!infoUser || infoUser.fullName === '') return;
    setLogged(true);

    const checkWishlist = async () => {
      try {
        const response = await userApi.checkWishlist(slug);
        setIsWish(response.isWish);
      } catch (err) {
        setShow(true);
        setType('error');
        setMessage(err.response?.data?.message || err.message);
      }
    }
    checkWishlist();

  }, [infoUser, slug, wishCount]);

  const renderStars = (rating) => (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.floor(rating) ? 'fill-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );

  const handleWishlist = async (slug) => {
    if (logged) {
      try {
        const action = isWish ? 'remove-from-wishlist' : 'add-to-wishlist';
        const response = await userApi.patchWishlist(action, slug);
        setWishCount(response.wishlisted);
        setShow(true);
        setType(response.type);
        setMessage(response.message);
        setInfoUser(prev => ({ ...prev, wishlist: response.wishlist }));
      } catch (err) {
        setShow(true);
        setType('error');
        setMessage(err.response?.data?.message || err.message);
      }
    } else {
      setAlert(true);
    }
  };

  const handleCart = async (sku) => {
    if (logged) {
      try {
        const response = await userApi.patchCart(sku);
        setShow(true);
        setType(response.type);
        setMessage(response.message);
        setInfoUser(prev => ({ ...prev, cart: response.cart }));
      } catch (err) {
        setShow(true);
        setType(type);
        setMessage(err.response?.data?.message || err.message);
      }
    } else {
      setAlert(true);
    }
  };

  const handleBuyNow = () => {
    const price = watch.flashSale ? variation.flashSalePrice : variation.currentPrice;
    const watchData = [{
      slug: watch.slug,
      sku: variation.sku,
      name: watch.name,
      thumbnail: watch.thumbnail,
      price: price,
      quantity: 1,
      color: variation.color,
      material: variation.material,
      strapType: variation.strapType
    }];
    navigate("/watch/checkout", { state: { watchData } });
  }

  if (loading) {
    return (
      <LoadingAnimations option='dots_circle' />
    );
  };

  if (!watch || !watch.name) {
    return (
      <WatchNotFound />
    );
  };

  return (
    <>
      <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
    
      <div className="min-h-screen bg-gray-50">
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8 mb-4">
            {/* Image Gallery */}
            <div className="space-y-4 col-span-2 mb-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={variation.images[selectedImage]}
                  alt={watch.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=WATCH";
                  }}
                  loading='lazy'
                  className="w-full h-full object-cover"
                />

                {watch.flashSale && variation.flashSalePrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-md font-bold text-[10px] md:text-xs">
                    FLASH SALE
                  </div>
                )}

                {
                  watch.flashSale ? (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-[12px] px-3 py-1.5 rounded-md uppercase font-bold">
                      - {((1 - variation.flashSalePrice / variation.originalPrice) * 100).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-[12px] px-3 py-1.5 rounded-md uppercase font-bold">
                      - {((1 - variation.currentPrice / variation.originalPrice) * 100).toFixed(2)}%
                    </div>
                  )

                }


                {variation.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {variation.images?.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${selectedImage === idx ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-scroll max-h-28">
                {variation.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 min-w-20 transition-all ${selectedImage === idx ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                      }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=WATCH";
                      }}
                      loading='lazy'
                      className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className='flex gap-2 flex-wrap items-center justify-between md:justify-start md:gap-6' >
                <p className='flex gap-2 items-end'>
                  <span>Share with :</span>
                  <Icon icon="logos:messenger" width="22" height="22" className='cursor-pointer' />
                  <Icon icon="logos:x" width="20" height="22" className='cursor-pointer' />
                </p>
                <p className='flex gap-2 items-end'>
                  {isWish ? (
                    <Heart fill='red' className='text-red-600 cursor-pointer' onClick={() => handleWishlist(watch.slug)} />
                  ) : (
                    <Heart className='cursor-pointer' onClick={() => handleWishlist(watch.slug)} />
                  )}
                  <span>{wishCount}</span>
                </p>
                <p className="flex items-center gap-2  ">
                  <Eye className="w-5 h-5" />
                  <span>{watch.views.toLocaleString()} views</span>
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 col-span-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Link to={`/brand/${watch.brand?.name}`} className="font-medium hover:font-semibold">{watch.brand?.name || 'N/A'}</Link>
                  <span>•</span>
                  <span>SKU: {variation.sku}</span>
                </div>

                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{watch.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(watch.ratingAverage)}
                    </div>
                    <span className="font-semibold">{watch.ratingAverage}</span>
                    <span className="text-gray-600">({watch.ratingCount} reviews)</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{variation.sold} sold</span>
                </div>

                <p className="text-gray-600 leading-relaxed">{watch.shortDescription}</p>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg">
                <div className="flex items-baseline gap-3 mb-2">
                  {watch.flashSale ? (
                    <>
                      <span className="text-2xl font-bold text-brand md:text-3xl xl:text-3xl">
                        {formatCurrency(variation?.flashSalePrice, locale, currency)}
                      </span>
                      <span className="text-base md:text-lg xl:text-xl text-gray-400 line-through">
                        {formatCurrency(variation?.originalPrice, locale, currency)}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[11px] md:text-sm font-semibold">
                        Save {formatCurrency((variation?.originalPrice - variation?.flashSalePrice), locale, currency)}
                      </span>
                    </>
                  ) : (
                    <>

                      <span className="text-2xl font-bold text-brand md:text-3xl xl:text-3xl">
                        {formatCurrency(variation?.currentPrice, locale, currency)}
                      </span>
                      <span className="text-base md:text-lg xl:text-xl text-gray-400 line-through">
                        {formatCurrency(variation?.originalPrice, locale, currency)}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[11px] md:text-sm font-semibold">
                        Save {formatCurrency((variation?.originalPrice - variation?.currentPrice), locale, currency)}
                      </span>
                    </>
                  )}

                </div>
                {watch.flashSale && variation?.flashSalePrice && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <Clock className="w-4 h-4" />
                    <span>Flash sale ends in {timeLeft.minutesLeft} : {timeLeft.secondsLeft} </span>
                  </div>
                )}
              </div>

              {/* Variation Property */}
              {/* Color */}
              <div className='flex gap-4 items-end'>
                <h3 className="font-semibold">
                  Color :
                </h3>
                <div className="flex gap-3">
                  {watch.variations?.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariationChange(idx)}
                      disabled={v.quantity === 0}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all ${selectedVariation === idx
                        ? 'border-blue-600 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                        } ${v.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: v.colorCode }}
                    >
                      {selectedVariation === idx && (
                        <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                      {v.quantity === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {/* Material */}
              <div className='flex gap-4 items-end'>
                <h3 className="font-semibold">
                  Material :
                </h3>
                <div className="flex gap-3">
                  {watch.variations?.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariationChange(idx)}
                      disabled={v.quantity === 0}
                      className={`border-2 text-sm py-1 px-4 rounded-lg transition-all 
          ${selectedVariation === idx
                          ? 'border-brand text-brand shadow-md'
                          : 'text-gray-700 border-gray-300 hover:border-brand hover:text-brand'
                        } 
          ${v.quantity === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : ''}`}
                    >
                      {v.material}
                    </button>
                  ))}
                </div>
              </div>
              {/* Strap Type */}
              <div className='flex gap-4 items-end'>
                <h3 className="font-semibold">
                  Strap Type :
                </h3>
                <div className="flex gap-3">
                  {watch.variations?.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariationChange(idx)}
                      disabled={v.quantity === 0}
                      className={`border-2 text-sm py-1 px-4 rounded-lg transition-all 
          ${selectedVariation === idx
                          ? 'border-brand text-brand shadow-md'
                          : 'text-gray-700 border-gray-300 hover:border-brand hover:text-brand'
                        } 
          ${v.quantity === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : ''}`}
                    >
                      {v.strapType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Stock */}
              <div className='flex gap-4 items-end' >
                <h3 className="font-semibold">Quantity :</h3>
                <div className="flex gap-4 items-center border rounded-lg text-sm py-1 px-2">
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={!isInStock || quantity <= 1}
                    className="hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input name='quantity' className="w-8 text-center outline-none" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!isInStock || quantity >= variation.quantity}
                    className="hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className={`text-sm ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                  {isInStock ? `${variation.quantity} in stock` : 'Out of stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    disabled={!isInStock}
                    className="bg-brand text-white py-2 px-24 rounded-lg hover:bg-brand-hover
                    disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    onClick={() => handleBuyNow()}
                  >
                    Buy Now
                  </button>

                  <button
                    disabled={!isInStock}
                    className="border-gray-300  border-2 text-gray-700 py-2 px-4 rounded-lg
                    disabled:bg-gray-300 disabled:cursor-not-allowed
                    transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleCart(variation.sku)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b">
              <div className="flex gap-4 px-4">
                {['description', 'specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-semibold py-2 capitalize transition-colors ${activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className='p-4'>
                  <p className="text-gray-700 leading-relaxed mb-3 text-justify">{watch.description}</p>
                  <div className='flex gap-4 mb-2'>
                    <h4 className="text-lg font-semibold ">Brand :</h4>
                    <span>{watch?.brand?.name || 'N/A'}</span>
                  </div>
                  <div className='flex gap-4 mb-2'>
                    <h4 className="text-lg font-semibold ">Origin :</h4>
                    <span>{watch?.origin || 'N/A'}</span>
                  </div>
                  <div className='flex gap-4 mb-2'>
                    <h4 className="text-lg font-semibold ">Target Audience :</h4>
                    <span>{watch?.targetAudience || 'N/A'}</span>
                  </div>

                  <h4 className="text-lg font-semibold mb-3">Key Features: </h4>
                  <ul className="space-y-2">
                    {watch.specs.functions?.map((fun, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{fun}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 md:mt-2 md:p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Why Choose This Watch?
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    This timepiece represents the perfect blend of form and function. Crafted with premium materials and powered by a reliable automatic movement, it is designed to last a lifetime. Whether you are diving into the depths or attending a formal event, this watch adapts to every occasion with timeless elegance.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <dl className="space-y-3">

                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium text-gray-700">Movement Type</dt>
                    <dd className="text-gray-900">{watch.specs.movement || 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium text-gray-700">Power Reserve</dt>
                    <dd className="text-gray-900">{watch.specs.powerReserve || 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium text-gray-700">Water Resistance</dt>
                    <dd className="text-gray-900">{watch.specs.waterResistance || 'N/A'}</dd>
                  </div>
                </dl>

                <dl className="space-y-3">

                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium text-gray-700">Case Diameter</dt>
                    <dd className="text-gray-900">{watch.specs.caseDiameter}mm</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium text-gray-700">Case Thickness</dt>
                    <dd className="text-gray-900">{watch.specs.caseThickness} mm</dd>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium text-gray-700">Dial Type</dt>
                    <dd className="text-gray-900">{watch.specs.dialType || 'N/A'}</dd>
                  </div>

                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <Review />
            )}
          </div>
        </div>
      </div>

      {alert && (
        <Login onClose={() => setAlert(false)} />
      )}
    </>
  );
}
