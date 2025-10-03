import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from './utils/constants';
import axios from 'axios';
import { createSocketConnection } from './utils/socket';

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.user);
  const userId = currentUser?._id;
  
  // Console log userId and targetUserId
  console.log('userId:', userId);
  console.log('targetUserId:', targetUserId);
  const [targetUser, setTargetUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if(!userId){
        return null;
    }
    const socket = createSocketConnection();
    
    // Join room when component mounts
    socket.emit('join', {
      firstName: currentUser?.firstName || 'Unknown', 
      lastName: currentUser?.lastName || 'User', 
      userId, 
      targetUserId 
    });

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      
      // Determine if this message is from the current user or the target user
      // If the firstName matches current user, it's our message, otherwise it's from target user
      const isFromCurrentUser = data.firstName === currentUser?.firstName;
      const senderId = isFromCurrentUser ? userId : targetUserId;
      
      const newMessage = {
        id: Date.now(),
        senderId: senderId,
        content: data.text,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, currentUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const socket = createSocketConnection();
    socket.emit('sendMessage', { 
      firstName: currentUser?.firstName || 'Unknown', 
      lastName: currentUser?.lastName || 'User', 
      userId, 
      targetUserId, 
      text: newMessage 
    });
    
    // Clear the input immediately for better UX
    setNewMessage('');
  };


  // Fetch target user data
  useEffect(() => {
    const fetchTargetUser = async () => {
      try {
        // This would be a real API call in production
        // const response = await axios.get(`${BASE_URL}/user/${targetUserId}`, { withCredentials: true });
        // setTargetUser(response.data);
        
        // Mock user data for demo
        setTargetUser({
          _id: targetUserId,
          firstName: 'Alex',
          lastName: 'Johnson',
          photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          isOnline: true
        });
        
        // Initialize with empty messages array
        setMessages([]);
        setIsOnline(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    if (targetUserId) {
      fetchTargetUser();
    }
  }, [targetUserId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    const diffTime = today - messageDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays > 1) return messageDate.toLocaleDateString();
    return 'Today';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-gray-500">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">User not found</h2>
          <p className="text-gray-500 mb-4">The user you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/connections')}
            className="btn btn-primary"
          >
            Back to Connections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-base-200">
      {/* Chat Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-base-100 shadow-sm border-b border-base-300 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/connections')}
              className="btn btn-ghost btn-sm"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={targetUser.photoUrl || 'https://via.placeholder.com/40x40?text=U'}
                  alt={targetUser.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-base-100 rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-base-content">
                  {targetUser.firstName} {targetUser.lastName}
                </h2>
                <p className="text-sm text-base-content/70">
                  {isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm">
              📞
            </button>
            <button className="btn btn-ghost btn-sm">
              📹
            </button>
            <button className="btn btn-ghost btn-sm">
              ⋮
            </button>
          </div>
        </div>
      </motion.div>

      {/* Chat Container using DaisyUI chat component */}
      <div className="chat chat-start flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message, index) => {
            const isOwnMessage = message.senderId === currentUser?._id;
            const showDate = index === 0 || 
              formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);

            return (
              <div key={message.id} className="w-full">
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="bg-base-300 text-base-content/70 px-3 py-1 rounded-full text-sm">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}
                >
                  {!isOwnMessage && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={targetUser.photoUrl || 'https://via.placeholder.com/40x40?text=U'}
                          alt={targetUser.firstName}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="chat-header">
                    {!isOwnMessage && (
                      <span className="text-sm opacity-70">{targetUser.firstName}</span>
                    )}
                    <time className="text-xs opacity-50">
                      {formatTime(message.timestamp)}
                    </time>
                  </div>
                  
                  <div className={`chat-bubble ${
                    isOwnMessage 
                      ? 'chat-bubble-primary' 
                      : 'chat-bubble-base-100'
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="chat chat-start"
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={targetUser.photoUrl || 'https://via.placeholder.com/40x40?text=U'}
                  alt={targetUser.firstName}
                />
              </div>
            </div>
            <div className="chat-bubble chat-bubble-base-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input using DaisyUI input group */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-base-100 border-t border-base-300 p-4 mb-20"
      >
        <form onSubmit={handleSendMessage} className="join w-full">
          <button type="button" className="join-item btn btn-ghost">
            📎
          </button>
          <div className="join-item flex-1">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered w-full"
              disabled={isTyping}
            />
          </div>
          <button type="button" className="join-item btn btn-ghost">
            😊
          </button>
          <button 
            type="submit" 
            disabled={!newMessage.trim() || isTyping}
            className="join-item btn btn-primary"
          >
            {isTyping ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Chat;