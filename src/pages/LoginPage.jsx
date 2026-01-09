import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { isValidEmail } from '../utils/isValidEmail';
import ForgotPasswordModal from '../components/common/ForgotPasswordModal';
import authApi from '../api/authApi';
import loginImage from '../assets/login.png';
import Notification from '../components/common/Notification';

export default function LoginPage() {

  const { setInfoUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

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
    setLoginData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) newErrors.email = 'Email không được để trống';
    else if (!isValidEmail(loginData.email)) newErrors.email = 'Email không đúng định dạng';

    if (!loginData.password) newErrors.password = 'Mật khẩu không được để trống';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(loginData);

      if (loginData.rememberMe) {
        localStorage.setItem("token", response.token);
      } else {
        sessionStorage.setItem("token", response.token);
      }

      setInfoUser(prev => ({
        ...prev,
        fullName: response.user.fullName,
        email: response.user.email,
        avatar: response.user.avatar,
        cart: response.user.carts?.length,
        wishlist: response.user.wishlist?.length
      }));

      setType('success');
      setMessage(response.message || 'Đăng nhập thành công');
      setShow(true);

      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err) {
      setType('error');
      setMessage(err.response?.data?.message || 'Đăng nhập thất bại');
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notification
        type={type}
        message={message}
        show={show}
        onClose={() => setShow(false)}
      />

      <div className="min-h-screen relative flex items-center justify-center px-4">
        <img className="fixed w-full h-full object-cover" src={loginImage} alt="Đăng nhập" />

        <div className="bg-white z-10 relative w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-4">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-cyan-600">Chào mừng bạn quay lại</h2>
            <p className="text-sm text-gray-500">
              Sẵn sàng khám phá hàng trăm ưu đãi hấp dẫn ngay hôm nay!
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Icon icon="mdi:email-outline" width="18" />
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="nguyenvana@gmail.com"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Icon icon="mdi:lock-outline" width="18" />
              <span>Mật khẩu</span>
            </label>

            <div className="relative">
              <input
                type={isHiddenPassword ? "password" : "text"}
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                <Icon icon={isHiddenPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} />
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginData.rememberMe}
                onChange={handleLoginChange}
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>

            <button
              type="button"
              onClick={() => setIsModal(true)}
              className="text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleLoginSubmit}
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          {/* Social */}
          <div className="text-center text-sm text-gray-400 mt-4">
            Hoặc đăng nhập bằng
          </div>

          <div className="flex gap-4">
            <Link className="flex-1 bg-gray-100 py-2 rounded-lg flex justify-center gap-2 items-center"
            to={`${process.env.REACT_APP_API_URL?process.env.REACT_APP_API_URL :`http://localhost:5000`}`+`/auth/google`}
            >
              <Icon icon="logos:google-icon" />
              Google
            </Link>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2">
              <Icon icon="logos:facebook"  className='w-5 h-auto'/>
              Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm mt-4">
            Chưa có tài khoản?{" "}
            <Link to="../register" className="text-blue-600 hover:underline">
              Đăng ký
            </Link>
            <div>
              <Link to="/admin/login" className="text-blue-600 hover:underline">
                Đăng nhập quản trị viên
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isModal && <ForgotPasswordModal onClose={() => setIsModal(false)} />}
    </>
  );
}
