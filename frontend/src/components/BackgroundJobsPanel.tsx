import React, { useEffect, useRef } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import apiClient from '../services/apiClient';
import { useUIStore } from '../stores/uiStore';
import { useRealtimeJobsList } from '../hooks/useRealtimeJobsList';
import { X, RefreshCw, Wifi } from 'lucide-react';
import { Button } from './ui/button';
import './BackgroundJobsPanel.css';

interface BackgroundJobsPanelProps {
  onClose: () => void;
  onActiveJobsCountChange?: (count: number) => void;
}

export const BackgroundJobsPanel: React.FC<BackgroundJobsPanelProps> = ({ onClose, onActiveJobsCountChange }) => {
  const { user } = useAuthContext();
  const { showToast } = useUIStore();
  const previousJobStatusesRef = useRef<Record<string, string>>({});

  const {
    jobs: realtimeJobs,
    loading: realtimeLoading,
    refresh,
    isConnected
  } = useRealtimeJobsList({
    enabled: !!user,
    onActiveJobsChange: (count) => {
      onActiveJobsCountChange?.(count);
    },
  });

  const jobs = realtimeJobs;
  const loading = realtimeLoading;

  useEffect(() => {
    jobs.forEach(job => {
      const previousStatus = previousJobStatusesRef.current[job.id];

      if (previousStatus === 'pending' && job.status === 'processing') {
        showToast('info', `Background job started: ${job.user_message.substring(0, 50)}...`, 4000);
      }

      if ((previousStatus === 'processing' || previousStatus === 'pending') && job.status === 'completed') {
        showToast('success', `Background job completed: ${job.user_message.substring(0, 50)}...`, 6000);
      }

      if ((previousStatus === 'processing' || previousStatus === 'pending') && job.status === 'failed') {
        showToast('error', `Background job failed: ${job.user_message.substring(0, 50)}...`, 6000);
      }

      previousJobStatusesRef.current[job.id] = job.status;
    });
  }, [jobs, showToast]);

  const handleCancelJob = async (jobId: string) => {
    try {
      const response = await apiClient.cancelJob(jobId);
      if (response.success) {
        refresh();
      } else {
        console.error('Failed to cancel job:', response.error);
      }
    } catch (error) {
      console.error('Error cancelling job:', error);
    }
  };

  const handleRetryJob = async (jobId: string) => {
    try {
      const response = await apiClient.retryJob(jobId);
      if (response.success) {
        refresh();
      } else {
        console.error('Failed to retry job:', response.error);
      }
    } catch (error) {
      console.error('Error retrying job:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '\u23F3';
      case 'processing': return '\u2699\uFE0F';
      case 'completed': return '\u2705';
      case 'failed': return '\u274C';
      case 'cancelled': return '\u23F8\uFE0F';
      default: return '\u2753';
    }
  };

  const activeJobs = jobs.filter(j => j.status === 'processing' || j.status === 'pending');
  const hasActiveJobs = activeJobs.length > 0;

  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-card rounded-lg border border-border shadow-xl max-w-3xl w-full max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Background Jobs</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {hasActiveJobs && (
              <div className="flex items-center gap-2 text-blue-400">
                <span className="animate-pulse">●</span>
                <span className="font-medium">{activeJobs.length} Active</span>
              </div>
            )}
            {isConnected && (
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Wifi className="h-3 w-3" />
                <span>Realtime</span>
              </div>
            )}
            <div className="flex-1"></div>
            <Button variant="ghost" size="sm" onClick={refresh} disabled={loading}>
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
          {jobs.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg text-muted-foreground mb-2">No jobs found</p>
              <p className="text-sm text-muted-foreground/60">
                Submit tasks with background mode to track them here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {jobs.map(job => (
                <div key={job.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-xl flex-shrink-0">{getStatusIcon(job.status)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium mb-1 break-words">
                          {job.user_message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(job.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className={`
                      text-xs px-2.5 py-1 rounded-full font-medium
                      ${job.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : ''}
                      ${job.status === 'processing' ? 'bg-blue-500/10 text-blue-400 animate-pulse' : ''}
                      ${job.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                      ${job.status === 'failed' ? 'bg-red-500/10 text-red-400' : ''}
                      ${job.status === 'cancelled' ? 'bg-muted text-muted-foreground' : ''}
                    `}>
                      {job.status}
                    </span>
                  </div>

                  {(job.status === 'processing' || job.status === 'pending') && (
                    <div className="mb-3">
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-400 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${job.progress || 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-blue-400">{job.progress || 0}%</p>
                        <p className="text-xs text-muted-foreground">Processing...</p>
                      </div>
                    </div>
                  )}

                  {job.status === 'failed' && job.error && (
                    <div className="mb-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg text-xs text-destructive">
                      <div className="font-medium mb-1">Error:</div>
                      <div>{job.error}</div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {(job.status === 'processing' || job.status === 'pending') && (
                      <Button variant="destructive" size="sm" onClick={() => handleCancelJob(job.id)}>
                        Cancel
                      </Button>
                    )}
                    {job.status === 'failed' && (
                      <Button variant="outline" size="sm" onClick={() => handleRetryJob(job.id)}>
                        Retry
                      </Button>
                    )}
                    {job.status === 'completed' && job.result && (
                      <Button variant="outline" size="sm" onClick={() => {
                        window.location.href = `/terminal?generation=${job.session_id}`;
                        onClose();
                      }}>
                        View Result
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
