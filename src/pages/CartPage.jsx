import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, CreditCard, Home, } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { UserContext } from "../contexts/UserContext";
import userApi from "../api/userApi";
import LoadingAnimations from "../components/common/LoadingAnimations";
import EmptyCart from '../components/common/EmptyCart';

export default function CartPage() {
    const { setInfoUser } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [indexCart, setIndexCart] = useState(-1);


    const getCarts = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await userApi.viewCart();
            setCarts(response.carts);
            const total = response.carts.reduce((t, c) => t + c.price * c.quantity, 0);
            setTotal(total);

        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getCarts();
        } else {
            let cart = localStorage.getItem("cart");
            if (cart) {
                cart = JSON.parse(cart);
                setCarts(cart);
                const total = cart.reduce((t, c) => t + c.price * c.quantity, 0);
                setTotal(total);
            } else {
                setCarts([]);
            }
        }
    }, [token]);

    const handleQuantityChange = (code, action, index) => {
        setIndexCart(index);
        const updatedCarts = carts.map((cart) => {
            if (cart.code === code) {
                let newQuantity = cart.quantity;
                if (action === "increase") newQuantity += 1;
                else if (action === "decrease" && newQuantity > 1) newQuantity -= 1;
                return { ...cart, quantity: newQuantity };
            }
            return cart;
        });
        setCarts(updatedCarts);
        const total = updatedCarts.reduce((t, c) => t + c.price * c.quantity, 0);
        setTotal(total);
    };

    const handleSubmitQuantity = async (cartId, quantity) => {
        if (!token) {
            localStorage.setItem("cart", JSON.stringify(carts));
            toast.success("Updated quantity successfully");
            setIndexCart(-1);
            return;
        }
        try {
            const response = await userApi.changeQuantity(cartId, quantity);
            toast.success(response.message);
            setIndexCart(-1);
            getCarts();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    const handleRemove = async (cartId) => {
        if (!token) {
            const newCart = carts.filter((item) => item.code !== cartId);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCarts(newCart);
            setInfoUser((prev) => ({ ...prev, cart: newCart.length }));
            toast.success("Removed product from cart");
            return;
        }
        try {
            const response = await userApi.deleteCart(cartId);
            toast.success(response.message);
            getCarts();
            setInfoUser((prev) => ({ ...prev, cart: response.cart }));
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    const handleShopping = () => {

        const productData = carts.map((cart) => ({
            id: cart._id,
            name: cart.name,
            code: cart.code,
            image: cart.image,
            price: cart.price,
            color: cart.color,
            index: cart.index,
            quantity: cart.quantity,
        }));
        console.log(productData);
        navigate("/product/checkout?cart=all", { state: { productData } });
    };

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        )
    }
    if (carts?.length === 0) {
        return (
            <EmptyCart />
        )
    }
    return (
        <div className=" bg-gray-50 dark:bg-gray-900 py-4 px-8 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* 🛒 Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {carts.map((cart, index) => (
                            <motion.div
                                key={cart.code}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-6 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <img
                                    src={`${process.env.REACT_APP_API_URL}` + `/${cart.image}`}
                                    alt={cart.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                                    }}
                                    className="w-28 h-28 object-cover rounded-lg"
                                />

                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/product/${cart.slug}`}
                                            className="text-lg font-semibold dark:text-gray-200 
                                                hover:text-brand-hover transition-colors text-brand"
                                        >
                                            {cart.name}
                                        </Link>
                                        <button
                                            onClick={() => handleRemove(cart._id || cart.slug)}
                                            className="text-red-500 hover:scale-110 transition-transform"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Color: {cart.color}
                                    </p>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className='flex flex-row gap-8 items-center'>
                                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(cart.code, "decrease", index)
                                                    }
                                                    className="text-gray-600 dark:text-gray-300 hover:text-[var(--brand)] transition"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="w-6 text-center font-medium">
                                                    {cart.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(cart.code, "increase", index)
                                                    }
                                                    className="text-gray-600 dark:text-gray-300 hover:text-[var(--brand)] transition"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>

                                            <motion.button
                                                onClick={() =>
                                                    handleSubmitQuantity(cart._id || cart.code, cart.quantity)
                                                }
                                                whileTap={{ scale: 0.95 }}
                                                className={`px-4 py-2 text-sm font-medium rounded-lg 
                                                        bg-brand text-white shadow transition-all ${indexCart === index
                                                        ? "opacity-100"
                                                        : "opacity-0 pointer-events-none"
                                                    }`}
                                            >
                                                Update
                                            </motion.button>
                                        </div>

                                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                                            {formatCurrency(cart.price * cart.quantity, "en-US", "USD")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* 💳 Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-fit sticky top-20"
                >
                    <h2
                        className="text-2xl font-bold mb-6 text-center text-brand"
                    >
                        Order Summary
                    </h2>

                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(total, "en-US", "USD")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span className="text-green-500 font-semibold">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>{formatCurrency(total * 0.1, "en-US", "USD")}</span>
                        </div>
                        <hr className="my-3 border-gray-200 dark:border-gray-700" />
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span>
                                {formatCurrency(total + total * 0.1, "en-US", "USD")}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            onClick={handleShopping}
                            className="flex items-center justify-center gap-2 text-white py-3 rounded-lg 
                                font-semibold shadow-md hover:scale-105 transition-transform bg-brand"

                        >
                            <CreditCard size={20} /> Proceed to Checkout
                        </button>

                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            <Home size={20} /> Continue Shopping
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
