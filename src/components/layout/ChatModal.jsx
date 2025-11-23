import { useState, useRef, useEffect, useContext } from 'react';
import { Send, X, User } from 'lucide-react';
import { UserContext } from '../../contexts/UserContext';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import io from 'socket.io-client';
import profileApi from '../../api/profileApi';
import chatApi from '../../api/chatApi';

const socket = io(process.env.REACT_APP_SOCKET_URL||'http://localhost:5000', {
  transports: ["websocket"],
  withCredentials: true,
});

export default function ChatModal ({ onClose }) {
  const { infoUser, setInfoUser } = useContext(UserContext);
  const [logged, setLogged] = useState(false);
  const [checked, setChecked] = useState(false);

  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState({});

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => scrollToBottom(), [messages]);

  // Load user info
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await profileApi.profile();
        const code = res.user.code || `user${Date.now()}`;
        setUser({
          code,
          fullName: res.user.fullName || 'Unknown',
          avatar: res.user.avatar || `https://api.dicebear.com/8.x/avataaars/svg?seed=${code}`,
        });
        setLogged(true);
      } catch {
        let localUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!localUser.code) {
          const code = Date.now().toString();
          localUser = { code, fullName: 'Unknown', avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${code}` };
          localStorage.setItem('user', JSON.stringify(localUser));
        }
        setUser(localUser);
      } finally {
        setChecked(true);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!checked) return;
    if (logged) setConversationId(infoUser.conversationId || '');
    else setConversationId(localStorage.getItem('conversationId') || '');
  }, [checked, logged, infoUser.conversationId]);

  useEffect(() => {
    if (!checked || !conversationId) return;
    const loadMessages = async () => {
      try {
        const res = await chatApi.getMessages(conversationId);
        setMessages(res.messages || []);
      } catch {
        setMessages([]);
        if (logged) setInfoUser(prev => ({ ...prev, conversationId: '' }));
        else localStorage.removeItem('conversationId');
        setConversationId('');
      }
    };
    loadMessages();
  }, [conversationId, checked]);

  useEffect(() => {
    if (!user.code) return;
    socket.emit('join', user.code);
    socket.on('receiveMessage', msg => setMessages(prev => [...prev, msg]));
    return () => socket.off('receiveMessage');
  }, [user.code]);

  const postConversation = async () => {
    try {
      const sender = user;
      const receiver = { code: 'mid24', fullName: 'FAKER', avatar: 'Azir' };
      const res = await chatApi.postConversation(sender, receiver);
      const newConvId = res.conversation._id;
      if (logged) setInfoUser(prev => ({ ...prev, conversationId: newConvId }));
      else localStorage.setItem('conversationId', newConvId);
      setConversationId(newConvId);
      return newConvId;
    } catch {
      return null;
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    let convId = conversationId || await postConversation();
    if (!convId) return;

    const message = {
      conversationId: convId,
      sender: user,
      receiver: { code: 'mid24', fullName: 'FAKER', avatar: 'Azir' },
      text,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setText('');
    socket.emit('sendMessage', message);

    try { await chatApi.postMessage(message); }
    catch {
      setMessages(prev => prev.filter(m => m !== message));
      if (logged) setInfoUser(prev => ({ ...prev, conversationId: '' }));
      else localStorage.removeItem('conversationId');
      setConversationId('');
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-[95%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
    h-[450px] sm:h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-300">

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
          <div key={idx} className={`flex ${chat.sender?.code === user.code ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-2 sm:p-3 rounded-xl shadow-md text-sm sm:text-base 
              ${chat.sender?.code === user.code ? 'bg-teal-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'}`}>
              <p>{chat.text}</p>
              <span className={`block mt-1 text-xs sm:text-sm ${chat.sender?.code === user.code ? 'text-teal-200 text-right ' : 'text-gray-400 text-left'}`}>
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
          className="flex-1 p-2 sm:p-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
        <button onClick={handleSend} className="p-2 sm:p-2.5 rounded-full bg-brand hover:bg-brand-hover text-white transition-all">
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
