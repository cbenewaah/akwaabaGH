import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    const result = signUp(name, email, password)
    if (result.ok) {
      navigate('/', { replace: true })
    } else {
      setError(result.error ?? 'Something went wrong.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1.5 font-display text-2xl font-extrabold text-white">
            <span className="text-ghana-green">★</span>AkwaabaGH
          </Link>
          <div className="mt-3 font-display text-2xl font-extrabold text-white">Create your account</div>
          <div className="mt-1.5 text-sm text-text-5">Save destinations, build a trip, and get personalized recommendations.</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-hairline bg-surface p-6 sm:p-7 flex flex-col gap-4"
        >
          {error && (
            <div className="rounded-lg bg-ghana-red/15 border border-ghana-red/40 px-3.5 py-2.5 text-sm text-red-200">
              {error}
            </div>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-text-4">Full name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ama Owusu"
              className="rounded-lg border border-hairline-strong bg-surface-deep px-3.5 py-2.5 text-sm text-white placeholder:text-text-6 outline-none focus:border-ghana-green"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-text-4">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-hairline-strong bg-surface-deep px-3.5 py-2.5 text-sm text-white placeholder:text-text-6 outline-none focus:border-ghana-green"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-text-4">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="rounded-lg border border-hairline-strong bg-surface-deep px-3.5 py-2.5 text-sm text-white placeholder:text-text-6 outline-none focus:border-ghana-green"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-text-4">Confirm password</span>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-hairline-strong bg-surface-deep px-3.5 py-2.5 text-sm text-white placeholder:text-text-6 outline-none focus:border-ghana-green"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-ghana-red py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            Create account
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-text-5">
          Already have an account?{' '}
          <Link to="/sign-in" className="font-semibold text-ghana-green hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
