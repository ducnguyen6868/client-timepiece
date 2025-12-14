import { useState, useRef, useEffect, useContext } from 'react';
import { Send, X, User } from 'lucide-react';
import { UserContext } from '../../contexts/UserContext';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import io from 'socket.io-client';
import chatApi from '../../api/chatApi';
import Notification from '../common/Notification';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
  transports: ["websocket"],
  withCredentials: true,
});

export default function ChatModal({ onClose }) {

  //localStorage.removeItem('conversationId');
  const { infoUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState({});

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if (!infoUser || infoUser.code === '') {
      const conversationId = localStorage.getItem('conversationId');
      const newUser = {
        code: 'CUS_' + Date.now(),
        fullName: 'CUS_' + Math.ceil(Math.random() * 100),
        avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=KAKA`,
        conversationId: conversationId
      }
      setUser(newUser);
    } else {
      const newUser = {
        code: infoUser.code,
        fullName: infoUser.fullName,
        avatar: infoUser.avatar,
        conversationId: infoUser.conversationId,
      }
      setUser(newUser);
    }
  }, [infoUser]);

  useEffect(() => {
    if (!user.conversationId) return;
    const conversationId = user.conversationId;
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await chatApi.getMessages(conversationId);
        setMessages(response.messages);
      } catch (err) {
        setShow(true);
        setType('error');
        setMessage(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      };
    };
    getMessages();
  }, [user.conversationId]);

  useEffect(() => {
    if (!user.code) return;
    socket.emit('join', user.code);
    socket.on('receiveMessage', msg => setMessages(prev => [...prev, msg]));
    return () => socket.off('receiveMessage');
  }, [user.code]);

  const handleSend = async () => {

    if (!text.trim()) return;

    const receiver = {
      code: 'mid24',
      fullName: 'FAKER',
      avatar: 'Azir'
    };

    const message = {
      conversationId: user.conversationId,
      sender: user,
      receiver: receiver,
      text,
      createdAt: new Date()
    };

    setMessages(prev => [...prev, message]);
    setText('');
    socket.emit('sendMessage', message);

    try {
      setLoading(true);
      let conversationId;
      if (!user.conversationId) {
        const participants = [user, receiver];
        const lastMessage = {
          text,
          sender: user.fullName,
          createdAt: new Date()
        }
        const response = await chatApi.postConversation(participants, lastMessage);
        conversationId = response.conversationId;
        setUser(prev=>({...prev , conversationId:response.conversationId}));
        localStorage.setItem('conversationId', conversationId);
      };

      const newConversationId = user.conversationId ? user.conversationId : conversationId;

      const newMessage = {
        conversationId: newConversationId,
        sender: user,
        receiver: receiver,
        text,
        createdAt: new Date()
      }
      await chatApi.postMessage(newMessage);
    } catch (err) {
      setShow(true);
      setType('error');
      setMessage(err.response?.data?.message || err.message);
      localStorage.removeItem('conversationId');
    } finally {
      setLoading(false);
    };
  };

  return (
    <>
      <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
      <div className="fixed bottom-20 right-0 md:right-10 w-full p-1  max-w-[600px] h-[30rem] rounded-xl shadow-2xl flex flex-col z-10 ">
        {/* Header */}
        <div className="p-3 flex justify-between items-center rounded-t-xl bg-brand hover:bg-brand-hover text-white">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 p-1 bg-white rounded-full text-teal-600" />
            <span className="font-semibold text-sm sm:text-base">Live Support</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-teal-700 transition" title="Close Chat">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 bg-gray-50">
          {messages.map((chat, idx) => (
            <div key={idx} className={`flex ${chat.receiver?.code === 'mid24' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-2 sm:p-3 rounded-xl shadow-md text-sm sm:text-base 
              ${chat.receiver?.code === 'mid24' ? 'bg-teal-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'}`}>
                <p>{chat.text}</p>
                <span className={`block mt-1 text-xs sm:text-sm ${chat.receiver?.code === 'mid24' ? 'text-teal-200 text-right ' : 'text-gray-400 text-left'}`}>
                  {formatDate(chat.createdAt)} • {formatTime(chat.createdAt)}
                </span>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 sm:p-3 border-t border-gray-200 bg-white flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 sm:p-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
          <button onClick={handleSend}
            className="p-2 sm:p-2.5 rounded-full bg-brand hover:bg-brand-hover
         text-white transition-all disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={loading}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
};
