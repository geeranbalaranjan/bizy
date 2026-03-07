'use client'

import type { ChatMessage as ChatMessageType } from '@/types'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-4 py-2',
          isUser
            ? 'bg-brand-accent text-white'
            : 'bg-gray-100 text-brand-primary'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={cn(
            'mt-1 text-xs',
            isUser ? 'text-white/80' : 'text-gray-500'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
