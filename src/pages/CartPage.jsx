import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, CreditCard, Home, } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { UserContext } from "../contexts/UserContext";
import userApi from "../api/userApi";
import LoadingAnimations from "../components/common/LoadingAnimations";
import EmptyCart from '../components/common/EmptyCart';
import Notification from "../components/common/Notification";
import { collapseToast } from "react-toastify";

export default function CartPage() {
    const { setInfoUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [indexCart, setIndexCart] = useState(-1);

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const getCart = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const response = await userApi.getCart();
            setCarts(response.carts);
            const total = response.carts.reduce((t, c) => t + c.price * c.quantity, 0);
            setTotal(total);

        } catch (err) {
            setType('error');
            setMessage(err.response?.data?.message || err.message);
            setShow(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        getCart();
    },[]);

    const handleQuantityChange = (sku, action, index) => {
        setIndexCart(index);
        const updatedCarts = carts.map((cart) => {
            if (cart.variation.sku === sku) {
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

    const handleSubmitQuantity = async (sku, quantity) => {
        try {
            const response = await userApi.changeQuantity(sku, quantity);
            setShow(true);
            setType('success');
            setMessage(response.message);
            setIndexCart(-1);
            getCart();
        } catch (err) {
            setShow(true);
            setType('error');
            setMessage(err.response?.data?.message || err.message);
        }
    };

    const handleRemove = async (sku) => {
        try {
            const response = await userApi.deleteCart(sku);
            setShow(true);
            setType('success');
            setMessage(response.message);
            getCart();
            setInfoUser((prev) => ({ ...prev, cart: response.cart }));
        } catch (err) {
            setShow(true);
            setType('error');
            setMessage(err.response?.data?.message || err.message);
        }
    };

    const handleShopping = () => {
        const watchData = carts.map((cart) => ({
            slug: cart.slug,
            name: cart.name,
            thumbnail: cart.thumbnail,
            price: cart.price,
            quantity: cart.quantity,
            color:cart.variation?.color,
            material: cart.variation?.material,
            strapType:cart.variation?.strapType
        }));
        navigate("/watch/checkout?cart=all", { state: { watchData } });
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
        <>
            <Notification show={show} message={message} type={type} onClose={() => setShow(false)} />
            <div className=" bg-gray-50 dark:bg-gray-900 py-4 px-8 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* 🛒 Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {carts?.map((cart, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex items-center gap-6 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <img
                                        src={cart.thumbnail}
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
                                                to={`/watch/${cart.sku}`}
                                                className="text-lg font-semibold dark:text-gray-200 
                                                hover:text-brand-hover transition-colors text-brand"
                                            >
                                                {cart.name}
                                            </Link>
                                            <button
                                                onClick={() => handleRemove(cart.variation.sku)}
                                                className="text-red-500 hover:scale-110 transition-transform"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {cart.variation?.material} - {cart.variation?.strapType} - {cart.variation?.color}
                                        </p>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className='flex flex-row gap-8 items-center'>
                                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(cart.variation.sku, "decrease", index)
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
                                                            handleQuantityChange(cart.variation.sku, "increase", index)
                                                        }
                                                        className="text-gray-600 dark:text-gray-300 hover:text-[var(--brand)] transition"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>

                                                <motion.button
                                                    onClick={() =>
                                                        handleSubmitQuantity(cart.variation.sku, cart.quantity)
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
        </>
    );
}
