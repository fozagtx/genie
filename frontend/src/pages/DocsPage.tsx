import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import '../styles/theme.css'
import './DocsPage.css'

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
      <div className="doc-card">
        <p>
          Genie is a multi-agent coding workspace. Describe what you need, and specialized agents
          plan, generate, review, and ship code across web, API, and automation tasks.
        </p>
        <ul className="pill-list">
          <li>Code generation with live preview</li>
          <li>Agent-led code reviews and QA</li>
          <li>Deploy from the terminal</li>
          <li>Voice-ready and background jobs</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    content: (
      <div className="doc-card">
        <ol className="step-list">
          <li>Create an account or sign in with GitHub.</li>
          <li>Open the Terminal to start a chat-based session.</li>
          <li>Describe a task: feature build, refactor, review, or deploy.</li>
          <li>Use Source/Preview/Deploy tabs to inspect and ship.</li>
          <li>Save your Supabase and API keys in Settings for persistence.</li>
        </ol>
        <div className="tip-box">
          <h4>Tip</h4>
          <p>Be specific about stack, constraints, and success criteria to guide the agents.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'workflow',
    title: 'Core workflow',
    content: (
      <div className="doc-card grid two-col">
        <div>
          <h4>Plan</h4>
          <p>The router assigns Simple/Complex Coder, Fixer, and reviewers based on your prompt.</p>
        </div>
        <div>
          <h4>Build</h4>
          <p>Generated files appear in Source. Edit inline; agents keep context from the chat.</p>
        </div>
        <div>
          <h4>Review</h4>
          <p>QA, Security, and Performance agents run targeted checks and return findings.</p>
        </div>
        <div>
          <h4>Ship</h4>
          <p>Preview in-browser, then deploy from the Deploy tab or export as a ZIP.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'agents',
    title: 'Agents',
    content: (
      <div className="doc-card">
        <div className="grid two-col tight">
          <div>
            <h4>Builders</h4>
            <ul>
              <li>Simple Coder (UI/HTML/CSS/JS)</li>
              <li>Complex Coder (React/TypeScript/app)</li>
              <li>Code Fixer (repair + refactor)</li>
            </ul>
          </div>
          <div>
            <h4>Reviewers</h4>
            <ul>
              <li>Security Sentinel</li>
              <li>Performance Profiler</li>
              <li>Bug Hunter</li>
              <li>Quality Assurance</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Test Crafter</li>
              <li>Doc Weaver</li>
              <li>GitHub Agent</li>
            </ul>
          </div>
          <div>
            <h4>Voice & jobs</h4>
            <ul>
              <li>VAPI voice call support</li>
              <li>Background mode with notifications</li>
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
      <div className="doc-card">
        <p>Call Genie services directly with bearer auth. Key endpoints:</p>
        <div className="endpoint-grid">
          <div>
            <h4>POST /api/generate</h4>
            <p>Start a generation job with prompt, files, and target language.</p>
          </div>
          <div>
            <h4>POST /api/chat</h4>
            <p>Send follow-up messages for an active generation.</p>
          </div>
          <div>
            <h4>POST /api/review</h4>
            <p>Request a code review with security/performance/style toggles.</p>
          </div>
          <div>
            <h4>POST /api/deploy</h4>
            <p>Deploy generated projects to Fly.io via backend runner.</p>
          </div>
          <div>
            <h4>GET /api/status</h4>
            <p>Check job status and progress messages.</p>
          </div>
          <div>
            <h4>GET /api/history</h4>
            <p>Retrieve generation history for the signed-in user.</p>
          </div>
        </div>
        <div className="code-example">
          <pre>{`Authorization: Bearer <token>
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
      <div className="doc-card">
        <div className="grid two-col tight">
          <div>
            <h4>Preview not loading</h4>
            <ul>
              <li>Check browser console for compile errors.</li>
              <li>Install dependencies inside the preview terminal.</li>
              <li>Reload if the frame stalls after edits.</li>
            </ul>
          </div>
          <div>
            <h4>Generation stalled</h4>
            <ul>
              <li>Retry with a clearer prompt and target stack.</li>
              <li>Disable background mode to see live updates.</li>
              <li>Check network/connectivity and API keys.</li>
            </ul>
          </div>
          <div>
            <h4>Auth or key issues</h4>
            <ul>
              <li>Re-auth via GitHub and re-enter Supabase keys.</li>
              <li>Ensure OPENAI/RUNWARE keys are set in Settings.</li>
            </ul>
          </div>
          <div>
            <h4>Need help</h4>
            <ul>
              <li>Review chat history for similar tasks.</li>
              <li>Share generation ID when asking for support.</li>
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
    <div className="docs-page">
      <div className="docs-hero">
        <div>
          <p className="eyebrow">Genie Documentation</p>
          <h1>Build, review, and ship with multi-agent automation</h1>
          <p className="lede">
            Learn how to steer Genie: start sessions, route tasks to agents, review generated code,
            and deploy without leaving the workspace.
          </p>
          <div className="hero-actions">
            <Button onClick={() => navigate('/terminal')}>Open terminal</Button>
            <Button variant="outline" onClick={() => navigate('/')}>Back to app</Button>
          </div>
        </div>
      </div>

      <div className="docs-shell">
        <aside className="docs-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`docs-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </aside>

        <section className="docs-body">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`doc-section ${activeSection === section.id ? 'active' : 'hidden'}`}
            >
              <div className="doc-section-header">
                <h2>{section.title}</h2>
              </div>
              {section.content}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
