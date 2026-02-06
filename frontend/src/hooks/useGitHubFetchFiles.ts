import { useMutation } from '@tanstack/react-query'
import { useGitHubToken } from './useGitHubToken'
import apiClient from '../services/apiClient'

export interface FetchFilesResult {
  files: Array<{ path: string; content: string }>
  errors?: string[]
  totalSize: number
  fetchedCount: number
}

export function useGitHubFetchFiles() {
  const { token } = useGitHubToken()

  return useMutation<FetchFilesResult, Error, { owner: string; repo: string; files: string[]; ref?: string }>({
    mutationFn: async ({ owner, repo, files, ref }) => {
      const res = await apiClient.request({
        method: 'POST',
        url: `/api/github/repos/${owner}/${repo}/files`,
        headers: { 'x-github-token': token! },
        data: { files, ref },
      })
      return res.data
    },
  })
}
