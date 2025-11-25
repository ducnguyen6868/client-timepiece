import { ShoppingCart, Sparkles } from 'lucide-react';
import {Link} from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 animate-cardSlideInUp">
        {/* Empty Cart Card */}
        <div className="bg-white rounded-3xl p-4 md:p-6 xl:p-10 lg:p-8 text-center">
          {/* Icon */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-br from-brand to-brand-hover 
            p-6 rounded-full animate-cardSlideInUp
            ">
              <ShoppingCart className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl font-bold text-slate-800 mb-3 "
            style={{animationDelay:'0.2s'}}
          >Your cart is Empty</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto "

          >
            Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
          </p>

          {/* CTA Button */}
          <Link to='/' className="bg-gradient-to-r from-brand to-blue-700 text-white 
          px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all 
          transform hover:scale-105 inline-flex items-center gap-2 mb-8 "
  
          >
            <Sparkles className="w-5 h-5" />
            Start Shopping
          </Link>

          {/* Divider */}
          <div className="border-t border-slate-200 my-8"></div>

          {/* Additional Features */}
          <div className="flex flex-col md:flex-row gap-2 justify-between items-left  text-left">
            <div className="flex gap-3">
              <div className="bg-green-100 p-2 rounded-lg h-fit">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Free Shipping</h3>
                <p className="text-sm text-slate-600">On orders over $50</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-blue-100 p-2 rounded-lg h-fit">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Secure Payment</h3>
                <p className="text-sm text-slate-600">100% secure transactions</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-purple-100 p-2 rounded-lg h-fit">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Easy Returns</h3>
                <p className="text-sm text-slate-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}