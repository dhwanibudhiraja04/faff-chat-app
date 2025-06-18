'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<null | {
    _id: string
    name: string
    email: string
  }>(null)

  return (
    <div className="h-screen w-full flex">
      <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  )
}
