import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUIStore } from '../stores/uiStore';
import apiClient from '../services/apiClient';
import { X, User, Settings, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const {
    showToast,
    autoScrollChat,
    soundEffects,
    setPreference,
    loadPreferences
  } = useUIStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'danger'>('account');

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getSettings();

      if (response.data) {
        loadPreferences({
          autoScrollChat: response.data.autoScrollChat ?? true,
          soundEffects: response.data.soundEffects ?? true,
        });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (key: 'autoScrollChat' | 'soundEffects') => {
    const currentValue = useUIStore.getState()[key];
    const newValue = !currentValue;

    setPreference(key, newValue);

    try {
      await apiClient.updatePreferences({ [key]: newValue });
      showToast('success', 'Preference updated');
    } catch (error: any) {
      setPreference(key, currentValue);
      showToast('error', error.message || 'Failed to update preference');
    }
  };

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

  if (!isOpen) return null;

  const tabs = [
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'preferences' as const, label: 'Preferences', icon: Settings },
    { id: 'danger' as const, label: 'Danger Zone', icon: AlertTriangle },
  ];

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal-container" onClick={(e) => e.stopPropagation()}>
        <Card className="settings-modal h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="settings-modal-content">
            {/* Sidebar Tabs */}
            <div className="settings-sidebar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="settings-content-area">
              {loading ? (
                <div className="settings-loading">
                  <p className="text-muted-foreground">Loading settings...</p>
                </div>
              ) : (
                <>
                  {activeTab === 'account' && (
                    <div className="settings-tab-content">
                      <h3 className="text-base font-semibold text-foreground mb-4">Account Information</h3>

                      <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <div className="text-xs text-muted-foreground mb-1">Email</div>
                          <div className="text-sm text-foreground">{user?.email || 'Not authenticated'}</div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/50">
                          <div className="text-xs text-muted-foreground mb-1">User ID</div>
                          <div className="text-sm text-foreground font-mono">{user?.id || 'N/A'}</div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/50">
                          <div className="text-xs text-muted-foreground mb-1">Status</div>
                          <div className="text-sm text-emerald-400">Active</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'preferences' && (
                    <div className="settings-tab-content">
                      <h3 className="text-base font-semibold text-foreground mb-4">Preferences</h3>

                      <div className="space-y-3">
                        <div className="preference-item">
                          <div className="preference-info">
                            <div className="preference-title">Auto-scroll Chat</div>
                            <div className="preference-desc">Automatically scroll to new messages</div>
                          </div>
                          <label className="preference-toggle">
                            <input
                              type="checkbox"
                              checked={autoScrollChat}
                              onChange={() => handlePreferenceChange('autoScrollChat')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        <div className="preference-item">
                          <div className="preference-info">
                            <div className="preference-title">Sound Effects</div>
                            <div className="preference-desc">Play sounds for notifications</div>
                          </div>
                          <label className="preference-toggle">
                            <input
                              type="checkbox"
                              checked={soundEffects}
                              onChange={() => handlePreferenceChange('soundEffects')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'danger' && (
                    <div className="settings-tab-content">
                      <h3 className="text-base font-semibold text-destructive mb-4">Danger Zone</h3>

                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                          <div className="text-sm font-medium text-foreground mb-1">Clear All Data</div>
                          <div className="text-xs text-muted-foreground mb-3">
                            Remove all generation history and cached data
                          </div>
                          <Button variant="destructive" size="sm" onClick={handleClearData}>
                            Clear Data
                          </Button>
                        </div>

                        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                          <div className="text-sm font-medium text-foreground mb-1">Delete Account</div>
                          <div className="text-xs text-muted-foreground mb-3">
                            Permanently delete account and all associated data
                          </div>
                          <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                            Delete Account
                          </Button>
                        </div>
                      </div>

                      <p className="text-xs text-destructive mt-4">
                        These actions are irreversible
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
