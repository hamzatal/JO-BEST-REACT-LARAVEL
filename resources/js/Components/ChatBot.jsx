import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, RefreshCcw, Send, X } from 'lucide-react';
import axios from 'axios';

const ChatBot = ({ isChatOpen, toggleChat, resetChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/chatbot', {
        message: userMessage,
      });
      const botMessage = response.data.response;
      setMessages((prev) => [
        ...prev,
        {
          text: botMessage,
          sender: 'bot',
          botName: 'JO BEST AI ASSISTANT',
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, something went wrong. Please try again.',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Allow the user to send the message on Shift + Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatMessage = (messageText) => {
    // Replace newline characters with <br /> to display line breaks
    return messageText.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isChatOpen && (
        <div className="absolute bottom-24 right-0 w-96 h-[500px] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out bg-gray-800 border border-gray-700">
          <div className="flex justify-between items-center p-4 border-b bg-gray-900 border-gray-700">
            <div className="flex items-center">
              <MessageCircle className="mr-2 text-red-500" />
              <h2 className="text-xl font-bold">JO BEST AI ASSISTANT</h2>
            </div>
            {/* <button
              onClick={resetChat}
              className="p-2 rounded-full transition-all bg-gray-700 hover:bg-gray-600"
            >
              <RefreshCcw size={20} />
            </button> */}
          </div>

          <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-custom">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    msg.sender === 'user' ? 'bg-red-600' : 'bg-gray-700'
                  } break-words whitespace-pre-wrap`}
                >
                  {formatMessage(msg.text)}
                  {msg.botName && (
                    <div className="text-xs mt-1 opacity-70">
                      - {msg.botName}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-900 border-gray-700"
          >
            <div className="relative flex items-center space-x-2">
              <textarea
                rows={2} // You can adjust the number of rows to show multiple lines
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow p-2 pr-12 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 resize-vertical"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`absolute right-2 bottom-2 p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors ${
                  isLoading ? 'opacity-50' : ''
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none bg-red-600 hover:bg-red-700"
      >
        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatBot;
