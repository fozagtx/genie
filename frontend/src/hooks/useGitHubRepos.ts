import { useQuery } from '@tanstack/react-query'
import { useGitHubToken } from './useGitHubToken'
import apiClient from '../services/apiClient'

export interface GitHubRepo {
  id: number
  name: string
  fullName: string
  description: string | null
  private: boolean
  url: string
  updatedAt: string
  language: string | null
  defaultBranch: string
}

export function useGitHubRepos() {
  const { token, isConnected } = useGitHubToken()

  return useQuery<GitHubRepo[]>({
    queryKey: ['github-repos'],
    queryFn: async () => {
      const res = await apiClient.request({
        method: 'GET',
        url: '/api/github/repos',
        headers: { 'x-github-token': token! },
      })
      return res.data
    },
    enabled: isConnected,
    staleTime: 2 * 60 * 1000,
  })
}
