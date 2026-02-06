import { useState } from 'react'
import { GitPullRequest, ExternalLink, Loader2, Check, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import apiClient from '../services/apiClient'

interface CreatePrButtonProps {
  files: Array<{ path: string; content: string }>
  reviewSummary: string
  repoInfo: { owner: string; repo: string }
}

type PrState = 'idle' | 'creating' | 'success' | 'error'

export function CreatePrButton({ files, reviewSummary, repoInfo }: CreatePrButtonProps) {
  const [open, setOpen] = useState(false)
  const [prState, setPrState] = useState<PrState>('idle')
  const [prError, setPrError] = useState('')
  const [prUrl, setPrUrl] = useState('')

  const [title, setTitle] = useState(`Genie AI: code review fixes for ${repoInfo.repo}`)
  const [body, setBody] = useState(
    `## Review Summary\n\n${reviewSummary.slice(0, 2000)}\n\n---\n*Created by [Genie AI](https://github.com)*`
  )

  const handleCreatePr = async () => {
    setPrState('creating')
    setPrError('')

    try {
      const res = await apiClient.createPullRequest({
        owner: repoInfo.owner,
        repo: repoInfo.repo,
        title,
        body,
        files,
      })

      if (res.success && res.data) {
        setPrState('success')
        setPrUrl(res.data.prUrl)
      } else {
        setPrState('error')
        setPrError(res.error || 'Failed to create pull request')
      }
    } catch (err: any) {
      setPrState('error')
      setPrError(err.message || 'Failed to create pull request')
    }
  }

  const resetState = () => {
    setPrState('idle')
    setPrError('')
    setPrUrl('')
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetState() }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <GitPullRequest className="h-4 w-4" />
          Create PR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create Pull Request</DialogTitle>
          <DialogDescription>
            Create a PR on {repoInfo.owner}/{repoInfo.repo} with {files.length} file{files.length !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        {prState === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm font-medium">Pull request created!</p>
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Open pull request <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="pr-title">PR Title</Label>
              <Input
                id="pr-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={prState === 'creating'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pr-body">Description</Label>
              <textarea
                id="pr-body"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={prState === 'creating'}
              />
            </div>

            {prState === 'error' && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {prError}
              </div>
            )}

            <Button
              className="w-full gap-2"
              onClick={handleCreatePr}
              disabled={prState === 'creating' || !title.trim()}
            >
              {prState === 'creating' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GitPullRequest className="h-4 w-4" />
              )}
              {prState === 'creating' ? 'Creating PR...' : 'Create Pull Request'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
