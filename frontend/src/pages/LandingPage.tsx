import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { motion } from 'framer-motion'
import {
  Terminal,
  Shield,
  Github,
  MessageSquare,
  Mic,
  Clock,
  Code2,
  Search,
  FileText,
  Bug,
  Gauge,
  TestTube,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { Easing } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as Easing },
  }),
}

const agents = [
  { name: 'Simple Coder', desc: 'HTML/CSS/JS projects', icon: Code2, color: 'text-green-400' },
  { name: 'Complex Coder', desc: 'React/TS frameworks', icon: Sparkles, color: 'text-purple-400' },
  { name: 'Code Fixer', desc: 'Bug fixes & repairs', icon: Bug, color: 'text-red-400' },
  { name: 'Security Sentinel', desc: 'Vulnerability analysis', icon: Shield, color: 'text-yellow-400' },
  { name: 'Performance Profiler', desc: 'Speed optimization', icon: Gauge, color: 'text-blue-400' },
  { name: 'Bug Hunter', desc: 'Logic error detection', icon: Search, color: 'text-orange-400' },
  { name: 'Test Crafter', desc: 'Test generation', icon: TestTube, color: 'text-cyan-400' },
  { name: 'Doc Weaver', desc: 'Documentation creation', icon: FileText, color: 'text-pink-400' },
]

const channels = [
  { name: 'Web Terminal', desc: 'Full-featured IDE-like workspace in your browser', icon: Terminal },
  { name: 'Telegram Bot', desc: 'Generate and review code on the go from mobile', icon: MessageSquare },
  { name: 'Voice Commands', desc: 'Hands-free coding with natural language voice input', icon: Mic },
  { name: 'Background Jobs', desc: 'Queue long-running tasks and get notified when done', icon: Clock },
]

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleLaunch = () => {
    navigate(user ? '/terminal' : '/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-tight">Genie AI</span>
          <div className="flex items-center gap-3">
            {user ? (
              <Button size="sm" onClick={() => navigate('/terminal')}>
                Open Terminal
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <Badge variant="secondary" className="mb-6">
            Multi-Agent AI Platform
          </Badge>
        </motion.div>
        <motion.h1
          className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Genie AI
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          A complete AI-powered development ecosystem with specialized agents for code generation,
          reviews, security analysis, and more.
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <Button size="lg" onClick={handleLaunch}>
            Launch Terminal <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/docs')}>
            Documentation
          </Button>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x py-10 text-center">
          {[
            { value: '10+', label: 'Specialist Agents' },
            { value: '4', label: 'Access Channels' },
            { value: '40+', label: 'GitHub Tools' },
          ].map((stat) => (
            <div key={stat.label} className="px-4">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Channels */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Multi-Channel Access</h2>
          <p className="text-muted-foreground">Use Genie from anywhere, on any device</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <ch.icon className="mb-2 h-8 w-8 text-muted-foreground" />
                  <CardTitle className="text-base">{ch.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{ch.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Agents */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Specialist Agents</h2>
          <p className="text-muted-foreground">
            Purpose-built AI agents that collaborate to handle every aspect of development
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                  <agent.icon className={`h-5 w-5 ${agent.color}`} />
                  <CardTitle className="text-sm font-medium">{agent.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{agent.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Integrations */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Seamless GitHub Integration</h2>
            <p className="mb-6 text-muted-foreground">
              40+ GitHub API tools built in — create repos, manage PRs, run code reviews,
              and deploy directly from the terminal.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Repositories', 'Pull Requests', 'Issues', 'Code Review', 'Actions', 'Deployments'].map(
                (tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ),
              )}
            </div>
          </div>
          <Card className="flex items-center justify-center p-12">
            <Github className="h-24 w-24 text-muted-foreground/30" />
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to build with AI?</h2>
        <p className="mb-8 text-muted-foreground">
          Start generating production-ready code, run security audits, and ship faster.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" onClick={handleLaunch}>
            {user ? 'Open Terminal' : 'Get Started Free'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Genie AI</span>
          <div className="flex gap-6">
            <button onClick={() => navigate('/docs')} className="hover:text-foreground transition-colors">
              Docs
            </button>
            <button onClick={() => navigate('/showcase')} className="hover:text-foreground transition-colors">
              Showcase
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
