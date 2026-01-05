import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Compass , ArrowRight} from 'lucide-react';
import categoryApi from '../../api/categoryApi';
import LoadingAnimations from '../common/LoadingAnimations';
import Notification from '../common/Notification';

export default function CategorySection() {

  const [categoryies, setCategoryies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show , setShow] = useState(false);
  const [type,setType] = useState('');
  const [message,setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryies = async () => {
      try {
        const response = await categoryApi.getCategories();
        setCategoryies(response.categories);
      } catch (err) {
        setShow(true);
        setType('error');
        setMessage(err.response?.data?.message||err.message);
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
      <LoadingAnimations option='dots' />
    );
  };

  return (
    <>
    {/* Notification */}
    <Notification show={show} type={type} message={message} onClose={()=>setShow(false)}/>

    {/* Community */}
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-[200px]">

          {/* Big Featured Item: Men's Collection */}
          <div className="md:col-span-2 lg:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer"
          onClick={()=>handleCategory(categoryies[0].slug)}
          >
            <img
              alt={categoryies[0].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={categoryies[0].thumbnail}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white text-3xl font-serif font-bold">{categoryies[0].name}</h3>
              <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-light">
                {categoryies[0].description}
              </p>
            </div>
          </div>

          {/* Women Category */}
          <div className="relative group overflow-hidden rounded-2xl cursor-pointer"
          onClick={()=>handleCategory(categoryies[1].slug)}
          >
            <img
              alt={categoryies[1].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={categoryies[1].thumbnail}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 p-4 flex flex-col justify-end items-center text-center">
              <h3 className="text-white text-lg font-bold tracking-wider uppercase">{categoryies[1].name}</h3>
            </div>
          </div>

          {/* Automatic Category */}
          <div className="relative group overflow-hidden rounded-2xl cursor-pointer"
          onClick={()=>handleCategory(categoryies[2].slug)}
          >
            <img
              alt={categoryies[2].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={categoryies[2].thumbnail}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 p-4 flex flex-col justify-end items-center text-center">
              <h3 className="text-white text-lg font-bold tracking-wider uppercase">{categoryies[2].name}</h3>
            </div>
          </div>

          {/* Explore All Card */}
          <div className="relative group overflow-hidden rounded-2xl cursor-pointer bg-sky-50 dark:bg-gray-800 flex flex-col items-center justify-center p-6 text-center hover:bg-sky-500 transition-all duration-500">
            <div className="size-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <Compass className="text-sky-500 group-hover:animate-spin-slow" size={28} />
            </div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-white transition-colors">Tất cả danh mục</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-white/80 transition-colors">Hơn {categoryies.length-5}+ phong cách</span>
          </div>

          {/* Wide Item: Luxury Tier */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer"
          onClick={()=>handleCategory(categoryies[3].slug)}
          >
            <img
              alt={categoryies[3].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={categoryies[3].thumbnail}/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent p-8 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-serif font-bold">{categoryies[3].name}</h3>
              <span className="text-sky-400 font-semibold mt-2 flex items-center gap-2 text-sm group-hover:translate-x-2 transition-transform">
                Lựa chọn đặc quyền <ArrowRight size={16} />
              </span>
            </div>
          </div>

          {/* Smart Watch Category */}
          <div className="relative group overflow-hidden rounded-2xl cursor-pointer"
          onClick={()=>handleCategory(categoryies[4].slug)}
          >
            <img
              alt={categoryies[4].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={categoryies[4].thumbnail}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 p-4 flex flex-col justify-end items-center text-center">
              <h3 className="text-white text-lg font-bold tracking-wider uppercase">{categoryies[4].name}</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};
