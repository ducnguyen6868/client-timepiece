import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail } from '../utils/isValidEmail';
import authApi from "../api/authApi";
import loginImage from '../assets/login.png';
import Notification from "../components/common/Notification";

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

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const handleRegisterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors({ ...errors, [name]: "" });
    };

    const handleRegisterSubmit = async () => {
        try {
            const response = await authApi.register(registerData);

            setType('success');
            setMessage(response.message || 'Đăng ký tài khoản thành công');
            setShow(true);

            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('../login');
        } catch (err) {
            setType('error');
            setMessage(err.response?.data?.message || 'Đăng ký thất bại');
            setShow(true);
        }
    };

    const handleMultipleButton = () => {
        if (step === 1) {
            const newErrors = {};

            if (!registerData.name)
                newErrors.name = "Vui lòng nhập họ và tên";

            if (!registerData.email) {
                newErrors.email = "Vui lòng nhập email";
            } else if (!isValidEmail(registerData.email)) {
                newErrors.email = "Email không đúng định dạng";
            }

            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                setStep(2);
            }
        }

        if (step === 2) {
            const newErrors = {};

            if (registerData.password.length < 8)
                newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";

            if (registerData.password !== registerData.confirmPassword)
                newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

            if (!registerData.agreeTerms)
                newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng";

            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;

            handleRegisterSubmit();
        }
    };

    return (
        <>
            <Notification
                show={show}
                type={type}
                message={message}
                onClose={() => setShow(false)}
            />

            <div className="min-h-screen flex items-center justify-center px-4">
                <img className="fixed w-full h-full object-cover" src={loginImage} alt="Đăng ký" />

                <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-cyan-600">
                            Tạo tài khoản mới
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Tham gia cộng đồng yêu thích đồng hồ của chúng tôi
                        </p>
                    </div>

                    {step === 1 && (
                        <>
                            {/* Họ tên */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                                    <Icon icon="mdi:account-outline" width="18" />
                                    <span>Họ và tên</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    placeholder="Nguyễn Văn A"
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.name ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                                    <Icon icon="mdi:email-outline" width="18" />
                                    <span>Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    placeholder="nguyenvana@gmail.com"
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.email ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                )}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* Mật khẩu */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                                    <Icon icon="mdi:lock-outline" width="18" />
                                    <span>Mật khẩu</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={isHiddenPassword ? "password" : "text"}
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            errors.password ? 'border-red-400' : 'border-gray-300'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <Icon icon={isHiddenPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} />
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Xác nhận mật khẩu */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                                    <Icon icon="mdi:shield-lock-outline" width="18" />
                                    <span>Xác nhận mật khẩu</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={isHiddenConfirm ? "password" : "text"}
                                        name="confirmPassword"
                                        value={registerData.confirmPassword}
                                        onChange={handleRegisterChange}
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            errors.confirmPassword ? 'border-red-400' : 'border-gray-300'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsHiddenConfirm(!isHiddenConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <Icon icon={isHiddenConfirm ? "mdi:eye-off-outline" : "mdi:eye-outline"} />
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Điều khoản */}
                            <div className="flex items-start gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={registerData.agreeTerms}
                                    onChange={handleRegisterChange}
                                />
                                <span className="text-sm">
                                    Tôi đồng ý với{" "}
                                    <Link to="#" className="text-cyan-600 hover:underline">
                                        Điều khoản & Điều kiện
                                    </Link>
                                </span>
                            </div>
                            {errors.agreeTerms && (
                                <p className="text-sm text-red-500">{errors.agreeTerms}</p>
                            )}
                        </>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleMultipleButton}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-lg"
                    >
                        {step === 1 ? "Tiếp tục" : "Tạo tài khoản"}
                    </button>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Đã có tài khoản?{" "}
                        <Link to="../login" className="text-cyan-600 font-medium hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
