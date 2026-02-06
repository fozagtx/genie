import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Github } from 'lucide-react'

export const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signInWithGithub, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/terminal')
    }
  }, [user, navigate])

  const handleGithubSignup = async () => {
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
          <h1 className="mb-2 text-4xl font-bold text-foreground">Get started</h1>
          <p className="text-muted-foreground">Create your account to start building with Genie</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              onClick={handleGithubSignup}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating account...
                </>
              ) : (
              <>
                <Github className="mr-2 h-5 w-5" />
                Sign up with GitHub
              </>
              )}
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="font-semibold text-foreground hover:text-foreground/80">
                Sign in
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
