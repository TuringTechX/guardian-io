import React, { useState, useEffect } from 'react';
import { useChatData } from '../../hooks/useChatData';

export const Chat: React.FC = () => {
  const { messages, sendMessage } = useChatData();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="chat">
      <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
      <div className="chat-box bg-white dark:bg-gray-800 border p-4 max-h-80 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="message my-2">
            <strong>{msg.sender}:</strong> <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="border p-2 w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4">
          Send
        </button>
      </form>
    </div>
  );
};
