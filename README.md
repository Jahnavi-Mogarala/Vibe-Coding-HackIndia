# 🎨 WireframeToApp

> **AI-powered tool that converts hand-drawn UI sketches into live React + Tailwind code using Claude Vision API.**

Built for **HackIndia** 🇮🇳 — Vibe Coding Hackathon

---

## ✨ Features

| Feature | Description |
|---|---|
| **🖌️ Canvas Drawing Engine** | Smooth HTML5 canvas with brush configs, color picker, eraser, undo/redo, grid overlay, and image upload |
| **🤖 Claude Vision Pipeline** | Streaming AI code generation that analyzes sketches and outputs production React + Tailwind components |
| **⚡ Live Preview** | Sandpack-powered hot-reloading browser previews with Tailwind CDN, error capture, and viewport switching |
| **💬 Chat Refinement** | Iteratively refine generated code with natural language prompts |
| **📊 Dashboard** | Project management with create, delete, and quick-access editor links |
| **🔗 Shareable Links** | Generate public preview links for your prototypes |
| **📱 Responsive Viewports** | Switch between desktop, tablet, and mobile preview modes |
| **🎨 Style Themes** | Dark mode, minimal, glassmorphism, and material design presets |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Anthropic Claude 3.5 Sonnet](https://anthropic.com/) (Vision API)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Live Preview**: [Sandpack](https://sandpack.codesandbox.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Database**: [Prisma](https://www.prisma.io/) + SQLite
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Jahnavi-Mogarala/Vibe-Coding-HackIndia.git
cd Vibe-Coding-HackIndia

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Optional | SQLite connection string (default: `file:./dev.db`) |
| `ANTHROPIC_API_KEY` | Optional | Claude API key for real AI generation (demo mode works without it) |

> **Note**: The app works in **full demo mode** without any API keys! Mock data and AI responses are generated automatically.

---

## 📂 Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/            # Project management dashboard
│   ├── editor/[projectId]/   # Main workspace editor
│   ├── preview/[slug]/       # Public shared previews
│   └── api/                  # API routes (generate, projects, share, usage)
├── components/
│   ├── canvas/               # Drawing tools (DrawingCanvas, Toolbar, Controls)
│   ├── preview/              # Code editor, live preview, split pane, viewport switcher
│   ├── generation/           # AI chat refinement, progress indicator, style prompt
│   ├── export/               # Export panel, share modal
│   └── layout/               # Navbar
├── hooks/                    # Custom hooks (useCanvas, useGeneration)
├── lib/                      # Claude API client, Prisma client, utilities
├── store/                    # Zustand state management
└── prisma/                   # Database schema
```

---

## 🎯 How It Works

1. **Draw** → Sketch your UI wireframe on the canvas (or upload an image)
2. **Generate** → Claude Vision AI analyzes your sketch and generates React + Tailwind code
3. **Preview** → See your component rendered live in the browser
4. **Refine** → Use chat prompts to iteratively improve the generated code
5. **Export** → Copy JSX, download `.tsx`, or create shareable preview links

---

## 👩‍💻 Team

- **Jahnavi Mogarala** — Developer

---

## 📄 License

This project was built for HackIndia 2026 — Vibe Coding Hackathon.
