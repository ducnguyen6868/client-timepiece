import { useState, useEffect, useContext } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingCart, Heart, Zap, Truck, ShieldCheck, Gem, Minus, Plus, Star } from 'lucide-react';
import { UserContext } from '../contexts/UserContext';
import { formatCurrency } from '../utils/formatCurrency';
import userApi from '../api/userApi';
import productApi from '../api/productApi';
import Review from '../components/common/Review';

export default function ProductPage() {
  const { setInfoUser, locale, currency } = useContext(UserContext);
  const navigate = useNavigate();
  
  const {slug} = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [stars, setStars] = useState();

  useEffect(() => {
    if(!slug || slug==='') return;
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProduct(slug);
        setProduct(response.product);
        setStars(response.stars);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);

  const handleQuantityChange = (action) => {
    const selectedDetail = product.detail?.[selectedDetailIndex];
    const maxQuantity = selectedDetail?.quantity;
    if (action === 'increase' && quantity < maxQuantity) setQuantity(quantity + 1);
    else if (action === 'decrease' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleOrder = () => {
    const selectedDetail = product.detail?.[selectedDetailIndex];
    const productData = [
      {
        id: product._id,
        name: product.name,
        code: product.code,
        brand: product.brand.name,
        image: product.images[0],
        price: selectedDetail.currentPrice,
        index: selectedDetailIndex,
        color: selectedDetail.color,
        quantity: quantity,

      }
    ];
    navigate('../product/checkout', { state: { productData } });
  };

  const handleCart = async (product) => {
    try {
      const id = product._id;
      const selectedDetail = product.detail?.[selectedDetailIndex];
      const image = product.images[selectedDetailIndex];
      const data = {
        id,
        code: product.code,
        name: product.name,
        image,
        description: product.description,
        quantity: 1,
        color: selectedDetail.color,
        price: selectedDetail.currentPrice,
        detailId: selectedDetail._id
      };
      const response = await userApi.addCart(data);
      toast.success(response.message);
      setInfoUser((prev) => ({ ...prev, cart: response.cart }));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const calcStarWidth = (star) => {
    let total = stars?.five + stars?.four + stars?.three + stars?.two + stars?.one || 0;
    if (total === 0) total = 1;
    return (star / total) * 100;
  };

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading product...
      </div>
    );

  if (!product || !product.name)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Product not found
      </div>
    );

  const selectedDetail = product.detail?.[selectedDetailIndex] || {};

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow">
              <img
                src={`http://localhost:5000/${product.images[selectedDetailIndex]}`}
                alt={product.name}
                loading='lazy'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                }}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${selectedDetailIndex === i
                    ? 'border-blue-500'
                    : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt={product.name}
                    title={product.name}
                    loading='lazy'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                    }}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div className="text-white px-4 py-1 rounded-xl font-semibold uppercase tracking-wide text-sm w-max bg-emerald-600">
              ✨ Limited Edition
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-2">
              {renderStars(product.ratings)}
              <span className="text-gray-700 font-medium">{product?.ratings.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">
                ({product.reviews || 0} Reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-blue-600">
                {formatCurrency(selectedDetail.currentPrice, locale, currency)}
              </span>
              {selectedDetail.originalPrice > selectedDetail.currentPrice && (
                <>
                  <span className="line-through text-gray-400">
                    {formatCurrency(selectedDetail.originalPrice, locale, currency)}
                  </span>
                  <span className="text-green-600 text-sm font-medium">
                    Save{' '}
                    {formatCurrency(
                      selectedDetail.originalPrice - selectedDetail.currentPrice,
                      locale,
                      currency
                    )}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Color Variants */}
            {product.detail?.length > 0 && (
              <div>
                <p className="font-semibold text-gray-700 mb-2">Color & Variant</p>
                <div className="flex gap-2">
                  {product.detail.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDetailIndex(index);
                        setQuantity(1);
                      }}
                      className={`w-10 h-10 rounded-full border-2 transition-transform ${selectedDetailIndex === index
                        ? 'border-blue-600 scale-110'
                        : 'border-gray-300'
                        }`}
                      style={{
                        backgroundColor: item.colorCode || '#ccc'
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {selectedDetail.color} –{' '}
                  {formatCurrency(selectedDetail.currentPrice, locale, currency)} (
                  {selectedDetail.quantity || 0} in stock)
                </p>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-10 text-center border-x border-gray-200"
                />
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => handleCart(product)}
                className="flex flex-1 items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                onClick={handleOrder}
                className="flex flex-1 items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Zap size={18} /> Buy Now
              </button>

              <button className="p-2 border rounded-lg  hover:text-red-600">
                <Heart size={18} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-6 justify-evenly text-gray-600 text-sm pt-6">
              <div className="flex items-center gap-2">
                <Truck size={16} /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} /> 2-Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <Gem size={16} /> 100% Authentic
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 bg-white rounded-xl shadow px-8 py-4">
          <div className="flex border-b mb-6">
            {['description', 'specifications', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium border-b-2 transition-all ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
              >
                {tab === 'description'
                  ? 'Description'
                  : tab === 'specifications'
                    ? 'Specifications'
                    : tab === 'features'
                      ? 'Features'
                      : `Reviews (${product.reviews || 0})`}
              </button>
            ))}
          </div>

          {/* Description */}
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Product Details</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {/* Features */}
          {activeTab === 'features' && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {product.features
                  ? product.features
                    .split(',')
                    .map((f, i) => <li key={i}>✓ {f.trim()}</li>)
                  : 'No features available'}
              </ul>
            </div>
          )}

          {/* Specs */}
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                <p>
                  <strong>Brand:</strong> {product.brand?.name || 'N/A'}
                </p>
                <p>
                  <strong>Audience:</strong> {product.target_audience || 'N/A'}
                </p>
                <p>
                  <strong>Movement:</strong> {product.movement_type || 'N/A'}
                </p>
                <p>
                  <strong>Dial:</strong> {product.dial_type || 'N/A'}
                </p>
                <p>
                  <strong>Thickness:</strong> {product.thickness || 'N/A'}
                </p>
                <p>
                  <strong>Water Resistance:</strong> {product.water_resistance || 'N/A'}
                </p>
                <p>
                  <strong>Glass Material:</strong> {product.glass_material || 'N/A'}
                </p>
                <p>
                  <strong>Strap Material:</strong> {product.strap_material || 'N/A'}
                </p>
                <p>
                  <strong>Power Reserve:</strong> {product.power_reserve || 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="text-5xl font-bold text-blue-600">
                    {product?.ratings.toFixed(1)}
                  </div>
                  <div className="flex text-yellow-500">
                    {renderStars(product?.ratings)}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {product?.reviews || 0} Reviews
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="w-6 text-sm">{n}⭐</span>
                      <div className="flex-1 bg-gray-200 h-2 rounded">
                        <div
                          className="bg-yellow-400 h-2 rounded"
                          style={{
                            width: `${calcStarWidth(
                              stars?.[['five', 'four', 'three', 'two', 'one'][5 - n]]
                            )}%`
                          }}
                        ></div>
                      </div>
                      <span className="w-6 text-sm text-gray-500 text-right">
                        {stars?.[['five', 'four', 'three', 'two', 'one'][5 - n]]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Review code={product.code} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
