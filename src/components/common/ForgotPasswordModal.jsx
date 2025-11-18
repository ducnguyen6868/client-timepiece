import { useRef, useState, useEffect } from 'react';
// import '../../styles/ForgotPasswordModal.css'; // Removed custom CSS import
import { Icon } from '@iconify/react';
import { isValidEmail } from '../../utils/isValidEmail';
import { Link } from 'react-router-dom';
import authApi from '../../api/authApi';

export default function ForgotPasswordModal({ onClose }) {
    const emailRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowpasswords] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState({});
    const [countdown, setCountdown] = useState(0);

    const toggleVisibility = (key) => {
        setShowpasswords({
            ...showPasswords,
            [key]: !showPasswords[key]
        })
    }

    const handleBack = () => {
        if (loading) return;
        if (step === 1) {
            onClose?.();
        } else {
            // Clear current step's errors when going back
            setErrors({});
            setStep((prev) => prev - 1);
        }
    }

    const handleMultipleButton = () => {
        if (step === 1) {
            handleSendEmail();
        } else if (step === 2) {
            handleVirifyOTP();
        } else {
            handleResetPassword();
        }
    }

    const handleSendEmail = async () => {
        if (email === '') {
            setErrors({ email: 'Email is required.' });
            emailRef.current?.focus();
            return;
        }
        if (!isValidEmail(email)) {
            setErrors({ email: 'Please enter correct email format.' });
            emailRef.current?.focus();
            return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Assume authApi.forgotPassword returns a successful response
            const response = await authApi.forgotPassword(email);
            if (response) {
                setErrors({});
                setCountdown(60); // Start 60 second countdown
                setStep(2);
            }
        } catch (err) {
            setErrors({ email: err.response?.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    }

    const handleVirifyOTP = async () => {
        if (otp === '') {
            setErrors({ otp: "OTP is required." });
            return;
        }
        if (countdown === 0) {
            setErrors({ otp: "OTP has expired. Please resend the code." });
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            // Assume authApi.verifyOtp returns a successful response
            const response = await authApi.verifyOtp(email, otp);
            if (response) {
                setErrors({});
                setStep(3);
            }
        } catch (err) {
            setErrors({ otp: err.response?.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async () => {
        const newErrors = {};

        if (!password.newPassword) {
            newErrors.newPassword = 'Password is required.';
        } else if (password.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters.';
        } else {
            // Additional checks for complexity (as shown in the list)
            if (!/[A-Z]/.test(password.newPassword)) newErrors.newPassword = 'Password must contain one uppercase letter.';
            if (!/[a-z]/.test(password.newPassword)) newErrors.newPassword = 'Password must contain one lowercase letter.';
            if (!/[0-9]/.test(password.newPassword)) newErrors.newPassword = 'Password must contain one number.';

            // Overwrite if only length error was present but now we have a more specific one
            if (Object.keys(newErrors).length > 0) newErrors.newPassword = newErrors.newPassword || 'Password must be at least 8 characters.';
        }

        if (!password.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        }

        if (password.newPassword && password.confirmPassword && password.newPassword !== password.confirmPassword) {
            newErrors.matchPassword = 'Passwords do not match.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const newPassword = password.newPassword;
            // Assume authApi.resetPassword returns a successful response
            const response = await authApi.resetPassword({ email, newPassword });
            if (response) {
                alert("Reset password successful! You can now login with your new password.");
                onClose?.();
            }
        } catch (err) {
            setErrors({ resetPassword: err.response?.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    }

    // Countdown timer for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Tailwind Class Helpers
    const isActive = (s) => step === s ? 'text-brand border-brand' : 'text-gray-400 border-gray-300';
    const isLineActive = (s) => step >= s ? 'bg-brand' : 'bg-gray-300';
    const progressIcon = (s, activeIcon, completedIcon) => step > s ? completedIcon : activeIcon;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
            {/* Modal Container */}
            <div
                className="relative w-max mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 scale-100 opacity-100 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Decorative Watch Background (Tailwind equivalent for 'modal-decoration') */}
                <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                    <Icon icon="mdi:watch" className="absolute text-indigo-400 -top-10 -left-10 text-9xl transform rotate-12" />
                    <Icon icon="mdi:watch-variant" className="absolute text-indigo-400 -bottom-16 -right-16 text-9xl transform -rotate-45" />
                    <Icon icon="mdi:clock-outline" className="absolute text-indigo-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-50" />
                </div>

                <div className="relative z-10 flex flex-row gap-10">
                    {/* Progress Steps (Tailwind equivalent for 'forgot-password-modal__progress') */}
                    <div className="flex flex-col gap-4 justify-between items-center mb-8">
                        {/* Step 1 */}
                        <div className={`flex flex-col items-center ${step >= 1 ? 'text-brand' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${step > 1 ? 'bg-brand border-brand text-white' : isActive(1)}`}>
                                <Icon icon={progressIcon(1, "mdi:email", "mdi:check")} width="20" height="20" />
                            </div>
                            <span className="text-sm mt-1 text-center font-medium">Verify Email</span>
                        </div>
                        {/* Line 1-2 */}
                        <div className={`flex-1 h-full w-1 mx-2 transition-colors duration-300 ${isLineActive(2)}`}></div>

                        {/* Step 2 */}
                        <div className={`flex flex-col items-center ${step >= 2 ? 'text-brand' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${step > 2 ? 'bg-brand border-brand text-white' : isActive(2)}`}>
                                <Icon icon={progressIcon(2, "mdi:shield-key", "mdi:check")} width="20" height="20" />
                            </div>
                            <span className="text-sm mt-1 text-center font-medium">Enter OTP</span>
                        </div>
                        {/* Line 2-3 */}
                        <div className={`flex-1 h-full w-1 mx-2 transition-colors duration-300 ${isLineActive(3)}`}></div>

                        {/* Step 3 */}
                        <div className={`flex flex-col items-center ${step >= 3 ? 'text-brand' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive(3)}`}>
                                <Icon icon="mdi:lock-reset" width="20" height="20" />
                            </div>
                            <span className="text-sm mt-1 text-center font-medium">New Password</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='w-[500px]'>
                        <div className="mb-6">
                            {/* Header */}
                            <div className="mb-6 text-center">
                                <h2 className="text-2xl font-bold text-brand mb-2">
                                    {step === 1 && 'Forgot Your Password?'}
                                    {step === 2 && 'Verify Your Identity'}
                                    {step === 3 && 'Create New Password'}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {step === 1 && "Don't worry! It happens to the best of us. Let's get you back to shopping for luxury watches."}
                                    {step === 2 && "We've sent a 6-digit verification code to your email. Please check your inbox (and spam folder)."}
                                    {step === 3 && "Almost done! Create a strong password to secure your account and protect your watch collection."}
                                </p>
                            </div>

                            {/* Body */}
                            <div className="space-y-4">
                                {/* Step 1: Email Input */}
                                {step === 1 && (
                                    <>
                                        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-brand-hover">
                                            <div className="flex items-center space-x-2 font-semibold mb-1">
                                                <Icon icon="mdi:information" width="18" height="18" className="text-brand" />
                                                <strong>What happens next?</strong>
                                            </div>
                                            <p className='text-sm text-text-muted'>We'll send a verification code to your email address to confirm your identity.</p>
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                                                <Icon icon="mdi:email-outline" width="18" height="18" className="mr-1 text-brand" />
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                id="email"
                                                ref={emailRef}
                                                value={email}
                                                onChange={(e) => {
                                                    setErrors({});
                                                    setEmail(e.target.value);
                                                }}
                                                placeholder="your.email@example.com"
                                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none focus:border-brand transition duration-150 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                                disabled={loading}
                                                autoComplete="on"
                                            />
                                            {errors.email && (
                                                <div className="flex items-center text-sm text-red-500 mt-1">
                                                    <Icon icon="mdi:alert-circle" width="15" height="15" className="mr-1" />
                                                    <span>{errors.email}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
                                            <div className="flex items-center space-x-2 font-semibold mb-1">
                                                <Icon icon="mdi:help-circle" width="18" height="18" className="text-gray-500" />
                                                <strong>Need help?</strong>
                                            </div>
                                            <p className='text-sm'>Can't access your email? <Link to="#" className='text-brand hover:text-brand-hover font-medium transition duration-150'>Contact our support team</Link></p>
                                        </div>
                                    </>

                                )}

                                {/* Step 2: OTP Input */}
                                {step === 2 && (
                                    <>
                                        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-brand-hover">
                                            <div className="flex items-center space-x-2 font-semibold mb-1">
                                                <Icon icon="mdi:email-check" width="18" height="18" className="text-brand" />
                                                <strong>Check your email!</strong>
                                            </div>
                                            <p className='text-sm'>We sent a code to <strong className="font-semibold">{email}</strong></p>
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="otp" className="flex items-center text-sm font-medium text-gray-700">
                                                <Icon icon="mdi:lock-check-outline" width="18" height="18" className="mr-1 text-brand" />
                                                Verification Code
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="otp"
                                                    value={otp}
                                                    onChange={(e) => {
                                                        setErrors({});
                                                        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                                                        setOTP(value);
                                                    }}
                                                    placeholder="000000"
                                                    maxLength="6"
                                                    className={`w-full p-3 border rounded-lg pr-20 text-lg tracking-widest text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                                                    disabled={loading}
                                                    autoComplete="one-time-code"
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                                                    <Icon icon="mdi:timer-sand" width="15" height="15" className="mr-1" />
                                                    <span>{countdown > 0 ? `${countdown}s` : 'Expired'}</span>
                                                </div>
                                            </div>
                                            {errors.otp && (
                                                <div className="flex items-center text-sm text-red-500 mt-1">
                                                    <Icon icon="mdi:alert-circle" width="15" height="15" className="mr-1" />
                                                    <span>{errors.otp}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
                                            <p className="text-gray-500">Didn't receive the code?</p>
                                            {countdown > 0 ? (
                                                <span className="text-gray-400">
                                                    Resend available in {countdown}s
                                                </span>
                                            ) : (
                                                <button
                                                    className="flex items-center text-brand hover:text-brand-hover font-medium transition duration-150 disabled:opacity-50"
                                                    onClick={handleSendEmail}
                                                    disabled={loading}
                                                >
                                                    <Icon icon="mdi:refresh" width="18" height="18" className="mr-1" />
                                                    Resend Code
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500 p-3 bg-gray-100 rounded-lg">
                                            <Icon icon="mdi:shield-check" width="18" height="18" className="mr-2 text-green-500" />
                                            <span>Your security is our priority. The code expires in 15 minutes.</span>
                                        </div>
                                    </>
                                )}

                                {/* Step 3: Password Reset */}
                                {step === 3 && (
                                    <>
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                                            <div className="flex items-center space-x-2 font-semibold mb-1">
                                                <Icon icon="mdi:check-circle" width="18" height="18" className="text-green-600" />
                                                <strong>Identity Verified!</strong>
                                            </div>
                                            <p className='text-sm'>Now create a strong password to protect your luxury watch collection.</p>
                                        </div>

                                        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                                            <div className='flex-1 space-y-4'>
                                                {/* New Password */}
                                                <div className="space-y-1">
                                                    <label htmlFor="newPassword" className="flex items-center text-sm font-medium text-gray-700">
                                                        <Icon icon="mdi:lock-outline" width="20" height="20" className="mr-1 text-brand" />
                                                        New Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords.newPassword ? "text" : "password"}
                                                            id="newPassword"
                                                            value={password.newPassword || ''}
                                                            onChange={(e) => {
                                                                setPassword({ ...password, newPassword: e.target.value });
                                                                setErrors({});
                                                            }}
                                                            placeholder="Enter new password"
                                                            className={`w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${errors.newPassword || errors.matchPassword ? 'border-red-500' : 'border-gray-300'}`}
                                                            disabled={loading}
                                                            autoComplete="new-password"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                                            onClick={() => toggleVisibility('newPassword')}
                                                            disabled={loading}
                                                        >
                                                            <Icon
                                                                icon={showPasswords.newPassword ? "mdi:eye" : "mdi:eye-off"}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </button>
                                                    </div>
                                                    {errors.newPassword && (
                                                        <div className="flex items-center text-sm text-red-500 mt-1">
                                                            <Icon icon="mdi:alert-circle" width="15" height="15" className="mr-1" />
                                                            <span>{errors.newPassword}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="space-y-1">
                                                    <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-gray-700">
                                                        <Icon icon="mdi:lock-check-outline" width="20" height="20" className="mr-1 text-brand" />
                                                        Confirm Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords.confirmPassword ? "text" : "password"}
                                                            id="confirmPassword"
                                                            value={password.confirmPassword || ''}
                                                            onChange={(e) => {
                                                                setPassword({ ...password, confirmPassword: e.target.value });
                                                                setErrors({});
                                                            }}
                                                            placeholder="Confirm new password"
                                                            className={`w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${errors.confirmPassword || errors.matchPassword ? 'border-red-500' : 'border-gray-300'}`}
                                                            disabled={loading}
                                                            autoComplete="new-password"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                                            onClick={() => toggleVisibility('confirmPassword')}
                                                            disabled={loading}
                                                        >
                                                            <Icon
                                                                icon={showPasswords.confirmPassword ? "mdi:eye" : "mdi:eye-off"}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </button>
                                                    </div>
                                                    {(errors.confirmPassword || errors.matchPassword) && (
                                                        <div className="flex items-center text-sm text-red-500 mt-1">
                                                            <Icon icon="mdi:alert-circle" width="15" height="15" className="mr-1" />
                                                            <span>{errors.confirmPassword || errors.matchPassword}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Password Requirements */}
                                            <div className="w-full md:w-48 p-4 bg-gray-100 rounded-lg text-sm">
                                                <div className="flex items-center font-semibold text-gray-700 mb-2">
                                                    <Icon icon="mdi:shield-check" width="18" height="18" className="mr-2 text-brand" />
                                                    Password Requirements:
                                                </div>
                                                <div className="space-y-1 text-gray-600">
                                                    {/* Requirement 1: Min Length */}
                                                    <div className={`flex items-center ${password.newPassword?.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                                                        <Icon icon={password.newPassword?.length >= 8 ? "mdi:check-circle" : "mdi:circle-outline"} width="15" height="15" className="mr-2" />
                                                        <span>At least 8 characters</span>
                                                    </div>
                                                    {/* Requirement 2: Uppercase */}
                                                    <div className={`flex items-center ${/[A-Z]/.test(password.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                                                        <Icon icon={/[A-Z]/.test(password.newPassword) ? "mdi:check-circle" : "mdi:circle-outline"} width="15" height="15" className="mr-2" />
                                                        <span>One uppercase letter</span>
                                                    </div>
                                                    {/* Requirement 3: Lowercase */}
                                                    <div className={`flex items-center ${/[a-z]/.test(password.newPassword || "") ? 'text-green-600' : 'text-gray-500'}`}>
                                                        <Icon icon={/[a-z]/.test(password.newPassword || "") ? "mdi:check-circle" : "mdi:circle-outline"} width="15" height="15" className="mr-2" />
                                                        <span>One lowercase letter</span>
                                                    </div>
                                                    {/* Requirement 4: Number */}
                                                    <div className={`flex items-center ${/[0-9]/.test(password.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                                                        <Icon icon={/[0-9]/.test(password.newPassword) ? "mdi:check-circle" : "mdi:circle-outline"} width="15" height="15" className="mr-2" />
                                                        <span>One number</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.resetPassword && (
                                            <div className="flex items-center text-sm text-red-500 mt-1">
                                                <Icon icon="mdi:alert-circle" width="15" height="15" className="mr-1" />
                                                <span>{errors.resetPassword}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Footer - Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            {/* Back/Cancel Button */}
                            <button
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleBack}
                                disabled={loading}
                            >
                                <Icon icon="mdi:arrow-left" width="20" height="20" className="mr-1" />
                                {step === 1 ? 'Cancel' : 'Back'}
                            </button>
                            {/* Action Button */}
                            <button
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-brand hover:bg-brand-hover transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleMultipleButton}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Icon icon="svg-spinners:ring-resize" width="20" height="20" className="mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {step === 1 && 'Send Verification Code'}
                                        {step === 2 && 'Verify Code'}
                                        {step === 3 && 'Reset Password'}
                                        <Icon icon="mdi:arrow-right" width="20" height="20" className="ml-2" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex justify-center space-x-4 mt-6 text-xs text-gray-500 border-t pt-4 border-gray-100">
                            <div className="flex items-center">
                                <Icon icon="mdi:shield-lock" width="15" height="15" className="mr-1 text-green-500" />
                                <span>Secure & Encrypted</span>
                            </div>
                            <div className="flex items-center">
                                <Icon icon="mdi:clock-fast" width="15" height="15" className="mr-1 text-blue-500" />
                                <span>Fast Recovery</span>
                            </div>
                            <div className="flex items-center">
                                <Icon icon="mdi:account-check" width="15" height="15" className="mr-1 text-indigo-500" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}