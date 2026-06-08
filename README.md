# 🚀 VibeCoder: Wireframe to App

> **An elite AI-powered Vibe Coding tool that instantly transforms your hand-drawn wireframes into production-ready React + Tailwind CSS web applications.**

Built specifically to win **HackIndia 2026** — Vibe Coding Hackathon.

---

## ✨ Features (All Working Real-Time!)

| Feature | Description |
|---|---|
| **🖌️ Interactive Drawing Canvas** | HTML5 canvas with drag-and-drop image upload, smooth brush strokes, color picker, adjustable brush sizes, eraser, undo/redo stack, and grid overlay. |
| **🤖 Claude Vision AI Generation** | Real-time streaming code generation using Anthropic's Claude 3.5 Sonnet Vision API. It sees your sketch and writes perfect React components. |
| **⚡ Live Preview & Hot Reload** | Instantly interact with the generated code via Sandpack. It compiles React and Tailwind directly in the browser with full hot-reloading. |
| **🎨 Template Gallery** | Don't want to draw? Start instantly with beautiful premium templates: Dashboards, Pricing Pages, User Profiles, E-commerce Cards, and Chat UI. |
| **🕒 Version History UI** | Never lose your work. Every generation is automatically saved locally. Browse through your past generations, view timestamps, and restore any previous version with one click. |
| **💬 Chat Refinement** | Iterate like a pro. Type "make the button bigger" or "add a dark mode toggle" in the chat, and the AI will incrementally update your code while preserving the existing layout. |
| **📱 Responsive Viewport Switcher** | Test your generated UI instantly across Desktop, Tablet, and Mobile views. |
| **🔗 Public Share Links** | One-click generate public, shareable preview links for your prototypes. Send them to your team to test the live app. |
| **💾 Local-First Architecture** | Completely serverless-safe. All your projects, versions, and shares are saved instantly to local storage for blazing-fast performance. |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Engine**: Anthropic Claude 3.5 Sonnet (Vision API)
- **Code Editor**: Monaco Editor (VS Code engine)
- **Live Preview Environment**: Sandpack (by CodeSandbox)
- **State Management**: Zustand
- **Animations**: Framer Motion & Canvas-Confetti
- **Icons**: Lucide React
- **Storage**: Client-side LocalStorage (Fully serverless compatible)

---

## 🚀 Deployment: Vercel vs GitHub Pages

> **⚠️ CRITICAL: DO NOT USE GITHUB PAGES!**
> GitHub Pages only supports static HTML/CSS/JS. Because this app uses a powerful **Next.js Serverless API Route** (`/api/generate/sketch`) to securely stream data from Claude Vision AI, **it cannot be hosted on GitHub Pages.**

**The only correct way to deploy this app is on [Vercel](https://vercel.com):**
1. Push your code to GitHub.
2. Go to Vercel and click "Add New Project" -> Import your GitHub repo.
3. In Vercel Environment Variables, add `ANTHROPIC_API_KEY` = `your_real_key_here`.
4. Click Deploy! It will instantly host your app with fully functioning AI streaming.

---

## 🚀 Quick Start Guide (Local)

### 1. Clone the repository
```bash
git clone https://github.com/Jahnavi-Mogarala/VibeCoder.git
cd VibeCoder
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Open `.env` and add your **Anthropic API Key**:
```env
ANTHROPIC_API_KEY="your_real_claude_api_key_here"
```
*(Note: If you don't add an API key, the app gracefully falls back to a smart demo simulation mode so you can still test the UI!)*

### 4. Run the Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to start vibe coding!

---

## 🎯 How to Use (The Vibe Coding Flow)

1. **Create Workspace**: Go to the Dashboard and click "New Project Workspace".
2. **Draw or Select**: Either draw a wireframe on the canvas OR click "Templates" to load a pre-built premium layout.
3. **Select Style**: Choose your desired aesthetic (Glassmorphism, Dark Mode, Minimal, etc.).
4. **Generate**: Click the glowing generate button and watch the code stream in real-time.
5. **Preview**: Switch to the "Live Preview" tab to interact with your new app.
6. **Refine**: Use the chat box at the bottom to ask the AI for specific tweaks.
7. **Export**: Click "Share" to generate a live public URL, or "Download" to get the raw `.tsx` file.

---

## 📂 Architecture Overview

```
├── app/
│   ├── page.tsx              # Landing page with animations
│   ├── dashboard/            # Project management grid
│   ├── editor/[projectId]/   # Main workspace editor (Canvas, Code, Preview)
│   ├── preview/[slug]/       # Public shared preview renderer
│   └── api/generate/sketch/  # Next.js API route for Claude Vision streaming
├── components/
│   ├── canvas/               # HTML5 Drawing tools and logic
│   ├── preview/              # Monaco editor, Sandpack preview, Version History UI
│   ├── generation/           # Template Gallery, Chat Refinement, Style Selector
│   ├── export/               # Export Panel, Share Modal
│   └── layout/               # Navigation
├── hooks/                    # useCanvas, useGeneration custom logic
├── lib/                      # claude.ts (API client), storage.ts (LocalDB)
└── store/                    # editorStore.ts (Zustand global state)
```

---

## 💡 Why this fits "Vibe Coding"

Writing boilerplate UI code is tedious. **Vibe Coding** is about capturing the "vibe" or intention of what you want to build and letting AI handle the syntax. By combining raw hand-drawn sketches with Claude's incredible vision capabilities, this app bridges the gap between imagination and production code. You just vibe, draw, and deploy.

---

## 👩‍💻 Developed By

**Jahnavi Mogarala** — Built for HackIndia 2026.

---

## 📄 License

MIT License. Feel free to use and modify for your own projects.
