# Implementation Plan: Modern SaaS Redesign

## [Overview]

Transform the Genie AI platform from a terminal/hacker aesthetic to a modern, clean SaaS design similar to Vercel and Linear, replacing all CRT effects, phosphor glow, ASCII art, and monospace fonts with Inter font and contemporary UI patterns.

This redesign focuses exclusively on visual transformation while preserving all existing functionality. The current codebase uses extensive terminal-themed styling with phosphor glow effects, matrix backgrounds, ASCII art headers, and CRT screen aesthetics across 69 TSX/CSS files with 151 occurrences of terminal-specific classes. The goal is to modernize the interface to align with contemporary SaaS design standards, utilizing Inter as the primary typeface, implementing glassmorphism and card-based layouts, and introducing smooth animations with a refined color palette based on subtle grays, clean whites, and purple/blue accent gradients.

The redesign will maintain the existing component structure and functionality, ensuring that all features including authentication, code generation, chat interface, preview system, deployment, settings, and documentation remain fully operational. The transformation will be purely cosmetic, replacing visual elements while keeping the underlying logic, API integrations, state management, and data flow intact.

## [Types]

No type system changes required as this is a visual-only redesign.

All existing TypeScript interfaces, types, and data structures will remain unchanged. The component props, state shapes, API response types, and business logic types are unaffected by the visual transformation.

## [Files]

Complete file modification breakdown for modern SaaS visual redesign.

### Core Styling Files (Global Changes)

**frontend/src/index.css**
- Remove terminal/CRT font fallbacks (source-code-pro, Menlo, Monaco, Consolas, 'Courier New')
- Update body font-family to use only Inter with system fallbacks
- Remove code element monospace styling or update to Inter
- Keep scroll-padding-top for header offset
- Modernize base styles

**frontend/src/App.css**
- Already uses Inter font for .app - verify and standardize
- Update toast notification styling to modern card design
- Replace terminal-window borders in toasts with subtle shadows
- Modernize animations (keep functionality, enhance visuals)
- Update modal-overlay styling to glassmorphism

