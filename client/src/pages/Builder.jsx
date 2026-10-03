import { useState } from 'react';
import { generateCode } from '../lib/api';
import { Code2, Wand2, Copy, Check, Play, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const THEMES = [
  {
    id: 'cartoony',
    name: 'Cartoony Red',
    subtitle: 'Classic 3D Simulator Bevel',
    bg: 'from-[#ff575e] to-[#e62239]',
    stroke: '#ff958e',
    shadow: '#9a1428',
    textShadow: '#a9182c',
    stripe: '#e42c40'
  },
  {
    id: 'gold',
    name: 'Royal Gold',
    subtitle: 'Legendary VIP Currency',
    bg: 'from-[#ffd700] to-[#daa520]',
    stroke: '#ffeb96',
    shadow: '#a06e0f',
    textShadow: '#965f0a',
    stripe: '#daa520'
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    subtitle: 'Sci-Fi Electric Pulse',
    bg: 'from-[#785aff] to-[#4628d2]',
    stroke: '#00ebff',
    shadow: '#230f4b',
    textShadow: '#28145f',
    stripe: '#00c8dc'
  },
  {
    id: 'emerald',
    name: 'Toxic Emerald',
    subtitle: 'Radioactive Gem Aura',
    bg: 'from-[#2ecc71] to-[#27ae60]',
    stroke: '#78ffbe',
    shadow: '#0a5a3c',
    textShadow: '#0f5032',
    stripe: '#1e9650'
  },
  {
    id: 'void',
    name: 'Dark Obsidian',
    subtitle: 'Stealth Tactical Matte',
    bg: 'from-[#323746] to-[#1e232d]',
    stroke: '#8c96aa',
    shadow: '#0f0f19',
    textShadow: '#0f0f14',
    stripe: '#282d3c'
  }
];

const ICONS = [
  {
    id: 'shop',
    name: 'Market Stall',
    desc: '5-Stripe awning, roof, counter',
    render: (stripeColor) => (
      <div className="w-12 h-11 relative flex flex-col items-center">
        {/* Roof */}
        <div className="w-9 h-1.5 bg-white rounded-t-sm"></div>
        <div className="w-11 h-1.5 bg-white"></div>
        {/* Stripes Awning */}
        <div className="w-11 h-3 flex overflow-hidden rounded-b-sm">
          {[0, 1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 h-full" style={{ backgroundColor: s % 2 === 0 ? '#ffffff' : stripeColor }}></div>
          ))}
        </div>
        {/* Pillars & Counter */}
        <div className="w-9 flex justify-between h-4">
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
        </div>
        <div className="w-11 h-2.5 bg-white rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'crown',
    name: 'VIP Crown',
    desc: '3-Point royal crown with jewels',
    render: (stripeColor) => (
      <div className="w-12 h-11 relative flex flex-col items-center justify-center">
        <div className="flex gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stripeColor }}></div>
          <div className="w-2 h-2 rounded-full -mt-1" style={{ backgroundColor: stripeColor }}></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stripeColor }}></div>
        </div>
        <div className="w-10 h-6 bg-white rounded-b-md flex justify-between px-1.5 pt-1">
          <div className="w-1.5 h-3 bg-gray-200 rounded"></div>
          <div className="w-1.5 h-4 bg-gray-200 rounded"></div>
          <div className="w-1.5 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="w-10 h-2 bg-white mt-1 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'sword',
    name: 'Combat Sword',
    desc: 'Blade, crossguard and hilt',
    render: (stripeColor) => (
      <div className="w-12 h-11 relative flex flex-col items-center justify-center">
        <div className="w-2 h-6 bg-white rounded-t-sm shadow-sm"></div>
        <div className="w-8 h-1.5 bg-white rounded-sm"></div>
        <div className="w-1.5 h-2.5 rounded-b-sm" style={{ backgroundColor: stripeColor }}></div>
      </div>
    )
  },
  {
    id: 'star',
    name: 'Starlight Gem',
    desc: 'Crossed glint star flare',
    render: (stripeColor) => (
      <div className="w-12 h-11 relative flex items-center justify-center">
        <div className="w-2.5 h-9 bg-white rounded-full absolute"></div>
        <div className="w-9 h-2.5 bg-white rounded-full absolute"></div>
        <div className="w-4 h-4 rounded-sm rotate-45 absolute shadow-md" style={{ backgroundColor: stripeColor }}></div>
      </div>
    )
  }
];

const ANIMATION_MODES = [
  { id: 'squish', name: 'Tactile Squish + Shine', desc: 'Scale 0.98 on press, shine sweep glide across surface', tag: 'Recommended' },
  { id: 'bounce', name: 'Elastic Spring Bounce', desc: 'Overshoot 1.08 on hover with spring dampening', tag: 'Juicy' },
  { id: 'wobble', name: 'Jelly Wobble Shake', desc: 'Rotational physics sway on trigger', tag: 'Fun' }
];

