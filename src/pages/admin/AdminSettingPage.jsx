import { useState } from 'react';
import {
  Bell, Moon, Sun, Save, Settings, ShieldCheck, UserCog, Globe,
  ChevronRight, Palette, KeyRound, LogOut
} from 'lucide-react';

// Card Component
const SettingCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
    <div className="flex items-center space-x-3 mb-4">
      <Icon className={`w-6 h-6 text-brand`} />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      {/* Footer */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className={`w-7 h-7 mr-2 text-brand`} />
            Admin Settings
          </h1>
          <p className="text-gray-500 text-sm">Manage system preferences and admin configurations</p>
        </div>
        <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold
           bg-brand hover:bg-brand-hover text-white shadow-md transition-all`}>
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* General Settings */}
        <SettingCard icon={Globe} title="General Settings">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:border-teal-500 outline-none"
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Timezone</span>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:border-teal-500 outline-none">
              <option>GMT +7 (Asia/Bangkok)</option>
              <option>GMT +8 (Asia/Singapore)</option>
              <option>GMT +9 (Asia/Tokyo)</option>
            </select>
          </div>
        </SettingCard>

        {/* Appearance */}
        <SettingCard icon={Palette} title="Appearance">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium flex items-center">
              {darkMode ? <Moon className="w-4 h-4 mr-2 text-gray-600" /> : <Sun className="w-4 h-4 mr-2 text-yellow-500" />}
              Theme Mode
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition-all ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {darkMode ? 'Dark' : 'Light'}
            </button>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard icon={Bell} title="Notifications">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Email Notifications</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all" />
            </label>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Push Notifications</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </SettingCard>

        {/* Account Security */}
        <SettingCard icon={ShieldCheck} title="Account Security">
          <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition">
            <div className="flex items-center space-x-2">
              <KeyRound className={`w-4 h-4 text-brand`} />
              <span className="text-gray-700 font-medium">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition">
            <div className="flex items-center space-x-2">
              <UserCog className={`w-4 h-4 text-brand`} />
              <span className="text-gray-700 font-medium">Manage Profile</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition">
            <div className="flex items-center space-x-2">
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-gray-700 font-medium">Logout</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </SettingCard>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-400 pt-4 border-t">
        © {new Date().getFullYear()} Timpiece Admin. All rights reserved.
      </div>
    </div>
  );
}
