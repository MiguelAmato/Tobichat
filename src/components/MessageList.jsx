import React, { useEffect, useRef } from 'react'

function MessageList({ messages }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
          {message.text}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList