import React, { useEffect, useRef } from 'react'
import { User, Bot } from 'lucide-react'

function MessageList({ messages }) {
  const messagesEndRef = useRef(null)
  const avatarUrl = "/TobiCon.png"
  const error = "Error, please refresh!"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message-container ${message.isUser ? 'user' : 'bot'}`}>
          <div className="message-icon">
            {message.isUser ? (
              <User size={24}/>
            ) : (
              <img src={avatarUrl} alt="Bot avatar" className="avatar-image-small" />
            )}
          </div>
          <div className={`message ${message.error ? 'error' : (message.isUser ? 'user' : 'bot')}`}>
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList