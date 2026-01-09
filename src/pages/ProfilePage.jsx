import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import profileApi from '../api/profileApi';


export default function ProfilePage() {

    const [user, setUser] = useState({});
    
    const [birthday, setBirthday] = useState({
        day: "",
        month: "",
        year: ""
    });

    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => currentYear - i
    );

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await profileApi.profile();
                setUser(response.user);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getUser();
    }, []);

    const getDaysInMonth = (month, year) => {
        if (!month || !year) return [];
        return new Date(year, month, 0).getDate();
    };

    return (
        <div className='flex-1 p-4 bg-bg-primary shadow-xl rounded-xl'>
            {/* Header */}
            <div className="pb-6 border-b">
                <h1 className="text-3xl font-bold text-slate-900">
                    Hồ sơ của tôi
                </h1>
                <p className="text-sm text-gray-500">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
            </div>
            {/* Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2 flex flex-col gap-6 pt-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Họ và tên" value={user.fullName} />
                        <Input label="Số điện thoại" value={user.phoneNumber} />
                    </div>

                    {/* Email */}
                    <label className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Email</span>
                            <span className="text-xs text-brand cursor-pointer hover:underline">
                                Thay đổi
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                disabled
                                value={user.email}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border cursor-not-allowed"
                            />
                            <Icon
                                icon="mdi:check-circle"
                                className="absolute right-3 top-3 text-green-500"
                            />
                        </div>
                    </label>

                    {/* Gender */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Giới tính</span>
                        <div className="flex gap-6">
                            <Radio label="Nam" checked />
                            <Radio label="Nữ" />
                            <Radio label="Khác" />
                        </div>
                    </div>

                    {/* Birthday */}
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Ngày sinh</span>

                        <div className="grid grid-cols-3 gap-2">
                            {/* Day */}
                            <select
                                className="input"
                                value={birthday.day}
                                disabled={!birthday.month || !birthday.year}
                                onChange={(e) =>
                                    setBirthday({ ...birthday, day: e.target.value })
                                }
                            >
                                <option value="">Ngày</option>
                                {Array.from(
                                    { length: getDaysInMonth(birthday.month, birthday.year) },
                                    (_, i) => i + 1
                                ).map(day => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>

                            {/* Month */}
                            <select
                                className="input"
                                value={birthday.month}
                                onChange={(e) =>
                                    setBirthday({
                                        ...birthday,
                                        month: e.target.value,
                                        day: ""
                                    })
                                }
                            >
                                <option value="">Tháng</option>
                                {months.map(month => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            {/* Year */}
                            <select
                                className="input"
                                value={birthday.year}
                                onChange={(e) =>
                                    setBirthday({
                                        ...birthday,
                                        year: e.target.value,
                                        day: ""
                                    })
                                }
                            >
                                <option value="">Năm</option>
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <button className="bg-brand text-white font-bold py-3 px-8 rounded-lg shadow hover:scale-[1.02] transition">
                        Lưu thay đổi
                    </button>
                </div>

                {/* Avatar */}
                <div className="lg:col-span-1 flex flex-col items-center py-4 lg:border-l">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div className="size-32 rounded-full overflow-hidden border bg-gray-100">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <Icon icon="mdi:camera-outline" className="text-white text-2xl" />
                            </div>
                        </div>

                        <button className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-50">
                            Chọn ảnh
                        </button>

                        <p className="text-xs text-gray-400 text-center">
                            Tối đa 1MB • JPEG, PNG
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Input({ label, value }) {
    return (
        <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">{label}</span>
            <input
                defaultValue={value}
                className="px-4 py-3 rounded-lg border focus:ring-1 focus:ring-brand"
            />
        </label>
    );
}

function Radio({ label, checked }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                className="accent-brand"
                name='gender'
            />
            <span>{label}</span>
        </label>
    );
}
