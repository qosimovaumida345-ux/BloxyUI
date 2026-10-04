import { useState } from 'react';
import { 
  Book, Terminal, Code, Settings, Server, Database, Globe, Cpu, 
  Check, Copy, Play, Sparkles, Send, ExternalLink, HelpCircle, ArrowRight, Box
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Docs() {
  const [copiedSection, setCopiedSection] = useState(null);

  // Live API Tester State
  const [testTool, setTestTool] = useState('bloxyui_get_bloxfx_asset');
  const [testArgs, setTestArgs] = useState('{\n  "query": "Crimson",\n  "category": "Buttons"\n}');
  const [testResponse, setTestResponse] = useState('');
  const [testing, setTesting] = useState(false);

  const copySnippet = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleTestApi = async () => {
    setTesting(true);
    setTestResponse('Sending request to /api/mcp/call...');
    try {
      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(testArgs);
      } catch (err) {
        setTestResponse(`JSON parse error in arguments: ${err.message}`);
        setTesting(false);
        return;
      }

      const res = await fetch('/api/mcp/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: testTool,
          arguments: parsedArgs
        })
      });
      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setTestResponse(`API Error: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  // Remote MCP Configuration (No local files needed!)
  const remoteMcpConfig = `{
  "mcpServers": {
    "bloxyui": {
      "url": "https://bloxyui.onrender.com/sse"
    }
  }
}`;

  // Ready AI System Prompt
  const aiSystemPrompt = `You are an expert Roblox UI engineer connected to the BloxyUI API.
Base URL: https://bloxyui.onrender.com

When the user asks for Roblox UI, buttons, health bars, inventory panels, loaders, or 200 BloxFX effects:
1. Call the BloxyUI REST API endpoint:
   POST https://bloxyui.onrender.com/api/mcp/call
   Content-Type: application/json
   Body: {"tool": "bloxyui_get_bloxfx_asset", "arguments": {"query": "...", "category": "..."}}

2. Or generate procedural beveled UI:
   Body: {"tool": "bloxyui_build_ui", "arguments": {"componentSlug": "button", "themeSlug": "cartoony", "customText": "SHOP"}}

3. Always return complete, standalone, production-grade Luau scripts ready to paste into Roblox Studio StarterPlayerScripts.`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Server className="w-3.5 h-3.5" />
          <span>Server-Hosted MCP & REST API Hub</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">BloxyUI Documentation</h1>
        <p className="text-base text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          BloxyUI'ni online server orqali Claude, Cursor, ChatGPT yoki har qanday AI assistentiga ulash, REST API so'rovlari va Roblox Studio integratsiyasi bo'yicha to'liq qo'llanma.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* ROBLOX STUDIO PLUGIN BANNER */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-[#12131f] border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-950/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Roblox Studio Rasmiy Plagini</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-500/40">v2.0.0</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                Barcha 200+ BloxFX animatsiyalar va 146+ Lucide iconlarni to'g'ridan-to'g'ri Roblox Studio ichida 1 marta bosishda ishlatish!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/plugin"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
            >
              <span>O'rnatish Qo'llanmasi</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/BloxyUI.rbxmx"
              download="BloxyUI.rbxmx"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 transition-all"
            >
              <span>.rbxmx Yuklab olish</span>
            </a>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION 1: REMOTE MCP SERVER (NO LOCAL CODE NEEDED!)               */}
        {/* ================================================================== */}
        <section className="glass p-8 rounded-3xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Cpu className="w-32 h-32" /></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-2xl font-bold flex items-center gap-2.5 text-white">
                <Globe className="w-6 h-6 text-green-400" />
                1. Online Remote MCP Server (SSE)
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 font-mono border border-green-500/30">
                Live & Hosted
              </span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Foydalanuvchilar kompyuterida <strong>hech qanday kod yoki Node.js o'rnatishi shart emas!</strong> BloxyUI to'g'ridan-to'g'ri bulutda ishlaydigan <strong>Server-Sent Events (SSE)</strong> MCP serveriga ega. Claude Desktop yoki Cursor sozlamalariga faqat bitta URL qo'shsangiz kifoya:
            </p>

            <div className="bg-[#090912] p-4 rounded-xl border border-[var(--border-color)] relative mb-4">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-xs font-mono text-gray-400">
                <span>Claude Desktop / Cursor config (claude_desktop_config.json)</span>
                <button
                  onClick={() => copySnippet(remoteMcpConfig, 'remoteMcp')}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs flex items-center gap-1 font-sans transition-all"
                >
                  {copiedSection === 'remoteMcp' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'remoteMcp' ? 'Nusxalandi!' : 'Nusxalash'}</span>
                </button>
              </div>
              <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
                {remoteMcpConfig}
              </SyntaxHighlighter>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-xs text-green-300">
              ✓ <strong>Tayyor:</strong> AI avtomatik ravishda 200 ta BloxFX effekti, 520+ icon va barcha UI generator vositalarini ko'ra oladi va foydalanuvchiga toza Luau kodlarini taqdim etadi!
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 2: DIRECT HTTP REST API (CHATGPT ACTIONS & CURL)           */}
        {/* ================================================================== */}
        <section className="glass p-8 rounded-3xl border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2.5 text-white">
            <Server className="w-6 h-6 text-cyan-400" />
            2. To'g'ridan-to'g'ri HTTP REST API (ChatGPT, Python, Curl)
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Agar foydalanuvchi ChatGPT Custom GPT, OpenAI Function Calling yoki oddiy HTTP so'rovlar orqali ishlatmoqchi bo'lsa, quyidagi Base-URL va metodlar ochiq:
          </p>

          <div className="p-3.5 rounded-xl bg-[#12122a] border border-[var(--border-color)] mb-6 flex items-center justify-between font-mono text-sm">
            <span className="text-gray-400">Live Base URL:</span>
            <span className="text-green-400 font-bold">https://bloxyui.onrender.com</span>
          </div>

          {/* Endpoints Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border border-[var(--border-color)] rounded-xl overflow-hidden">
              <thead className="bg-[#12122a] text-gray-300 font-mono uppercase">
                <tr>
                  <th className="p-3">Metod</th>
                  <th className="p-3">Endpoint</th>
                  <th className="p-3">Vazifasi</th>
                  <th className="p-3">Parametrlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-gray-300 font-mono">
                <tr className="hover:bg-white/5">
                  <td className="p-3 text-yellow-400 font-bold">POST</td>
                  <td className="p-3 text-white">/api/mcp/call</td>
                  <td className="p-3 font-sans">Ixtiyoriy MCP tool'ni chaqirish (200 asset, generator)</td>
                  <td className="p-3"><code>{"{ tool, arguments }"}</code></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 text-cyan-400 font-bold">GET</td>
                  <td className="p-3 text-white">/api/mcp/tools</td>
                  <td className="p-3 font-sans">Barcha mavjud 8 ta MCP tool ro'yxati va sxemasi</td>
                  <td className="p-3">-</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 text-cyan-400 font-bold">GET</td>
                  <td className="p-3 text-white">/api/bloxfx</td>
                  <td className="p-3 font-sans">Barcha 200 ta BloxFX assetlar ro'yxati</td>
                  <td className="p-3"><code>?category=Buttons&search=...</code></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 text-cyan-400 font-bold">GET</td>
                  <td className="p-3 text-white">/api/bloxfx/:id</td>
                  <td className="p-3 font-sans">Bitta assetning to'liq Luau kodi</td>
                  <td className="p-3"><code>:id (1 to 200)</code></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 text-yellow-400 font-bold">POST</td>
                  <td className="p-3 text-white">/api/generate</td>
                  <td className="p-3 font-sans">Tugma, panel, progressbar Luau kodini generatsiya qilish</td>
                  <td className="p-3"><code>{"{ componentType, theme, text }"}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Request Example */}
          <div className="bg-[#090912] p-4 rounded-xl border border-[var(--border-color)]">
            <span className="text-[11px] font-mono text-gray-400 block mb-2">
              Misol so'rov (Curl orqali 200 ta BloxFX assetlaridan olish):
            </span>
            <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`curl -X POST https://bloxyui.onrender.com/api/mcp/call \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "bloxyui_get_bloxfx_asset",
    "arguments": {
      "query": "Crimson Sweep",
      "category": "Buttons"
    }
  }'`}
            </SyntaxHighlighter>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: READY AI SYSTEM PROMPT (TAYYOR AI INSTRUKSIYASI)       */}
        {/* ================================================================== */}
        <section className="glass p-8 rounded-3xl border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold flex items-center gap-2.5 text-white">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              3. Tayyor AI Instruksiyasi (ChatGPT / Claude uchun)
            </h2>
            <button
              onClick={() => copySnippet(aiSystemPrompt, 'aiPrompt')}
              className="px-3 py-1.5 bg-[var(--accent-primary)] hover:bg-[#ff575e] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow"
            >
              {copiedSection === 'aiPrompt' ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'aiPrompt' ? 'Nusxalandi!' : 'Promptni Nusxalash'}</span>
            </button>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            Ushbu matnni ChatGPT Custom GPT ko'rsatmasiga (Instructions) yoki Claude / Cursor tizim instruksiyasiga tashlab qo'ysangiz, AI mustaqil ravishda serverimizdan barcha 200 ta effektdan foydalana oladi:
          </p>

          <div className="bg-[#090912] p-5 rounded-2xl border border-[var(--border-color)] text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
            {aiSystemPrompt}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: INTERACTIVE LIVE API PLAYGROUND (TEST CONSOLE)          */}
        {/* ================================================================== */}
        <section className="glass p-8 rounded-3xl border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2.5 text-white">
            <Terminal className="w-6 h-6 text-purple-400" />
            4. Live API Tester (Brauzerda sinab ko'rish)
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Quyidagi form orqali to'g'ridan-to'g'ri serverga so'rov yuborib, javobni jonli ko'rishingiz mumkin:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Select Tool Name
                </label>
                <select
                  value={testTool}
                  onChange={(e) => setTestTool(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="bloxyui_get_bloxfx_asset">bloxyui_get_bloxfx_asset (200 Assets)</option>
                  <option value="bloxyui_build_ui">bloxyui_build_ui (Custom Generator)</option>
                  <option value="bloxyui_search_icons">bloxyui_search_icons (520+ Icons)</option>
                  <option value="bloxyui_list_themes">bloxyui_list_themes (16 Themes)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  JSON Arguments
                </label>
                <textarea
                  rows={6}
                  value={testArgs}
                  onChange={(e) => setTestArgs(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3 text-white font-mono text-xs outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <button
                onClick={handleTestApi}
                disabled={testing}
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] disabled:opacity-50"
              >
                {testing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
                <span>Send Live API Request</span>
              </button>
            </div>

            {/* Response Console */}
            <div className="flex flex-col">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                Server Response Output
              </label>
              <div className="flex-1 bg-[#090912] border border-[var(--border-color)] rounded-xl p-4 overflow-auto max-h-[300px] text-xs font-mono text-green-400">
                {testResponse ? (
                  <pre className="whitespace-pre-wrap">{testResponse}</pre>
                ) : (
                  <span className="text-gray-500">Kutilyapti... "Send Live API Request" tugmasini bosing.</span>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

export default Docs;
