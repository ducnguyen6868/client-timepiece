import useProductsPerRow from '../../hooks/useProductsPerRow';

// Effect 2: Shimmer Effect
const ShimmerLoader = () => (
    <div className="bg-white rounded-lg md:rounded-xl xl:rounded-2xl shadow-md overflow-hidden relative">
        <div className="bg-gray-200 h-44 sm:h-48 md:h-52 w-full relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
        <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
        </div>
    </div>
);

const DotsLoader = () => (
    <div className="bg-white w-full mt-4 p-4 h-max flex items-center justify-center">
        <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
            ))}
        </div>
    </div>
);

export default function LoadingAnimations({ option }) {

    const length = useProductsPerRow();

    return (
        <>
            <style>
                {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        
        `}
            </style>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-2 md:gap-3 ">
                {option === 'skeleton' && (
                    Array(length).fill(0).map((_, index) => (
                        <ShimmerLoader key={index} />
                    ))
                )}
            </div>
            {option === 'dots' && (
                <DotsLoader  />

            )}
        </>
    );
}