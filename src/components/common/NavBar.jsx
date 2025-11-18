import { useState, useEffect } from 'react';
import {
    Calendar, Flame, Gift, CheckCircle2,
    Wallet, QrCode, Award, History, Sparkles, CheckCircle, Clock
} from 'lucide-react';

export default function NavBar() {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({
        scoreBoard: [1, 1, 1, 1, 1, 1, 2],
        quantity: 1250,
        streak: 5,
        lastCheckIn: null,
        history: [
            { point: 16, action: 'Tissot đồng hồ terdomemteias', time: new Date() },
            { point: 11, action: 'Essentially Gặt đạovenplay', time: new Date() },
            { point: 128, action: 'Resettroems btemlokiay', time: new Date() }
        ],
        tier: 'GOLD TIER',
        tierProgress: 62
    });
    const [isCheckedInToday, setIsCheckedInToday] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        checkIfCheckedInToday();
    }, []);

    const checkIfCheckedInToday = () => {
        if (!userData.lastCheckIn) {
            setIsCheckedInToday(false);
            return;
        }

        const lastCheckIn = new Date(userData.lastCheckIn);
        const today = new Date();

        const isSameDay = lastCheckIn.toDateString() === today.toDateString();
        setIsCheckedInToday(isSameDay);
    };

    const createConfetti = () => {
        const newConfetti = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.3
        }));
        setConfetti(newConfetti);
        setTimeout(() => setConfetti([]), 3000);
    };

    const handleCheckIn = async () => {
        const today = new Date();
        const lastCheckIn = userData.lastCheckIn ? new Date(userData.lastCheckIn) : null;

        let newStreak = userData.streak;
        if (lastCheckIn) {
            const diffTime = Math.abs(today - lastCheckIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                newStreak += 1;
            } else if (diffDays > 1) {
                newStreak = 1;
            }
        } else {
            newStreak = 1;
        }

        const dayIndex = today.getDay();
        const pointsEarned = userData.scoreBoard[dayIndex];

        const newUserData = {
            ...userData,
            quantity: userData.quantity + pointsEarned,
            streak: newStreak,
            lastCheckIn: today,
            history: [
                {
                    point: pointsEarned,
                    action: 'Daily Check-in Reward',
                    time: today
                },
                ...userData.history
            ]
        };

        setUserData(newUserData);
        setIsCheckedInToday(true);
        setShowSuccess(true);
        createConfetti();

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    const getDayName = (index) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[index];
    };

    const getCurrentDayIndex = () => {
        return new Date().getDay();
    };

    const CheckInCard = () => (
        <div className="fixed inset-0 m-12 z-50 flex justify-center "
        onClick={()=>setShow(false)}
        >
            <div
             className="h-max bg-gradient-to-br
             from-gray-800 to-gray-900 rounded-3xl
              p-8 border-2 border-cyan-500 "
              onClick={(e)=>e.stopPropagation()}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="bg-cyan-500 p-3 rounded-xl animate-pulse-soft">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white flex justify-center items-center gap-3">
                        Daily Check-in & Rewards
                    </h2>
                </div>

                {/* Streak Visualization */}
                <div className="flex items-center gap-3 mb-6">
                    {[...Array(7)].map((_, index) => {
                        const isCompleted = index < userData.streak;
                        const isToday = index === userData.streak && !isCheckedInToday;

                        return (
                            <div
                                key={index}
                                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${isCompleted
                                    ? 'bg-gradient-to-br from-cyan-400 to-teal-500 scale-110 shadow-lg shadow-cyan-500/50'
                                    : isToday
                                        ? 'bg-cyan-500/20 border-2 border-cyan-500 animate-pulse-border'
                                        : 'bg-gray-700 border border-gray-600'
                                    }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6 text-white animate-scale-in" />
                                ) : isToday ? (
                                    <Clock className="w-5 h-5 text-cyan-400" />
                                ) : (
                                    <div className="text-xs text-gray-500">{index + 1}</div>
                                )}

                                {isCompleted && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                                )}
                            </div>
                        );
                    })}

                    {userData.scoreBoard.length > 7 && (
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-4 border border-orange-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Flame className="w-8 h-8 text-orange-400 animate-flicker" />
                            <div>
                                <p className="text-sm text-gray-400">Current Streak</p>
                                <p className="text-3xl font-bold text-white">{userData.streak} <span className="text-lg text-gray-400">days</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl p-4 border border-cyan-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="w-8 h-8 text-cyan-400 animate-bounce-soft" />
                            <div>
                                <p className="text-sm text-gray-400">Total Points</p>
                                <p className="text-3xl font-bold text-white">{userData.quantity.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confetti Effect */}
                {confetti.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none z-50">
                        {confetti.map((item) => (
                            <div
                                key={item.id}
                                className="absolute w-2 h-2 animate-confetti"
                                style={{
                                    left: `${item.left}%`,
                                    top: '-10px',
                                    animationDelay: `${item.delay}s`,
                                    backgroundColor: ['#06b6d4', '#14b8a6', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500 rounded-xl p-4 flex items-center gap-3 animate-slide-down">
                        <CheckCircle2 className="w-8 h-8 text-green-400 animate-scale-in" />
                        <div>
                            <p className="text-green-400 font-bold">Check-in Successful! 🎉</p>
                            <p className="text-sm text-gray-300">+{userData.scoreBoard[getCurrentDayIndex()]} points earned!</p>
                        </div>
                    </div>
                )}

                {/* Check-in Button */}
                <button
                    onClick={handleCheckIn}
                    disabled={isCheckedInToday}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${isCheckedInToday
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105'
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Gift className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">
                        {isCheckedInToday ? 'Already Checked In Today ✓' : 'CHECK IN NOW'}
                    </span>
                </button>

                {/* Additional Info */}
                <div className="mt-4 space-y-2">
                    <button className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <History className="w-5 h-5" />
                        Total Check-in History
                    </button>

                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 border border-yellow-500/30 text-center">
                        <p className="text-sm text-gray-300">Reward Summary: <span className="text-yellow-400 font-bold">+50 PTS!</span></p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="max-w-7xl mx-auto my-4 flex flex-row justify-center gap-8">
                <button
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 group border-2 border-cyan-500"
                    onClick={() => setShow(true)}
                >
                    <div className="bg-white p-2 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                        <Calendar className="w-8 h-8 text-cyan-500" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-lg">DAILY CHECK IN</h3>
                        <p className="text-cyan-50 text-sm">Current Streak: {userData.streak} Days</p>
                    </div>
                </button>

                <button
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 transform hover:scale-105 group border-2 border-orange-200"
                >
                    <div className="bg-gray-100 p-2 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                        <Wallet className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-gray-800 font-bold text-lg">TIMEPIECE WALLET</h3>
                        <p className="text-gray-500 text-sm">Balance: {userData.quantity} PTS</p>
                    </div>
                </button>

                <button
                    className="flex items-center justify-center p-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 border-2 border-orange-500 "
                >
                    <QrCode className="w-12 h-12 text-white" />
                </button>
            </div>
            {show && <CheckInCard />}
        </>
    );
}