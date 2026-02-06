import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { CheckCircle2, XCircle } from 'lucide-react'

export const AuthCallback: React.FC = () => {
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('Verifying identity...')
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
            setMessage('Verified')

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
          setMessage('Verified')

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
        setMessage(err.message || 'Verification failed')

        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <style>{`
        @keyframes faceid-scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes faceid-corners-in {
          0% { opacity: 0; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes faceid-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes faceid-success {
          0% { stroke-dashoffset: 80; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes faceid-shrink {
          0% { transform: scale(1); }
          100% { transform: scale(0.85); }
        }
        @keyframes faceid-fade-up {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .faceid-frame {
          animation: faceid-corners-in 0.5s ease-out forwards;
        }
        .faceid-scan-line {
          animation: faceid-scan 2s ease-in-out infinite;
        }
        .faceid-glow {
          animation: faceid-pulse 2s ease-in-out infinite;
        }
        .faceid-check {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: faceid-success 0.8s ease-out 0.2s forwards;
        }
        .faceid-success-frame {
          animation: faceid-shrink 0.3s ease-out forwards;
        }
        .faceid-label {
          animation: faceid-fade-up 0.4s ease-out 0.3s both;
        }
      `}</style>

      <div className="flex flex-col items-center gap-6">
        {/* Face ID scanning frame */}
        <div className="relative" style={{ width: 160, height: 160 }}>
          {status === 'processing' && (
            <>
              {/* Corner brackets */}
              <svg className="faceid-frame absolute inset-0" width="160" height="160" viewBox="0 0 160 160" fill="none">
                {/* Top-left */}
                <path d="M4 40 L4 12 Q4 4 12 4 L40 4" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-foreground" />
                {/* Top-right */}
                <path d="M120 4 L148 4 Q156 4 156 12 L156 40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-foreground" />
                {/* Bottom-left */}
                <path d="M4 120 L4 148 Q4 156 12 156 L40 156" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-foreground" />
                {/* Bottom-right */}
                <path d="M120 156 L148 156 Q156 156 156 148 L156 120" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-foreground" />
              </svg>

              {/* Scanning line */}
              <div className="absolute inset-x-4 top-0 bottom-0 overflow-hidden">
                <div className="faceid-scan-line absolute inset-x-0 h-[2px]" style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
                  boxShadow: '0 0 20px 4px hsl(var(--primary) / 0.3)',
                }} />
              </div>

              {/* Center icon - shield/lock glyph */}
              <div className="absolute inset-0 flex items-center justify-center faceid-glow">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <circle cx="12" cy="15" r="0.5" fill="currentColor" />
                </svg>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              {/* Shrinking frame */}
              <svg className="faceid-success-frame absolute inset-0" width="160" height="160" viewBox="0 0 160 160" fill="none">
                <path d="M4 40 L4 12 Q4 4 12 4 L40 4" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M120 4 L148 4 Q156 4 156 12 L156 40" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M4 120 L4 148 Q4 156 12 156 L40 156" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M120 156 L148 156 Q156 156 156 148 L156 120" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
              </svg>

              {/* Checkmark that draws in */}
              <svg className="absolute inset-0 flex items-center justify-center" width="160" height="160" viewBox="0 0 160 160" fill="none">
                <path className="faceid-check" d="M55 82 L72 99 L108 63" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}

          {status === 'error' && (
            <>
              <svg className="absolute inset-0" width="160" height="160" viewBox="0 0 160 160" fill="none">
                <path d="M4 40 L4 12 Q4 4 12 4 L40 4" stroke="hsl(var(--destructive))" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M120 4 L148 4 Q156 4 156 12 L156 40" stroke="hsl(var(--destructive))" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M4 120 L4 148 Q4 156 12 156 L40 156" stroke="hsl(var(--destructive))" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M120 156 L148 156 Q156 156 156 148 L156 120" stroke="hsl(var(--destructive))" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <XCircle className="h-14 w-14 text-destructive" />
              </div>
            </>
          )}
        </div>

        {/* Label */}
        <div className="text-center faceid-label">
          <p className={`text-base font-medium ${
            status === 'success' ? 'text-emerald-500' :
            status === 'error' ? 'text-destructive' :
            'text-foreground'
          }`}>
            {message}
          </p>
          {status === 'error' && (
            <p className="text-sm text-muted-foreground mt-1">Redirecting to login...</p>
          )}
        </div>
      </div>
    </div>
  )
}
