# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Genie is a multi-agent AI system for code generation, reviews, and enhancements built on the ADK-TS framework. It provides a complete AI-powered development ecosystem with specialized agents, multi-channel access (Web Terminal, Telegram Bot, Voice Commands, Background Jobs), and seamless GitHub integration.

## Development Commands

### Full Stack
```bash
# Install all dependencies (root, backend, frontend, shared)
npm install

# Run both backend and frontend in dev mode
npm run dev

# Build all packages
npm run build

# Run tests across all workspaces
npm run test

# Lint all workspaces
npm run lint

# Format all files
npm run format

# Prepare ADK package
npm run prepare-adk
```

### Backend Commands
```bash
cd backend

# Development (with increased memory)
npm run dev

# Production start (with tsx)
npm start

# Run tests
npm test
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage

# Test database connection
npm run test:connection

# Run linting
npm run lint

# GitHub MCP demo
npm run github-mcp-demo
```

### Frontend Commands
```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build
npm run preview   # Preview production build

# Run tests
npm run test
npm run test:watch

# Lint TypeScript/React files
npm run lint
```

### ADK-TS Subproject
```bash
cd adk-ts

# Install dependencies
pnpm install

# Build all packages with Turbo
pnpm build

# Run tests
pnpm test

# Clean build outputs
pnpm clean
```

## Architecture

### Core System Design

The platform follows a multi-agent architecture where specialized AI agents handle different aspects of code generation and analysis. Requests flow through:

1. **API Gateway** (Express.js) → Routes to appropriate handlers
2. **Agent Router Service** → Determines which specialist agent(s) to use
3. **Agent Orchestration** → Coordinates multi-agent workflows
4. **Queue System** (Bull/Redis) → Manages background jobs and long-running tasks
5. **Storage** (Supabase) → Persists sessions, generated code, and images

### Agent Hierarchy

**Routing Layer:**
- `ChatAgent` - Master router and conversational interface (cannot generate code itself)
- `LeadEngineerAgent` - Coordinates complex multi-agent tasks

**Code Generation Specialists:**
- `SimpleCoderAgent` - HTML/CSS/JavaScript projects (uses GLM-4.6)
- `ComplexCoderAgent` - React/TypeScript/frameworks (uses GLM-4.6)
- `CodeModificationAgent` - Modifies existing code (uses GLM-4.6)
- `CodeFixerAgent` - Fixes errors and bugs (uses GLM-4.6)

**Code Review Specialists:**
- `SecuritySentinelAgent` - Security vulnerability analysis (uses GPT-5-nano)
- `PerformanceProfilerAgent` - Performance optimization (uses GPT-5-nano)
- `BugHunterAgent` - Logic error detection (uses GPT-5-nano)
- `QualityAssuranceAgent` - Best practices validation (uses GPT-5-nano)

**Support Specialists:**
- `TestCrafterAgent` - Test generation (uses GLM-4.6)
- `DocWeaverAgent` - Documentation creation (uses GPT-5-nano)
- `GitHubAgent` - Repository operations (uses GLM-4.6)

### Key Services

**AI & Generation:**
- `AIService` - Manages LLM provider selection and API calls
- `ImageGenerationService` - Runware API integration for AI image generation
- `AgentRouterService` - Intelligent agent selection based on complexity

**Workflow Management:**
- `GenieWorkflow` - Main orchestration workflow
- `GenerationQueue` - Manages code generation jobs
- `ChatQueue` - Handles chat interactions

**Code Processing:**
- `ValidationService` / `FastValidatorService` - Syntax validation using TypeScript compiler
- `CodeFormatterService` - Prettier-based formatting
- `SmartAutoFixerService` - Automatic error correction

**Integration Points:**
- GitHub MCP Server (`mcp-servers/github/`) - 40+ GitHub API tools
- WebContainer API - Browser-based code preview
- Telegram Bot Service - Mobile access interface

### State Management

- **Frontend:** Zustand stores for UI state
- **Backend:** Redis for queue/cache, Supabase for persistence
- **Agent State:** `AgentStateManager` tracks multi-step workflows
- **Memory:** `ChatMemoryManager` and `VectorMemoryManager` for context

## Model Configuration

The project uses different models optimized for specific tasks:

- **GLM-4.6:** Primary model for code generation (SimpleCoder, ComplexCoder, CodeModifier, TestCrafter, GitHubAgent)
- **GPT-5-nano:** Efficient model for analysis and review (ChatAgent, Security, Performance, BugHunter, QA, Documentation)
- **Fallback Support:** OpenAI GPT-4, Anthropic Claude, Google Gemini

Models are configured in `backend/src/services/AIService.ts` with automatic fallback handling.

## Important Patterns

### Agent Response Format
All agents must return JSON matching their specific schema (found in `backend/src/schemas/`). The response includes:
- `action`: What the agent decided to do
- `message`: Human-readable explanation
- `files`: (for code generators) Generated code files
- `routeTo`: (for router agents) Which specialist to use

### Error Handling Flow
1. Validation fails → `FastValidatorService` identifies errors
2. Auto-fix attempt → `SmartAutoFixerService` applies corrections
3. If still failing → Route to `CodeFixerAgent` for AI-powered fixes
4. User notification → Clear error messages with suggestions

### Image Generation Integration
Agents automatically call `ImageGenerationService` when detecting need for visuals:
1. Agent identifies image requirement
2. Generates detailed prompt
3. Calls Runware API via WebSocket
4. Receives image URL from Supabase storage
5. Integrates URL into generated code

### GitHub MCP Tools
The GitHub MCP server provides tools organized by category:
- Repository operations (create, fork, delete)
- Pull request management (create, merge, review)
- Issue tracking (create, update, label)
- File operations (batch commits, search)
- AI-powered features (smart PR descriptions, auto-review)

## Testing Strategy

- **Unit Tests:** Jest for backend services and agents
- **Component Tests:** Vitest for React components
- **Integration Tests:** API endpoint testing with Supertest
- **Manual Testing:** Use `backend/src/github-mcp-demo.ts` for GitHub integration

Run single test: `cd backend && npm test -- <test-pattern>`

## Environment Configuration

Required environment variables are documented in the README. Key services:
- **LLM Providers:** OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY
- **Image Generation:** RUNWARE_API_KEY
- **Database:** SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY
- **Queue:** REDIS_URL
- **GitHub:** GITHUB_TOKEN (optional, for enhanced features)

## Deployment Notes

- **Backend:** Deployed to Heroku with Redis addon, uses tsx for runtime
- **Frontend:** Deployed to Vercel, static build with Vite
- **Database:** Supabase cloud instance
- **Generated Projects:** Deploy to Fly.io via built-in deployment pipeline

The backend skips TypeScript compilation in production and runs directly with tsx for faster deployment and reduced memory usage.
