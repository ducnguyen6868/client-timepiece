import { useState, useEffect } from 'react';
import {
    Settings, User, Lock, Bell, Mail, Smartphone, Save, Tag
} from 'lucide-react';
import PasswordChangeModal from '../components/common/PasswordChangeModal';
import profileApi from '../api/profileApi';
import LoadingAnimations from '../components/common/LoadingAnimations';

// ************************************************
// Sub-Component: 1. Personal Info Tab
// ************************************************
const PersonalInfoTab = ({ data }) => {
    const [fullName, setFullName] = useState(data?.fullName||'');
    const [phone, setPhone] = useState(data?.phone||'');
    const [email, setEmail] = useState(data?.email||'');

    const handleSave =async (e) => {
        e.preventDefault();
        if (fullName === data?.fullName && phone === data?.phone) return;
        try{
            const response = await profileApi.patchPersonal(fullName,phone);
            alert(response.message);
        }catch(err){
            alert(err.response?.data?.message||err.message);
        }
      
    };

    return (
        <form onSubmit={handleSave} className="space-y-2">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        disabled // Thường email không cho phép đổi dễ dàng
                    />
                    <p className="mt-1 text-xs text-gray-500">Contact support to change your email.</p>
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    className={`flex items-center space-x-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all bg-brand hover:bg-brand-hover text-white shadow-md`}
                >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
};


// ************************************************
// Sub-Component: 3. Notification Preferences Tab
// ************************************************
const NotificationPreferencesTab = ({ data }) => {
    const [prefs, setPrefs] = useState(data?.notifications);

    const togglePref = (key) => {
        setPrefs({ ...prefs, [key]: !prefs[key] });
    };

    const handleSave = () => {
        // Giả lập lưu dữ liệu
        console.log('Saving notification preferences:', prefs);
        alert('Notification preferences updated!');
    };

    return (
        <div className="space-y-2">
            <div className="space-y-4 max-w-lg">

                {/* Email Updates */}
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 mt-1 text-blue-500" />
                        <div>
                            <p className="font-semibold text-gray-900">Email Product Updates</p>
                            <p className="text-sm text-gray-500">Receive weekly emails about new arrivals and features.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={prefs?.email_updates}
                            onChange={() => togglePref('email_updates')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                </div>

                {/* SMS Alerts */}
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-start space-x-3">
                        <Smartphone className="w-5 h-5 mt-1 text-purple-500" />
                        <div>
                            <p className="font-semibold text-gray-900">SMS Order Alerts</p>
                            <p className="text-sm text-gray-500">Get text messages on order confirmation and shipping.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={prefs?.sms_alerts}
                            onChange={() => togglePref('sms_alerts')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                </div>

                {/* Promo Offers */}
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-start space-x-3">
                        <Tag className="w-5 h-5 mt-1 text-red-500" />
                        <div>
                            <p className="font-semibold text-gray-900">Promotional Offers</p>
                            <p className="text-sm text-gray-500">Get updates on sales, coupons, and special deals.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={prefs?.promo_offers}
                            onChange={() => togglePref('promo_offers')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    onClick={handleSave}
                    className={`flex items-center space-x-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all bg-brand hover:bg-brand-hover text-white shadow-md`}
                >
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                </button>
            </div>
        </div>
    );
};


// ************************************************
// Main Component: Account Settings Content
// ************************************************
export default function SettingPage() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const [activeSetting, setActiveSetting] = useState('personal');

    const settingTabs = [
        { key: 'personal', name: 'Personal Info', icon: User, content: PersonalInfoTab },
        { key: 'security', name: 'Password & Security', icon: Lock, content: PasswordChangeModal },
        { key: 'notifications', name: 'Notifications', icon: Bell, content: NotificationPreferencesTab },
    ];

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const response = await profileApi.profile();
                setUser(response.user);
            } catch (err) {
                localStorage.removeItem('token');
                console.log(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }

        }
        getUser();
    }, []);

    const CurrentContent = settingTabs.find(tab => tab.key === activeSetting)?.content;

    return (
        <div className="pt-2">
            <h2 className="hidden md:text-xl lg:text-2xl font-bold text-gray-900 md:flex items-center mb-2 md:mb-3 xl:mb-4">
                <Settings className="w-6 h-6 mr-3 text-teal-600" />
                Account Settings
            </h2>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                {/* Internal Tabs Navigation */}
                <div className="flex space-x-4 justify-between overflow-y-auto border-b border-gray-200">
                    {settingTabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveSetting(tab.key)}
                            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center space-x-2
                                ${activeSetting === tab.key
                                    ? `border-teal-500 text-brand font-semibold`
                                    : 'border-transparent text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon className='w-4 h-4' />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>
                {loading ? (
                    <LoadingAnimations option='dots' />
                ) : (
                    <div className="p-4">
                        {/* Content Area */}
                        {CurrentContent && <CurrentContent data={user} />}
                    </div>
                )}
            </div>
        </div>
    );
}