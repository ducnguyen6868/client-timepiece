
import { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { Icon } from '@iconify/react';
import productApi from '../../api/productApi';
import userApi from '../../api/userApi';

export default function TrendingProduct() {
    const navigate = useNavigate();

    const { setInfoUser } = useContext(UserContext);

    const [trendingProducts, setTrendingProducts] = useState([]);

    useEffect(() => {
        const getTrendingProducts = async () => {
            try {
                const page = 1;
                const limit = 5;
                const response = await productApi.getTrending(page, limit);
                const rank = [2, 1, 3];
                const updatedProducts = response.products.map((product, index) => {
                    return { ...product, rank: rank[index] }
                })
                setTrendingProducts(updatedProducts);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getTrendingProducts();
    }, []);

    const handleCheckout = (product) => {
        const id = product._id;
        const code = product.code;
        const name = product.name;
        const image = product.images[0];
        const description = product.description;
        const quantity = 1;
        const color = product.detail[0]?.color;
        const price = product.detail[0]?.currentPrice;
        const productData = [{
            id, code, name, image, description, quantity, color, price
        }]
        navigate('/product/checkout', { state: { productData } });
    }

    const handleCart = async (product) => {
        const detail = product.detail?.[0];
        if (!detail) return toast.error("Product detail not found!");

        const cartItem = {
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            quantity: 1,
            color: detail.color,
            price: detail.currentPrice,
            index: 0
        };

        const token = localStorage.getItem("token");

        // Guest user
        if (!token) {
            let cartLocal = JSON.parse(localStorage.getItem("cart") || "[]");
            const exist = cartLocal.find(
                (i) => i.code === cartItem.code && i.color === cartItem.color
            );

            if (exist) {
                exist.quantity++;
                toast.info("Product quantity updated");
            } else {
                cartLocal.push(cartItem);
                toast.success("Added to cart 🛒");
            }

            localStorage.setItem("cart", JSON.stringify(cartLocal));
            setInfoUser((prev) => ({ ...prev, cart: cartLocal.length }));
            return;
        }

        try {
            const response = await userApi.addCart(cartItem);
            toast.success(response.message || "Added to cart!");
            setInfoUser((prev) => ({ ...prev, cart: response.cart }));
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    const toggleWishlist = async (code, isRemove = false) => {
        const token = localStorage.getItem("token");

        if (!token) {
            let wishlistLocal = JSON.parse(localStorage.getItem("wishlist") || "[]");
            const exists = wishlistLocal.some((item) => item.code === code);

            if (isRemove) {
                wishlistLocal = wishlistLocal.filter((i) => i.code !== code);
                toast.info("Removed from wishlist 💔");
            } else if (exists) {
                toast.warn("Already in wishlist");
                return;
            } else {
                wishlistLocal.push({ code });
                toast.success("Added to wishlist ❤️");
            }

            localStorage.setItem("wishlist", JSON.stringify(wishlistLocal));
            setInfoUser((prev) => ({ ...prev, wishlist: wishlistLocal.length }));
            return;
        }

        try {
            const response = isRemove
                ? await userApi.removeWishlist(code)
                : await userApi.addWishlist(code, 0);
            toast.success(response.message);
            setInfoUser((prev) => ({ ...prev, wishlist: response.wishlist }));
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
            if (err.response?.status === 403) localStorage.removeItem("token");
        }
    };


    const getRankTag = (rank) => {
        switch (rank) {
            case 1: return <Icon icon="noto:1st-place-medal" width="42" height="42" />;
            case 2: return <Icon icon="noto:2nd-place-medal" width="42" height="42" />;
            case 3: return <Icon icon="noto:3rd-place-medal" width="42" height="42" />;
            default: return null;
        }
    };

    return (
        <>
            {/* Trending Products */}
            <section className=" min-w-96 flex justify-center py-6 transition-colors duration-500" id='trending-container'>
    <div className="mx-auto py-4 px-12 bg-gradient-to-r from-blue-500 to-violet-400 rounded-lg">
            <div
                id="trending-header"
                data-animate
                className={`text-center text-white mb-4 animate-fadeInUp visible`}
            >
                <h2 className="text-3xl font-bold mb-2">Our Best Seller</h2>
                <p className="text-sm">Our top-selling timepieces, trusted by the TIMEPIECE community</p>
            </div>

            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4">
                {trendingProducts.map((product, idx) => (
                    <div
                        key={product._id}
                        data-animate
                        className={`bg-bg-primary rounded-lg overflow-hidden border h-max
                                    border-border transition-all duration-300 transform 
                                    hover:translate-y-1 hover:shadow-xl animate-cardSlideInUp visible
                            }`}
                    >

                        <div className="relative bg-bg-secondary overflow-hidden">
                                    <div className='absolute top-2 left-0 z-30'>
                                        {getRankTag(idx+1)}
        </div>
        <img
            src={`${process.env.API_URL}`+${product?.images[0]}`}
            alt={product.name}
            loading='lazy'
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/e2e8f0/64748b?text=Watch'; }}
            className="w-full aspect-square object-cover transform hover:scale-110 transition-transform duration-500 "

            style={{ animationDelay: `${idx * 0.1}s` }}
        />
        <button className="absolute top-2 right-2 w-7 h-7 bg-bg-primary rounded-full flex items-center justify-center shadow hover:bg-error hover:text-text-primary transition-all transform hover:scale-110 animate-badgeSlideIn"
            style={{ animationDelay: `${idx * 0.2}s` }}
            onClick={() => toggleWishlist(product.code)}
        >
            <Heart className="w-4 h-4 text-text-primary" />
        </button>
    </div>
        <div className="p-3">
            <Link to={`/product/${product.slug}`}
                className="font-semibold text-sm mb-1 text-text-primary truncate animate-textSlideLeft translate-x-6 line-clamp-1"
                style={{ animationDelay: `${idx * 0.15}s` }}

            >{product.name}</Link>
            <p className="text-lg font-bold mb-3 text-brand animate-fadeInUp">{formatCurrency(product.detail[0]?.currentPrice, 'en-Us', 'USD')}</p>
            <div className='flex items-center justify-center gap-2'>
                <button
                    className="py-1 px-4 bg-gray-400 text-white text-xs rounded transition-all transform hover:scale-[1.02] btn-brand shadow" onClick={() => handleCart(product)}
                >
                    <ShoppingCart className='w-4' />
                </button>
                <button
                    className="flex-1 py-2 bg-brand text-white text-xs rounded transition-all transform hover:scale-[1.02] btn-brand shadow" onClick={() => handleCheckout(product)}
                >
                    Buy now
                </button>
            </div>
        </div>
                            </div >
                        ))
}
                    </div >
                </div >
            </section >

        </>

    )
}