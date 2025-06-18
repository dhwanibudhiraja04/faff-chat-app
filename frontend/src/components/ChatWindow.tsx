/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import dynamic from 'next/dynamic'

const Picker = dynamic(() => import('@emoji-mart/react'), { ssr: false }) as any

type User = {
  _id: string
  name: string
  email: string
}

type Message = {
  _id?: string
  senderId: string
  receiverId: string
  message: string
  createdAt?: string
}

export default function ChatWindow({ selectedUser }: { selectedUser: User | null }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const typingTimeout = useRef<any>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || ''
    const userId = localStorage.getItem('userId')
    setCurrentUserId(userId)

    const s = io('https://faff-chat-app.onrender.com', {
      auth: { token },
      withCredentials: true,
      autoConnect: true,
    })

    socketRef.current = s

    s.on('connect', () => setIsConnected(true))
    s.on('disconnect', () => setIsConnected(false))

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!selectedUser || !socketRef.current) return

    const fetchMessages = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(`https://faff-chat-app.onrender.com/messages?userId=${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setMessages(data.reverse())
    }

    fetchMessages()

    socketRef.current.on('message', (msg: Message) => {
      if (msg.senderId === selectedUser._id || msg.receiverId === selectedUser._id) {
        setMessages(prev => [...prev, msg])
      }
    })

    socketRef.current.on('typing', (data) => {
      if (data.senderId === selectedUser._id) setIsTyping(true)
    })

    socketRef.current.on('stopTyping', (data) => {
      if (data.senderId === selectedUser._id) setIsTyping(false)
    })

    return () => {
      socketRef.current?.off('message')
      socketRef.current?.off('typing')
      socketRef.current?.off('stopTyping')
    }
  }, [selectedUser])

  const loadOlderMessages = async () => {
    if (!selectedUser || !messages.length || isLoading) return
    setIsLoading(true)

    const token = localStorage.getItem('token')
    const oldest = messages[0].createdAt

    try {
      const res = await fetch(
        `https://faff-chat-app.onrender.com/messages?userId=${selectedUser._id}&before=${oldest}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()

      if (data.length === 0) setHasMore(false)
      else setMessages(prev => [...data.reverse(), ...prev])
    } catch (err) {
      console.error('Failed to load older messages', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    if (scrollTop === 0 && hasMore && !isLoading) {
      loadOlderMessages()
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUserId || !selectedUser || !socketRef.current) return

    const msg: Message = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message: newMessage.trim(),
    }

    socketRef.current.emit('message', msg)
    setMessages(prev => [...prev, msg])
    setNewMessage('')
    setShowEmojiPicker(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  if (!selectedUser) {
    return (
      <div className="flex-1 h-full flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    )
  }

  return (
    <div className="flex-1 h-full flex flex-col relative">
      {!isConnected && (
        <div className="bg-red-500 text-white text-sm text-center py-1">
          Reconnecting...
        </div>
      )}

      <div className="border-b p-4 font-semibold">{selectedUser.name}</div>

      <div
        ref={messageBoxRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 bg-white space-y-2"
      >
        {messages.map((msg, idx) => {
          const isSent = msg.senderId === currentUserId
          const time = msg.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''

          return (
            <div
              key={idx}
              className={`flex flex-col max-w-xs ${isSent ? 'ml-auto items-end' : 'items-start'}`}
            >
              <div className={`p-2 rounded-lg text-sm ${isSent ? 'bg-green-200' : 'bg-blue-100'}`}>
                {msg.message}
              </div>
              <div className="text-xs text-gray-400 mt-1">{time}</div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {isTyping && (
        <div className="text-sm text-gray-500 px-4 pb-2 italic">
          {selectedUser?.name} is typing...
        </div>
      )}

      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-50">
          <Picker
            onEmojiSelect={(emoji: any) =>
              setNewMessage(prev => prev + (emoji.native || emoji.shortcodes || ''))
            }
            theme="light"
            emojiSize={20}
            maxFrequentRows={0}
            previewPosition="none"
          />
        </div>
      )}

      <div className="border-t p-4 flex gap-2 relative">
        <button
          className="text-2xl px-2"
          onClick={() => setShowEmojiPicker(prev => !prev)}
        >
          😊
        </button>
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value)

            if (currentUserId && selectedUser && socketRef.current) {
              socketRef.current.emit('typing', {
                senderId: currentUserId,
                receiverId: selectedUser._id,
              })

              if (typingTimeout.current) clearTimeout(typingTimeout.current)

              typingTimeout.current = setTimeout(() => {
                socketRef.current?.emit('stopTyping', {
                  senderId: currentUserId,
                  receiverId: selectedUser._id,
                })
              }, 1000)
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )
}
