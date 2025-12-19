import { ChevronDown } from "lucide-react";

export default function FlashSalePage() {
  return (
    <>
      {/* Hero Section with Timer */}
      <section class="w-full bg-background-subtle flex flex-col items-center justify-center pt-8 overflow-hidden">
        <div class="flex flex-col gap-4 animate-fade-in-up">
          <h1 class="text-brand text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            The Moment Matters
          </h1>
          <p class="text-text-muted text-lg text-center md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            A limited-time selection of exceptional timepieces. Precision engineered pricing for the discerning collector.
          </p>
        </div>
        {/* Engineered Timer */}
        <div class="flex flex-wrap justify-center gap-4 sm:gap-8 py-6">
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-center min-w-[60px] sm:min-w-[80px] h-16 sm:h-20 bg-white border border-gray-100 rounded-lg shadow-sm">
              <span class="text-3xl sm:text-4xl font-mono font-bold text-text-main">04</span>
            </div>
            <span class="text-xs uppercase tracking-widest text-text-muted font-medium">Hours</span>
          </div>
          <div class="h-16 sm:h-20 flex items-center text-gray-300 text-2xl">:</div>
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-center min-w-[60px] sm:min-w-[80px] h-16 sm:h-20 bg-white border-l-4 border-l-primary border-t border-r border-b border-gray-100 rounded-lg shadow-md transform scale-105">
              <span class="text-3xl sm:text-4xl font-mono font-bold text-primary">12</span>
            </div>
            <span class="text-xs uppercase tracking-widest text-primary font-bold">Minutes</span>
          </div>
          <div class="h-16 sm:h-20 flex items-center text-gray-300 text-2xl">:</div>
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-center min-w-[60px] sm:min-w-[80px] h-16 sm:h-20 bg-white border border-gray-100 rounded-lg shadow-sm">
              <span class="text-3xl sm:text-4xl font-mono font-bold text-text-main">45</span>
            </div>
            <span class="text-xs uppercase tracking-widest text-text-muted font-medium">Seconds</span>
          </div>
        </div>
      </section>
      {/* Filters Bar */}
      <div class="sticky top-[45px] z-40 w-full bg-white/90 backdrop-blur border-b border-gray-100 py-3 px-20">
            <div class="flex items-center gap-3 overflow-x-auto hide-scrollbar w-full pb-1">
              <span class="text-sm font-semibold text-text-main mr-2">Filter:</span>
              <button class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-text-main hover:border-primary transition-colors whitespace-nowrap">
                Brand <ChevronDown />
              </button>
              <button class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-text-main hover:border-primary transition-colors whitespace-nowrap">
                Movement <ChevronDown />
              </button>
              <button class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-text-main hover:border-primary transition-colors whitespace-nowrap">
                Case Material <ChevronDown />
              </button>
              <button class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-text-main hover:border-primary transition-colors whitespace-nowrap">
                Price Range <ChevronDown />
              </button>
              <div class="flex-1"></div>
              <div class="hidden md:flex items-center gap-2 text-sm text-text-muted">
                <span>Sort by:</span>
                <span class="font-medium text-text-main cursor-pointer flex items-center">Featured <ChevronDown /></span>
              </div>
            </div>
      </div>
    </>
  );
};
