import { useState } from 'react'
import { Github, ExternalLink, Loader2, Check, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { ScrollArea } from './ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs'
import { useGitHubToken } from '../hooks/useGitHubToken'
import { useGitHubRepos, GitHubRepo } from '../hooks/useGitHubRepos'
import { GrantRepoAccessButton } from './GrantRepoAccessButton'
import apiClient from '../services/apiClient'

interface GitHubPushButtonProps {
  files: Array<{ path: string; content: string }>
  generationId?: string
}

type PushState = 'idle' | 'pushing' | 'success' | 'error'

export function GitHubPushButton({ files }: GitHubPushButtonProps) {
  const { token, isConnected, hasRepoAccess } = useGitHubToken()
  const { data: repos, isLoading: reposLoading } = useGitHubRepos()

  const [open, setOpen] = useState(false)
  const [pushState, setPushState] = useState<PushState>('idle')
  const [pushError, setPushError] = useState('')
  const [repoUrl, setRepoUrl] = useState('')

  // New repo form
  const [newRepoName, setNewRepoName] = useState('')
  const [newRepoDescription, setNewRepoDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [commitMessage, setCommitMessage] = useState('Add files from Genie AI')

  // Existing repo selection
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [repoSearch, setRepoSearch] = useState('')
  const [existingCommitMessage, setExistingCommitMessage] = useState('Update files from Genie AI')

  const filteredRepos = repos?.filter(
    (r) =>
      r.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(repoSearch.toLowerCase()))
  )

  const resetState = () => {
    setPushState('idle')
    setPushError('')
    setRepoUrl('')
  }

  const handlePushNew = async () => {
    if (!newRepoName.trim()) return
    setPushState('pushing')
    setPushError('')

    try {
      const res = await apiClient.request({
        method: 'POST',
        url: '/api/github/push',
        headers: { 'x-github-token': token! },
        data: {
          repoName: newRepoName.trim(),
          files,
          commitMessage: commitMessage || 'Add files from Genie AI',
          createNew: true,
          description: newRepoDescription,
          isPrivate,
        },
      })

      if (res.success && res.data) {
        setPushState('success')
        setRepoUrl(res.data.repoUrl)
      } else {
        setPushState('error')
        setPushError(res.error || 'Failed to push to GitHub')
      }
    } catch (err: any) {
      setPushState('error')
      setPushError(err.message || 'Failed to push to GitHub')
    }
  }

  const handlePushExisting = async () => {
    if (!selectedRepo) return
    setPushState('pushing')
    setPushError('')

    try {
      const res = await apiClient.request({
        method: 'POST',
        url: '/api/github/push',
        headers: { 'x-github-token': token! },
        data: {
          repoName: selectedRepo.name,
          files,
          commitMessage: existingCommitMessage || 'Update files from Genie AI',
          createNew: false,
        },
      })

      if (res.success && res.data) {
        setPushState('success')
        setRepoUrl(res.data.repoUrl)
      } else {
        setPushState('error')
        setPushError(res.error || 'Failed to push to GitHub')
      }
    } catch (err: any) {
      setPushState('error')
      setPushError(err.message || 'Failed to push to GitHub')
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center">
        <Github className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Connect your GitHub account to push code to repositories.
        </p>
        <p className="text-xs text-muted-foreground">
          Sign in with GitHub to get started.
        </p>
      </div>
    )
  }

  if (!hasRepoAccess) {
    return <GrantRepoAccessButton />
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetState() }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Github className="h-4 w-4" />
          Push to GitHub
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Push to GitHub</DialogTitle>
          <DialogDescription>
            Push {files.length} file{files.length !== 1 ? 's' : ''} to a GitHub repository.
          </DialogDescription>
        </DialogHeader>

        {pushState === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm font-medium">Successfully pushed to GitHub!</p>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Open repository <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button variant="outline" size="sm" onClick={resetState}>
              Push again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="new" className="mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">New Repository</TabsTrigger>
              <TabsTrigger value="existing">Existing Repository</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="repo-name">Repository name</Label>
                <Input
                  id="repo-name"
                  placeholder="my-awesome-project"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  disabled={pushState === 'pushing'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo-desc">Description (optional)</Label>
                <Input
                  id="repo-desc"
                  placeholder="Generated by Genie AI"
                  value={newRepoDescription}
                  onChange={(e) => setNewRepoDescription(e.target.value)}
                  disabled={pushState === 'pushing'}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="private-switch" className="text-sm">
                  Private repository
                </Label>
                <Switch
                  id="private-switch"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                  disabled={pushState === 'pushing'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commit-msg">Commit message</Label>
                <Input
                  id="commit-msg"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  disabled={pushState === 'pushing'}
                />
              </div>

              {pushState === 'error' && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {pushError}
                </div>
              )}

              <Button
                className="w-full gap-2"
                onClick={handlePushNew}
                disabled={pushState === 'pushing' || !newRepoName.trim()}
              >
                {pushState === 'pushing' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Github className="h-4 w-4" />
                )}
                {pushState === 'pushing' ? 'Creating & pushing...' : 'Create & Push'}
              </Button>
            </TabsContent>

            <TabsContent value="existing" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Search repositories</Label>
                <Input
                  placeholder="Search your repos..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  disabled={pushState === 'pushing'}
                />
              </div>

              <ScrollArea className="h-[200px] rounded-md border border-border">
                {reposLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredRepos && filteredRepos.length > 0 ? (
                  <div className="p-1">
                    {filteredRepos.map((repo) => (
                      <button
                        key={repo.id}
                        className={`flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent ${
                          selectedRepo?.id === repo.id
                            ? 'bg-accent ring-1 ring-ring'
                            : ''
                        }`}
                        onClick={() => setSelectedRepo(repo)}
                        disabled={pushState === 'pushing'}
                      >
                        <Github className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{repo.name}</span>
                            {repo.private && (
                              <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                                Private
                              </span>
                            )}
                          </div>
                          {repo.description && (
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {repo.description}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                    {repoSearch ? 'No repos match your search' : 'No repositories found'}
                  </div>
                )}
              </ScrollArea>

              <div className="space-y-2">
                <Label htmlFor="existing-commit-msg">Commit message</Label>
                <Input
                  id="existing-commit-msg"
                  value={existingCommitMessage}
                  onChange={(e) => setExistingCommitMessage(e.target.value)}
                  disabled={pushState === 'pushing'}
                />
              </div>

              {pushState === 'error' && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {pushError}
                </div>
              )}

              <Button
                className="w-full gap-2"
                onClick={handlePushExisting}
                disabled={pushState === 'pushing' || !selectedRepo}
              >
                {pushState === 'pushing' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Github className="h-4 w-4" />
                )}
                {pushState === 'pushing'
                  ? 'Pushing...'
                  : selectedRepo
                    ? `Push to ${selectedRepo.name}`
                    : 'Select a repository'}
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
