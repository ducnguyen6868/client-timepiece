import { useState, useEffect, useRef } from 'react';
import {
    MessageSquare, Send, Search, ArrowLeft, MoreVertical
} from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import chatApi from '../../api/chatApi';
import io from "socket.io-client";
import avatarError from '../../assets/avatar-error.png';
import Notification from '../../components/common/Notification';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
    transports: ["websocket"],
    withCredentials: true,
});

const Message = () => {
    // Dữ liệu giả định cho Chat
    const user = {
        code: 'mid24',
        fullName: 'FAKER',
        avatar: 'Azir'
    }
    const [text, setText] = useState('');
    const [activeConversation, setActiveConversation] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showMobileChat, setShowMobileChat] = useState(false);

    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getConversations = async () => {
        try {
            const response = await chatApi.getConversations();
            setConversations(response.conversations);
        } catch (err) {
            setShow(true);
            setType('error');
            setMessage(err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        getConversations();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!activeConversation) return;
        const getMessages = async () => {
            try {
                const response = await chatApi.getMessages(activeConversation._id);
                setMessages(response.messages);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            }
        }
        getMessages();
    }, [activeConversation]);

    useEffect(() => {
        socket.emit('join', user.code);

        const handleReceiveMessage = async (message) => {
            setConversations(prev => {
                if (!prev || prev.length === 0) {
                    getConversations();
                    return prev;
                }

                const index = prev.findIndex(c => c._id === message.conversationId);
                if (index === -1) {
                    getConversations();
                    return prev;
                }

                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    lastMessage: {
                        text: message.text,
                        senderCode: message.sender.code,
                        createdAt: message.createdAt,
                    },
                    isRead: false
                };
                return updated;
            });

            setMessages(prev => {
                if (prev.length > 0 && prev[0].conversationId === message?.conversationId) {
                    return [...prev, message];
                }
                return prev;
            });
        };

        socket.on('receiveMessage', handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []); // Chỉ chạy 1 lần khi mount


    const handleActiveConversation = (conver) => {
        setActiveConversation(conver);
        setShowMobileChat(true);

        setConversations(prev => {
            const updated = [...prev];
            const index = updated.findIndex(c => c._id === conver._id);
            if (index === -1) return prev;

            updated[index] = {
                ...updated[index],
                isRead: true
            };

            return updated;
        });
    }

    const handleBackToList = () => {
        setShowMobileChat(false);
        setActiveConversation(null);
    }

    const sendMessage = async () => {
        if (!user || !text.trim() || !messages) return;

        const message = {
            conversationId: messages[0].conversationId,
            sender: user,
            receiver: messages[0].sender,
            text: text,
            createdAt: new Date()
        };

        socket.emit("sendMessage", message);
        await chatApi.postMessage(message);

        setText('');
        setMessages(prev => ([...prev, message]));
    };

    return (
        <>
            {/* Notification */}
            <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />

            {/* Desktop View */}
            <div className="hidden xl:flex min-h-screen w-full max-h-screen 
    rounded-xl overflow-hidden shadow-xl bg-white border border-gray-200">

                {/* LEFT SIDEBAR — Conversation List */}
                <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">

                    {/* Header */}
                    <div className="p-4 border-b bg-white">
                        <h2 className="text-xl font-bold text-gray-800">
                            Chats ({conversations?.length})
                        </h2>

                        <div className="mt-3 relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full p-2 pl-10 text-sm border rounded-lg 
                    border-gray-300 focus:ring-brand focus:border-brand transition"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((conver, index) => {
                            const otherUser =
                                conver.participants[0]?.code === user.code
                                    ? conver.participants[1]
                                    : conver.participants[0];

                            return (
                                <div
                                    key={index}
                                    className={`flex items-center p-4 cursor-pointer transition
                            border-b border-gray-100 
                            ${activeConversation?._id === conver._id
                                            ? "bg-teal-50 border-l-4 border-brand-hover"
                                            : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => handleActiveConversation(conver)}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="relative">
                                            <img
                                                src={otherUser?.avatar}
                                                alt={otherUser?.fullName}
                                                title={otherUser?.fullName}
                                                loading='lazy'
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full
                                    ring-2 ring-white
                                    ${conver.status === "online" ? "bg-green-400" : "bg-gray-400"}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">
                                                {otherUser?.fullName}
                                            </p>
                                            <p className={`text-sm truncate 
                                    ${conver.isRead ? "text-gray-500" : "text-gray-900 font-medium"}`}>
                                                {conver.lastMessage?.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT CHAT WINDOW */}
                <div className="flex-1 flex flex-col bg-white">

                    {activeConversation ? (
                        <>
                            {/* Header */}
                            <div className="pl-3 py-1 rounded-lg border-b bg-brand shadow-sm flex items-center justify-between">
                                {(() => {
                                    const otherUser =
                                        activeConversation.participants[0]?.code === user.code
                                            ? activeConversation.participants[1]
                                            : activeConversation.participants[0];

                                    return (
                                        <div className="flex items-center gap-3">
                                            <div className='p-2 border-2 border-white rounded-full'>
                                                <img
                                                    src={otherUser?.avatar}
                                                    alt={otherUser?.fullName}
                                                    title={otherUser?.fullName}
                                                    loading='lazy'
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-brand"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {otherUser?.fullName}
                                                </h3>
                                                <p className={`text-xs 
                                        ${activeConversation.status === "online"
                                                        ? "text-green-500"
                                                        : "text-white"}`}>
                                                    {activeConversation.status === "online" ? "Online" : "Offline"}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* MESSAGES */}
                            <div className="
                    flex-1 p-4 overflow-y-auto
                    bg-gradient-to-b from-gray-50 to-white">

                                {messages.map((msg, index) => (
                                    <div key={index}
                                        className={`flex mb-4 
                            ${msg.sender?.code === user.code ? "justify-end" : "justify-start"}`}>
                                        <div className={`
                                max-w-xs md:max-w-md p-3 rounded-xl shadow
                                ${msg.sender?.code === user.code
                                                ? "bg-brand text-white rounded-br-none"
                                                : "bg-white border rounded-tl-none text-gray-800"}
                            `}>
                                            <p className="text-sm">{msg.text}</p>
                                            <span
                                                className={`block mt-1 text-right text-xs ${msg.sender?.code === user.code ? 'text-white' : 'text-gray-400'}`}>
                                                {formatDate(msg.createdAt)} - {formatTime(msg.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* INPUT */}
                            <div className="p-3 border-t bg-white flex items-center gap-2">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 p-3 border rounded-full
                        border-gray-300 focus:ring-2 focus:ring-brand"
                                />
                                <button
                                    onClick={sendMessage}
                                    className="p-3 rounded-full bg-brand text-white shadow-md hover:bg-brand-hover">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <MessageSquare className='w-24 h-24 text-brand' />
                            Select a conversation
                        </div>
                    )}
                </div>
            </div>


            {/* Mobile View */}
            <div className="xl:hidden flex flex-col flex-1 bg-white overflow-hidden">

                {!showMobileChat ? (
                    /* ================================
                       MOBILE CONVERSATION LIST
                    ==================================*/
                    <div className="flex flex-col flex-1 overflow-hidden">

                        {/* Search */}
                        <div className="p-3 bg-white border-b">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-brand focus:border-brand-hover"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Conversations Scroll */}
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                            {conversations.map((conver, index) => {
                                const otherUser =
                                    conver.participants[0]?.code === user.code
                                        ? conver.participants[1]
                                        : conver.participants[0];

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center rounded-xl p-4 bg-white border-b border-gray-100 active:bg-gray-50"
                                        onClick={() => handleActiveConversation(conver)}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={otherUser?.avatar || avatarError}
                                                alt={otherUser?.fullName}
                                                title={otherUser?.fullName}
                                                loading='lazy'
                                                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                                            />
                                            <span
                                                className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white
                                        ${conver.status === "online" ? "bg-green-400" : "bg-gray-400"}
                                    `}
                                            ></span>
                                        </div>

                                        <div className="flex-1 ml-3 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className="font-semibold text-gray-800 truncate">
                                                    {otherUser?.fullName}
                                                </p>
                                                <span className="text-xs text-gray-500 flex-shrink-0">
                                                    {formatTime(conver.lastMessage?.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className={`text-sm truncate ${conver.isRead ? "text-gray-500" : "text-gray-900 font-medium"}`}>
                                                    {conver.lastMessage?.text}
                                                </p>
                                                {!conver.isRead && (
                                                    <span className="ml-2 w-2 h-2 bg-brand rounded-full"></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    /* ================================
                       MOBILE CHAT WINDOW
                    ==================================*/
                    <div className="flex flex-col flex-1 overflow-hidden">

                        {/* Header */}
                        <div className="p-2 bg-brand text-white flex items-center gap-3 rounded-lg">
                            <button onClick={handleBackToList} className="p-1 hover:bg-teal-600 rounded-full">
                                <ArrowLeft className="w-6 h-6" />
                            </button>

                            {(() => {
                                const otherUser =
                                    activeConversation.participants[0]?.code === user.code
                                        ? activeConversation.participants[1]
                                        : activeConversation.participants[0];

                                return (
                                    <div className="flex items-center gap-3 flex-1">
                                        <img
                                            src={otherUser?.avatar || avatarError}
                                            alt={otherUser?.fullName}
                                            title={otherUser?.fullName}
                                            loading='lazy'
                                            className="w-10 h-10 rounded-full border-2 border-white"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{otherUser?.fullName}</h3>
                                            <p className="text-xs text-teal-100">
                                                {activeConversation.status === "online" ? "Online" : "Offline"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}

                            <button className="p-2 hover:bg-teal-600 rounded-full">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex mb-3 ${msg.sender?.code === user.code ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[75%] p-3 rounded-xl shadow-sm
                                ${msg.sender?.code === user.code
                                                ? "bg-brand text-white rounded-br-none"
                                                : "bg-white border text-gray-800 rounded-tl-none"
                                            }
                            `}
                                    >
                                        <p className="text-sm break-words">{msg.text}</p>
                                        <span
                                            className={`block mt-1 text-xs 
                                    ${msg.sender?.code === user.code
                                                    ? "text-teal-100 text-right"
                                                    : "text-gray-400 text-left"
                                                }
                                `}
                                        >
                                            {formatTime(msg.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Bar */}
                        <div className="p-3 border-t bg-white flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand text-sm"
                            />
                            <button
                                onClick={sendMessage}
                                className="p-3 bg-brand text-white rounded-full shadow-lg active:bg-teal-700"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default function ChatManagement() {
    const userId = "admin_user_2025";
    return (
        <>
            <Message userId={userId} />
        </>
    )
};