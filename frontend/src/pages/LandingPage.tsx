import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { ArrowRight } from 'lucide-react'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleGetStarted = () => {
    navigate(user ? '/terminal' : '/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-rose-50">
      {/* Minimal header */}
      <header className="flex w-full items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <img src="/lo.png" alt="Genie" className="h-7 w-7" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Genie
          </span>
        </div>
        <button
          onClick={() => navigate(user ? '/terminal' : '/login')}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {user ? 'Open app' : 'Log in'}
        </button>
      </header>

      {/* Centered hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Code generation,{' '}
            <span className="font-[Playfair_Display] italic">made simple.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            AI-powered agents that build, review, and ship code — all in one workspace.
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              className="rounded-full px-8 py-3 text-base"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
