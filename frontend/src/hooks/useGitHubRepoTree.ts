import { useQuery } from '@tanstack/react-query'
import { useGitHubToken } from './useGitHubToken'
import apiClient from '../services/apiClient'

export interface TreeFile {
  path: string
  size: number
  sha: string
}

export interface RepoTree {
  defaultBranch: string
  totalFiles: number
  truncated: boolean
  files: TreeFile[]
}

export function useGitHubRepoTree(owner: string, repo: string) {
  const { token, isConnected, hasRepoAccess } = useGitHubToken()

  return useQuery<RepoTree>({
    queryKey: ['github-repo-tree', owner, repo],
    queryFn: async () => {
      const res = await apiClient.request({
        method: 'GET',
        url: `/api/github/repos/${owner}/${repo}/tree`,
        headers: { 'x-github-token': token! },
      })
      return res.data
    },
    enabled: isConnected && hasRepoAccess && !!owner && !!repo,
    staleTime: 5 * 60 * 1000,
  })
}
