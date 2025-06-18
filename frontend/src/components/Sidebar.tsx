'use client'

import { useEffect, useState } from 'react'

type User = {
  _id: string
  name: string
  email: string
}

export default function Sidebar() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4000/users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="w-1/4 h-full bg-gray-100 border-r p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user._id}
            className="w-full text-left p-2 rounded hover:bg-gray-200"
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  )
}
