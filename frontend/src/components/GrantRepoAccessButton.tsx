import { Shield } from 'lucide-react'
import { Button } from './ui/button'
import { grantGitHubRepoAccess } from '../lib/supabase'

interface GrantRepoAccessButtonProps {
  className?: string
}

export function GrantRepoAccessButton({ className }: GrantRepoAccessButtonProps) {
  const handleGrant = async () => {
    try {
      await grantGitHubRepoAccess()
    } catch (error) {
      console.error('Failed to start repo access grant:', error)
    }
  }

  return (
    <div className={`flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center ${className ?? ''}`}>
      <Shield className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">
        Repository access required
      </p>
      <p className="text-xs text-muted-foreground max-w-xs">
        Grant Genie permission to read and write to your GitHub repositories.
        This opens a GitHub authorization page.
      </p>
      <Button onClick={handleGrant} variant="outline" className="gap-2 mt-1">
        <Shield className="h-4 w-4" />
        Grant Repository Access
      </Button>
    </div>
  )
}
