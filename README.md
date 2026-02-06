# Genie

<div align="center">

**Next-Generation Multi-Agent AI Development Platform**

*Your Virtual Development Team Powered by Specialized AI Agents*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

[Live Demo](https://genie-ai.vercel.app) | [Documentation](https://genie-ai.vercel.app/docs) | [Telegram Bot](https://t.me/genie_ai_bot)

</div>

---

## Overview

**Genie** is a multi-agent AI system for code generation, reviews, and enhancements built on the [ADK-TS framework](https://adk.iqai.com). It provides specialized AI agents with multi-channel access and seamless GitHub integration.

### Key Features

- **10+ Specialized AI Agents** - From HTML/CSS to React/TypeScript
- **AI Image Generation** - Powered by Runware API for visual assets
- **4 Access Channels** - Web Terminal, Telegram Bot, Voice Commands, Background Jobs
- **GitHub MCP Integration** - 40+ tools for complete repository operations
- **Real-Time Preview** - WebContainer-powered live preview and deployment

### Agent Architecture

**Code Generation:**
- **Simple Coder** (Gemini 2.5 Flash) - HTML/CSS/JavaScript projects
- **Complex Coder** (Gemini 2.5 Flash) - React/TypeScript applications
- **Code Modifier** (Gemini 2.5 Flash) - Bug fixes and feature additions

**Code Review:**
- **Security Sentinel** (GPT-4o Mini) - Vulnerability scanning
- **Performance Profiler** (GPT-4o Mini) - Optimization analysis
- **Bug Hunter** (GPT-4o Mini) - Logic error detection
- **Quality Assurance** (GPT-4o Mini) - Best practices validation

**Support:**
- **Chat Agent** (GPT-4o Mini) - Request routing and conversation
- **Test Crafter** (Gemini 2.5 Flash) - Test generation
- **Doc Weaver** (GPT-4o Mini) - Documentation creation
- **GitHub Agent** (Gemini 2.5 Flash) - Repository operations

---

## Tech Stack

**Frontend:** React 18.2, TypeScript 5.3, Vite, Tailwind CSS, Monaco Editor, WebContainer API
**Backend:** Node.js 20.x, Express.js, TypeScript, Socket.io, Bull, Redis, ADK-TS
**AI Models:** Gemini 2.5 Flash (coding), GPT-4o Mini (analysis), OpenAI GPT-4o, Google Gemini
**Storage:** Supabase (PostgreSQL + Storage), Redis
**Deployment:** Vercel (frontend), Render (backend), Fly.io (generated projects)

---

## Quick Start

### Prerequisites
- Node.js 20.x+, npm 10.x+, Redis, Supabase account
- API keys: OpenAI, Google Gemini, Runware (optional), GitHub token (optional)

### Installation

```bash
git clone https://github.com/zaikaman/genie.git
cd genie
npm install
npm run prepare-adk
```

### Environment Configuration

**Backend (.env):**
```env
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_gemini_key
RUNWARE_API_KEY=your_runware_key  # For image generation
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
REDIS_URL=redis://localhost:6379
PORT=3001
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**Access:** http://localhost:5173/terminal

---

### Backend Deployment (Render)

- Deploy the backend as a Render Web Service using the provided `render.yaml` (auto-runs `npm install` then `npm run start --workspace backend`).
- Set environment variables in Render: `GOOGLE_API_KEY` (Gemini), `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `REDIS_URL`, and `FRONTEND_URL` (point to your frontend origin). Optional: `RUNWARE_API_KEY`, `TELEGRAM_BOT_TOKEN`, `GENIE_BOT_GITHUB_TOKEN`.
- Render sets `PORT` automatically; the health check path is `/api/status`.
- Telegram webhooks now auto-detect `RENDER_EXTERNAL_URL` if `APP_URL`/`BACKEND_URL` are not provided.

---

## API Reference

### Core Endpoints

**POST `/api/generate`** - Generate code from natural language
**POST `/api/chat`** - Follow-up messages during generation
**POST `/api/review`** - Review code with specialized agents
**GET `/api/status/:id`** - Check generation status
**GET `/api/history`** - Retrieve generation history

### WebSocket Events
- `generation:progress` - Real-time updates
- `generation:complete` - Generation finished
- `chat:message` - New chat message

---

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/name`
3. Run tests: `npm test`
4. Submit Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built with [ADK-TS](https://adk.iqai.com), [Runware](https://runware.ai), [Supabase](https://supabase.com), and [WebContainer API](https://webcontainers.io).

<div align="center">

[Website](https://genie-ai.vercel.app) • [Documentation](https://genie-ai.vercel.app/docs) • [GitHub](https://github.com/zaikaman/genie) • [Telegram](https://t.me/genie_ai_bot)

</div>
