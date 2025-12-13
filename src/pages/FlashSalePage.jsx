import React, { useState, useEffect } from 'react';
import { Zap, Star, Sparkles, Heart, TrendingUp, Award, PackageCheck, Rocket,Crown, Gift } from 'lucide-react';

export default function FlashSalePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const [particles, setParticles] = useState([]);

  const products = [
    {
      id: 1,
      name: 'AirPods Max Elite',
      tagline: 'Studio-Quality Sound',
      price: 549.99,
      salePrice: 299.99,
      discount: 45,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      rating: 4.9,
      sold: 1247,
      badge: 'BEST SELLER',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Galaxy Watch Ultra',
      tagline: 'Track Everything',
      price: 599.99,
      salePrice: 299.99,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      rating: 4.8,
      sold: 2103,
      badge: 'LIMITED',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 3,
      name: 'Pro Camera X100',
      tagline: 'Capture Perfection',
      price: 1299.99,
      salePrice: 799.99,
      discount: 38,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
      rating: 5.0,
      sold: 856,
      badge: 'PREMIUM',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      name: 'Thunder Speaker',
      tagline: '360° Sound Blast',
      price: 199.99,
      salePrice: 99.99,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      rating: 4.7,
      sold: 3421,
      badge: 'HOT DEAL',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 5,
      name: 'Quantum Mouse Pro',
      tagline: 'Gaming Precision',
      price: 149.99,
      salePrice: 74.99,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop',
      rating: 4.9,
      sold: 1876,
      badge: 'GAMING',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      name: 'Elite Keyboard RGB',
      tagline: 'Mechanical Perfection',
      price: 179.99,
      salePrice: 89.99,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop',
      rating: 4.8,
      sold: 2567,
      badge: 'TOP RATED',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    return () => clearInterval(timer);
  }, []);

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${5 + particle.delay}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`
            }}
          ></div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,188,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,188,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,188,212,0.5); }
          50% { box-shadow: 0 0 40px rgba(0,188,212,0.8), 0 0 60px rgba(0,188,212,0.6); }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Flash Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-8 py-4 rounded-full mb-8 animate-slideUp shadow-2xl">
            <Sparkles className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-white font-black text-lg tracking-wider">MEGA FLASH SALE</span>
            <Sparkles className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>

          {/* Main Heading */}
          <h2 className="text-7xl md:text-9xl font-black mb-6 leading-none" style={{ animationDelay: '0.2s' }}>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-white animate-slideUp">
              LIGHTNING
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              DEALS
            </div>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-400 font-bold mb-12 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            Save up to <span className="text-cyan-400 text-5xl font-black">50%</span> on premium tech
          </p>

          {/* 3D Countdown Timer */}
          <div className="inline-block bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-cyan-500 shadow-2xl animate-glow animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Rocket className="w-8 h-8 text-cyan-400 animate-bounce" />
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                TIME REMAINING
              </span>
            </div>
            <div className="flex gap-6">
              {[
                { label: 'HRS', value: timeLeft.hours },
                { label: 'MIN', value: timeLeft.minutes },
                { label: 'SEC', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500 rounded-2xl p-6 min-w-32 shadow-2xl">
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400">
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-cyan-400 text-sm font-black mt-3 tracking-widest">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, value: '10K+', label: 'Happy Shoppers', color: 'from-cyan-500 to-blue-500' },
              { icon: Award, value: '4.9★', label: 'Average Rating', color: 'from-purple-500 to-pink-500' },
              { icon: PackageCheck, value: '50K+', label: 'Orders Shipped', color: 'from-green-500 to-teal-500' }
            ].map((stat, idx) => (
              <div key={idx} className="relative group cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity`}></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`} />
                  <div className={`text-4xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-bold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-5xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                PREMIUM
              </span>
              <span className="text-white"> PICKS</span>
            </h3>
            <p className="text-gray-400 text-xl">Handpicked deals you can't resist</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="group relative animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${product.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500`}></div>
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border-2 border-gray-800 group-hover:border-cyan-500 transition-all duration-500 shadow-2xl">
                  {/* Image Section */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700"
                    />
                    
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${product.color} px-4 py-2 rounded-full font-black text-xs text-white shadow-2xl flex items-center gap-1`}>
                      <Crown className="w-4 h-4" fill="white" />
                      {product.badge}
                    </div>

                    {/* Discount */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-xl shadow-2xl border-4 border-white">
                      -{product.discount}%
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute bottom-4 right-4 bg-black bg-opacity-80 backdrop-blur-lg p-3 rounded-full hover:scale-110 transition-transform"
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h4 className="text-2xl font-black text-white mb-1">{product.name}</h4>
                      <p className="text-cyan-400 text-sm font-semibold">{product.tagline}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-white font-bold text-sm">{product.rating}</span>
                      <span className="text-gray-500 text-sm">• {product.sold} sold</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                        ${product.salePrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through font-semibold">
                        ${product.price}
                      </span>
                    </div>

                    {/* Popularity Bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400 font-semibold">🔥 Selling Fast</span>
                        <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                          {Math.min(95, Math.floor((product.sold / 50)))}% claimed
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${product.color} h-3 rounded-full shadow-lg transition-all duration-1000`}
                          style={{ width: `${Math.min(95, Math.floor((product.sold / 50)))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 rounded-3xl p-12">
              <Gift className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
              <h3 className="text-5xl font-black text-white mb-4">
                Don't Miss Out!
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                These deals won't last forever. Grab yours before time runs out!
              </p>
              <button className="relative group/cta">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-70 group-hover/cta:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-black px-12 py-5 rounded-full text-xl shadow-2xl transform group-hover/cta:scale-110 transition-all flex items-center gap-3 mx-auto w-fit">
                  <Zap className="w-6 h-6" fill="white" />
                  SHOP ALL DEALS
                  <Zap className="w-6 h-6" fill="white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}