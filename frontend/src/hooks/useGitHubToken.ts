import { useAuthContext } from '../contexts/AuthContext'

export function useGitHubToken() {
  const { session } = useAuthContext()

  const token =
    session?.provider_token || session?.user?.user_metadata?.github_token
  const username =
    session?.user?.user_metadata?.user_name ||
    session?.user?.user_metadata?.preferred_username ||
    ''
  const email = session?.user?.email
  const hasRepoAccess = !!session?.user?.user_metadata?.github_repo_granted

  return {
    token,
    username,
    email,
    isConnected: !!token,
    hasRepoAccess,
    githubContext: token
      ? { token, username, email }
      : undefined,
  }
}
