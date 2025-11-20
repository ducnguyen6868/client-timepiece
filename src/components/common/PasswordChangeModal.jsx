import { useState } from "react";
import {
  Lock, LockKeyhole, Eye, EyeOff, ShieldCheck,
  CheckCircle, Circle, AlertCircle, Loader2, X,
} from "lucide-react";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";

export default function PasswordChangeModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwords, setPasswords] = useState({});

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.length >= 8) strength += 25;
    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    if (name === "newPassword") calculatePasswordStrength(value);
    setErrors({ ...errors, [name]: "" });
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!passwords.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwords.newPassword)
      newErrors.newPassword = "New password is required";
    else if (passwords.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    if (!passwords.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (passwords.newPassword !== passwords.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (passwords.currentPassword === passwords.newPassword)
      newErrors.newPassword =
        "New password must be different from current password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const res = await userApi.changePassword(passwords);
      toast.success(res.message);
      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-full transition-all duration-300 ">

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className='flex-1'>
            {/* Current Password */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                <Lock size={16} /> Current Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwords.currentPassword || ""}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.currentPassword ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-brand/50 dark:bg-gray-800 dark:text-white`}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className='mt-4'>
              <label className="text-sm text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                <LockKeyhole size={16} /> New Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword || ""}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.newPassword ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-brand/50 dark:bg-gray-800 dark:text-white`}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Strength Meter */}
              {passwords.newPassword && (
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs mt-1 inline-block ${getStrengthColor().replace("bg-", "text-")
                      }`}
                  >
                    {getStrengthText()}
                  </span>
                </div>
              )}
              {errors.newPassword && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className='mt-4'>
              <label className="text-sm text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                <Lock size={16} /> Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword || ""}
                  onChange={handleInputChange}
                  placeholder="Re-enter new password"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-brand/50 dark:bg-gray-800 dark:text-white`}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="flex-1 max-w-80 mt-5 bg-gray-50 dark:bg-gray-800/60 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2 font-medium text-sm text-gray-700 dark:text-gray-300">
              <ShieldCheck size={16} /> Password Requirements
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                {passwords.newPassword?.length >= 8 ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Circle size={14} className="text-gray-400" />
                )}
                <span>At least 8 characters</span>
              </li>
              <li className="flex items-center gap-2">
                {/[A-Z]/.test(passwords.newPassword || "") ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Circle size={14} className="text-gray-400" />
                )}
                <span>One uppercase letter</span>
              </li>
              <li className="flex items-center gap-2">
                {/[a-z]/.test(passwords.newPassword || "") ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Circle size={14} className="text-gray-400" />
                )}
                <span>One lowercase letter</span>
              </li>
              <li className="flex items-center gap-2">
                {/[0-9]/.test(passwords.newPassword || "") ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Circle size={14} className="text-gray-400" />
                )}
                <span>One number</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-all flex items-center gap-1"
            disabled={loading}
          >
            <X size={16} /> Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
              </>
            ) : (
              <>Change Password</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
