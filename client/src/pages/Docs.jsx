import { Book, Terminal, Code, Settings, Server, Database, Globe, Cpu, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Docs() {
  const [copiedSection, setCopiedSection] = useState(null);

  const copySnippet = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const claudeConfig = `{
  "mcpServers": {
    "bloxyui": {
      "command": "node",
      "args": ["C:\\\\Users\\\\user\\\\Desktop\\\\IconStore\\\\server\\\\mcp\\\\server.js"]
    }
  }
}`;

  const envSample = `# Port va muhit
PORT=3001
NODE_ENV=production

# Render.com yoki Supabase/Neon PostgreSQL URL:
DATABASE_URL="postgres://bloxyui_user:password@dpg-xxxxxx.oregon-postgres.render.com/bloxyui"`;

  const mcpPromptSample = `"Menga Roblox o'yini uchun Shop (Do'kon) menyusini Cartoony uslubida, 
qizil gradient va yaltiroq shine sweep animatsiyasi bilan yaratib ber. 
BloxyUI MCP orqali tayyor Luau kodini ber."`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-secondary)] text-xs font-mono uppercase tracking-wider mb-2">
          <span>Complete Integration Guide</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">BloxyUI Documentation</h1>
        <p className="text-base text-[var(--text-secondary)] mt-2">
          MCP orqali AI assistentlarni ulash, Render.com da deploy qilish, .env faylini sozlash va Roblox Studio'da foydalanish bo'yicha to'liq qo'llanma.
        </p>
      </div>

      <div className="space-y-10">
        
        {/* Section 1: MCP AI Integration */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Cpu className="w-32 h-32" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
              <Cpu className="w-6 h-6 text-[var(--accent-primary)]" />
              1. MCP (Model Context Protocol) orqali AI ga ulash
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              BloxyUI o'zining ichki <strong>MCP Serveriga</strong> ega. Uni <strong>Claude Desktop</strong>, <strong>Cursor</strong>, <strong>Windsurf</strong>, <strong>Antigravity</strong> yoki boshqa AI assistentlarga ulab qo'ysangiz, AI avtomatik ravishda 200 ta effect, 520+ icon va Roblox Studio uchun toza Luau kodlarini topib, birlashtirib beradi.
            </p>

            <div className="bg-[#141428] rounded-xl overflow-hidden border border-[var(--border-color)] mb-4">
              <div className="px-4 py-2.5 bg-[#1a1a38] text-xs text-gray-300 border-b border-[var(--border-color)] flex items-center justify-between">
                <span className="font-mono">claude_desktop_config.json (yoki Cursor MCP Sozlamasi)</span>
                <button
                  onClick={() => copySnippet(claudeConfig, 'claude')}
                  className="flex items-center gap-1 text-[11px] text-[var(--accent-secondary)] hover:text-white"
                >
                  {copiedSection === 'claude' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'claude' ? 'Nusxalandi' : 'Nusxalash'}</span>
                </button>
              </div>
              <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#0e0e1e' }}>
                {claudeConfig}
              </SyntaxHighlighter>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200">
              <p className="font-bold mb-1">💡 AI ga nima deb yozasiz?</p>
              <p className="font-mono text-purple-300">{mcpPromptSample}</p>
              <p className="mt-2 text-gray-300">
                AI darhol MCP vositalari (<code className="text-purple-300">bloxyui_get_bloxfx_asset</code> yoki <code className="text-purple-300">bloxyui_build_ui</code>) orqali to'liq Roblox Luau kodini chiqarib beradi.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Environment Variables (.env) */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Database className="w-32 h-32" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
              <Database className="w-6 h-6 text-[var(--accent-success)]" />
              2. Nima .env kerak? (Konfiguratsiya)
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Loyiha ildizida (root) <code className="text-white bg-black/40 px-1 py-0.5 rounded">.env</code> fayli joylashadi. Unda server porti va PostgreSQL ma'lumotlar bazasi ulanish manzili bo'ladi.
            </p>

            <div className="bg-[#141428] rounded-xl overflow-hidden border border-[var(--border-color)] mb-4">
              <div className="px-4 py-2.5 bg-[#1a1a38] text-xs text-gray-300 border-b border-[var(--border-color)] flex items-center justify-between">
                <span className="font-mono">.env</span>
                <button
                  onClick={() => copySnippet(envSample, 'env')}
                  className="flex items-center gap-1 text-[11px] text-[var(--accent-secondary)] hover:text-white"
                >
                  {copiedSection === 'env' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'env' ? 'Nusxalandi' : 'Nusxalash'}</span>
                </button>
              </div>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#0e0e1e' }}>
                {envSample}
              </SyntaxHighlighter>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <span className="font-mono text-[var(--accent-success)] font-bold">PORT:</span>
                <span>Server ishlaydigan port (default 3001). Render.com da avtomatik tarzda o'rnatiladi.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-[var(--accent-success)] font-bold">DATABASE_URL:</span>
                <span>PostgreSQL ulanish stringi. Render'da bepul Postgres ochganingizda beriladigan External yoki Internal Connection URL.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-yellow-400 font-bold">Muhim eslatma:</span>
                <span>Agar hozircha PostgreSQL ulamasangiz ham, server avtomatik ravishda ichki 520+ icon va 200 ta effectlar katalogi bilan xatosiz to'liq ishlayveradi (fallback rejimida).</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Render.com Deployment */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Globe className="w-32 h-32" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
              <Globe className="w-6 h-6 text-[var(--accent-warning)]" />
              3. Render.com ga Deploy qilish
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Loyiha arxitekturasi <strong>Web Service</strong> sifatida ham backend Express API, ham frontend React SPA ni bitta portda ishga tushirishga moslashtirilgan.
            </p>

            <ol className="space-y-4 text-xs text-gray-300">
              <li className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)]">
                <strong className="text-white text-sm block mb-1">1-Qadam: Render.com ga kiring va New + bosing</strong>
                <span>GitHub hisobingiz orqali <code>https://github.com/qosimovaumida345-ux/BloxyUI</code> repozitoriyasini tanlang.</span>
              </li>
              <li className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)]">
                <strong className="text-white text-sm block mb-1">2-Qadam: PostgreSQL bazasini oching</strong>
                <span>Render panelidan <strong>New PostgreSQL</strong> yarating (bepul Free rejimida). Yaratilgach, uning <strong>External Database URL</strong> nusxasini oling.</span>
              </li>
              <li className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)]">
                <strong className="text-white text-sm block mb-1">3-Qadam: Web Service yarating</strong>
                <div className="mt-2 space-y-1 font-mono text-[11px] text-gray-400">
                  <div><strong>Build Command:</strong> <code>npm install</code> (postinstall avtomatik ravishda clientni ham yig'adi)</div>
                  <div><strong>Start Command:</strong> <code>npm start</code></div>
                  <div><strong>Environment Variables:</strong> <code>DATABASE_URL</code> = o'sha Postgres URL</div>
                </div>
              </li>
              <li className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)]">
                <strong className="text-white text-sm block mb-1">4-Qadam: Sayt jonli ishga tushadi!</strong>
                <span>Render sizga <code>https://bloxyui.onrender.com</code> kabi bepul global domen beradi. Sayt ham, API ham shu yerda ishlaydi.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Section 4: Roblox Studio Usage */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Terminal className="w-32 h-32" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
              <Terminal className="w-6 h-6 text-[var(--lime)]" />
              4. Roblox Studio'da Ishlatish
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Hech qanday tashqi rasm, kutubxona yoki murakkab plaginlarsiz — toza Luau va TweenService bilan ishlaydi:
            </p>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--lime)] text-black font-extrabold flex items-center justify-center flex-shrink-0">1</div>
                <div>Saytdagi <strong>BloxFX</strong> sahifasidan xohlagan animatsiyali effektni tanlang va sozlashingizdan so'ng <strong>Copy Customized Luau</strong> tugmasini bosing.</div>
              </div>
              <div className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--lime)] text-black font-extrabold flex items-center justify-center flex-shrink-0">2</div>
                <div>Roblox Studio Explorer oynasida: <code>StarterPlayer → StarterPlayerScripts</code> ga kiring va yangi <strong>LocalScript</strong> qo'shing.</div>
              </div>
              <div className="p-3 bg-[#131326] rounded-xl border border-[var(--border-color)] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--lime)] text-black font-extrabold flex items-center justify-center flex-shrink-0">3</div>
                <div>Nusxalangan kodni joylashtiring va <strong>Play (F5)</strong> bosing. Jonli interaktiv UI tayyor!</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Docs;
