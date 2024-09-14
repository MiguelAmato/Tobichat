import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import TobiCon from '../../public/TobiCon.png'

/*
	TobiChat.jsx
	
	Componente del chat principal, aqui se produce la llamada a la API de Hugging Face y se 
	le envia a los componentes de los mensajes la informacion de la llamada a la API para 
	mostrarlos en pantalla hola

*/

function TobiChat() {
  const OK_API = 200
  const API_KEY = "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"
  const ERROR_MSG = "Error, please refresh!"
  const [messages, setMessages] = useState([])
  const avatarUrl = "/TobiCon.png"

  let error = 0

  const handleSendMessage = async (message) => {
    setMessages(prev => [...prev, { text: message, isUser: true, error: false}])
    
    const response = await sendMessageToAPI(message)
    setMessages(prev => [...prev, { text: response, isUser: false, error: (response == ERROR_MSG ? true : false)}])
  }

  /*
    query: llamada a la API, hacemos fetch a la API de Hugging Face con nuestra API_KEY autorizada 
    generada por la web de Hugging Face, verificamos que la respose de la API haya sido correcta
    y si lo es, hacemos que la response sea un json que nos dará un array con un json, en ese json
    tiene como unica clave "generated_text" que es la que contiene la respuesta al input que recibe
    la API
  */
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
    // Si la query no tiene de codigo de salida 200, significa que ha habido un error
    // volvemos a lanzar la query hasta que de error.
		if  (response.status != OK_API) {
      if (error < 5) {
        error++
        query(data)
      } else {
        error = 0
        return `${ERROR_MSG}`
      }
    } 
		const result = await response.json()
		return (result[0].generated_text)
	};

  /*
	sendMessageToAPI: metodo que recibe el input del usuario y llama a la API con el mismo para 
  generar una respuesta.
  */
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
            <img src = {TobiCon} alt = "Bot avatar" className = "avatar-image" />
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