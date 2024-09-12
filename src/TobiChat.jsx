import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

function TobiChat() {
  const [messages, setMessages] = useState([])

  const API_KEY = "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"

  const handleSendMessage = async (message) => {
    setMessages(prev => [...prev, { text: message, isUser: true }])
    
    // Simulated API call
    const response = await sendMessageToAPI(message)
    setMessages(prev => [...prev, { text: response, isUser: false }])
  }
 
  /*
  async function query(data) {
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
	// 503
	console.log(response);
	const result = await response.json();
	return result[0].generated_text;
}
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
		console.log(response);
		
		const result = await response.json();
		return (result[0].generated_text);
	};


	// Simulated function for API call
	const sendMessageToAPI = async (message) => {
		return query(message);
	}
  

  return (
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