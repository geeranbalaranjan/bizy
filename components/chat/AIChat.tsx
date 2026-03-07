'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import type { ChatMessage } from '@/types'
import { ChatMessageBubble } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { cn } from '@/lib/utils'

interface AIChatProps {
  chatHistory: ChatMessage[]
  onSendMessage: (message: string) => void
}

export function AIChat({ chatHistory, onSendMessage }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 transition-all duration-300',
          isOpen ? 'h-[480px] w-[380px]' : 'h-auto w-auto'
        )}
      >
        {isOpen ? (
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 bg-brand-primary px-4 py-3">
              <h3 className="font-heading font-semibold text-white">AI Assistant</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {chatHistory.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  Start a conversation with the AI assistant.
                </p>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((message) => (
                    <ChatMessageBubble key={message.id} message={message} />
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 p-4">
              <ChatInput onSend={onSendMessage} />
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Open chat"
          >
            <MessageCircle className="h-7 w-7" />
          </button>
        )}
      </div>
    </>
  )
}
