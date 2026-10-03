import { Link } from 'react-router-dom';
import { Sparkles, Layers, Box, Code2, ArrowRight, Wand2, Terminal, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      {/* Hero Section */}
      <section className="text-center py-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] mb-6 text-xs font-semibold text-[var(--accent-secondary)]">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
          <span>230+ Icons • 50+ Effects • 50+ Animations • MCP Server Ready</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="block text-[var(--text-primary)] mb-2">Build Juicy</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] via-[#ff7675] to-[var(--accent-warning)] anim-shine">
            Roblox Game UIs
          </span>
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
          No more flat, boring Roblox UIs. BloxyUI provides production-grade 3D cartoony buttons, physics animations, sunburst rays, and an AI MCP bridge for Claude, ChatGPT, and Antigravity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/builder" className="w-full sm:w-auto px-8 py-4 bg-[var(--accent-primary)] hover:bg-[#5b4dcf] text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:glow-purple flex items-center justify-center gap-2 shadow-xl">
            Open Interactive Builder <Wand2 className="w-5 h-5" />
          </Link>
          <Link to="/icons" className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
            Browse 230+ Icons <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="my-10 w-full max-w-4xl">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-[var(--border-color)] relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#ff7675] rounded-full blur-[100px] opacity-25"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[var(--accent-primary)] rounded-full blur-[100px] opacity-25"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-secondary)] mb-2">Tactile Physics Demonstration</span>
            <h2 className="text-3xl font-extrabold mb-8 text-white">Click & Hover The Cartoony Button</h2>
            
            <div className="p-12 bg-[#12122a] rounded-2xl border border-[var(--border-color)] flex items-center justify-center min-w-[320px] shadow-2xl relative select-none">
              {/* Cartoony 3D Button */}
              <div className="relative group cursor-pointer active:translate-y-1.5 transition-all">
                {/* 3D bottom shadow layer */}
                <div className="absolute inset-0 bg-[#8b0000] rounded-2xl translate-y-2.5"></div>
                
                {/* Top face button */}
                <button className="relative z-10 px-10 py-5 bg-gradient-to-b from-[#ff7675] via-[#e84393] to-[#d63031] border-4 border-white rounded-2xl font-black text-2xl text-white shadow-lg tracking-wider flex items-center gap-3.5 hover:scale-105 active:scale-95 transition-transform">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 6h16l-2 10H6L4 6z M2 6l2 10" />
                  </svg>
                  <span>SHOP</span>
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mt-6">
              Features: 3D Depth Layer • UICorner 16px • UIStroke 4px White • UIGradient 90deg • TweenService Squish on Click
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto my-12 w-full">
        {[
          { icon: <Box className="w-8 h-8 text-[var(--accent-primary)]" />, title: "230+ Icons", desc: "Combat, RPG, Commerce, Magic & Navigation with ready Roblox Asset IDs" },
          { icon: <Sparkles className="w-8 h-8 text-[var(--accent-success)]" />, title: "50+ Effects", desc: "Sunburst rays, comic halftones, neon strokes, particles, and 3D bevels" },
          { icon: <Layers className="w-8 h-8 text-[#ff7675]" />, title: "50+ Animations", desc: "Juicy squish, elastic bounce, 3D coin flips, and shine sweeps" },
          { icon: <Code2 className="w-8 h-8 text-[var(--accent-warning)]" />, title: "AI MCP Server", desc: "Give Claude, ChatGPT, and Antigravity the power to build full games" }
        ].map((feature, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:-translate-y-1.5 transition-all">
            <div className="mb-4 bg-[var(--bg-secondary)] w-14 h-14 rounded-xl flex items-center justify-center border border-[var(--border-color)]">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Integration Callouts */}
      <section className="w-full max-w-5xl my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-5 h-5 text-[var(--accent-primary)]" />
              <h3 className="text-xl font-bold text-white">Roblox Studio Plugin</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Install the BloxyUI plugin into Roblox Studio to browse all 230+ icons, audition 50+ effects in real-time, and insert 100% functional Luau UI elements in one click.
            </p>
          </div>
          <Link to="/docs" className="text-sm font-bold text-[var(--accent-secondary)] hover:underline flex items-center gap-1">
            Read Plugin Setup Guide →
          </Link>
        </div>

        <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-success)]" />
              <h3 className="text-xl font-bold text-white">PostgreSQL & Render Ready</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Fully architected for cloud deployment on Render.com with managed PostgreSQL, Prisma ORM, continuous migrations, and zero-downtime static bundling.
            </p>
          </div>
          <Link to="/docs" className="text-sm font-bold text-[var(--accent-success)] hover:underline flex items-center gap-1">
            Deployment Architecture Details →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
