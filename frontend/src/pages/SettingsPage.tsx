import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { useAuth } from '../hooks/useAuth'
import { useUIStore } from '../stores/uiStore'
import apiClient from '../services/apiClient'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'

export const SettingsPage: React.FC = () => {
  const { user } = useAuth()
  const { showToast } = useUIStore()
  const [apiKey, setApiKey] = useState('')
  const [hasApiKey, setHasApiKey] = useState(false)
  const [preferences, setPreferences] = useState({
    autoScrollChat: true,
    soundEffects: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getSettings()

      if (response.data) {
        setHasApiKey(response.data.hasApiKey || false)
        setPreferences({
          autoScrollChat: response.data.autoScrollChat ?? true,
          soundEffects: response.data.soundEffects ?? false,
        })
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) return

    try {
      await apiClient.updateApiKey(apiKey)
      setHasApiKey(true)
      setApiKey('')
      showToast('success', 'API key saved successfully')
    } catch (error: any) {
      showToast('error', error.message || 'Failed to save API key')
    }
  }

  const handlePreferenceChange = async (key: keyof typeof preferences) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
    }

    setPreferences(newPreferences)

    try {
      await apiClient.updatePreferences({ [key]: newPreferences[key] })
      showToast('success', 'Preferences updated')
    } catch (error: any) {
      setPreferences(preferences)
      showToast('error', error.message || 'Failed to update preferences')
    }
  }

  const handleClearData = async () => {
    const confirmed = window.confirm(
      'Warning: This will delete all chat history, generation history, saved preferences, and API keys. This action cannot be undone. Continue?'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      await apiClient.deleteSettings();
      localStorage.clear();
      showToast('success', 'All data cleared successfully. Reloading...');
      setTimeout(() => { window.location.reload(); }, 1500);
    } catch (error: any) {
      showToast('error', error.message || 'Failed to clear data');
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const firstConfirm = window.confirm(
      'DANGER: This will permanently delete your entire account and all associated data. This action is irreversible. Do you want to proceed?'
    );

    if (!firstConfirm) return;

    const confirmation = window.prompt(
      'To confirm account deletion, please type exactly:\n\nDELETE MY ACCOUNT\n\n(Case sensitive)'
    );

    if (confirmation !== 'DELETE MY ACCOUNT') {
      if (confirmation !== null) {
        showToast('error', 'Confirmation text does not match. Account deletion cancelled.');
      }
      return;
    }

    try {
      setLoading(true);
      await apiClient.deleteAccount('DELETE MY ACCOUNT');
      showToast('success', 'Account data deleted successfully');
      setTimeout(() => { window.location.href = '/login'; }, 2000);
    } catch (error: any) {
      showToast('error', error.message || 'Failed to delete account');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-[1200px] p-6">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto max-w-[1200px] p-6 max-md:p-4">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Settings</h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-6 max-md:grid-cols-1">
          {/* Account Section */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Account</h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-muted-foreground text-xs">Email</Label>
                  <p className="text-sm text-foreground mt-1">{user?.email || 'Not authenticated'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">User ID</Label>
                  <p className="text-sm text-foreground font-mono mt-1">{user?.id || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-base font-semibold text-foreground mb-4">API Configuration</h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="apiKey" className="text-muted-foreground text-xs">OpenAI API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={hasApiKey ? '••••••••••••••' : 'sk-...'}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Required for code generation. Keys are encrypted.
                    {hasApiKey && ' (Current key saved)'}
                  </p>
                </div>
                <Button size="sm" onClick={handleSaveApiKey}>
                  Save Key
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Preferences</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="text-sm text-foreground">Auto-scroll Chat</div>
                    <div className="text-xs text-muted-foreground">Automatically scroll to new messages</div>
                  </div>
                  <Switch
                    checked={preferences.autoScrollChat}
                    onCheckedChange={() => handlePreferenceChange('autoScrollChat')}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="text-sm text-foreground">Sound Effects</div>
                    <div className="text-xs text-muted-foreground">Play sounds for notifications</div>
                  </div>
                  <Switch
                    checked={preferences.soundEffects}
                    onCheckedChange={() => handlePreferenceChange('soundEffects')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30">
            <CardContent className="pt-6">
              <h2 className="text-base font-semibold text-destructive mb-4">Danger Zone</h2>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-destructive/5">
                  <div className="text-sm font-medium text-foreground mb-1">Clear All Data</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Remove all generation history and cached data
                  </div>
                  <Button variant="destructive" size="sm" onClick={handleClearData}>
                    Clear Data
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-destructive/5">
                  <div className="text-sm font-medium text-foreground mb-1">Delete Account</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Permanently delete account and all associated data
                  </div>
                  <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
