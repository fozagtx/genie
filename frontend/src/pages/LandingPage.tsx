import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ArrowRight, Check, GitBranch, Mic, Sparkles, Upload } from 'lucide-react'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handlePrimary = () => {
    navigate(user ? '/terminal' : '/login')
  }

  const handleSettings = () => {
    navigate(user ? '/settings' : '/signup')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold leading-tight">Genie</span>
          <p className="text-sm text-muted-foreground">Multi-agent coding workspace</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <button onClick={handleSettings} className="rounded-full px-3 py-2 hover:bg-muted">
            {user ? 'Settings' : 'Create account'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 space-y-14">
        <section className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Build, review, and ship without leaving the workspace.
              </h1>
              <p className="text-lg text-muted-foreground">
                Genie routes every task to the right agent—generation, security, performance, QA—then
                keeps the preview and deploy steps in one flow.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                onClick={handlePrimary}
              >
                Open terminal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full bg-secondary text-foreground">
                genie
              </Badge>
              <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span>main</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <span>Auto-plan</span>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-muted px-4 py-3 text-left text-foreground">
              Describe a task — e.g. "Ship a CLI for our deployment pipeline and add tests"
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                  Voice
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  Attach files
                </div>
              </div>
              <Button
                size="sm"
                className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
                onClick={handlePrimary}
              >
                Run with Genie
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">What you ship with Genie</h2>
            <span className="text-sm text-muted-foreground">Generation → Review → Deploy</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Full-stack features with live preview',
              'Security, performance, and QA agents',
              'Pull requests and GitHub automation',
              'Fly.io deploys and ZIP exports',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-muted p-4 text-sm font-semibold text-foreground">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-base font-semibold leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Workflow</h2>
            <span className="text-sm text-muted-foreground">Agents route the work for you</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Plan',
                desc: 'Lead Engineer triages the request, picks agents, and drafts a plan.',
              },
              {
                title: 'Build + Review',
                desc: 'Coders generate code; Security/Performance/QA review before merge.',
              },
              {
                title: 'Ship',
                desc: 'Preview in-browser, export ZIP, or deploy to Fly.io in one click.',
              },
            ].map((step, idx) => (
              <div key={step.title} className="rounded-2xl border border-border bg-muted p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {idx + 1}
                  </span>
                  {step.title}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Activity and extra CTAs removed per request */}
      </main>
    </div>
  )
}
