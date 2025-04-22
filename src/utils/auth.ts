const minutes = (minutes: number) => minutes * 60 * 1000
const SESSION_DURATION = minutes(60)

export function register(email: string, password: string) {
  localStorage.setItem(
    'user',
    JSON.stringify({ email, password })
  )
}

export function login(email: string, password: string) {
  const user = localStorage.getItem('user')
  if (!user) return false

  const parsed = JSON.parse(user)
  if (parsed.email === email && parsed.password === password) {
    localStorage.setItem(
      'session',
      JSON.stringify({
        expiresAt: Date.now() + SESSION_DURATION,
      })
    )
    return true
  }

  return false
}

export function isAuthenticated() {
  const session = localStorage.getItem('session')
  if (!session) return false

  const { expiresAt } = JSON.parse(session)
  const isValid = Date.now() < expiresAt

  if (!isValid) logout()
  return isValid
}

export function logout() {
  localStorage.removeItem('session')
}
