'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signupUser, loginUser } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleToggle = () => {
    setIsLogin(!isLogin)
    setForm({ name: '', email: '', password: '' })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      let res
      if (isLogin) {
        res = await loginUser(form.email, form.password)
      } else {
        res = await signupUser(form.name, form.email, form.password)
      }

      localStorage.setItem('token', res.token)
      router.push('/chat')
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message)
  }
}

  }

  return (
    <Card className="w-full max-w-md mx-auto mt-20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {isLogin ? 'Login' : 'Sign Up'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleToggle}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
