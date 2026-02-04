import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/button'
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Search,
  History,
  Settings,
  LogOut,
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
  { path: '/generate', label: 'Generate', icon: Sparkles },
  { path: '/review', label: 'Review', icon: Search },
  { path: '/history', label: 'History', icon: History },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    if (confirm('Log out of Genie AI?')) {
      try {
        await signOut()
        navigate('/')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
  }

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Genie
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant="ghost"
                size="sm"
                className={isActive(path) ? 'bg-muted' : ''}
                onClick={() => navigate(path)}
              >
                <Icon className="mr-1.5 h-4 w-4" />
                {label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-1.5 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
