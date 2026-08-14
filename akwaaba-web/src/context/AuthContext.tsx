import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface User {
  name: string
  email: string
}

interface StoredUser extends User {
  password: string
}

interface AuthContextValue {
  user: User | null
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  signIn: (email: string, password: string) => { ok: boolean; error?: string }
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const USERS_KEY = 'akwaaba_users'
const SESSION_KEY = 'akwaaba_session'

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        // ignore corrupt session
      }
    }
  }, [])

  function signUp(name: string, email: string, password: string) {
    const users = loadUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with that email already exists.' }
    }
    const newUser: StoredUser = { name, email, password }
    saveUsers([...users, newUser])
    const session = { name, email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  function signIn(email: string, password: string) {
    const users = loadUsers()
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!match) {
      return { ok: false, error: 'Incorrect email or password.' }
    }
    const session = { name: match.name, email: match.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  function signOut() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
