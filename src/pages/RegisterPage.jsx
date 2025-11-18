import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isValidEmail } from '../utils/isValidEmail';
import { useNavigate } from 'react-router-dom';
import authApi from "../api/authApi";
import loginImage from '../assets/login.png';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: true,
    });
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [isHiddenConfirm, setIsHiddenConfirm] = useState(true);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);

    const handleRegisterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors({ ...errors, [name]: "" });
    };

    const handleRegisterSubmit = async () => {
        try {

            const response = await authApi.register(registerData);

            if (response) {
                toast.success(response.message);
                navigate('../login');
            }
        } catch (err) {
            toast.error(err.response.data.message || err.message);
        }
    };

    const handleMultipleButton = () => {
        if (step === 1) {
            const newErrors = {};

            if (!registerData.name) newErrors.name = "Please enter your full name.";
            if (!registerData.email) {
                newErrors.email = "Please enter your email";
            } else {
                if (!(isValidEmail(registerData.email))) newErrors.email = "Invalid email.";
            }
            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                setStep(2);
            }
        }
        if (step === 2) {
            const newErrors = {};

            if (registerData.password.length < 8)
                newErrors.password = "Password must be at least 8 characters.";
            if (registerData.password !== registerData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match.";
            if (!registerData.agreeTerms)
                newErrors.agreeTerms = "You must agree to our Terms.";

            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            handleRegisterSubmit();
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 px-4">
                <img className='fixed w-full h-full' src={loginImage} alt='Login' title='Login' />
                <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-cyan-600">Create Your Account</h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Join our exclusive community of watch enthusiasts
                        </p>
                    </div>

                    {step === 1 && (
                        <>
                            {/* Full Name */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-700">
                                    <Icon icon="mdi:account-outline" width="18" />
                                    <span>Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    placeholder="John Doe"
                                    className={`w-full rounded-lg px-4 py-2 border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
                                />
                                {errors.name && (
                                    <div className="flex items-center text-red-500 mt-1 text-sm">
                                        <Icon icon="mdi:alert-circle" width="16" height="16" />
                                        <span className="ml-1">{errors.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-700">
                                    <Icon icon="mdi:email-outline" width="18" />
                                    <span>Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    placeholder="your@email.com"
                                    className={`w-full rounded-lg px-4 py-2 border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
                                />
                                {errors.email && (
                                    <div className="flex items-center text-red-500 mt-1 text-sm">
                                        <Icon icon="mdi:alert-circle" width="16" height="16" />
                                        <span className="ml-1">{errors.email}</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* Password */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-700">
                                    <Icon icon="mdi:lock-outline" width="18" />
                                    <span>Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={isHiddenPassword ? "password" : "text"}
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        placeholder="••••••••"
                                        className={`w-full rounded-lg px-4 py-2 border ${errors.password ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-500 transition"
                                    >
                                        <Icon icon={isHiddenPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} width="20" />
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="flex items-center text-red-500 mt-1 text-sm">
                                        <Icon icon="mdi:alert-circle" width="16" height="16" />
                                        <span className="ml-1">{errors.password}</span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-700">
                                    <Icon icon="mdi:shield-lock-outline" width="18" />
                                    <span>Confirm Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={isHiddenConfirm ? "password" : "text"}
                                        name="confirmPassword"
                                        value={registerData.confirmPassword}
                                        onChange={handleRegisterChange}
                                        placeholder="••••••••"
                                        onKeyDown={(e) => e.key === 'Enter' && handleRegisterSubmit()}
                                        className={`w-full rounded-lg px-4 py-2 border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-500 focus:outline-none`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsHiddenConfirm(!isHiddenConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-500 transition"
                                    >
                                        <Icon icon={isHiddenConfirm ? "mdi:eye-off-outline" : "mdi:eye-outline"} width="20" />
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <div className="flex items-center text-red-500 mt-1 text-sm">
                                        <Icon icon="mdi:alert-circle" width="16" height="16" />
                                        <span className="ml-1">{errors.confirmPassword}</span>
                                    </div>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-2 mb-6">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={registerData.agreeTerms}
                                    onChange={handleRegisterChange}
                                    className="mt-1 accent-cyan-500"
                                />
                                <span className="text-sm text-gray-600">
                                    I agree to the{" "}
                                    <Link to="#" className="text-cyan-600 hover:underline">
                                        Terms and Conditions
                                    </Link>
                                </span>
                            </div>
                            {errors.agreeTerms && <p className="text-sm text-red-500 mb-3">{errors.agreeTerms}</p>}
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleMultipleButton}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-300"
                    >
                        {step === 1 ? "Continue" : "Create Account"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center my-6">
                        <div className="h-px w-1/4 bg-gray-200" />
                        <span className="mx-3 text-sm text-gray-400">Or continue with</span>
                        <div className="h-px w-1/4 bg-gray-200" />
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">
                            <Icon icon="logos:google-icon" width="20" />
                            <span>Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                            <Icon icon="logos:facebook" width="20" />
                            <span>Facebook</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="../login" className="text-cyan-600 hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>


        </>
    );
};


