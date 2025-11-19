import { useState, useEffect, useRef } from 'react';
import {
    MessageSquare, Send, Search,
} from 'lucide-react';
import {formatDate} from '../utils/formatDate';
import {formatTime} from '../utils/formatTime';
import chatApi from '../api/chatApi';
import io from "socket.io-client";
import avatarError from '../assets/avatar-error.png';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
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

    const messagesEndRef = useRef(null);
    // Cuộn xuống cuối tin nhắn khi có tin nhắn mới
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getConversations = async () => {
        try {
            const response = await chatApi.getConversations();
            setConversations(response.conversations);
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    }
    useEffect(() => {
        getConversations();
    }, []);
    // Kết nối socket
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
                console.log(err.response?.data?.message || err.message);
            }
        }
        getMessages();
    }, [activeConversation]);

    useEffect(() => {
        socket.emit('join', user.code);
        
        socket.on('receiveMessage', async (message) => {
            if (conversations && conversations.length > 0) {
                const index = conversations.findIndex(c => c._id === message.conversationId);
                await new Promise(resolve=>(resolve,setTimeout(resolve,1000)));
                if (index === -1) {
                    getConversations();
                    return;
                }
                setConversations(prev => {
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
            } else {
                await new Promise(resolve=>setTimeout(resolve,1000));
                getConversations();
            }

            if (messages.length > 0 && messages[0].conversationId === message?.conversationId) {
                setMessages(prev => [...prev, message]);
            }

        });

        return () => socket.off("receiveMessage");
    }, [user]);

    const handleActiveConversation = (conver) => {
        setActiveConversation(conver);

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


    const sendMessage = async () => {
        if (!user || !text.trim() || !messages) return;

        const message = {
            conversationId: messages[0].conversationId,
            sender: user,
            receiver: messages[0].sender,
            text: text,
            createdAt: new Date()
        };

        // Gửi đến server qua socket
        socket.emit("sendMessage", message);

        await chatApi.postMessage(message);

        setText('');
        setMessages(prev => ([...prev, message]));
    };

    // Hàm tạo màu cố định dựa theo tên
    const getColorFromName = (name) => {
        if (!name) return 'gray';
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const r = (hash >> 24) & 255;
        const g = (hash >> 16) & 255;
        const b = (hash >> 8) & 255;
        return `rgb(${Math.abs(r) % 200}, ${Math.abs(g) % 200}, ${Math.abs(b) % 200})`;
    };

    const getName = (name = '') => {
        if (!name.trim()) return '?';
        const parts = name.trim().split(/\s+/);
        const initials = parts.map(part => part[0].toUpperCase()).join('');
        return initials;
    };

    return (
        // Điều chỉnh chiều cao để lấp đầy không gian main content
        <div className="h-[calc(100vh-6rem)] flex rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200">
            {/* 1. Contact List Sidebar (Cột Trái) - Thiết kế cố định 320px cho PC */}
            <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50 flex-shrink-0 " >
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Chats ({conversations?.length})</h2>
                    <div className="mt-3 relative">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Danh sách Liên hệ */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conver, index) => (
                        <div
                            key={index}
                            className={`flex items-center p-4 cursor-pointer border-b border-gray-100 transition-colors 
                                ${activeConversation?._id === conver._id ? 'bg-teal-50 border-l-4 border-teal-600' : 'hover:bg-gray-100'}
                            `}
                            onClick={() => handleActiveConversation(conver)}
                        >
                            {
                                conver.participants[0]?.code === user.code ? (
                                    <div className='flex gap-4 flex-start items-center'>
                                        <p className={`w-14 h-14 rounded-full flex items-center justify-center text-white relative`}
                                        >
                                            <img className='w-full h-full rounded-full' src={conver.participants[1].avatar} alt="Avatar" title='Avatar' />
                                            <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white 
                                    ${conver?.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}
                                            ></span>
                                        </p>
                                        <div>
                                            <p className='font-bold'>{conver.participants[1]?.fullName}</p>
                                            <p className={conver.isRead ? 'text-gray-500' : 'text-black'}>{conver.lastMessage?.text}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex gap-4 flex-start items-center'>
                                        <p className={`w-14 h-14 rounded-full flex items-center justify-center text-white relative`}
                                        >
                                            <img className='w-full h-full rounded-full' src={conver.participants[0].avatar} alt="Avatar" title='Avatar' />
                                            <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white 
                                    ${conver?.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}
                                            ></span>
                                        </p>
                                        <div>
                                            <p className='font-bold'>{conver.participants[0]?.fullName}</p>
                                            <p className={conver.isRead ? 'text-gray-500' : 'text-black'}>{conver.lastMessage?.text}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Chat Window (Cột Phải) - Chiếm phần không gian còn lại */}
            <div className="flex-1 flex flex-col">
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">

                            {activeConversation.participants[0]?.id === user.code ? (
                                <div className='flex justify-start items-center'>
                                    <img src={activeConversation.participants[1].avatar || avatarError} alt={activeConversation.participants[1].fullName || 'Unknown'} className="w-14 h-14 rounded-full object-cover" />
                                    <div className="ml-3">
                                        <h3 className="text-lg font-semibold text-gray-900">{activeConversation.participants[1].fullName}</h3>
                                        <p className={`text-xs ${activeConversation.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                                            {activeConversation.status === 'online' ? 'Online' : 'Last seen yesterday'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex justify-start items-center '>
                                    <img src={activeConversation.participants[0].avatar || avatarError} alt={activeConversation.participants[0].fullName || 'Unknown'} className="w-14 h-14 rounded-full object-cover" />
                                    <div className="ml-3">
                                        <h3 className="text-lg font-semibold text-gray-900">{activeConversation.participants[0]?.fullName}</h3>
                                        <p className={`text-xs ${activeConversation.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                                            {activeConversation.status === 'online' ? 'Online' : 'Last seen yesterday'}
                                        </p>
                                    </div>
                                </div>
                            )}


                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-100">
                            {messages?.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender?.code === user.code ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md p-3 rounded-xl shadow-md 
                                        ${msg.sender?.code === user.code
                                            ? 'bg-teal-500 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                        }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                        <span className={`block mt-1 text-right text-xs ${msg.sender?.code === user.code ? 'text-teal-200' : 'text-gray-400'}`}>
                                            {formatDate(msg.createdAt)} • {formatTime(msg.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div className='h-0.5' ref={messagesEndRef} /></div>
                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-200 bg-white flex items-center space-x-3">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-teal-500 focus:border-teal-500 transition"
                            />
                            <button className={`p-3 rounded-full text-white bg-brand hover:bg-brand-hover transition-colors shadow-lg shadow-teal-500/50`}>
                                <Send className="w-5 h-5" onClick={() => sendMessage()} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8 text-center">
                        <MessageSquare className="w-16 h-16 text-teal-400 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700">Select a Chat</h2>
                        <p className="text-gray-500 mt-2">Choose a chat from the sidebar to start a conversation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ************************************************
// 3. Main Component: App (Dashboard Layout)
// ************************************************
export default function ChatManagement() {

    const userId = "admin_user_2025";

    return (
        <Message userId={userId} />
    )
};

