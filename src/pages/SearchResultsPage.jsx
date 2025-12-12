import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useImageStore } from '../store/imageStore';
import watchApi from '../api/watchApi';
import brandApi from '../api/brandApi';
import WatchCard from '../components/common/WatchCard';
import LoadingAnimations from '../components/common/LoadingAnimations';
import Notification from '../components/common/Notification';
import { motion, AnimatePresence } from "framer-motion";


export default function SearchResultsPage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const { formData } = useImageStore();

  const [results, setResults] = useState([]);
  const [brands, setBrands] = useState([]);

  //Notification
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Filters
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    brand: 'all',
    audience: 'all',
    movement: 'all',
    minRating: 0
  });

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const applyFiltersAndSort = () => {
      let filtered = [...results];

      // Apply filters (logic giữ nguyên)
      if (filters.priceMin) {
        filtered = filtered.filter(item => item.detail[0]?.price >= parseFloat(filters.priceMin));
      }
      if (filters.priceMax) {
        filtered = filtered.filter(item => item.detail[0]?.price <= parseFloat(filters.priceMax));
      }
      if (filters.brand !== 'all') {
        filtered = filtered.filter(item => item.brand.name === filters.brand);
      }
      if (filters.audience !== 'all') {
        filtered = filtered.filter(item => item.target_audience === filters.audience);
      }
      if (filters.movement !== 'all') {
        filtered = filtered.filter(item => item.movement_type === filters.movement);
      }
      if (filters.minRating > 0) {
        filtered = filtered.filter(item => item.ratings >= filters.minRating);
      }

      // Apply sorting (logic giữ nguyên)
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.detail[0]?.price - b.detail[0]?.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.detail[0]?.price - a.detail[0]?.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.ratings - a.ratings);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }

      setFilteredResults(filtered);
    };

    setTimeout(() => {
      applyFiltersAndSort();
      setLoading(false);
    }, 500);
  }, [sortBy, filters, results]);

  useEffect(() => {
    setFilteredResults([]);
    if (!keyword || keyword === '') return;
    const getWatches = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await watchApi.search(keyword);
        const update = response.watch.map((pro) => {
          const sold = pro.detail?.reduce((t, d) => t + d.sold, 0);
          const total = pro.detail?.reduce((t, d) => t + d.quantity, 0);
          const stock = total - sold;
          const reviewCount = pro.reviews.length;
          return { ...pro, sold, stock, reviewCount }
        });
        setResults(update);
      } catch (err) {
        if (filteredResults?.length === 0) {
          setType('error');
          setMessage(err.response?.data?.message || err.message);
          setShow(true);

        }
      } finally {
        setLoading(false);
      }
    }
    getWatches();
  }, [keyword]);

  useEffect(() => {
    const getWatches = async () => {
      try {
        setLoading(true);
        new Promise(resolve => setTimeout(resolve, 1500));
        const response = await watchApi.postImgToSearch(formData);
        setResults(response.watches);
        setShow(true);
        setMessage(response.message);
        setType('success');
        useImageStore.getState().clearFormData(formData);
      } catch (err) {
        setShow(true);
        setMessage(err.response?.data?.message || err.message);
        setType('error');
      } finally {
        setLoading(false);
      }
    }
    getWatches();
  }, [formData]);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await brandApi.getBrands();
        setBrands(response.brands);
      } catch (err) {
        setType('error');
        setMessage(err.response?.data?.message || err.message);
        setShow(true);
      }
    }
    getBrands();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      brand: 'all',
      audience: 'all',
      movement: 'all',
      minRating: 0
    });
  };

  const renderStars = (rating) => {
    const safeRating = Math.max(0, Math.floor(rating));
    return '⭐'.repeat(safeRating);
  };

  return (
    <>
      <Notification type={type} message={message} show={show} onClose={() => setShow(false)} />
      <div className="container mx-auto p-3 sm:p-4 text-sm flex flex-row gap-4 flex-wrap">

        {/* SIDEBAR */}
        <AnimatePresence>
          <motion.aside
            className="
        w-full lg:w-max
        bg-white dark:bg-gray-800
        p-4 lg:p-0
        rounded-md shadow-md lg:shadow-none
        border border-gray-200 dark:border-gray-700
        max-w-[560px]
      "
            initial={{ scale: 0.6, opacity: 0, y: 60 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 120, damping: 18 }
            }}
            exit={{
              scale: 0.6,
              opacity: 0,
              y: 60,
              transition: { duration: 0.25 }
            }}
          >

            {/* FILTER BLOCK - STANDARDIZED */}
            <div className="space-y-4">

              {/* PRICE RANGE */}
              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600">
                <h4 className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">Price Range</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                  />
                </div>
              </div>

              {/* BRAND & MOVEMENT */}
              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 space-y-3">
                <div>
                  <h4 className="text-base font-medium mb-1 text-gray-800 dark:text-gray-200">Brand</h4>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    value={filters.brand}
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                  >
                    <option value="all">All Brands</option>
                    {brands?.map((brand) => (
                      <option key={brand._id} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-base font-medium mb-1 text-gray-800 dark:text-gray-200">Movement Type</h4>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    value={filters.movement}
                    onChange={(e) => handleFilterChange("movement", e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Quartz">Quartz</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                </div>
              </div>

              {/* AUDIENCE */}
              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600">
                <h4 className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">For</h4>
                <div className="flex flex-wrap gap-3">
                  {["all", "Male", "Female", "Unisex"].map((val) => (
                    <label key={val} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        name="audience"
                        value={val}
                        checked={filters.audience === val}
                        onChange={(e) => handleFilterChange("audience", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      {val === "all" ? "All" : val}
                    </label>
                  ))}
                </div>
              </div>

              {/* RATING */}
              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600">
                <h4 className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">Min Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.minRating === rating}
                        onChange={() => handleFilterChange("minRating", rating)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="whitespace-nowrap">{renderStars(rating)} <span className="text-xs">(and up)</span></span>
                    </label>
                  ))}
                </div>
              </div>

              {/* CLEAR BUTTON */}
              <button
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-sm transition"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>

            </div>
          </motion.aside>
        </AnimatePresence>

        {/* MAIN CONTENT */}
        <main className="flex-1">

          {/* HEADER */}
          <div className="flex sm:flex-row justify-between items-center sm:items-center gap-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border dark:border-gray-700">
            <div>
              {keyword && (
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Results for "<span className="text-indigo-600">{keyword}</span>"
                </h2>
              )}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {filteredResults.length} watches found
              </p>
            </div>

            <select
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 dark:text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* LOADING */}
          {loading && (
              <LoadingAnimations option="skeleton" />
          )}

          {/* NO RESULTS */}
          {!loading && filteredResults.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 bg-white dark:bg-gray-800 rounded-md shadow-md border dark:border-gray-700 text-center">
              <div className="text-5xl mb-3">🔍</div>
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">No watches found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search query</p>
              <button
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md transition"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* GRID */}
          {!loading && filteredResults.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.map((watch, index) => (
                <WatchCard key={index} watch={watch} />
              ))}
            </div>
          )}

        </main>
      </div>

    </>
  )
}