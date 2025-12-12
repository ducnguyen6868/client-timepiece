import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import brandApi from '../../api/brandApi';
import LoadingAnimations from '../common/LoadingAnimations';

export default function BrandSection() {

  const [brands, setBrands] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await brandApi.getBrands();
        setBrands(response.brands);
      } catch (err) {
        console.log(err?.response?.data?.message || err.message);
      }finally{
        setLoading(false);
      }
    }
    getBrands();
  }, []);

  if(loading){
    return(
      <LoadingAnimations option='dots_circle'/>
    );
  }

  return (
    <section className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-2xl text-center md:text-3xl text-gray-800 mb-2">
          Popular Brands
        </h2>
        <h4 className='text-center mb-4'>Shop from your favorite brands</h4>

        {/* Brand Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {brands.map((brand, index) => (
            <Link
              key={brand._id}
              to={`/brand/${brand.slug}`}
              className={`cursor-pointer overflow-hidden flex items-center justify-center bg-white
                rounded-xl p-2 animate-fadeInUp `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                title={brand.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Brand";
                }}
                loading='lazy'
                className="w-full h-auto object-cover rounded-md transition-all duration-300 hover:scale-110"
              />
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
};
