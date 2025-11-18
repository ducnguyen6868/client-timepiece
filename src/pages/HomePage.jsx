import { useState, useEffect, useRef } from 'react';
import { Heart, User } from 'lucide-react';
import BrandSection from '../components/common/BrandSection';
import TrendingProduct from '../components/layout/TrendingProduct';
import FlashSaleProduct from '../components/layout/FlashSaleProduct';
import CollectionSection from '../components/layout/CollectionSection';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  const communityPosts = [
    { id: 1, author: 'Julius_P', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop', text: 'I couldn\'t be more pleased with my purchase. From the packaging to the actual timepiece, everything screamed quality.' },
    { id: 2, author: 'Sarah.w', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop', text: 'Received my order within days and was very impressed. The watch is absolutely stunning and very well made. 5 stars!' },
    { id: 3, author: 'Leon.d', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop', text: 'I ordered two for my wife and myself. These are our new favorite watches. We will definitely be back to order more!' },
    { id: 4, author: 'Leon.d', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop', text: 'I ordered two for my wife and myself. These are our new favorite watches. We will definitely be back to order more!' }
  ];

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // --- Render ---

  return (
    <div className="min-h-screen bg-white ">
      
      <CollectionSection/>

      <FlashSaleProduct />

      <BrandSection/>

      <TrendingProduct />

      {/* Community */}
      <section className="bg-bg-primary px-8 transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {communityPosts.map((post, idx) => (
            <div
              key={post.id}
              id={`post-${post.id}`}
              data-animate
              className={`bg-bg-secondary rounded-xl overflow-hidden border border-border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${isVisible[`post-${post.id}`] ? 'animate-fadeInUp visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="overflow-hidden bg-bg-tertiary">
                <img
                  src={post.image}
                  alt={post.author}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/94a3b8/ffffff?text=Community+Post'; }}
                  className="w-full aspect-[4/3] object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-bg-tertiary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-text-muted" />
                  </div>
                  <span className="font-semibold text-sm text-text-primary">{post.author}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">{post.text}</p>
                <button className="text-text-muted hover:text-error transition-colors transform hover:scale-110">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