**frontend/src/styles/theme.css** (CRITICAL - Core Theme System)
- Update --font-sans: from 'Inter', system-ui, -apple-system to proper Inter font stack
- Update --font-mono: replace 'JetBrains Mono', 'Fira Code', monospace with Inter
- Modernize color palette:
  - Replace terminal green/blue phosphor colors with subtle grays
  - Update --bg-primary, --bg-secondary, --bg-tertiary with modern dark grays (#0A0A0A, #141414, #1F1F1F)
  - Update --text-primary to pure white (#FFFFFF)
  - Update --text-secondary and --text-muted with refined grays (#A1A1AA, #71717A)
  - Keep brand colors but refine: --brand-primary (#8B5CF6), --brand-secondary (#6366F1)
  - Add new variables: --card-bg, --card-border, --glass-bg, --shadow-glow
- Replace terminal-specific variables (phosphor-glow, crt effects) with modern shadow/blur variables
- Add glassmorphism variables (backdrop-blur, transparency)
- Remove or modernize theme-blue and theme-green classes

**frontend/tailwind.config.js**
- Verify Inter font is properly configured
- Extend theme with modern design tokens
- Update animation keyframes for modern effects
- Add glassmorphism utilities if needed

### Page Files (Major Visual Overhaul)

**frontend/src/pages/LandingPage.tsx**
- Remove inline style with Arial font
- Complete redesign: remove ASCII art, replace with modern hero section
- Replace terminal aesthetic with clean, gradient-based hero
- Update button styling from terminal to modern rounded buttons
- Add modern section layouts (features, testimonials, CTA)
- Use Inter font throughout
- Replace matrix background with subtle gradient or pattern
- Implement modern animations (fade-in, slide-up)

**frontend/src/pages/auth/LoginPage.tsx**
- Remove boot sequence animation (keep boot logic if needed, remove visual)
- Remove ASCII art from login form
- Remove terminal-window, phosphor-glow, crt-screen classes
- Replace with modern card-based authentication form
- Update MatrixBackground component usage (remove or replace with subtle pattern)
- Modernize OAuth button styling
- Replace terminal aesthetics with clean form design
- Update error message styling to modern alerts
- Keep authentication logic intact

**frontend/src/pages/auth/LoginPage.css**
- Complete CSS rewrite for modern authentication page
- Remove all terminal classes (.boot-sequence, .boot-progress, .ascii-art, etc.)
- Remove CRT/phosphor effects
- Replace with modern card shadows, borders, and spacing
- Update animations to smooth fade-ins
- Implement modern form styling
- Replace monospace fonts with Inter

**frontend/src/pages/auth/SignupPage.tsx**
- Similar changes to LoginPage.tsx
- Remove terminal aesthetics
- Modernize signup form
- Update to card-based design

**frontend/src/pages/auth/SignupPage.css**
- Similar changes to LoginPage.css
- Modern form styling with Inter font
- Remove terminal effects

**frontend/src/pages/auth/AuthCallback.tsx**
- Remove terminal styling from callback page
- Modernize loading states
- Update to clean design

**frontend/src/pages/auth/AuthCallback.css**
- Modernize callback page styling
- Remove terminal effects

**frontend/src/pages/HomePage.tsx**
- MAJOR redesign: currently uses heavy ASCII art, matrix background, terminal windows
- Remove boot sequence animation visual (keep logic)
- Remove all ASCII art headers (CODEFORGE, etc.)
- Remove phosphor-glow, auth-page, terminal-window classes throughout
- Modernize hero section with clean typography
- Replace stat cards terminal design with modern cards
- Update channel cards to glassmorphism design
- Remove/replace MatrixBackground component
- Modernize navigation dots
- Replace terminal aesthetics in all sections (channels, GitHub, agents, CTA)
- Update all typography to Inter
- Implement modern scroll animations
- Keep scroll snap functionality, modernize visual feedback

**frontend/src/pages/HomePage.css**
- COMPLETE rewrite required (currently heavily terminal-themed)
- Remove all CRT effects (.crt-screen, scanlines, etc.)
- Remove terminal-specific classes
- Replace with modern layout classes
- Implement glassmorphism for cards
- Update grid layouts to modern spacing
- Replace all monospace font references with Inter
- Modernize animations (remove glitch, add smooth transitions)
- Update scroll-nav dots to modern indicators
- Implement modern hero, stats, channels, GitHub, agents sections
- Modern footer styling

**frontend/src/pages/DocsPage.tsx**
- Remove terminal styling from documentation
- Update typography to use Inter (currently uses font-mono)
- Modernize navigation sidebar
- Update content area styling
- Keep documentation content intact, update presentation

**frontend/src/pages/DocsPage.css**
- Replace terminal aesthetics with modern documentation design
- Update sidebar styling (remove terminal borders, add modern navigation)
- Modernize code examples (keep syntax highlighting, update container)
- Replace font-mono with Inter for body text (keep monospace for code blocks)
- Update cards (.feature-card, .agent-card) to modern design
- Modernize scrollbar styling
- Update button styling (.btn-primary, .btn-secondary)
- Implement modern responsive design

**frontend/src/pages/SettingsPage.tsx**
- Remove terminal-window class usages
- Remove phosphor-glow effects
- Modernize settings cards
- Update toggle switches to modern design
- Keep all settings functionality intact
- Replace Layout component styling if needed

**frontend/src/pages/SettingsPage.css**
- Remove terminal styling
- Modernize settings page layout
- Update card designs
- Modernize form controls (inputs, toggles, buttons)
- Replace monospace with Inter
- Modern danger zone styling

**frontend/src/pages/TerminalPage.tsx**
- Critical file: Main terminal interface
- Keep terminal functionality (code editor, preview, chat)
- Update visual styling only
- Remove/update terminal-themed classes
- Modernize layout (keep 3-panel structure)
- Update Monaco editor theme to modern
- May need to update monospace references in canvas drawing for logs

**frontend/src/pages/TerminalPage.css**
- EXTENSIVE updates required
- Remove terminal aesthetic classes
- Modernize chat interface
- Update sidebar styling
- Modernize tabs and panels
- Replace terminal borders with modern cards
- Update file tree styling
- Modernize message bubbles
- Replace monospace with Inter for UI text (keep for code)
- Update animations to modern style

**frontend/src/pages/ShowcasePage.tsx**
- Update styling to match modern theme
- Remove terminal effects if present
- Modernize showcase layout

**frontend/src/pages/TelegramAuth.tsx**
- Remove inline monospace styling
- Remove terminal classes
- Modernize authentication flow page
- Update to card-based design

### Component Files (Visual Updates)

**frontend/src/components/Header.tsx**
- Modernize header design
- Update navigation styling
- Remove terminal aesthetics

**frontend/src/components/Header.css**
- Replace terminal styling with modern header
- Update logo and navigation items
- Modern dropdown menus
- Replace monospace with Inter

**frontend/src/components/Layout.tsx**
- Update layout wrapper if it has terminal styling
- Modernize page structure

**frontend/src/components/Layout.css**
- Remove terminal effects
- Modernize layout styles
- Replace monospace with Inter

**frontend/src/components/MatrixBackground.tsx**
- DECISION: Remove entirely or replace with subtle modern background
- If keeping: update to subtle particle effect or gradient animation
- If removing: create new modern background component

**frontend/src/components/AgentChat.tsx**
- Update message styling to modern bubbles
- Remove terminal aesthetics from chat interface
- Keep chat functionality intact

**frontend/src/components/AgentChat.css**
- Modernize chat message styling
- Update agent icons and names display
- Replace terminal bubbles with modern message cards
- Replace monospace with Inter for UI text

**frontend/src/components/ChatInput.tsx**
- Modernize input field styling
- Update button designs

**frontend/src/components/ChatInput.css**
- Remove terminal input styling
- Modern input field with Inter font
- Update attachment button styling

**frontend/src/components/CodeEditor.tsx**
- Update editor theme to modern
- Keep Monaco functionality
- Update container styling

**frontend/src/components/CodeEditor.css**
- Modernize editor container
- Update tabs and toolbar
- Keep code area monospace for functionality
- Update surrounding UI to Inter

**frontend/src/components/FileTree.tsx**
- Update file tree visual design
- Modernize icons and indentation

**frontend/src/components/FileTree.css**
- Replace Courier New with Inter for file names
- Modernize tree styling
- Update hover states to modern

**frontend/src/components/DiffViewer.tsx**
- Update inline font styles from Courier New to Inter or modern monospace
- Modernize diff viewer container

**frontend/src/components/DiffViewer.css**
- Update diff viewer styling
- Modernize line numbers and changes display
- Update fonts appropriately

**frontend/src/components/ImageUpload.tsx**
- Update component styling to modern

**frontend/src/components/ImageUpload.css**
- Remove terminal styling
- Modernize upload area
- Replace monospace with Inter

**frontend/src/components/BackgroundJobsPanel.tsx**
- Update panel styling to modern

**frontend/src/components/BackgroundJobsPanel.css**
- Modernize jobs panel
- Update job cards
- Replace terminal effects

**frontend/src/components/DeployButton.tsx**
- Modernize button and modal styling

**frontend/src/components/DeployButton.css**
- Update button design
- Modernize deployment modal

**frontend/src/components/SettingsModal.tsx**
- Update modal styling to modern

**frontend/src/components/SettingsModal.css**
- Remove terminal styling
- Modernize modal design
- Replace monospace with Inter

**frontend/src/components/StatusIndicator.tsx**
- Update status indicator styling

**frontend/src/components/StatusIndicator.css**
- Modernize status badges
- Replace monospace with Inter

**frontend/src/components/ThemeSwitcher.tsx**
- May need to update or simplify theme switching
- Modernize UI

**frontend/src/components/ThemeSwitcher.css**
- Remove terminal styling
- Modernize theme switcher design
- Replace Courier New with Inter

**frontend/src/components/VapiCallAgent.tsx**
- Update voice call UI to modern

**frontend/src/components/VapiCallAgent.css**
- Modernize call interface
- Replace Courier New with Inter

**frontend/src/components/GitHubTokenSettings.tsx**
- Remove inline monospace styling
- Update to use modern styles

**frontend/src/components/TypingEffect.tsx**
- Keep functionality, update styling if needed

**frontend/src/components/ProtectedRoute.tsx**
- No visual changes needed (functional component)

**frontend/src/components/ProjectWorkspace.tsx**
- Update workspace layout to modern
- Modernize visual elements

**frontend/src/components/PreviewFrame.tsx**
- Update frame container styling
- Modernize preview controls

**frontend/src/components/FileUpload.tsx**
- Modernize upload component styling

**frontend/src/components/ErrorFixNotification.tsx**
- Update notification to modern design

**frontend/src/components/SoundButton.tsx**
- Modernize button styling

**frontend/src/components/StaticHtmlPreview.tsx**
- Update preview container styling

### Files NOT Requiring Changes

**Backend files** - No changes (visual only redesign)
**API files** - No changes
**Type definition files** - No changes
**Hook files** - No changes (unless they contain inline styles)
**Service files** - No changes
**Store files** - No changes
**Utility files** - No changes
**Test files** - May need visual test updates later

## [Functions]

Minimal function modifications as this is a visual-only redesign.

### Functions to Modify

**frontend/src/pages/HomePage.tsx**
- `addToRefs()` - No changes (functionality preserved)
- `handleContinueOnMobile()` - No changes (functionality preserved)
- `handleWheel()` - No changes (functionality preserved)
- `handleTouchStart()`, `handleTouchEnd()`, `handleSwipe()` - No changes (functionality preserved)
- Component render JSX - Extensive JSX changes to remove terminal classes and update structure

**frontend/src/pages/TerminalPage.tsx**
- Canvas drawing functions (if any) - Update font references from monospace to modern fonts for UI elements only
- No logic changes, only visual updates in JSX

**frontend/src/components/MatrixBackground.tsx**
- `draw()` function - Either remove component entirely or replace with new subtle background effect
- Canvas rendering logic - Update or remove

### Functions to Keep Unchanged

All business logic functions, API calls, state management, authentication flows, data processing, WebSocket handlers, and utility functions remain completely unchanged.

## [Classes]

CSS class and component modifications for modern SaaS design.

### CSS Classes to Remove/Replace Globally

**Terminal Theme Classes (Remove All Occurrences):**
- `.crt-screen` - Remove or replace with `.modern-page`
- `.terminal-window` - Replace with `.card` or `.panel`
- `.terminal-header` - Replace with `.card-header`
- `.terminal-content` - Replace with `.card-content`
- `.terminal-button` (close, minimize, maximize) - Remove or modernize
- `.terminal-title` - Replace with `.card-title`
- `.phosphor-glow` - Remove entirely
- `.auth-page` - Remove or replace with modern utility classes
- `.ascii-art` - Remove entirely
- `.boot-sequence`, `.boot-line`, `.boot-progress`, `.boot-bar` - Remove entirely

**Typography Classes:**
- Any class using `font-family: var(--font-mono)` - Update to use Inter or appropriate font
- Update all font-related classes to use Inter

### New CSS Classes to Create

**Modern Card System:**
- `.card` - Base modern card with subtle shadow and border
- `.card-header` - Modern card header with proper spacing
- `.card-content` - Card content area with padding
- `.card-footer` - Card footer if needed

**Glassmorphism Classes:**
- `.glass-panel` - For glassmorphic elements
- `.glass-bg` - Background with blur effect

**Modern Button Classes:**
- `.btn-modern` - Base modern button
- `.btn-modern-primary` - Primary action button with gradient
- `.btn-modern-secondary` - Secondary button
- `.btn-modern-outline` - Outline button

**Modern Form Classes:**
- `.input-modern` - Modern input field with Inter font
- `.label-modern` - Modern label styling
- `.form-group-modern` - Form group container

**Animation Classes:**
- `.fade-in` - Modern fade-in animation
- `.slide-up` - Modern slide-up animation
- `.scale-in` - Modern scale-in animation

### React Component Classes to Update

**Component Structure Changes:**
- All components using terminal-window wrapper - Update to use card wrapper
- All components with phosphor-glow effects - Remove effects
- All components with ASCII art - Remove or replace with modern typography
- All components with monospace fonts - Update to Inter (except code blocks)

**Component-Specific Updates:**
- `HomePage` component - Major restructure of JSX, remove terminal sections
- `LoginPage` component - Complete form redesign
- `DocsPage` component - Update sidebar and content styling
- `SettingsPage` component - Modernize settings cards
- `TerminalPage` component - Update layout while keeping functionality
- `AgentChat` component - Modern message bubbles
- `Header` component - Modern navigation

### CSS Variable Classes to Update

Update all components using CSS variables to reference new modern variables:
- Replace `var(--font-mono)` with `var(--font-sans)` where appropriate
- Update color variable references to new palette
- Update shadow/glow variables to modern shadows

## [Dependencies]

Font and styling dependency updates.

### Current Font Setup

The codebase already has Inter referenced in some files but inconsistently applied:
- `frontend/src/App.css`: `font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;`
- `frontend/src/styles/theme.css`: `--font-sans: 'Inter', system-ui, -apple-system, sans-serif;`
- Inter font may not be properly imported

### Font Dependencies Required

**Add Inter Font Import:**
1. Option A: Google Fonts CDN in `frontend/index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

2. Option B: NPM package (better for production):
```bash
npm install --save @fontsource/inter
```
Then import in `frontend/src/main.tsx` or `frontend/src/index.css`:
```typescript
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
```

**Recommendation:** Use Option B (@fontsource/inter) for better performance, offline support, and version control.

### Other Dependencies

**No new major dependencies required:**
- Tailwind CSS - Already installed, will be used more extensively
- Framer Motion - Already installed for animations
- All other existing dependencies remain unchanged

### Dependencies to Remove

None - all existing dependencies serve functionality purposes and should be retained.

## [Testing]

Visual regression testing and functionality verification strategy.

### Manual Visual Testing Required

**Page-by-Page Visual Verification:**
1. **LandingPage** - Verify new hero, features, CTA sections render correctly
2. **LoginPage** - Verify authentication form looks modern and is functional
3. **SignupPage** - Verify signup form styling and functionality
4. **HomePage** - Verify all 6 sections (hero, stats, channels, GitHub, agents, CTA) display properly
5. **DocsPage** - Verify documentation sidebar navigation and content display
6. **SettingsPage** - Verify all settings sections and form controls
7. **TerminalPage** - Critical: Verify 3-panel layout, chat, code editor, preview all functional
8. **ShowcasePage** - Verify showcase content displays correctly
9. **AuthCallback** - Verify callback page functionality

**Component-Level Testing:**
1. Header navigation and dropdowns
2. Agent chat messages and interactions
3. File tree navigation
4. Code editor functionality
5. Image upload interface
6. Background jobs panel
7. Settings modal
8. Deploy button and modal
9. Status indicators
10. Theme switcher (if retained)

### Cross-Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Testing

Test at breakpoints:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

### Functional Testing (Ensure No Regressions)

**Authentication Flow:**
- [ ] Login with GitHub OAuth works
- [ ] Signup flow works
- [ ] Logout works
- [ ] Protected routes redirect correctly
- [ ] Auth callback handles success/error

**Code Generation:**
- [ ] Chat input accepts messages
- [ ] Code generation starts
- [ ] Progress updates display
- [ ] Generated code displays in editor
- [ ] File tree shows files
- [ ] Code can be edited

**Preview System:**
- [ ] Preview loads generated code
- [ ] Preview updates on code changes
- [ ] WebContainer functionality intact

**Deployment:**
- [ ] Deploy button triggers deployment
- [ ] Deployment status updates
- [ ] Deployment logs display

**Settings:**
- [ ] API key can be saved
- [ ] Preferences can be updated
- [ ] Theme switching works (if retained)
- [ ] Account deletion works

**Background Jobs:**
- [ ] Jobs list displays
- [ ] Job status updates in real-time
- [ ] Job completion notifications work

### Visual Regression Checklist

Before/After Comparison:
- [ ] All terminal aesthetics removed
- [ ] All pages use Inter font
- [ ] No phosphor glow effects remain
- [ ] No ASCII art remains
- [ ] No matrix background effects (unless intentionally kept and modernized)
- [ ] All forms styled modernly
- [ ] All buttons use modern design
- [ ] All cards use modern shadows/borders
- [ ] All animations are smooth and modern
- [ ] Color palette is refined and modern
- [ ] Spacing is consistent and generous
- [ ] Typography hierarchy is clear

### Performance Testing

- [ ] Page load times not significantly impacted
- [ ] Font loading doesn't cause layout shift (use font-display: swap)
- [ ] Animations are performant (60fps)
- [ ] No console errors introduced
- [ ] Bundle size not significantly increased

## [Implementation Order]

Logical sequence of implementation to minimize conflicts and ensure successful integration.

### Phase 1: Foundation Setup (Critical First Steps)

**Step 1.1: Font Setup**
- Install @fontsource/inter package
- Add Inter font imports to main.tsx or index.css
- Verify font loads correctly in browser dev tools

**Step 1.2: Core Theme Variables**
- Update `frontend/src/styles/theme.css` with new color palette
- Replace --font-mono variable to use Inter
- Add new CSS variables for modern design (--card-bg, --glass-bg, etc.)
- Remove phosphor/terminal specific variables
- Test variables load correctly

**Step 1.3: Global Base Styles**
- Update `frontend/src/index.css` with Inter font stack
- Remove terminal font fallbacks
- Update code element styling
- Test global styles apply

**Step 1.4: App-Level Styles**
- Update `frontend/src/App.css` toast and modal styling
- Modernize global components
- Verify updates don't break existing pages

### Phase 2: Create New Modern CSS Classes

**Step 2.1: Create Modern Card System**
- Add new `.card`, `.card-header`, `.card-content` classes to theme.css or new file
- Add modern button classes (`.btn-modern-primary`, etc.)
- Add modern form classes
- Add animation classes

**Step 2.2: Update Tailwind Config**
- Extend tailwind.config.js with modern theme tokens
- Add custom animations if needed
- Verify Tailwind builds correctly

### Phase 3: Component Library Updates (Bottom-Up)

**Step 3.1: Small Utility Components**
- Update `StatusIndicator.tsx` and `.css`
- Update `SoundButton.tsx`
- Update `ErrorFixNotification.tsx`
- Update `TypingEffect.tsx`
- Update `FileUpload.tsx`
- Update `DeployButton.tsx` and `.css`

**Step 3.2: Background Components**
- Evaluate `MatrixBackground.tsx` - Remove or create modern replacement
- Create new modern background component if needed

**Step 3.3: Form Components**
- Update `ChatInput.tsx` and `.css`
- Update `ImageUpload.tsx` and `.css`
- Update `GitHubTokenSettings.tsx`

**Step 3.4: Complex Display Components**
- Update `FileTree.tsx` and `.css`
- Update `CodeEditor.tsx` and `.css` (careful with Monaco)
- Update `DiffViewer.tsx` and `.css`
- Update `PreviewFrame.tsx`
- Update `StaticHtmlPreview.tsx`

**Step 3.5: Chat and Agent Components**
- Update `AgentChat.tsx` and `.css`
- Update `BackgroundJobsPanel.tsx` and `.css`

**Step 3.6: Layout Components**
- Update `Header.tsx` and `.css`
- Update `Layout.tsx` and `.css`
- Update `ThemeSwitcher.tsx` and `.css` (or remove if single theme)

**Step 3.7: Modal Components**
- Update `SettingsModal.tsx` and `.css`

### Phase 4: Page Updates (Top-Down)

**Step 4.1: Authentication Pages (Simpler Pages First)**
- Update `AuthCallback.tsx` and `.css`
- Update `LoginPage.tsx` and `.css`
- Update `SignupPage.tsx` and `.css`
- Update `TelegramAuth.tsx`
- Test authentication flow end-to-end

**Step 4.2: Static/Marketing Pages**
- Update `LandingPage.tsx` (inline styles to modern)
- Update `HomePage.tsx` and `.css` (major redesign)
- Update `ShowcasePage.tsx`
- Test navigation and display

**Step 4.3: Documentation Page**
- Update `DocsPage.tsx` and `.css`
- Test documentation navigation and content display

**Step 4.4: Settings Page**
- Update `SettingsPage.tsx` and `.css`
- Test all settings functionality

**Step 4.5: Terminal Page (MOST CRITICAL - Save for Last)**
- Update `TerminalPage.tsx` and `.css`
- Update `ProjectWorkspace.tsx`
- Test extensively:
  - Chat functionality
  - Code editor
  - File tree
  - Preview system
  - Deployment
  - Background jobs
  - All integrations

### Phase 5: Testing and Refinement

**Step 5.1: Cross-Browser Testing**
- Test in Chrome, Firefox, Safari, Edge
- Fix any browser-specific issues

**Step 5.2: Responsive Testing**
- Test mobile, tablet, desktop layouts
- Fix responsive issues

**Step 5.3: Functional Testing**
- Run through all user flows
- Verify no functionality broken
- Fix any issues discovered

**Step 5.4: Visual Polish**
- Review all pages for consistency
- Adjust spacing, colors, typography
- Ensure cohesive design language
- Fine-tune animations

**Step 5.5: Performance Check**
- Check page load times
- Verify font loading optimized
- Check bundle size
- Optimize if needed

### Phase 6: Final Verification

**Step 6.1: Complete Visual Audit**
- Verify no terminal aesthetics remain
- Verify Inter font used throughout
- Verify modern design consistent across all pages

**Step 6.2: Functionality Verification**
- Complete end-to-end testing of all features
- Authentication, generation, chat, preview, deploy, settings
- Verify no regressions

**Step 6.3: Documentation**
- Update any relevant documentation
- Document new design system if needed
- Update README if UI changes affect setup

**Step 6.4: Pull Request Preparation**
- Review all changes
- Clean up any debugging code
- Ensure code quality
- Prepare PR description with before/after screenshots

### Critical Path Notes

**Must Complete in Order:**
1. Font setup → Theme variables → Global styles (Foundation)
2. Create modern CSS classes (Utilities)
3. Small components → Complex components (Bottom-up)
4. Simple pages → Complex pages (Top-down)
5. TerminalPage LAST (most critical, most complex)

**Parallel Work Possible:**
- After Phase 2, small components (3.1) can be done in parallel
- Authentication pages and static pages can be done in parallel after components done
- Testing can be done incrementally after each page/component update

**Key Checkpoint:** After Phase 4.4 (before TerminalPage), verify all other pages and components working correctly. TerminalPage depends on many components being updated first.
