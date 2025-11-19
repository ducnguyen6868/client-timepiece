import { useState, useEffect, useRef } from 'react';
import { Heart, User } from 'lucide-react';
import BrandSection from '../components/common/BrandSection';
import TrendingProduct from '../components/layout/TrendingProduct';
import FlashSaleProduct from '../components/layout/FlashSaleProduct';
import CollectionSection from '../components/layout/CollectionSection';
import CommunitySection from '../components/layout/CommunitySection';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white ">
      
      <CollectionSection/>

      <FlashSaleProduct />

      <BrandSection/>

      <TrendingProduct />

      {/* Community */}
      <CommunitySection/>

    </div>
  );
}
