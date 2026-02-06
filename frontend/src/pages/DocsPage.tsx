import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import '../styles/theme.css'

type Section = {
  id: string
  title: string
  content: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <div className="rounded-xl border border-border bg-muted p-5 text-[0.95rem] leading-relaxed text-foreground">
        <p className="text-muted-foreground">
          Genie is a multi-agent coding workspace. Describe what you need, and specialized agents
          plan, generate, review, and ship code across web, API, and automation tasks.
        </p>
        <ul className="mt-4 flex list-none flex-wrap gap-2.5 p-0">
          <li className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[0.88rem] font-semibold text-indigo-400">Code generation with live preview</li>
          <li className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[0.88rem] font-semibold text-indigo-400">Agent-led code reviews and QA</li>
          <li className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[0.88rem] font-semibold text-indigo-400">Deploy from the terminal</li>
          <li className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[0.88rem] font-semibold text-indigo-400">Voice-ready and background jobs</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    content: (
      <div className="rounded-xl border border-border bg-muted p-5 text-[0.95rem] leading-relaxed text-foreground">
        <ol className="m-0 list-decimal pl-5 leading-loose text-muted-foreground marker:font-bold marker:text-indigo-400">
          <li className="mb-1">Create an account or sign in with GitHub.</li>
          <li className="mb-1">Open the Terminal to start a chat-based session.</li>
          <li className="mb-1">Describe a task: feature build, refactor, review, or deploy.</li>
          <li className="mb-1">Use Source/Preview/Deploy tabs to inspect and ship.</li>
          <li className="mb-1">Save your Supabase and API keys in Settings for persistence.</li>
        </ol>
        <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3.5">
          <h4 className="mb-1.5 text-[0.9rem] font-bold text-indigo-400">Tip</h4>
          <p className="m-0 text-[0.92rem] text-indigo-300/80">Be specific about stack, constraints, and success criteria to guide the agents.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'workflow',
    title: 'Core workflow',
    content: (
      <div className="rounded-xl border border-border bg-muted p-5 text-[0.95rem] leading-relaxed text-foreground">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
          <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Plan</h4>
            <p className="m-0 text-[0.9rem] leading-relaxed text-muted-foreground">The router assigns Simple/Complex Coder, Fixer, and reviewers based on your prompt.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Build</h4>
            <p className="m-0 text-[0.9rem] leading-relaxed text-muted-foreground">Generated files appear in Source. Edit inline; agents keep context from the chat.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Review</h4>
            <p className="m-0 text-[0.9rem] leading-relaxed text-muted-foreground">QA, Security, and Performance agents run targeted checks and return findings.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Ship</h4>
            <p className="m-0 text-[0.9rem] leading-relaxed text-muted-foreground">Preview in-browser, then deploy from the Deploy tab or export as a ZIP.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'agents',
    title: 'Agents',
    content: (
      <div className="rounded-xl border border-border bg-muted p-5 text-[0.95rem] leading-relaxed text-foreground">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Builders</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Simple Coder (UI/HTML/CSS/JS)</li>
              <li className="my-0.5">Complex Coder (React/TypeScript/app)</li>
              <li className="my-0.5">Code Fixer (repair + refactor)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Reviewers</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Security Sentinel</li>
              <li className="my-0.5">Performance Profiler</li>
              <li className="my-0.5">Bug Hunter</li>
              <li className="my-0.5">Quality Assurance</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Support</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Test Crafter</li>
              <li className="my-0.5">Doc Weaver</li>
              <li className="my-0.5">GitHub Agent</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Background Jobs</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Background mode with notifications</li>
              <li className="my-0.5">Real-time job progress tracking</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'api',
    title: 'API reference',
    content: (
      <div className="rounded-xl border border-border bg-muted p-5 text-[0.95rem] leading-relaxed text-foreground">
        <p className="m-0 text-muted-foreground">Call Genie services directly with bearer auth. Key endpoints:</p>
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
          {[
            { method: 'POST /api/generate', desc: 'Start a generation job with prompt, files, and target language.' },
            { method: 'POST /api/chat', desc: 'Send follow-up messages for an active generation.' },
            { method: 'POST /api/review', desc: 'Request a code review with security/performance/style toggles.' },
            { method: 'POST /api/deploy', desc: 'Deploy generated projects to Fly.io via backend runner.' },
            { method: 'GET /api/status', desc: 'Check job status and progress messages.' },
            { method: 'GET /api/history', desc: 'Retrieve generation history for the signed-in user.' },
          ].map((ep) => (
            <div key={ep.method} className="rounded-lg border border-border bg-card p-3.5 transition-shadow hover:shadow-md">
              <h4 className="mb-1.5 font-mono text-[0.9rem] font-bold text-indigo-400">{ep.method}</h4>
              <p className="m-0 text-[0.88rem] leading-snug text-muted-foreground">{ep.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(220_15%_13%)] p-4 font-mono text-[0.88rem] text-muted-foreground">
          <pre className="m-0 whitespace-pre-wrap break-words leading-relaxed">{`Authorization: Bearer <token>
POST /api/generate
{
  "prompt": "Create a React dashboard with charts",
  "complexity": "moderate"
}`}</pre>
        </div>
      </div>
    ),
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    content: (
      <div className="rounded-xl border border-border bg-muted p-5 text-[0.95rem] leading-relaxed text-foreground">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Preview not loading</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Check browser console for compile errors.</li>
              <li className="my-0.5">Install dependencies inside the preview terminal.</li>
              <li className="my-0.5">Reload if the frame stalls after edits.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Generation stalled</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Retry with a clearer prompt and target stack.</li>
              <li className="my-0.5">Disable background mode to see live updates.</li>
              <li className="my-0.5">Check network/connectivity and API keys.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Auth or key issues</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Re-auth via GitHub and re-enter Supabase keys.</li>
              <li className="my-0.5">Ensure OPENAI/RUNWARE keys are set in Settings.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2 text-[0.95rem] font-bold text-foreground">Need help</h4>
            <ul className="m-0 pl-4.5 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li className="my-0.5">Review chat history for similar tasks.</li>
              <li className="my-0.5">Share generation ID when asking for support.</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="mx-auto mb-8 max-w-[1100px] rounded-3xl border border-border bg-card p-10 shadow-lg">
        <div>
          <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-indigo-400">Genie Documentation</p>
          <h1 className="mt-2.5 mb-3.5 text-4xl font-extrabold leading-tight tracking-tight text-foreground">
            Build, review, and ship with multi-agent automation
          </h1>
          <p className="m-0 max-w-[720px] text-[1.05rem] leading-relaxed text-muted-foreground">
            Learn how to steer Genie: start sessions, route tasks to agents, review generated code,
            and deploy without leaving the workspace.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate('/terminal')}>Open terminal</Button>
            <Button variant="outline" onClick={() => navigate('/')}>Back to app</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-[240px_1fr]">
        <aside className="sticky top-6 flex flex-col gap-1 self-start rounded-2xl border border-border bg-card p-2.5 shadow-sm max-md:relative max-md:top-0 max-md:flex-row max-md:flex-wrap">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`w-full rounded-lg border border-transparent px-3.5 py-2.5 text-left text-[0.9rem] font-semibold transition-all duration-150 max-md:w-auto max-md:flex-none max-md:text-center max-md:px-3.5 max-md:py-2 max-md:text-[0.85rem] ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </aside>

        <section className="flex flex-col gap-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`rounded-2xl border border-border bg-card p-7 shadow-sm ${
                activeSection === section.id ? 'block' : 'hidden'
              }`}
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
