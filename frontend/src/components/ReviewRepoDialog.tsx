import { useState, useMemo } from 'react'
import { Github, Loader2, Search, ChevronLeft, FileCode, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { useGitHubToken } from '../hooks/useGitHubToken'
import { useGitHubRepos, GitHubRepo } from '../hooks/useGitHubRepos'
import { useGitHubRepoTree } from '../hooks/useGitHubRepoTree'
import { useGitHubFetchFiles } from '../hooks/useGitHubFetchFiles'
import { GrantRepoAccessButton } from './GrantRepoAccessButton'

interface ReviewRepoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReviewFiles: (files: Array<{ path: string; content: string }>, repoInfo: { owner: string; repo: string }) => void
}

type Step = 'selectRepo' | 'selectFiles' | 'fetching'

const CODE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.java', '.rb', '.php', '.css', '.scss', '.html', '.vue', '.svelte', '.c', '.cpp', '.h', '.cs', '.swift', '.kt']

export function ReviewRepoDialog({ open, onOpenChange, onReviewFiles }: ReviewRepoDialogProps) {
  const { isConnected, hasRepoAccess } = useGitHubToken()
  const { data: repos, isLoading: reposLoading } = useGitHubRepos()
  const fetchFilesMutation = useGitHubFetchFiles()

  const [step, setStep] = useState<Step>('selectRepo')
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [repoSearch, setRepoSearch] = useState('')
  const [fileSearch, setFileSearch] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())

  const owner = selectedRepo?.fullName?.split('/')[0] ?? ''
  const repoName = selectedRepo?.name ?? ''
  const { data: treeData, isLoading: treeLoading } = useGitHubRepoTree(owner, repoName)

  const filteredRepos = repos?.filter(
    (r) =>
      r.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(repoSearch.toLowerCase()))
  )

  const filteredTreeFiles = useMemo(() => {
    if (!treeData?.files) return []
    return treeData.files.filter((f) =>
      f.path.toLowerCase().includes(fileSearch.toLowerCase())
    )
  }, [treeData?.files, fileSearch])

  const selectedTotalSize = useMemo(() => {
    if (!treeData?.files) return 0
    return treeData.files
      .filter((f) => selectedFiles.has(f.path))
      .reduce((acc, f) => acc + f.size, 0)
  }, [treeData?.files, selectedFiles])

  const handleSelectRepo = (repo: GitHubRepo) => {
    setSelectedRepo(repo)
    setSelectedFiles(new Set())
    setFileSearch('')
    setStep('selectFiles')
  }

  const handleAutoSelectCode = () => {
    if (!treeData?.files) return
    const codeFiles = new Set<string>()
    let size = 0
    for (const file of treeData.files) {
      const ext = '.' + file.path.split('.').pop()?.toLowerCase()
      if (CODE_EXTENSIONS.includes(ext)) {
        size += file.size
        if (size > 500 * 1024) break
        codeFiles.add(file.path)
      }
    }
    setSelectedFiles(codeFiles)
  }

  const toggleFile = (path: string) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const handleFetchAndReview = async () => {
    if (selectedFiles.size === 0 || !selectedRepo) return
    setStep('fetching')
    try {
      const result = await fetchFilesMutation.mutateAsync({
        owner,
        repo: repoName,
        files: Array.from(selectedFiles),
      })
      onReviewFiles(result.files, { owner, repo: repoName })
      // Reset and close
      setStep('selectRepo')
      setSelectedRepo(null)
      setSelectedFiles(new Set())
      onOpenChange(false)
    } catch {
      // Go back to file selection on error
      setStep('selectFiles')
    }
  }

  const handleBack = () => {
    if (step === 'selectFiles') {
      setStep('selectRepo')
      setSelectedRepo(null)
      setSelectedFiles(new Set())
    }
  }

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setStep('selectRepo')
      setSelectedRepo(null)
      setSelectedFiles(new Set())
      setRepoSearch('')
      setFileSearch('')
    }
    onOpenChange(val)
  }

  if (!isConnected || !hasRepoAccess) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Review Repository Code</DialogTitle>
            <DialogDescription>
              Grant repository access to review code from your GitHub repos.
            </DialogDescription>
          </DialogHeader>
          <GrantRepoAccessButton />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step !== 'selectRepo' && (
              <button onClick={handleBack} className="hover:bg-accent rounded p-1 -ml-1">
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            {step === 'selectRepo' && 'Select Repository'}
            {step === 'selectFiles' && `Select Files — ${selectedRepo?.name}`}
            {step === 'fetching' && 'Fetching Files...'}
          </DialogTitle>
          <DialogDescription>
            {step === 'selectRepo' && 'Choose a repository to review.'}
            {step === 'selectFiles' && `${selectedFiles.size} files selected (${(selectedTotalSize / 1024).toFixed(0)}KB / 500KB)`}
            {step === 'fetching' && 'Downloading file contents from GitHub...'}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Select Repo */}
        {step === 'selectRepo' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your repos..."
                value={repoSearch}
                onChange={(e) => setRepoSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className="h-[300px] rounded-md border border-border">
              {reposLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : filteredRepos && filteredRepos.length > 0 ? (
                <div className="p-1">
                  {filteredRepos.map((repo) => (
                    <button
                      key={repo.id}
                      className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
                      onClick={() => handleSelectRepo(repo)}
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
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">{repo.description}</p>
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
          </div>
        )}

        {/* Step 2: Select Files */}
        {step === 'selectFiles' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter files..."
                  value={fileSearch}
                  onChange={(e) => setFileSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleAutoSelectCode} className="shrink-0">
                Auto-select code
              </Button>
            </div>
            <ScrollArea className="h-[300px] rounded-md border border-border">
              {treeLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : filteredTreeFiles.length > 0 ? (
                <div className="p-1">
                  {filteredTreeFiles.map((file) => (
                    <button
                      key={file.path}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent ${
                        selectedFiles.has(file.path) ? 'bg-accent/50' : ''
                      }`}
                      onClick={() => toggleFile(file.path)}
                    >
                      <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        selectedFiles.has(file.path) ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'
                      }`}>
                        {selectedFiles.has(file.path) && <Check className="h-3 w-3" />}
                      </div>
                      <FileCode className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{file.path}</span>
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)}KB
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                  {fileSearch ? 'No files match your filter' : 'No files found'}
                </div>
              )}
            </ScrollArea>
            <Button
              className="w-full gap-2"
              onClick={handleFetchAndReview}
              disabled={selectedFiles.size === 0 || selectedTotalSize > 500 * 1024}
            >
              <Search className="h-4 w-4" />
              Review {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''}
            </Button>
          </div>
        )}

        {/* Step 3: Fetching */}
        {step === 'fetching' && (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Downloading {selectedFiles.size} files from {selectedRepo?.name}...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
