# 🎮 BloxyUI

**Beautiful, Animated UI Components for Roblox — Powered by AI**

BloxyUI is a complete ecosystem for creating stunning Roblox game interfaces. It includes a web platform, MCP server for AI integration, Roblox Studio plugin, and a powerful Luau module.

![License](https://img.shields.io/badge/license-MIT-blue)
![Roblox](https://img.shields.io/badge/platform-Roblox-red)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)

---

## ✨ Features

- **200+ Icons** — Pixel-perfect, Roblox-ready icons across 8 categories
- **20+ Effects** — Gradients, sparkles, glow, sunburst, particles, neon borders
- **20+ Animations** — Bounce, squish, wobble, pop, shine sweep, heartbeat, and more
- **15+ Components** — Buttons, modals, cards, top bars, notifications, inputs, toggles
- **6 Themes** — Default, Neon, Cartoony, Minimal, Fantasy, Retro
- **MCP Integration** — Connect Claude, ChatGPT, or Antigravity to generate UI with AI
- **Studio Plugin** — Browse, preview, and insert components directly in Roblox Studio
- **Interactive Builder** — Mix icons + effects + animations visually on the web

---

## 📦 Project Structure

```
BloxyUI/
├── server/          # Express.js backend + API routes
├── client/          # React + Vite + TailwindCSS frontend
├── prisma/          # Database schema + seed data
├── module/          # Roblox Luau module (ReplicatedStorage)
├── plugin/          # Roblox Studio plugin
├── server/mcp/      # MCP server for AI integration
├── render.yaml      # Render.com deployment config
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Git

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/bloxyui.git
cd bloxyui

# 2. Install dependencies
npm install
cd client && npm install && cd ..

# 3. Set up environment
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# 4. Initialize database
npx prisma migrate dev --name init
npm run db:seed

# 5. Start development server
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/icons` | GET | Search/list icons |
| `/api/effects` | GET | Search/list effects |
| `/api/animations` | GET | Search/list animations |
| `/api/components` | GET | Search/list components |
| `/api/themes` | GET | List all themes |
| `/api/generate` | POST | Generate Luau code |

### Query Parameters
- `?search=shop` — Search by name
- `?category=commerce` — Filter by category
- `?type=hover` — Filter by type
- `?page=1&limit=20` — Pagination

---

## 🤖 MCP Integration (AI)

Connect BloxyUI to any AI assistant that supports MCP:

### Setup
```json
{
  "mcpServers": {
    "bloxyui": {
      "command": "node",
      "args": ["server/mcp/server.js"],
      "env": {
        "DATABASE_URL": "your_database_url"
      }
    }
  }
}
```

### Available MCP Tools
| Tool | Description |
|------|-------------|
| `bloxyui_search_icons` | Search icons by name/category |
| `bloxyui_search_effects` | Search UI effects |
| `bloxyui_search_animations` | Search animations |
| `bloxyui_get_component` | Get component by slug |
| `bloxyui_build_ui` | Build complete UI element |
| `bloxyui_list_themes` | List all themes |
| `bloxyui_generate_screen` | Generate full game screen |

---

## 🎮 Roblox Luau Module

### Installation
1. Copy `module/BloxyUI/` into `ReplicatedStorage`
2. Require in your LocalScript:

```lua
local BloxyUI = require(game.ReplicatedStorage.BloxyUI)

-- Create a beautiful button
local shopButton = BloxyUI.CreateButton({
    Text = "SHOP",
    Size = "large",
    Variant = "gradient",
    Theme = "Cartoony",
    OnClick = function()
        print("Shop opened!")
    end
})
shopButton.Parent = playerGui.ScreenGui

-- Apply animation
BloxyUI.Animations.Bounce(shopButton)

-- Apply effect
BloxyUI.Effects.Sparkle(shopButton)
```

### Available Components
- `CreateButton` — Animated buttons with 3D depth
- `CreateModal` — Dialog with overlay and transitions
- `CreateCard` — Content cards with hover effects
- `CreateTopBar` — Game HUD with coin/gem display
- `CreateSideMenu` — Slide-in navigation
- `CreateNotification` — Toast notifications
- `CreateTooltip` — Hover tooltips
- `CreateBadge` — Status badges
- `CreateProgressBar` — Animated progress bars
- `CreateInput` — Text input fields
- `CreateToggle` — Toggle switches
- `CreateDropdown` — Dropdown selects
- `CreateTabs` — Tab navigation

---

## 🔌 Roblox Studio Plugin

### Installation
1. Use Rojo to build: `rojo build plugin/BloxyUI -o BloxyUI.rbxmx`
2. Place in your Roblox Studio Plugins folder
3. Click the BloxyUI button in the toolbar

### Features
- Browse icons, effects, and animations with search
- Live preview of components
- One-click insert into your game
- Theme selector
- Interactive component builder

---

## ☁️ Deployment (Render.com)

1. Push to GitHub
2. Create a new **Blueprint** on Render.com
3. Connect your repository
4. Render will auto-detect `render.yaml` and create:
   - Web Service (Node.js)
   - PostgreSQL Database
5. The database will be seeded automatically on first deploy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Frontend | React, Vite, TailwindCSS |
| Database | PostgreSQL, Prisma ORM |
| MCP Server | @modelcontextprotocol/sdk |
| Roblox | Luau, TweenService |
| Deployment | Render.com |

---

## 📄 License

MIT License — use freely in your Roblox games and projects.

---

**Made with ❤️ for the Roblox developer community**
