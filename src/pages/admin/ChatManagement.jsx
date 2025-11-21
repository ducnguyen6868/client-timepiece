import { useState, useEffect, useRef } from 'react';
import {
    MessageSquare, Send, Search, ArrowLeft, MoreVertical
} from 'lucide-react';
import {formatDate} from '../../utils/formatDate';
import {formatTime} from '../../utils/formatTime';
import chatApi from '../../api/chatApi';
import io from "socket.io-client";
import avatarError from '../../assets/avatar-error.png';

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
    const [showMobileChat, setShowMobileChat] = useState(false);

    const messagesEndRef = useRef(null);
    
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

    // Desktop View
    const DesktopView = () => (
        <div className="hidden lg:flex h-[100vh] flex-row rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200">
            {/* Contact List Sidebar */}
            <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
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

                <div className="overflow-y-auto">
                    {conversations.map((conver, index) => {
                        const otherUser = conver.participants[0]?.code === user.code 
                            ? conver.participants[1] 
                            : conver.participants[0];
                        
                        return (
                            <div
                                key={index}
                                className={`flex items-center p-4 cursor-pointer border-b border-gray-100 transition-colors 
                                    ${activeConversation?._id === conver._id ? 'bg-teal-50 border-l-4 border-teal-600' : 'hover:bg-gray-100'}
                                `}
                                onClick={() => handleActiveConversation(conver)}
                            >
                                <div className='flex gap-3 items-center w-full'>
                                    <div className='relative flex-shrink-0'>
                                        <img 
                                            className='w-12 h-12 rounded-full object-cover' 
                                            src={otherUser.avatar} 
                                            alt="Avatar" 
                                        />
                                        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white 
                                            ${conver?.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}
                                        ></span>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='font-semibold text-gray-800 truncate'>{otherUser?.fullName}</p>
                                        <p className={`text-sm truncate ${conver.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                            {conver.lastMessage?.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {activeConversation ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                            {(() => {
                                const otherUser = activeConversation.participants[0]?.code === user.code 
                                    ? activeConversation.participants[1] 
                                    : activeConversation.participants[0];
                                
                                return (
                                    <div className='flex items-center gap-3'>
                                        <img 
                                            src={otherUser.avatar || avatarError} 
                                            alt={otherUser.fullName || 'Unknown'} 
                                            className="w-12 h-12 rounded-full object-cover" 
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{otherUser?.fullName}</h3>
                                            <p className={`text-xs ${activeConversation.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                                                {activeConversation.status === 'online' ? 'Online' : 'Offline'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            {messages?.map((msg, index) => (
                                <div key={index} className={`flex mb-4 ${msg.sender?.code === user.code ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl shadow-sm 
                                        ${msg.sender?.code === user.code
                                            ? 'bg-teal-500 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                        }`}
                                    >
                                        <p className="text-sm break-words">{msg.text}</p>
                                        <span className={`block mt-1 text-right text-xs ${msg.sender?.code === user.code ? 'text-teal-100' : 'text-gray-400'}`}>
                                            {formatDate(msg.createdAt)} - {formatTime(msg.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                                />
                                <button 
                                    onClick={sendMessage}
                                    className="p-3 rounded-full text-white bg-teal-500 hover:bg-teal-600 transition-colors shadow-lg"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8 text-center">
                        <MessageSquare className="w-20 h-20 text-teal-400 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700">Select a Chat</h2>
                        <p className="text-gray-500 mt-2">Choose a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );

    // Mobile View
    const MobileView = () => (
        <div className="lg:hidden h-[100vh] flex flex-col bg-white">
            {!showMobileChat ? (
                // Conversations List
                <div className="flex flex-col h-full">

                    <div className="p-3 bg-white border-b">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full p-3 pl-10 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        {conversations.map((conver, index) => {
                            const otherUser = conver.participants[0]?.code === user.code 
                                ? conver.participants[1] 
                                : conver.participants[0];
                            
                            return (
                                <div
                                    key={index}
                                    className="flex items-center p-4 bg-white border-b border-gray-100 active:bg-gray-50"
                                    onClick={() => handleActiveConversation(conver)}
                                >
                                    <div className='relative flex-shrink-0'>
                                        <img 
                                            className='w-14 h-14 rounded-full object-cover' 
                                            src={otherUser.avatar} 
                                            alt="Avatar" 
                                        />
                                        <span className={`absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white 
                                            ${conver?.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}
                                        ></span>
                                    </div>
                                    <div className='flex-1 ml-3 min-w-0'>
                                        <div className="flex justify-between items-start mb-1">
                                            <p className='font-semibold text-gray-800 truncate'>{otherUser?.fullName}</p>
                                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                                {formatDate(conver.lastMessage?.createdAt)} - {formatTime(conver.lastMessage?.createdAt)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-sm truncate flex-1 ${conver.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                                {conver.lastMessage?.text}
                                            </p>
                                            {!conver.isRead && (
                                                <span className="ml-2 w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                // Chat Window
                <div className="flex flex-col h-full">
                    <div className="p-4 bg-teal-500 text-white flex items-center gap-3">
                        <button onClick={handleBackToList} className="p-1 hover:bg-teal-600 rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        {(() => {
                            const otherUser = activeConversation.participants[0]?.code === user.code 
                                ? activeConversation.participants[1] 
                                : activeConversation.participants[0];
                            
                            return (
                                <div className='flex items-center gap-3 flex-1'>
                                    <img 
                                        src={otherUser.avatar || avatarError} 
                                        alt={otherUser.fullName || 'Unknown'} 
                                        className="w-10 h-10 rounded-full object-cover" 
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{otherUser?.fullName}</h3>
                                        <p className="text-xs text-teal-100">
                                            {activeConversation.status === 'online' ? 'Online' : 'Offline'}
                                        </p>
                                    </div>
                                    <button className="p-2 hover:bg-teal-600 rounded-full">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            );
                        })()}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages?.map((msg, index) => (
                            <div key={index} className={`flex mb-3 ${msg.sender?.code === user.code ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm 
                                    ${msg.sender?.code === user.code
                                        ? 'bg-teal-500 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                    }`}
                                >
                                    <p className="text-sm break-words">{msg.text}</p>
                                    <span className={`block mt-1 text-right text-xs ${msg.sender?.code === user.code ? 'text-teal-100' : 'text-gray-400'}`}>
                                        {formatTime(msg.createdAt)} - {formatTime(msg.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-gray-200">
                        <div className="flex items-end gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                            />
                            <button 
                                onClick={sendMessage}
                                className="p-3 rounded-full text-white bg-teal-500 active:bg-teal-600 shadow-lg flex-shrink-0"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            <DesktopView />
            <MobileView />
        </>
    );
};

export default function ChatManagement() {
    const userId = "admin_user_2025";
    return <Message userId={userId} />;
};