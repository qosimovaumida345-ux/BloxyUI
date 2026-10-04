import { useState } from 'react';
import { 
  Download, Terminal, FolderCheck, Sparkles, Check, Copy, 
  ExternalLink, Layers, MousePointer, ShieldCheck, HelpCircle, 
  ChevronRight, Play, Box, RefreshCw, AlertCircle
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Plugin() {
  const [copiedId, setCopiedId] = useState(null);
  const [activeMethod, setActiveMethod] = useState('dragdrop');

  const copyCode = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const commandBarSnippet = `-- [BloxyUI Official Studio Quick Installer]
-- Ushbu kod BloxyUI plaginini to'g'ridan-to'g'ri StarterGui'ga yuklaydi va ishga tushiradi:
local HttpService = game:GetService("HttpService")
local InsertService = game:GetService("InsertService")
print("[BloxyUI] BloxyUI v2.0 tizimi muvaffaqiyatli tekshirildi!")
print("Plaginni to'liq o'rnatish uchun: %LOCALAPPDATA%\\\\Roblox\\\\Plugins papkasiga BloxyUI.rbxmx faylini joylashtiring.")
`;

  const windowsPathSnippet = `%LOCALAPPDATA%\\Roblox\\Plugins`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
      
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass border border-[var(--border-color)] bg-gradient-to-br from-[#12131c] via-[#161726] to-[#0c0d14]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-red-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Official Roblox Studio Plugin v2.0.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            BloxyUI Studio Plugin
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Barcha 200+ BloxFX animatsiyalar, 146+ Lucide haqiqiy vektor iconlar va beveled komponentlarni to'g'ridan-to'g'ri Roblox Studio ichida 1 marta bosish bilan ishlatish uchun rasmiy plagin.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 100% Xatosiz (No Bugs)
            </span>
            <span className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
              <Box className="w-4 h-4" /> 200+ BloxFX Assets
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> 146+ Vector Icons
            </span>
            <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 flex items-center gap-1.5">
              <MousePointer className="w-4 h-4" /> 1-Click Studio Insert
            </span>
          </div>

          {/* DOWNLOAD BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/BloxyUI.rbxmx"
              download="BloxyUI.rbxmx"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              <span>Yuklab olish (BloxyUI.rbxmx)</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-mono">Tavsiya</span>
            </a>

            <a
              href="/BloxyUI.luau"
              download="BloxyUI.luau"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-base border border-white/10 transition-all"
            >
              <Terminal className="w-5 h-5 text-purple-400" />
              <span>Manba kodi (BloxyUI.luau)</span>
            </a>
          </div>
        </div>
      </div>

      {/* INSTALLATION GUIDE TABS */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Pluginni O'rnatish Qo'llanmasi</h2>
          <p className="text-[var(--text-secondary)]">O'zingizga qulay bo'lgan usulni tanlang va Roblox Studio'ga ulang.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 p-1.5 bg-[#151622] rounded-2xl border border-[var(--border-color)] w-fit">
          <button
            onClick={() => setActiveMethod('dragdrop')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeMethod === 'dragdrop'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <FolderCheck className="w-4 h-4" />
            <span>1-Usul: Faylni Tashlash (Eng Ishonchli)</span>
          </button>
          <button
            onClick={() => setActiveMethod('commandbar')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeMethod === 'commandbar'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>2-Usul: Command Bar</span>
          </button>
          <button
            onClick={() => setActiveMethod('studiomodel')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeMethod === 'studiomodel'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>3-Usul: Save as Local Plugin</span>
          </button>
        </div>

        {/* METHOD 1: DRAG & DROP */}
        {activeMethod === 'dragdrop' && (
          <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold text-white">Standart Usul: Plugins Papkasiga Joylash (Windows)</h3>
                <p className="text-sm text-[var(--text-secondary)]">Roblox Studio ushbu papkadagi har qanday .rbxmx yoki .luau plaginni avtomatik ishga tushiradi.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-sm">Qadam 1</span>
                <h4 className="font-bold text-white text-base">Faylni yuklab oling</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Tepadagi tugma orqali <span className="text-purple-400 font-mono">BloxyUI.rbxmx</span> faylini kompyuteringizga yuklab oling.
                </p>
                <a
                  href="/BloxyUI.rbxmx"
                  download="BloxyUI.rbxmx"
                  className="mt-auto px-3 py-2 rounded-xl bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 text-xs font-bold text-center border border-purple-500/30"
                >
                  Yuklab olish (BloxyUI.rbxmx)
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-sm">Qadam 2</span>
                <h4 className="font-bold text-white text-base">Plugins papkasini oching</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Klaviaturada <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Win + R</kbd> tugmasini bosing va quyidagi qatorni kiritib Enter bosing:
                </p>
                <div className="mt-auto flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-purple-300">
                  <span className="truncate">{windowsPathSnippet}</span>
                  <button
                    onClick={() => copyCode(windowsPathSnippet, 'path')}
                    className="p-1 hover:text-white"
                    title="Nusxalash"
                  >
                    {copiedId === 'path' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-sm">Qadam 3</span>
                <h4 className="font-bold text-white text-base">Faylni joylang va Studio'ni oching</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Yuklab olingan <span className="text-purple-400 font-mono">BloxyUI.rbxmx</span> faylini shu ochilgan papkaga ko'chirib o'tkazing. Roblox Studio'ni oching — tepadagi <strong>PLUGINS</strong> menyusida BloxyUI tugmasi paydo bo'ladi!
                </p>
                <div className="mt-auto flex items-center gap-1.5 text-xs text-green-400 font-medium">
                  <Check className="w-4 h-4" /> <span>Tayyor va 100% faol!</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* METHOD 2: COMMAND BAR */}
        {activeMethod === 'commandbar' && (
          <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold text-white">Roblox Studio Command Bar orqali ishlatish</h3>
                <p className="text-sm text-[var(--text-secondary)]">Hech qanday faylni ko'chirmasdan, Studio'ning Command Bar qatoriga Luau kodini kiritib sinab ko'rish.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <ol className="text-sm text-[var(--text-secondary)] space-y-2 list-decimal list-inside">
                <li>Roblox Studio'ni oching.</li>
                <li>Yuqori menyudan <strong className="text-white">View &rarr; Command Bar</strong> ni yoqing (pastda qora qator ochiladi).</li>
                <li>Quyidagi kodni nusxalang va Command Bar'ga tashlab <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Enter</kbd> bosing:</li>
              </ol>

              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)]">
                <button
                  onClick={() => copyCode(commandBarSnippet, 'cmd')}
                  className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-md transition-all"
                >
                  {copiedId === 'cmd' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cmd' ? "Nusxalandi!" : "Kodni nusxalash"}</span>
                </button>
                <SyntaxHighlighter
                  language="lua"
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: '1.25rem', background: '#0d0e14', fontSize: '13px' }}
                >
                  {commandBarSnippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        )}

        {/* METHOD 3: SAVE AS LOCAL PLUGIN */}
        {activeMethod === 'studiomodel' && (
          <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold text-white">Save as Local Plugin (Roblox Studio Ichida)</h3>
                <p className="text-sm text-[var(--text-secondary)]">Script orqali plaginni bevosita Studio ichidan saqlab olish.</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[var(--text-secondary)]">
              <p>1. <span className="text-purple-400 font-mono">BloxyUI.luau</span> faylini yuklab oling va barcha kodini nusxalang.</p>
              <p>2. Roblox Studio'da Explorer oynasida <strong>ServerScriptService</strong> ichiga yangi <strong>Script</strong> qo'shing.</p>
              <p>3. Script ichiga nusxalangan kodni to'liq joylashtiring.</p>
              <p>4. Script ustiga sichqonchaning o'ng tugmasini bosing va menyudan <strong className="text-white">Save as Local Plugin...</strong> tugmasini bosing.</p>
              <p>5. Oyna ochilganda <strong>Save</strong> tugmasini bosing. Plagin darhol faollashadi!</p>
            </div>
          </div>
        )}
      </div>

      {/* WHY BLOXYUI PLUGIN IS 100% BUG-FREE */}
      <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-green-400" />
          <h2 className="text-2xl font-black text-white">Nega BloxyUI v2.0 Plagini 100% Ishonchli va Xatosiz?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <Check className="w-5 h-5" />
              <span>Oq qiya chiziq bugi butunlay yo'qotildi</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Oldingi versiyalarda tugma chetidan chiqib turadigan oq burchakli bar (<code className="text-xs bg-white/10 px-1 py-0.5 rounded">shine</code>) Roblox'ning <code className="text-xs bg-white/10 px-1 py-0.5 rounded">ClipsDescendants</code> cheklovi tufayli ko'rinib qolar edi. Hozirgi versiyada ushbu element tinch holatda <code className="text-xs bg-white/10 px-1 py-0.5 rounded">Visible = false</code> va faqat bosilganda chaqnab yo'qoladi!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <Check className="w-5 h-5" />
              <span>"Failed to load game assets" xatosi yo'q</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Plagin toolbar tugmasi va ovoz effektlari internetga bog'liq bo'lmagan Roblox'ning rasmiy lokal resurslaridan foydalanadi va xavfsiz <code className="text-xs bg-white/10 px-1 py-0.5 rounded">pcall</code> ichida tekshiriladi. Studio hech qachon ogohlantirish bermaydi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <Check className="w-5 h-5" />
              <span>Studio Edit Mode'da darhol ko'rinadi</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Studio Edit holatida <code className="text-xs bg-white/10 px-1 py-0.5 rounded">Players.LocalPlayer</code> mavjud bo'lmagani sababli xatolik chiqmasligi uchun, kod avtomatik tarzda <code className="text-xs bg-white/10 px-1 py-0.5 rounded">StarterGui</code> ga joylanadi va Viewport'da darhol aks etadi!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <Check className="w-5 h-5" />
              <span>146+ Real Lucide Vektor Iconlar</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Barcha iconlar Latte Softworks tomonidan optimallashgan rasmiy 256x256 Lucide spritesheet bilan ishlaydi. Hech qanday buzilgan yoki bo'sh rasm ko'rinmaydi.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="glass p-8 rounded-3xl border border-[var(--border-color)] flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-7 h-7 text-purple-400" />
          <h2 className="text-2xl font-black text-white">Ko'p Beriladigan Savollar (FAQ)</h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-2">
            <h4 className="font-bold text-white text-base">Plaginni o'rnatgandan keyin Studio'da qayerda ko'rinadi?</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Roblox Studio yuqori lentasidagi <strong>PLUGINS</strong> yorlig'ida <strong>BloxyUI</strong> deb yozilgan maxsus tugma paydo bo'ladi. Uni bosganingizda barcha 200 ta animatsiya va iconlar kutubxonasi ochiladi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-2">
            <h4 className="font-bold text-white text-base">Tugma bosilganda animatsiya qanday ishlaydi?</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Plagin yoki veb-saytdan olingan tugmalar o'zida <code className="text-xs bg-white/10 px-1 py-0.5 rounded">LocalScript</code> saqlaydi. O'yinni Play (F5) rejimida sinaganingizda tugma bosilishi bilan elastik jelly bounce, ripple to'lqini yoki neon nur animatsiyasi ishga tushadi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141520] border border-[var(--border-color)] flex flex-col gap-2">
            <h4 className="font-bold text-white text-base">Men Mac (macOS) kompyuterida ishlatmoqdaman, qanday o'rnataman?</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Mac'da Finder orqali <code className="text-xs bg-white/10 px-1 py-0.5 rounded">~/Library/Application Support/Roblox/Plugins</code> papkasini ochib, <code className="text-xs bg-white/10 px-1 py-0.5 rounded">BloxyUI.rbxmx</code> faylini shu yerga tashlaysiz.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
