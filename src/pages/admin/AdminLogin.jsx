import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { isValidEmail } from '../../utils/isValidEmail';
import ForgotPasswordModal from '../../components/common/ForgotPasswordModal';
import authApi from '../../api/authApi';
import loginImage from '../../assets/login.png';
import websiteLogo from '../../assets/website-logo.png';

export default function AdminLogin() {

  const { setInfoUser } = useContext(UserContext);

  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [errors, setErrors] = useState({});


  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) newErrors.email = 'Email is required';
    if (!(isValidEmail(loginData.email))) newErrors.email = 'Email format isn`t correct';
    if (!loginData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // API login
    try {
      const response = await authApi.login(loginData);
      if (loginData.rememberMe) {
        //Save token to localstorage 
        localStorage.setItem("token", response.token);
      } else {
        sessionStorage.setItem("token", response.token);
      }
      toast.success(response.message);
      await setInfoUser(prev => ({
        ...prev, name: response.user.fullName,
        email: response.user.email,
        avatar: response.user.avatar,
        cart: response.user.carts?.length,
        wishlist: response.user.wishlist?.length
      }));
      navigate('/');

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <>

      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4"
      >
        <img className='fixed w-full h-full' src={loginImage} alt='Login' title='Login' />
        <div className="bg-white z-10 relative dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="text-center space-y-2 flex md:gap-4 justify-center items-end">
            <img src={websiteLogo} title='Website Logo' alt='Website Logo' className='w-12 h-12' />
            <span className="text-lg  md:text-xl font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              TIMEPIECE
            </span>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Icon icon="mdi:email-outline" width="18" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="your@email.com"
              autoComplete="on"
              className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                <Icon icon="mdi:alert-circle" width="16" height="16" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Icon icon="mdi:lock-outline" width="18" />
              <span>Password</span>
            </label>

            <div className="relative">
              <input
                type={isHiddenPassword ? "password" : "text"}
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleLoginChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLoginSubmit(e);
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
              />
              <button
                type="button"
                onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-500 transition"
              >
                <Icon icon={isHiddenPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} width="20" />
              </button>
            </div>

            {errors.password && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                <Icon icon="mdi:alert-circle" width="16" height="16" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Checkbox + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginData.rememberMe}
                onChange={handleLoginChange}
                className="w-4 h-4 accent-brand rounded"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setIsModal(true)}
              className="text-brand hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            onClick={handleLoginSubmit}
            className="w-full py-2 bg-brand hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
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
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            No account?{" "}
            <Link to="../register" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot password modal */}
      {isModal && <ForgotPasswordModal onClose={() => setIsModal(false)} />}
    </>

  );
}
