import { useState } from 'react';
import './ChatSidebar.css';

const ChatSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        
        if (!input.trim()) return;

        const newMessages = [...messages, { from: 'user', text: input}];

        setMessages(newMessages);
        setInput('');

        try {
            const response = await fetch('http://localhost:3000/api/chat/ask', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ message: input}),
            });

            const data = await response.json();
            setMessages([...newMessages, { from: 'bot', text: data.reply}]);
        } catch (err) {
            setMessages([...newMessages, { from: 'bot', text: 'Error: Unable to get response'}])
        }
    };

    return (
        <>
        {!isOpen &&
        <button className="chat-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
        }
      <button className="chat-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      <div className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-msg ${msg.from}`}>{msg.text}</div>
          ))}
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
    );
};

export default ChatSidebar;