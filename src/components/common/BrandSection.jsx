import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import brandApi from '../../api/brandApi';

export default function BrandListSection() {
  const [activeIndex, setActiveIndex] = useState(0);

 const [brands , setBrands] = useState([]);
 const navigate = useNavigate();

 useEffect(()=>{
  const getBrands = async()=>{
    try{
      const response = await brandApi.getBrands();
      setBrands(response.brands);
    }catch(err){
      console.log(err?.response?.data?.message||err.message);
    }
  }
  getBrands();
 },[]);

  useEffect(() => {

    if(brands?.length===0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % brands.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [brands.length]);

  const handleBrand=(slug)=>{
    navigate(`/brand/${slug}`);
  }

  return (
    <section className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl w-max text-gray-800 mb-4 border-b-2 border-b-gray-800">
          Brand
        </h2>

        {/* Brand Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {brands.map((brand, index) => (
            <div
            key={brand._id}
            onClick={()=>handleBrand(brand.slug)}
              className={`cursor-pointer group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp ${index === activeIndex
                ? 'ring-4 ring-brand shadow-xl'
                : 'hover:shadow-lg'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square">
                <img
                  src={`${process.env.REACT_APP_API_URL}`+`/${brand.thumbnail}`}
                  alt={brand.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                  }}
                  loading='lazy'
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className={`absolute bottom-0 left-0 right-0 p-1 bg-white/95 
                backdrop-blur-sm transform group-hover:translate-y-0
                transition-transform duration-300 ${index === activeIndex ?'translate-y-0':'translate-y-full'}`}>
                <h4 className="font-semibold text-center text-xs text-gray-900">{brand.name}</h4>
              </div>
              {index === activeIndex && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-brand rounded-full animate-pulse ring-2 ring-white" />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
