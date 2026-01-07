import { Eye } from 'lucide-react';
import {Icon} from '@iconify/react';
import {Link} from 'react-router-dom';
import { useLazyLoad } from '../hooks/useLazyLoad';
import FlashSaleSection from '../components/layout/FlashSaleSection';
import CommunitySection from '../components/layout/CommunitySection';
import TopSellingSection from '../components/layout/TopSellingSection';
import CollectionSection from '../components/layout/CollectionSection';
import CategorySection from '../components/layout/CategorySection';

// Component wrapper để lazy load
function LazySection({ children, minHeight = '400px', name }) {
  const [ref, isVisible] = useLazyLoad();

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? (
        <div className="animate-fadeIn">
          {children}
        </div>
      ) : (
        <div className="bg-slate-100 rounded-xl p-8 animate-pulse">
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <Eye size={24} />
            <span className="text-lg font-semibold">
              Đang chờ scroll tới {name}...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white">

      {/* Sections với lazy loading */}
      <LazySection name="Collection Section" minHeight="500px">
        <CollectionSection />
      </LazySection>

      <LazySection name="Flash Sale Section" minHeight="450px">
        <FlashSaleSection />
      </LazySection>

      <LazySection name="Category Section" minHeight="600px">
        <CategorySection />
      </LazySection>

      <LazySection name="Trending Watch" minHeight="500px">
        <TopSellingSection />
      </LazySection>

      <LazySection name="Community Section" minHeight="600px">
        <CommunitySection />
      </LazySection>

      <Link className="fixed bottom-8 left-8 z-[9999] flex items-center gap-3 px-5 py-3.5 bg-brand hover:bg-brand-hover text-white 
      rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group
      peer-checked:blur-sm peer-checked:pointer-events-none" htmlFor="feedback-popup-trigger"
      to='/feed-back'
      >
        <div className="relative flex items-center justify-center">
          <Icon icon="material-symbols:lightbulb-outline-rounded" width="24" height="24" style={{ color:'#ffffff' }} />              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
        </div>
        <span className="font-bold text-sm tracking-wide pr-1">Đóng góp ý kiến</span>
      </Link>

    </div>
  );
}

// CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`;
document.head.appendChild(style);
