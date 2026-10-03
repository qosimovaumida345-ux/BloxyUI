import { useState } from 'react';
import { generateCode } from '../lib/api';
import { icons, effects, animations } from '../data/catalog';
import { Code2, Wand2, Copy, Check, Play, Settings, Sparkles } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const THEMES = [
  { name: 'Cartoony Juicy (Red 3D)', slug: 'cartoony', bg: '#ff7675', stroke: '#ffffff', shadow: '#d63031' },
  { name: 'Cyber Neon (Purple & Cyan)', slug: 'neon', bg: '#6c5ce7', stroke: '#00cec9', shadow: '#1e1e4a' },
  { name: 'Royal Gold (Victory & Crown)', slug: 'royal-gold', bg: '#f1c40f', stroke: '#fff275', shadow: '#b7950b' },
  { name: 'Emerald Nature (Green Crystal)', slug: 'emerald', bg: '#00b894', stroke: '#55efc4', shadow: '#006266' },
  { name: 'Dark Void (Obsidian Stealth)', slug: 'dark-void', bg: '#2d3436', stroke: '#636e72', shadow: '#000000' },
  { name: 'Bubblegum Cute (Candy Pink)', slug: 'bubblegum', bg: '#fd79a8', stroke: '#ffffff', shadow: '#e84393' }
];

