import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Star } from "lucide-react";
import watchApi from '../../api/watchApi';

export default function WatchCard({ watch }) {
    const navigate = useNavigate();

    const { locale, currency } = useContext(UserContext);

    const renderStars = (rating) => (
        <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(rating) ? 'fill-yellow-400' : 'text-gray-300'}
                />
            ))}
        </div>
    );
    
    const handleViewCount = async (slug) => {
        try{
             await watchApi.patchViewCount(slug);
        }catch(err){
            console.log(err);
        }finally{
            navigate(`/watch/${slug}`);
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-whit rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition"
            >
                <div className="relative overflow-hidden cursor-pointer">
                    <div 
                        onClick={() => handleViewCount(watch.slug)}
                    >
                        <img
                            src={watch.thumbnail}
                            alt={watch.name}
                            loading="lazy"
                            className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                            }}
                        />
                        {watch?.similarity && (
                            <span className="absolute top-0 right-0 p-2 text-white text-xs bg-brand rounded-bl-2xl">{watch?.similarity}</span>
                        )}
                    </div>
                </div>

                <div className="p-4">
                    <p  className="text-gray-900 dark:text-gray-100 font-semibold line-clamp-1 pr-4"
                    >
                        {watch.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                        {watch.shortDescription}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center text-yellow-500 text-sm">
                        <span>{renderStars(watch.ratingAverage)}</span>
                        <span>{watch.ratingAverage}</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                            ( {watch.ratingCount} reviews )
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-brand text-lg">
                            {formatCurrency(
                                watch.variations?.[0]?.currentPrice,
                                locale,
                                currency
                            ) || "N/A"}
                        </span>

                    </div>
                </div>
            </motion.div>

        </AnimatePresence>

    )
}