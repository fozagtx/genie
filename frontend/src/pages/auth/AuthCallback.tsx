import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Card, CardContent } from '../../components/ui/card'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

export const AuthCallback: React.FC = () => {
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('Verifying authentication...')
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const error = hashParams.get('error')
        const errorDescription = hashParams.get('error_description')

        if (error) {
          throw new Error(errorDescription || 'OAuth authentication failed')
        }

        if (accessToken) {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          })

          if (sessionError) throw sessionError

          if (data.session) {
            setStatus('success')
            setMessage('Authentication successful! Redirecting...')

            const returnUrl = sessionStorage.getItem('telegram_auth_return_url');
            setTimeout(() => {
              if (returnUrl) {
                sessionStorage.removeItem('telegram_auth_return_url');
                navigate(returnUrl);
              } else {
                navigate('/terminal');
              }
            }, 1500)
          } else {
            throw new Error('Failed to establish session')
          }
        } else {
          const { data, error: sessionError } = await supabase.auth.getSession()

          if (sessionError || !data.session) {
            throw new Error('No valid session found')
          }

          setStatus('success')
          setMessage('Session restored! Redirecting...')

          const returnUrl = sessionStorage.getItem('telegram_auth_return_url');
          setTimeout(() => {
            if (returnUrl) {
              sessionStorage.removeItem('telegram_auth_return_url');
              navigate(returnUrl);
            } else {
              navigate('/terminal');
            }
          }, 1500)
        }
      } catch (err: any) {
        console.error('Auth callback error:', err)
        setStatus('error')
        setMessage(err.message || 'Authentication failed')

        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          {status === 'processing' && (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-foreground font-medium">{message}</p>
              <div className="flex justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]"></span>
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <p className="text-emerald-400 font-medium">{message}</p>
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full animate-[progressFill_1.5s_ease-out_forwards]"></div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="h-12 w-12 text-destructive mx-auto" />
              <p className="text-destructive font-medium">{message}</p>
              <p className="text-sm text-muted-foreground">Redirecting to login...</p>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              OAuth 2.0 | Status: {status.toUpperCase()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