function Builder() {
  const [config, setConfig] = useState({
    type: 'button',
    text: 'SHOP',
    iconSlug: 'shop',
    effectSlug: 'cartoony-red-bevel',
    animationSlug: 'cartoony-squish',
    themeSlug: 'cartoony'
  });
  
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedIcon = icons.find(i => i.slug === config.iconSlug) || icons[0];
  const selectedEffect = effects.find(e => e.slug === config.effectSlug) || effects[0];
  const selectedAnim = animations.find(a => a.slug === config.animationSlug) || animations[0];
  const selectedTheme = THEMES.find(t => t.slug === config.themeSlug) || THEMES[0];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateCode({
        type: config.type,
        text: config.text,
        icon: config.iconSlug,
        effect: config.effectSlug,
        animation: config.animationSlug,
        theme: config.themeSlug
      });
      setGeneratedCode(result.code);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Settings Panel */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-4">
            <Settings className="w-6 h-6 text-[var(--accent-primary)]" />
            <h2 className="text-xl font-bold">Juicy UI Configurator</h2>
          </div>
          
          <div className="space-y-4">
            {/* Component Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Component Type
              </label>
              <select 
                value={config.type} 
                onChange={(e) => setConfig({...config, type: e.target.value})}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-white focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
              >
                <option value="button">Juicy Button (3D Extruded)</option>
                <option value="modal">Modal Dialog Window</option>
                <option value="card">Loot & Item Card</option>
                <option value="notification">Toast Notification</option>
                <option value="topbar">Game TopBar HUD</option>
              </select>
            </div>
            
            {/* Button Text */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Label Text
              </label>
              <input 
                type="text" 
                value={config.text}
                onChange={(e) => setConfig({...config, text: e.target.value})}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-white focus:ring-1 focus:ring-[var(--accent-primary)] outline-none font-bold"
              />
            </div>

            {/* Icon Picker (230+ icons) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 flex justify-between">
                <span>Icon ({icons.length} available)</span>
                <span className="text-[var(--accent-primary)]">{selectedIcon.name}</span>
              </label>
              <select 
                value={config.iconSlug} 
                onChange={(e) => setConfig({...config, iconSlug: e.target.value})}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-white focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
              >
                {icons.map(i => (
                  <option key={i.slug} value={i.slug}>
                    {i.name} ({i.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Effect Picker (50+ effects) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 flex justify-between">
                <span>Effect Texture ({effects.length} available)</span>
                <span className="text-[var(--accent-success)]">{selectedEffect.name}</span>
              </label>
              <select 
                value={config.effectSlug} 
                onChange={(e) => setConfig({...config, effectSlug: e.target.value})}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-white focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
              >
                {effects.map(e => (
                  <option key={e.slug} value={e.slug}>
                    {e.name} [{e.type}]
                  </option>
                ))}
              </select>
            </div>

            {/* Animation Picker (50+ animations) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 flex justify-between">
                <span>Physics Animation ({animations.length} available)</span>
                <span className="text-[var(--accent-warning)]">{selectedAnim.name}</span>
              </label>
              <select 
                value={config.animationSlug} 
                onChange={(e) => setConfig({...config, animationSlug: e.target.value})}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-white focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
              >
                {animations.map(a => (
                  <option key={a.slug} value={a.slug}>
                    {a.name} [{a.type}]
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Design Theme Palette
              </label>
              <select 
                value={config.themeSlug} 
                onChange={(e) => setConfig({...config, themeSlug: e.target.value})}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-white focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
              >
                {THEMES.map(t => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Generate Action */}
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-6 bg-[var(--accent-primary)] hover:bg-[#5b4dcf] text-white p-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] shadow-lg glow-purple"
            >
              {isGenerating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {isGenerating ? 'Synthesizing Luau...' : 'Generate Roblox Luau Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview & Code Panel */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        
        {/* Live Visual Preview */}
        <div className="glass rounded-2xl border border-[var(--border-color)] overflow-hidden flex flex-col">
          <div className="bg-[var(--bg-secondary)] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-[var(--accent-success)]" />
              <h3 className="font-bold text-sm">Interactive Live Canvas</h3>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">Click button to test physics</span>
          </div>

          <div className="p-16 flex items-center justify-center min-h-[300px] relative bg-[#12122a] overflow-hidden">
             {/* Studio grid canvas pattern */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
             
             {/* Dynamic Render based on configuration */}
             {config.type === 'button' && (
                <div className="relative group cursor-pointer select-none">
                  {/* Bottom 3D shadow extrusion */}
                  <div 
                    className="absolute inset-0 rounded-2xl translate-y-2 transition-all"
                    style={{ backgroundColor: selectedTheme.shadow }}
                  ></div>

                  {/* Top button surface */}
                  <button 
                    className={`
                      relative z-10 px-8 py-4 rounded-2xl font-black text-xl text-white tracking-wide
                      flex items-center justify-center gap-3 transition-all active:translate-y-1.5 shadow-md
                      group-hover:${selectedAnim.cssClass || 'anim-bounce'}
                    `}
                    style={{
                      backgroundColor: selectedTheme.bg,
                      border: `3.5px solid ${selectedTheme.stroke}`,
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4)'
                    }}
                  >
                    {/* SVG Icon */}
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={selectedIcon.svgPath} />
                    </svg>
                    <span>{config.text}</span>
                    <Sparkles className="w-4 h-4 text-yellow-300 opacity-80" />
                  </button>
                </div>
             )}

             {config.type === 'card' && (
               <div 
                 className={`
                   relative z-10 p-6 rounded-2xl w-80 min-h-48 border-2 transition-all
                   group-hover:${selectedAnim.cssClass || 'anim-bounce'}
                 `}
                 style={{ 
                   backgroundColor: '#1a1a3e', 
                   borderColor: selectedTheme.stroke,
                   boxShadow: `0 8px 0 ${selectedTheme.shadow}`
                 }}
               >
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedTheme.bg }}>
                     <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                       <path d={selectedIcon.svgPath} />
                     </svg>
                   </div>
                   <div>
                     <h4 className="font-extrabold text-white text-base">{config.text}</h4>
                     <span className="text-[11px] text-[var(--accent-warning)] uppercase font-mono">Legendary Tier</span>
                   </div>
                 </div>
                 <p className="text-xs text-[var(--text-secondary)] mb-4">
                   Exclusive item with {selectedEffect.name} and animated with {selectedAnim.name}.
                 </p>
                 <button className="w-full py-2 rounded-xl font-bold text-xs text-white" style={{ backgroundColor: selectedTheme.bg }}>
                   EQUIP ITEM
                 </button>
               </div>
             )}

             {config.type === 'modal' && (
               <div className="relative z-10 w-96 rounded-2xl border-4 border-white/80 p-6 bg-[#1a1a3e] shadow-2xl">
                 <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
                   <div className="flex items-center gap-2">
                     <svg className="w-5 h-5 text-[var(--accent-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d={selectedIcon.svgPath} />
                     </svg>
                     <h4 className="font-black text-lg text-white">{config.text}</h4>
                   </div>
                   <span className="text-gray-400 font-bold">✕</span>
                 </div>
                 <p className="text-xs text-[var(--text-secondary)] mb-6">
                   Modal dialog dynamically rendered with BloxyUI Cartoony design engine.
                 </p>
                 <div className="flex gap-2">
                   <button className="flex-1 py-2 rounded-xl font-bold text-xs bg-gray-700 text-white">CANCEL</button>
                   <button className="flex-1 py-2 rounded-xl font-bold text-xs text-white" style={{ backgroundColor: selectedTheme.bg }}>CONFIRM</button>
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Generated Code Output */}
        {generatedCode ? (
          <div className="glass rounded-2xl border border-[var(--border-color)] overflow-hidden flex flex-col anim-slide-in-up">
            <div className="bg-[var(--bg-secondary)] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[var(--accent-warning)]" />
                <h3 className="font-bold text-sm text-white">Ready-to-Paste Roblox Luau Script</h3>
              </div>
              <button 
                onClick={copyCode}
                className="px-3 py-1.5 bg-[var(--accent-primary)] hover:bg-[#5b4dcf] text-white rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Script'}
              </button>
            </div>
            <div className="max-h-[380px] overflow-auto text-xs bg-[#0d0d1a]">
              <SyntaxHighlighter 
                language="lua" 
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}
              >
                {generatedCode}
              </SyntaxHighlighter>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 glass rounded-2xl p-6 border border-[var(--border-color)] border-dashed">
            <p className="text-xs text-[var(--text-secondary)]">
              Click <strong className="text-white">"Generate Roblox Luau Code"</strong> to produce the complete ready-to-run script with Asset IDs and TweenService animations!
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Builder;
