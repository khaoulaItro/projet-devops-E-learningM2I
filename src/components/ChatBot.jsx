import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SendIcon from '@mui/icons-material/Send';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(''); // Effacer le champ immédiatement
    setConversationStarted(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        width: '100%',
      }}
    >
      <IconButton
        onClick={toggleDarkMode}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        <Brightness4Icon />
      </IconButton>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <ChatBubbleOutlineIcon sx={{ fontSize: '50px', color: '#3f51b5' }} />
        <Box sx={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold', color: '#3f51b5' }}>
          Bonjour, comment puis-je vous aider ?{' '}
          <span role="img" aria-label="help" style={{ fontSize: '22px' }}>
            🙋‍♂👋
          </span>
        </Box>
      </Box>

      {conversationStarted && (
        <Box
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
            borderRadius: '4px',
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
              <strong style={{ color: msg.sender === 'user' ? '#3f51b5' : '#f44336' }}>
                {msg.sender === 'user' ? 'Vous' : 'Bot'}:
              </strong>{' '}
              {msg.text}
            </div>
          ))}
        </Box>
      )}

      <form
        onSubmit={handleSend}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tapez votre message..."
          required
          style={{
            flex: 1,
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid rgba(0,0,0,0.2)',
            backgroundColor: isDarkMode ? '#555' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#3f51b5',
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <SendIcon />
        </button>
      </form>
    </Box>
  );
};

export default ChatBot;