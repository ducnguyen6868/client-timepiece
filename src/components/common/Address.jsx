import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlertCircle, Loader2, Home, Building2, User, Phone, MapPin, Save, X, } from "lucide-react";
import { isValidPhoneNumber } from "../../utils/isValidPhoneNumber";
import addressApi from "../../api/addressApi";
import Notification from "./Notification";

export default function Address({ onClose, onChange, addressData }) {

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    type: "Home",
  });
  const [errors, setErrors] = useState({});

  const [show , setShow]= useState(false);
  const [type , setType] = useState('');
  const [message , setMessage] = useState('');

  useEffect(() => {
    if (addressData) {
      setAddress({
        name: addressData.name,
        phone: addressData.phone,
        address: addressData.address,
        type: addressData.type,
        id: addressData._id,
      });
    }
  }, [addressData]);

  const checkValidForm = () => {
    if (!address.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Please enter full name." }));
      return false;
    }
    if (!address.phone) {
      setErrors((prev) => ({ ...prev, phone: "Please enter your phone number." }));
      return false;
    }
    if (!isValidPhoneNumber(address.phone)) {
      setErrors((prev) => ({ ...prev, phone: "Invalid phone number format." }));
      return false;
    }
    if (!address.address.trim()) {
      setErrors((prev) => ({ ...prev, address: "Please enter your address." }));
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidForm()) return;
    setLoading(true);
    try {
      const response = addressData
        ? await addressApi.putAddress(address)
        : await addressApi.postAddress(address);
      setShow(true);
      setType('success');
      setMessage(response.message);
      await new Promise(resolve=>setTimeout(resolve,1000));
      onChange?.();
      onClose?.();
    } catch (err) {
      setShow(true);
      setType('error');
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Notification show={show} type={type} message={message} onClose={()=>setShow(false)}/>
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <MapPin className="text-brand" size={20} />
          Address Information
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <User size={16} className="text-brand" />
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-brand/50 dark:bg-gray-800 dark:text-white`}
            />
            <User
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {errors.name && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertCircle size={14} /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Phone size={16} className="text-brand" />
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="e.g. +84 912 345 678"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-brand/50 dark:bg-gray-800 dark:text-white`}
            />
            <Phone
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {errors.phone && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertCircle size={14} /> {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <MapPin size={16} className="text-brand" />
            Full Address
          </label>
          <textarea
            name="address"
            rows="3"
            value={address.address}
            onChange={handleChange}
            placeholder="Enter detailed address..."
            className={`w-full px-3 py-2 rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-brand/50 dark:bg-gray-800 dark:text-white`}
          />
          {errors.address && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertCircle size={14} /> {errors.address}
            </p>
          )}
        </div>

        {/* Address Type */}
        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="Home"
              checked={address.type === "Home"}
              onChange={handleChange}
              className="text-brand focus:ring-brand"
            />
            <Home size={16} className="text-brand" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Home</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="Office"
              checked={address.type === "Office"}
              onChange={handleChange}
              className="text-brand focus:ring-brand"
            />
            <Building2 size={16} className="text-brand" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Office</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-gray-700 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-1"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Processing...
              </>
            ) : (
              <>
                <Save size={16} />
                {addressData ? "Save Changes" : "Save Address"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
