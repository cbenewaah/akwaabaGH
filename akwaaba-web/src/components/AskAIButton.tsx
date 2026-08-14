import { useLocation, useNavigate } from 'react-router-dom'

export function AskAIButton() {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname === '/assistant') return null

  return (
    <button
      onClick={() => navigate('/assistant')}
      aria-label="Ask AI assistant"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ghana-green text-2xl font-bold text-white shadow-[0_8px_22px_rgba(0,107,63,0.45)] hover:bg-ghana-green-deep hover:scale-105 transition-all"
    >
      ✦
    </button>
  )
}
