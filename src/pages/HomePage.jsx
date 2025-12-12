import BrandSection from '../components/common/BrandSection';
import TrendingWatch from '../components/layout/TrendingWatch';
import FlashSaleWatch from '../components/layout/FlashSaleWatch';
import CollectionSection from '../components/layout/CollectionSection';
import CommunitySection from '../components/layout/CommunitySection';
import CategorySection from '../components/layout/CategorySection';

export default function HomePage() {

  return (
      <div className="min-h-screen bg-white ">

        <CollectionSection />

        <FlashSaleWatch />

        <BrandSection />

        <CategorySection/>

        <TrendingWatch />

        {/* Community */}
        <CommunitySection />

      </div>

  );
}
