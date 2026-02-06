import React from 'react'
import { Moon } from 'lucide-react'


interface ThemeSwitcherProps {
  variant?: 'default' | 'compact'
  showLabel?: boolean
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'default',
  showLabel = true
}) => {
  if (variant === 'compact') {
    return (
      <button
        className="theme-switcher-compact"
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
        {showLabel && (
          <span className="theme-label">Dark</span>
        )}
      </button>
    )
  }

  return (
    <div className="theme-switcher">
      <button className="theme-switcher-btn">
        <Moon className="h-4 w-4" />
        <span className="theme-switcher-text">Dark Mode</span>
      </button>
    </div>
  )
}
