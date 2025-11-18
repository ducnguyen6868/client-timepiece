import { useState, useEffect } from "react";
import { User, Phone, MapPin, Home, Building2, ArrowLeft, ArrowRight, CheckCircle, CreditCard, Wallet, Truck } from "lucide-react";
import profileApi from "../../api/profileApi";
import momoImg from '../../assets/momo.png';
import zaloImg from '../../assets/zalopay.png';

export default function InfoPayment({ total, onSubmit }) {

    const [step, setStep] = useState(1);
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showAddress, setShowAddress] = useState(false);
    const [addresses, setAddresses] = useState([]);

    const [infoPayment, setInfoPayment] = useState({
        name: '',
        phone: '',
        address: '',
        type: 'Home',
        payment: 'MOMO'
    });

    useEffect(() => {
        const checkLogged = async () => {
            try {
                const response = await profileApi.profile();
                setLogged(true);
                setAddresses(response.addresses);
                setInfoPayment(prev => ({ ...prev, userId: response.user._id }));
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        };
        checkLogged();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfoPayment(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeAddress = (add) => {
        setInfoPayment({
            ...infoPayment,
            name: add.name,
            phone: add.phone,
            address: add.address,
            type: add.type,
        });
        setShowAddress(false);
    };

    const handleSubmitOrder = () => {
        setLoading(true);
        if (!infoPayment.name || !infoPayment.phone || !infoPayment.address) {
            setErrors({
                name: !infoPayment.name && "Please enter your name.",
                phone: !infoPayment.phone && "Please enter your phone.",
                address: !infoPayment.address && "Please enter your address."
            });
            setStep(1);
            setLoading(false);
            return;
        }
        onSubmit?.(infoPayment);
    };

    return (
        <>
            <div className="w-full h-fit max-w-2xl mx-auto dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-500">

                {/* Step indicator */}
                <div className="flex justify-between items-center mb-8 gap-4 ">

                    <div className="relative z-10 flex flex-col items-center text-center cursor-pointer group" >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-brand text-white shadow-md' : 'bg-gray-200 text-gray-500 group-hover:bg-brand/70 group-hover:text-white'}`}>
                            <Truck size={20} />
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-brand' : 'text-gray-500'}`}>Shipping</span>
                    </div>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                    <div className="relative z-10 flex flex-col items-center text-center cursor-pointer group" >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-brand text-white shadow-md' : 'bg-gray-200 text-gray-500 group-hover:bg-brand/70 group-hover:text-white'}`}>
                            <CreditCard size={20} />
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-brand' : 'text-gray-500'}`}>Payment</span>
                    </div>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                    <div className="relative z-10 flex flex-col items-center text-center cursor-pointer group" >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-brand text-white shadow-md' : 'bg-gray-200 text-gray-500 group-hover:bg-brand/70 group-hover:text-white'}`}>
                            <CheckCircle size={20} />
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= 3 ? 'text-brand' : 'text-gray-500'}`}>Review</span>
                    </div>

                </div>

                {/* Step 1: Shipping */}
                {step === 1 && (
                    <div className="space-y-4 animate-fadeIn">

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
                                    <User size={16} /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={infoPayment.name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none transition"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
                                    <Phone size={16} /> Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={infoPayment.phone}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none transition"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
                                    <MapPin size={16} /> Address
                                </label>
                                <textarea
                                    name="address"
                                    rows="3"
                                    value={infoPayment.address}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none transition"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input className='accent-teal-500 border border-brand' type="radio" name="type" value="Home" checked={infoPayment.type === "Home"} onChange={handleInputChange} />
                                    <Home size={16} /> Home
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input className='accent-teal-500 border border-brand' type="radio" name="type" value="Office" checked={infoPayment.type === "Office"} onChange={handleInputChange} />
                                    <Building2 size={16} /> Office
                                </label>
                            </div>

                            {logged && (
                                <button className="text-brand text-sm font-medium hover:underline" onClick={() => setShowAddress(true)}>
                                    Use existing address?
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <div className="animate-fadeIn">
                        <div className="space-y-3 mt-4">
                            {[
                                { id: "MOMO", label: "Pay with MOMO", img: momoImg },
                                { id: "ZaloPay", label: "Pay with ZaloPay", img: zaloImg },
                                { id: "COD", label: "Cash On Delivery", icon: Wallet },
                            ].map((method) => (
                                <label key={method.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-brand transition">
                                    <input type="radio" name="payment" value={method.id} checked={infoPayment.payment === method.id} onChange={handleInputChange} />
                                    {method.img ? <img src={method.img} alt={method.id} className="w-8 h-8" /> : <method.icon size={26} />}
                                    <span className="text-sm font-medium">{method.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                    <div className="animate-fadeIn space-y-2">
                        <p className="text-gray-600 dark:text-gray-400"><strong>Ship to:</strong> {infoPayment.name} - {infoPayment.phone}</p>
                        <p className="text-gray-600 dark:text-gray-400">{infoPayment.address}</p>
                        <p className="text-gray-600 dark:text-gray-400"><strong>Payment:</strong> {infoPayment.payment}</p>
                        <p className="text-gray-600 dark:text-gray-400"><strong>Total:</strong> ${total}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between items-center mt-8">
                    {step > 1 && (
                        <button
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            onClick={() => setStep(step - 1)}
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            className="ml-auto flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                            onClick={() => setStep(step + 1)}
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button
                            className="ml-auto flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                            onClick={handleSubmitOrder}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Complete Order'} <CheckCircle size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Modal Address */}
            {showAddress && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50" onClick={() => setShowAddress(false)}>
                    <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4 w-[400px]" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-200">Select an Address</h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {addresses?.map((add) => (
                                <div key={add._id} onClick={() => handleChangeAddress(add)} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand cursor-pointer transition">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase font-medium text-brand">{add.type}</span>
                                        {add.isDefault && <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 rounded">Default</span>}
                                    </div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{add.name}</p>
                                    <p className="text-xs text-gray-500">{add.phone}</p>
                                    <p className="text-xs text-gray-500">{add.address}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
