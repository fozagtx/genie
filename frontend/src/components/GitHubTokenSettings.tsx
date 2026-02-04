import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Github, Trash2 } from 'lucide-react';

export const GitHubTokenSettings: React.FC = () => {
  const { user } = useAuthContext();
  const [token, setToken] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.user_metadata?.github_token) {
      setToken(user.user_metadata.github_token);
    }
  }, [user]);

  const handleSave = async () => {
    if (!token || token.length < 10) {
      setError('Please enter a valid GitHub token');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { github_token: token },
      });

      if (updateError) throw updateError;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save token');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await supabase.auth.updateUser({
        data: { github_token: null },
      });
      setToken('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Github className="h-4 w-4 text-foreground" />
        <h3 className="text-base font-semibold text-foreground">GitHub Integration</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Connect your GitHub account to enable repository operations through chat.
      </p>

      <div className="space-y-2">
        <Label htmlFor="github-token" className="text-sm">GitHub Personal Access Token</Label>
        <Input
          id="github-token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
        />
        <p className="text-xs text-muted-foreground">
          Generate a token at{' '}
          <a
            href="https://github.com/settings/tokens/new?scopes=repo,user:email"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub Settings
          </a>
          . Required scopes: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">repo</code>,{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">user:email</code>
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}
      {saved && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400">
          GitHub token saved successfully
        </div>
      )}

      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} disabled={loading || !token}>
          {loading ? 'Saving...' : 'Save Token'}
        </Button>
        {token && (
          <Button variant="outline" size="sm" onClick={handleRemove} disabled={loading}>
            <Trash2 className="h-3 w-3 mr-1" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
