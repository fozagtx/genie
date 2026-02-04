import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Github } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signInWithGithub, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const returnUrl = sessionStorage.getItem('telegram_auth_return_url')
      if (returnUrl) {
        sessionStorage.removeItem('telegram_auth_return_url')
        navigate(returnUrl)
      } else {
        navigate('/terminal')
      }
    }
  }, [user, navigate])

  const handleGithubLogin = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGithub()
    } catch (err: any) {
      setError(err.message || 'OAuth authentication failed.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Sign in to continue to Genie AI</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button className="w-full" size="lg" onClick={handleGithubLogin} disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  <Github className="mr-2 h-5 w-5" />
                  Continue with GitHub
                </>
              )}
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              By signing in, you agree to our Terms of Service
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
