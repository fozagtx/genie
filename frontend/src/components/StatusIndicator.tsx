import React from 'react'
import { Loader2 } from 'lucide-react'
import './StatusIndicator.css'

export type StatusType = 'idle' | 'loading' | 'success' | 'error' | 'warning'

interface StatusIndicatorProps {
  status: StatusType
  message?: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  showIcon?: boolean
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
  className = '',
  size = 'medium',
  showIcon = true,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return '...'
      case 'success':
        return '\u2713'
      case 'error':
        return '\u2717'
      case 'warning':
        return '!'
      case 'idle':
      default:
        return '\u25CB'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'status-loading'
      case 'success':
        return 'status-success'
      case 'error':
        return 'status-error'
      case 'warning':
        return 'status-warning'
      default:
        return 'status-idle'
    }
  }

  return (
    <div
      className={`status-indicator ${getStatusColor()} size-${size} ${className}`}
    >
      {showIcon && (
        <span className="status-icon">{getStatusIcon()}</span>
      )}
      {message && <span className="status-message">{message}</span>}
    </div>
  )
}

// Loading Spinner Component
export const LoadingSpinner: React.FC<{ text?: string; className?: string }> = ({
  text = 'Processing',
  className = '',
}) => {
  return (
    <div className={`loading-spinner ${className}`}>
      <div className="spinner-container">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <div className="spinner-text">{text}...</div>
      </div>
    </div>
  )
}

// Progress Bar Component
interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  className = '',
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={`progress-bar-container ${className}`}>
      {label && (
        <div className="progress-label">
          {label}
          {showPercentage && <span className="progress-percentage"> {clampedProgress}%</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}

// System Status Panel
interface SystemStatusProps {
  agentStatus: string
  connectionStatus: 'online' | 'offline' | 'connecting'
  queueSize?: number
  className?: string
}

export const SystemStatus: React.FC<SystemStatusProps> = ({
  agentStatus,
  connectionStatus,
  queueSize = 0,
  className = '',
}) => {
  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'online':
        return 'text-emerald-400'
      case 'offline':
        return 'text-destructive'
      case 'connecting':
        return 'text-yellow-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className={`system-status-panel rounded-lg border border-border bg-card p-4 ${className}`}>
      <div className="status-grid">
        <div className="status-item">
          <span className="status-label text-muted-foreground">Agent Status:</span>
          <span className="status-value text-foreground">{agentStatus}</span>
        </div>
        <div className="status-item">
          <span className="status-label text-muted-foreground">Connection:</span>
          <span className={`status-value ${getConnectionColor()}`}>
            {connectionStatus.toUpperCase()}
          </span>
        </div>
        {queueSize > 0 && (
          <div className="status-item">
            <span className="status-label text-muted-foreground">Queue:</span>
            <span className="status-value text-yellow-400">{queueSize} tasks</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Modern Loading Animation
export const RetroLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center p-8 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}
