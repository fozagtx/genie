import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, CheckCircle2, XCircle, Send } from 'lucide-react';

export default function TelegramAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Connecting your Telegram account...');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    completeAuth();
  }, []);

  const addLog = (log: string) => {
    setLogs(prev => [...prev, log]);
  };

  const completeAuth = async () => {
    try {
      addLog('Initializing Telegram authentication...');

      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        addLog('ERROR: No authentication token found');
        setStatus('error');
        setMessage('Invalid authentication link. Please try again from Telegram.');
        return;
      }

      addLog(`Token received: ${token.substring(0, 8)}...`);
      addLog('Verifying user session...');

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        addLog('No active session detected');
        addLog('Redirecting to login...');
        const returnUrl = `/telegram-auth?token=${token}`;
        sessionStorage.setItem('telegram_auth_return_url', returnUrl);
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      addLog('Session verified');
      addLog('Establishing connection to API...');
      setMessage('Linking your Telegram account...');

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      addLog(`API endpoint: ${apiUrl}`);

      const response = await fetch(
        `${apiUrl}/api/telegram/complete-auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ token }),
        }
      );

      addLog(`Response status: ${response.status}`);

      if (!response.ok) {
        const text = await response.text();
        addLog(`ERROR: ${text.substring(0, 100)}`);
        throw new Error(`API returned ${response.status}: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (!data.success) {
        addLog(`ERROR: ${data.error}`);
        throw new Error(data.error || 'Failed to link Telegram account');
      }

      addLog('Authentication successful!');
      addLog(`Telegram ID: ${data.data?.telegramUser?.telegram_id}`);
      addLog(`Username: @${data.data?.telegramUser?.username || 'N/A'}`);
      addLog('Account linking complete');

      setStatus('success');
      setMessage('Successfully linked your Telegram account!');

      setTimeout(() => {
        navigate('/terminal');
      }, 3000);

    } catch (error: any) {
      console.error('Telegram auth error:', error);
      addLog(`ERROR: ${error.message}`);
      setStatus('error');
      setMessage(error.message || 'Failed to complete authentication');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-8 pb-8">
          {/* Header */}
          <div className="text-center mb-6">
            <Send className="h-10 w-10 text-blue-400 mx-auto mb-3" />
            <h1 className="text-xl font-semibold text-foreground">Telegram Authentication</h1>
          </div>

          {/* Status */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin text-blue-400" />}
              {status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              {status === 'error' && <XCircle className="h-4 w-4 text-destructive" />}
              <span className={`text-sm font-medium ${
                status === 'loading' ? 'text-blue-400' :
                status === 'success' ? 'text-emerald-400' : 'text-destructive'
              }`}>
                {status.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>

          {/* Logs */}
          <div className="rounded-lg bg-muted/50 border border-border p-3 mb-6 max-h-48 overflow-y-auto">
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="text-xs text-muted-foreground font-mono">
                  {log}
                </div>
              ))}
              {status === 'loading' && (
                <div className="text-xs text-blue-400 font-mono animate-pulse">
                  Processing...
                </div>
              )}
            </div>
          </div>

          {/* Success */}
          {status === 'success' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                <p className="text-sm text-emerald-400">
                  Telegram account successfully linked to Genie AI
                </p>
              </div>
              <Button className="w-full" onClick={() => navigate('/terminal')}>
                Continue to Terminal
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Redirecting automatically in 3 seconds...
              </p>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="space-y-3">
              <Button className="w-full" onClick={() => window.location.reload()}>
                Retry Authentication
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/terminal')}>
                Return to Terminal
              </Button>
            </div>
          )}

          {/* Loading */}
          {status === 'loading' && (
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
