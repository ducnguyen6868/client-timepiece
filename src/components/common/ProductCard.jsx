import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ product }) {
    const { locale, currency } = useContext(UserContext);
    const renderStars = (rating) => "⭐".repeat(Math.floor(rating || 0));

    return (
        <AnimatePresence>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition max-w-96"
            >
                <div className="relative overflow-hidden">
                    <img
                        src={`${process.env.REACT_APP_API_URL}`+`/${product.images[0]}`}
                        alt={product.name}
                        loading="lazy"
                        className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                        }}
                    />
                    {product?.similarity && (
                        <span className="absolute top-0 right-0 p-2 text-white text-xs bg-brand rounded-bl-2xl">{product?.similarity}</span>
                    )}
                </div>

                <div className="p-4">
                    <Link to={`/product/${product.slug}`} className="text-gray-900 dark:text-gray-100 font-semibold truncate"
                    >
                        {product.name}
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                        {product.description}
                    </p>

                    <div className="mt-2 flex items-center text-yellow-500 text-sm">
                        <span>{renderStars(product.ratings)}</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                            ({product.reviews} reviews)
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-brand text-lg">
                            {formatCurrency(
                                product.detail?.[0]?.currentPrice,
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