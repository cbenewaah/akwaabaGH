import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { AskAIButton } from './AskAIButton'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-base text-text-3 font-body">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AskAIButton />
    </div>
  )
}
