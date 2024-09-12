import React from 'react'
import { ThemeProvider } from './ThemeContext'
import TobiChat from './TobiChat'

function App() {
  return (
    <ThemeProvider>
      <TobiChat />
    </ThemeProvider>
  )
}

export default App
