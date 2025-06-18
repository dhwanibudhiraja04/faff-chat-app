'use client'

import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

export default function ChatLayout() {
  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <ChatWindow />
    </div>
  )
}
