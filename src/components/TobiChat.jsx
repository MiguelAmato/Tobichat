import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { API_KEY } from '../Utils'


/*
	TobiChat.jsx
	
	Componente del chat principal, aqui se produce la llamada a la API de Hugging Face y se 
	le envia a los componentes de los mensajes la informacion de la llamada a la API para 
	mostrarlos en pantalla

*/

function TobiChat() {
  const [messages, setMessages] = useState([])

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
		console.log(response);
		
		const result = await response.json();
		return (result[0].generated_text);
	};

	// sendMessageToAPI: 
	const sendMessageToAPI = async (message) => {
		return query(message);
	}
  

  return (
	/*
	chat-container: Componente que contiene todos los elementos del chat, tanto header, lista de mensajes y el input
	chat-header: Contiene el titulo del chat y el boton del cambio de modo claro a modo oscuro 
	*/
    <div className="chat-container">  
      <header className="chat-header">
        <h1>Tobichat</h1>
        <ThemeToggle />
      </header>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default TobiChat