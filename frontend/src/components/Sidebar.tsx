'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  _id: string
  name: string
  email: string
}

export default function Sidebar({
  onSelectUser,
  selectedUser,
}: {
  onSelectUser: (user: User) => void
  selectedUser: User | null
}) {
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
       const res = await fetch('https://faff-chat-app.onrender.com/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }

    fetchUsers()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.push('/login')
  }

  return (
    <div className="w-1/4 h-full bg-gray-100 border-r p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <button
              key={user._id}
              className={`w-full text-left p-2 rounded ${
                selectedUser?._id === user._id
                  ? 'bg-blue-200'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => onSelectUser(user)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}
