export async function loginUser(email: string, password: string) {
  const res = await fetch('https://backend-shy-star-6918.fly.dev/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  return res.json()
}


export async function signupUser(name: string, email: string, password: string) {
  const res = await fetch('https://backend-shy-star-6918.fly.dev/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Signup failed')
  }

  return res.json()
}
