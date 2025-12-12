import { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import categoryApi from '../../api/categoryApi';
import watchApi from '../../api/watchApi';
import userApi from '../../api/userApi';

export default function VibeFinder() {
    const navigate = useNavigate();

    const { setInfoUser } = useContext(UserContext);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [cateId, setCateId] = useState();
    const [vibeFinderWatches, setVibeFinderWatches] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await categoryApi.getCategories();
                setCategories(response.categories);
                setCategory(response.categories[0]?.name);
                setCateId(response.categories[0]?._id);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getCategories();
    }, []);
    useEffect(() => {
        if (!category) return;
        const getVibeFinderWatches = async () => {
            try {
                const response = await watchApi.getVibeFinder(cateId);
                setVibeFinderWatches(response.watches);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getVibeFinderWatches();
    }, [category, cateId]);

    const handleChangeVibe = (cate) => {
        setCategory(cate.name);
        setCateId(cate._id);
    }
    const handleCheckout = (watch) => {
        const id = watch._id;
        const code = watch.code;
        const name = watch.name;
        const image = watch.images[0];
        const description = watch.description;
        const quantity = 1;
        const color = watch.detail[0]?.color;
        const price = watch.detail[0]?.currentPrice;
        const index=0;
        const watchData = [{
            id, code, name, image, description, quantity, color, price, index
        }]
        navigate('/watch/checkout', { state: { watchData } });
    }

    const handleCart = async (watch) => {
        const detail = watch.detail?.[0];
        if (!detail) return toast.error("Watch detail not found!");

        const cartItem = {
            id: watch._id,
            code: watch.code,
            name: watch.name,
            image: watch.images[0],
            description: watch.description,
            quantity: 1,
            color: detail.color,
            price: detail.currentPrice,
            index:0
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
                toast.info("Watch quantity updated");
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


    return (
        <>
            {/* Vibe Finder */}
            <section className="bg-bg-primary py-6 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4">
                    <div
                        id="vibe-header"
                        data-animate
                        className={`text-center mb-6 animate-fadeInUp visible`}
                    >
                        <h2 className="text-3xl font-bold mb-2 text-text-primary">Vibe Finder: Your Perfect Match</h2>
                        <p className="text-text-secondary text-sm">Let our AI guide you to the vibes that resonate with your personal style.</p>
                    </div>

                    <div
                        id="vibe-filters"
                        data-animate
                        className={`flex justify-center flex-wrap gap-3 mb-6 animate-fadeInUp visible`}
                        style={{ animationDelay: '0.2s' }}
                    >
                        {categories?.map(cate => (
                            <button
                                key={cate._id}
                                className={`px-5 py-2 rounded-full text-xs font-medium transition-all transform hover:scale-105 shadow-md ${category === cate.name
                                    ? 'bg-brand text-white'
                                    : 'bg-bg-primary border border-border hover:border-brand text-text-secondary'
                                    }`}
                                onClick={() => handleChangeVibe(cate)}
                            >
                                {cate.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-row items-center justify-center gap-6 mb-8">
                        {vibeFinderWatches?.map((watch, idx) => (
                            <div
                                key={watch._id}
                                className={`bg-bg-primary max-w-60 rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-cardSlideInUp visible`}
                                style={{ animationDelay: `${idx * 0.15}s` }}
                            >
                                <div className="relative bg-bg-secondary overflow-hidden">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}`+`/${watch.images[0]}`}
                                        alt={watch.name}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/e2e8f0/64748b?text=Vibe+Watch'; }}
                                        className="w-full aspect-square object-cover transform hover:scale-110 transition-transform duration-500"
                                    />
                                    <button className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow hover:bg-error hover:text-white transition-all animate-badgeSlideIn"
                                        style={{ backgroundColor: 'var(--bg-primary)' }}
                                        onClick={() => toggleWishlist(watch.code)}
                                    >
                                        <Heart className="w-4 h-4 text-text-muted" />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <Link to={`/watch?code=${watch.code}`} className="font-semibold text-sm mb-1 text-text-primary truncate animate-fadeInDown">{watch.name}</Link>
                                    <p className="text-lg font-bold mb-3 text-brand animate-fadeInUp">{formatCurrency(watch.detail[0]?.currentPrice, 'en-Us', 'USD')}</p>
                                    <div className='flex items-center justify-center gap-2'>
                                        <button
                                            className="py-1 px-4 bg-gray-400 text-white text-xs rounded transition-all transform hover:scale-[1.02] btn-brand shadow" onClick={() => handleCart(watch)}
                                        >
                                            <ShoppingCart className='w-4' />
                                        </button>
                                        <button
                                            className="flex-1 py-2 bg-brand text-white text-xs rounded transition-all transform hover:scale-[1.02] btn-brand shadow" onClick={() => handleCheckout(watch)}
                                        >
                                            Buy now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        id="vibe-button"
                        data-animate
                        className={`text-center animate-fadeInUp visible`}
                    >
                        <button
                            className="px-8 py-2.5 border text-sm rounded-full transition-all transform hover:scale-105 font-semibold"
                            style={{
                                borderColor: 'var(--brand-color)',
                                color: 'var(--brand-color)',
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--brand-color)'; e.target.style.color = 'white'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--brand-color)'; }}
                        >
                            Show Me More
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