// Sparkle locations matching user's exact normalized array:
// {0.08, 0.19, 10}, {0.32, 0.11, 7}, {0.87, 0.18, 10}, {0.91, 0.63, 8}, {0.68, 0.81, 7}, {0.09, 0.74, 6}, {0.40, 0.78, 6}
const SPARKLE_LOCATIONS = [
  { left: '8%', top: '19%', size: 10, delay: '0s' },
  { left: '32%', top: '11%', size: 7, delay: '0.17s' },
  { left: '87%', top: '18%', size: 10, delay: '0.34s' },
  { left: '91%', top: '63%', size: 8, delay: '0.51s' },
  { left: '68%', top: '81%', size: 7, delay: '0.68s' },
  { left: '9%', top: '74%', size: 6, delay: '0.85s' },
  { left: '40%', top: '78%', size: 6, delay: '1.02s' }
];

function Builder() {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedAnim, setSelectedAnim] = useState(ANIMATION_MODES[0]);
  const [buttonText, setButtonText] = useState('SHOP');
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [shineEnabled, setShineEnabled] = useState(true);
  const [idleFloatEnabled, setIdleFloatEnabled] = useState(true);

  // Live Canvas Interactive State
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isShining, setIsShining] = useState(false);

  // Generated Code
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const triggerShine = () => {
    setIsShining(true);
    setTimeout(() => setIsShining(false), 550);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateCode({
        text: buttonText,
        theme: selectedTheme.id,
        icon: selectedIcon.id,
        sparkles: sparklesEnabled,
        shine: shineEnabled,
        idleFloat: idleFloatEnabled
      });
      setGeneratedCode(result.code || result.luauCode);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      
      {/* Page Title */}
      <div className="border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-secondary)] text-xs font-mono uppercase tracking-wider mb-2">
            <span>Figma-to-Roblox Vector Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Visual UI Constructor</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Pick visual cards below. Zero broken asset IDs — pure procedural vector Roblox Luau code.
          </p>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[#ff7675] hover:opacity-95 text-white rounded-xl font-black text-sm tracking-wide shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Wand2 className="w-4 h-4" />}
          <span>Generate Procedural Luau</span>
        </button>
      </div>

      {/* Main Dual Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Visual Interactive Cards (NO DROPDOWNS) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Label Text Input Card */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-2 font-bold">
              Button Text Label
            </label>
            <input 
              type="text" 
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value.toUpperCase())}
              maxLength={12}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-white font-black tracking-widest text-lg outline-none focus:border-[var(--accent-primary)] transition-all font-mono"
            />
          </div>

          {/* 1. Theme Selection Cards */}
          <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">1. Color Palette</h3>
              <span className="text-xs font-mono text-[var(--accent-secondary)]">{selectedTheme.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {THEMES.map(theme => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 relative select-none ${
                    selectedTheme.id === theme.id
                      ? 'border-white bg-[var(--bg-card)] shadow-lg scale-[1.02]'
                      : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500'
                  }`}
                >
                  {/* Color Swatch Dot */}
                  <div 
                    className={`w-8 h-8 rounded-lg bg-gradient-to-b ${theme.bg} shadow-md border-2 border-white/50 flex-shrink-0`}
                    style={{ boxShadow: `0 3px 0 ${theme.shadow}` }}
                  ></div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{theme.name}</h4>
                    <p className="text-[10px] text-[var(--text-secondary)] truncate">{theme.subtitle}</p>
                  </div>

                  {selectedTheme.id === theme.id && (
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Procedural Vector Icon Cards */}
          <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">2. Procedural Vector Icon</h3>
              <span className="text-xs font-mono text-[var(--accent-secondary)]">{selectedIcon.name}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ICONS.map(icon => (
                <div
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 select-none ${
                    selectedIcon.id === icon.id
                      ? 'border-white bg-[var(--bg-card)] shadow-lg scale-[1.03]'
                      : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500'
                  }`}
                >
                  <div className="h-12 flex items-center justify-center">
                    {icon.render(selectedTheme.stripe)}
                  </div>
                  <span className="font-bold text-xs text-white">{icon.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Physics & Visual Toggles */}
          <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
            <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">3. Effects & Micro-Interactions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Sparkles Toggle */}
              <div 
                onClick={() => setSparklesEnabled(!sparklesEnabled)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  sparklesEnabled ? 'border-[var(--accent-warning)] bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">7 Glint Sparkles</span>
                  <span className="text-[10px] text-gray-400">Staggered Sine Pulse</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${sparklesEnabled ? 'bg-[var(--accent-warning)] border-white' : 'border-gray-500'}`}></div>
              </div>

              {/* Shine Sweep Toggle */}
              <div 
                onClick={() => setShineEnabled(!shineEnabled)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  shineEnabled ? 'border-cyan-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">Shine Reflection</span>
                  <span className="text-[10px] text-gray-400">Glide on click</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${shineEnabled ? 'bg-cyan-400 border-white' : 'border-gray-500'}`}></div>
              </div>

              {/* Idle Float Toggle */}
              <div 
                onClick={() => setIdleFloatEnabled(!idleFloatEnabled)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  idleFloatEnabled ? 'border-purple-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">Idle Levitation</span>
                  <span className="text-[10px] text-gray-400">Floating Sine breath</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${idleFloatEnabled ? 'bg-purple-400 border-white' : 'border-gray-500'}`}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Live Visual Simulation Canvas & Output Script */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          
          {/* Live Studio Canvas */}
          <div className="glass rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl">
            <div className="bg-[#12122a] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-green-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Live Physics Stage</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Hover & Click to test</span>
            </div>

            <div className="p-16 flex items-center justify-center bg-[#0d0d1a] relative min-h-[320px] select-none overflow-hidden">
              {/* Studio Canvas Grid Background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* The EXACT Figma-grade Button Structure */}
              <div 
                className={`relative cursor-pointer transition-all ${idleFloatEnabled ? 'animate-bounce' : ''}`}
                style={{ animationDuration: '3s' }}
                onMouseEnter={() => { setIsHovered(true); }}
                onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
                onMouseDown={() => { setIsPressed(true); if (shineEnabled) triggerShine(); }}
                onMouseUp={() => { setIsPressed(false); if (shineEnabled) triggerShine(); }}
              >
                {/* 3D Extruded Depth Shadow (offset by +7px) */}
                <div 
                  className="absolute inset-0 rounded-[18px] translate-y-[7px] transition-all"
                  style={{ backgroundColor: selectedTheme.shadow }}
                ></div>

                {/* Top Button Surface */}
                <div 
                  className={`
                    relative z-10 w-[272px] h-[90px] rounded-[18px] overflow-hidden flex items-center px-6
                    bg-gradient-to-b ${selectedTheme.bg} transition-transform duration-150
                  `}
                  style={{
                    border: `3px solid ${selectedTheme.stroke}`,
                    transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.045)' : 'scale(1)'
                  }}
                >
                  {/* Procedural Icon */}
                  <div className="relative z-20 flex-shrink-0 mr-4">
                    {selectedIcon.render(selectedTheme.stripe)}
                  </div>

                  {/* Dual-Layered Beveled 3D Text */}
                  <div className="relative z-20 flex-1">
                    {/* Dark drop shadow text (+3px offset) */}
                    <span 
                      className="absolute font-black text-3xl font-sans tracking-wide translate-y-[3px]"
                      style={{ color: selectedTheme.textShadow }}
                    >
                      {buttonText}
                    </span>
                    {/* Crisp white top text */}
                    <span className="relative font-black text-3xl font-sans tracking-wide text-white">
                      {buttonText}
                    </span>
                  </div>

                  {/* 7 Animated Glint Sparkles */}
                  {sparklesEnabled && SPARKLE_LOCATIONS.map((loc, i) => (
                    <div 
                      key={i}
                      className="absolute pointer-events-none z-10 flex items-center justify-center animate-pulse"
                      style={{
                        left: loc.left,
                        top: loc.top,
                        width: loc.size,
                        height: loc.size,
                        animationDelay: loc.delay,
                        animationDuration: '1.3s'
                      }}
                    >
                      <div className="w-[20%] h-full bg-white absolute"></div>
                      <div className="w-full h-[20%] bg-white absolute"></div>
                      <div className="w-[50%] h-[50%] bg-white rotate-45 absolute"></div>
                    </div>
                  ))}

                  {/* Specular Shine Reflection Bar */}
                  {shineEnabled && (
                    <div 
                      className={`
                        absolute pointer-events-none w-10 h-48 bg-white/30 rotate-[20deg] -top-10
                        transition-all duration-500 ease-out z-15
                        ${isShining ? 'translate-x-[320px]' : '-translate-x-32'}
                      `}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          {generatedCode ? (
            <div className="glass rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl anim-slide-in-up">
              <div className="bg-[#12122a] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-mono font-bold text-white">Ready-to-Run Luau Script</span>
                </div>
                <button 
                  onClick={copyCode}
                  className="px-3 py-1.5 bg-[var(--accent-primary)] hover:bg-[#ff575e] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Script'}
                </button>
              </div>
              <div className="max-h-[380px] overflow-auto text-xs bg-[#090912]">
                <SyntaxHighlighter language="lua" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}>
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <div className="p-6 glass rounded-2xl border border-[var(--border-color)] border-dashed text-center">
              <p className="text-xs text-[var(--text-secondary)]">
                Click <strong className="text-white">"Generate Procedural Luau"</strong> above to produce the exact production script!
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Builder;
