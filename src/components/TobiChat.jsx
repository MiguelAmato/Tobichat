import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { API_KEY } from '../Utils'
import { Bot } from 'lucide-react'

/*
	TobiChat.jsx
	
	Componente del chat principal, aqui se produce la llamada a la API de Hugging Face y se 
	le envia a los componentes de los mensajes la informacion de la llamada a la API para 
	mostrarlos en pantalla

*/

function TobiChat() {
  const [messages, setMessages] = useState([])
  const avatarUrl = "/public/TobiCon.png"

  const handleSendMessage = async (message) => {
    setMessages(prev => [...prev, { text: message, isUser: true }])
    
    const response = await sendMessageToAPI(message)
    setMessages(prev => [...prev, { text: response, isUser: false }])
  }

	const query = async (data) => {
		const response = await fetch(
			"https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
			{
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
			}
		);
		
		
		const result = await response.json();
		return (result[0].generated_text);
	};

	// sendMessageToAPI: 
	const sendMessageToAPI = async (message) => {
		return query(message);
	}
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TobiChat</h1>
      </header>
      <div className="main-content">
        <div className="avatar-container">
          <div className="avatar">
            <img src = {avatarUrl} alt = "Bot avatar" className = "avatar-image" />
          </div>
        </div>
        <div className="chat-container">
          <div className="chat-header">
            <h2>Chat</h2>
            <ThemeToggle />
          </div>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

export default TobiChat