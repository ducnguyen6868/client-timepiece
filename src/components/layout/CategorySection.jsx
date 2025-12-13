import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryApi from '../../api/categoryApi';
import LoadingAnimations from '../common/LoadingAnimations';

export default function CategorySection() {

  const [categoryies, setCategoryies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryies = async () => {
      try {
        const response = await categoryApi.getCategories();
        setCategoryies(response.categories);
      } catch (err) {
        console.log(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    getCategoryies();
  }, []);

  const handleCategory = (slug) => {
    navigate(`/category/${slug}`);
  }

  if (loading) {
    return (
      <LoadingAnimations option='dots_circle' />
    )
  }
  return (
    <section className="py-2 md:py-4 xl:py-6 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-2xl text-center md:text-3xl text-gray-800 mb-2">
          Watch Categories
        </h2>
        <h4 className='text-center mb-4'>Explore our curated collection of timepieces across various styles and functionalities</h4>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryies?.map((category, index) => (
            <div
              key={category._id}
              onClick={() => handleCategory(category.slug)}
              className={`cursor-pointer group relative overflow-hidden flex flex-col gap-2 items-center justify-start
                 transition-all duration-300 transform hover:scale-105 animate-fadeInUp `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='overflow-hidden rounded-md'>
                <img
                  src={category.thumbnail}
                  alt={category.name}
                  title={category.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Category";
                  }}
                  loading='lazy'
                  className="w-full h-auto object-cover  duration-400 hover:scale-125 transition-all"
                />
              </div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
