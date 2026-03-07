'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (trimmed) {
      onSend(trimmed)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
      />
      <Button type="submit" size="icon" variant="accent" disabled={!message.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
