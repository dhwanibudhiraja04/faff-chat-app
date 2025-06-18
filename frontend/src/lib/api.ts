export async function loginUser(name: string, email: string) {
  const res = await fetch('https://backend-shy-star-6918.fly.dev/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Login failed')
  }

  return res.json()
}
