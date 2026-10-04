import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Wand2, Copy, Check, Play, Sparkles, Layers, Sliders, CheckCircle2,
  Volume2, VolumeX, Download, RefreshCw, Layout, Square, CreditCard,
  Activity, Shield, Heart, Coins, Zap, Trophy, Gift, Flame, Key,
  Crosshair, Gem, Bell, Lock, Compass, Settings as SettingsIcon,
  ShoppingBag, Crown, Sword, Star, Package, Search, Filter, Palette,
  MousePointerClick, Sparkle, Tag, Eye
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { assets as bloxfxAssets, categories as bloxfxCategories, scriptFor } from '../assets';
import { Preview } from '../previews';
import { generateCode } from '../lib/api';

// ============================================================================
// 16 RICH COLOR PALETTES
// ============================================================================
const THEMES = [
  { id: 'cartoony', name: 'Cartoony Red', cat: 'Simulator', h: 0, bg: 'from-[#ff575e] to-[#e62239]', stroke: '#ff958e', shadow: '#9a1428', textShadow: '#a9182c', accent: '#e42c40' },
  { id: 'gold', name: 'Royal Gold', cat: 'Simulator', h: 48, bg: 'from-[#ffd700] to-[#daa520]', stroke: '#ffeb96', shadow: '#a06e0f', textShadow: '#965f0a', accent: '#daa520' },
  { id: 'neon', name: 'Cyber Neon', cat: 'Sci-Fi', h: 225, bg: 'from-[#785aff] to-[#4628d2]', stroke: '#00ebff', shadow: '#230f4b', textShadow: '#28145f', accent: '#00c8dc' },
  { id: 'emerald', name: 'Toxic Emerald', cat: 'Simulator', h: 145, bg: 'from-[#2ecc71] to-[#27ae60]', stroke: '#78ffbe', shadow: '#0a5a3c', textShadow: '#0f5032', accent: '#1e9650' },
  { id: 'void', name: 'Dark Obsidian', cat: 'Dark', h: 220, bg: 'from-[#323746] to-[#1e232d]', stroke: '#8c96aa', shadow: '#0f0f19', textShadow: '#0f0f14', accent: '#282d3c' },
  { id: 'pink', name: 'Bubblegum Pop', cat: 'Candy', h: 330, bg: 'from-[#ff6b9d] to-[#ee3f7e]', stroke: '#ffb3d1', shadow: '#9c1445', textShadow: '#a01040', accent: '#ff4081' },
  { id: 'ocean', name: 'Deep Ocean', cat: 'Simulator', h: 195, bg: 'from-[#00b4d8] to-[#0077b6]', stroke: '#90e0ef', shadow: '#03045e', textShadow: '#023e8a', accent: '#0096c7' },
  { id: 'magma', name: 'Molten Magma', cat: 'Simulator', h: 25, bg: 'from-[#ff7b00] to-[#e85d04]', stroke: '#ffb703', shadow: '#9d0208', textShadow: '#6a040f', accent: '#dc2f02' },
  { id: 'purple', name: 'Mystic Amethyst', cat: 'Magic', h: 275, bg: 'from-[#9d4edd] to-[#7b2cbf]', stroke: '#e0aaff', shadow: '#3c096c', textShadow: '#240046', accent: '#5a189a' },
  { id: 'frost', name: 'Frostbite Cyan', cat: 'Sci-Fi', h: 185, bg: 'from-[#48cae4] to-[#0096c7]', stroke: '#caf0f8', shadow: '#023e8a', textShadow: '#0077b6', accent: '#00b4d8' },
  { id: 'lime', name: 'Biohazard Lime', cat: 'Sci-Fi', h: 95, bg: 'from-[#aacc00] to-[#80b918]', stroke: '#d4f170', shadow: '#2b4c06', textShadow: '#1e3704', accent: '#55a630' },
  { id: 'sunset', name: 'Sunset Coral', cat: 'Candy', h: 12, bg: 'from-[#ff9f43] to-[#ee5253]', stroke: '#fed330', shadow: '#8c1d40', textShadow: '#701530', accent: '#ff6b6b' },
  { id: 'crimson', name: 'Blood Crimson', cat: 'Dark', h: 350, bg: 'from-[#c0392b] to-[#781812]', stroke: '#e74c3c', shadow: '#400603', textShadow: '#300402', accent: '#962d22' },
  { id: 'galaxy', name: 'Cosmic Nebula', cat: 'Magic', h: 260, bg: 'from-[#a29bfe] to-[#6c5ce7]', stroke: '#fd79a8', shadow: '#2c1b74', textShadow: '#1e1058', accent: '#81ecec' },
  { id: 'silver', name: 'Platinum Steel', cat: 'Modern', h: 200, bg: 'from-[#b2bec3] to-[#636e72]', stroke: '#dfe6e9', shadow: '#2d3436', textShadow: '#1e272e', accent: '#74b9ff' },
  { id: 'minimal', name: 'Midnight Slate', cat: 'Dark', h: 220, bg: 'from-[#2f3542] to-[#1e222a]', stroke: '#57606f', shadow: '#0c0d10', textShadow: '#050608', accent: '#70a1ff' }
];

// ============================================================================
// POPULAR ICONS LIBRARY
// ============================================================================
const ICON_LIST = [
  { name: 'Zap', cat: 'Status' }, { name: 'Sparkles', cat: 'Status' }, { name: 'Flame', cat: 'Status' },
  { name: 'Shield', cat: 'Combat' }, { name: 'Crown', cat: 'RPG' }, { name: 'Sword', cat: 'Combat' },
  { name: 'Swords', cat: 'Combat' }, { name: 'Star', cat: 'Status' }, { name: 'Heart', cat: 'Status' },
  { name: 'Trophy', cat: 'RPG' }, { name: 'Gamepad2', cat: 'UI' }, { name: 'Rocket', cat: 'Status' },
  { name: 'Coins', cat: 'Economy' }, { name: 'Lock', cat: 'UI' }, { name: 'Bell', cat: 'UI' },
  { name: 'Play', cat: 'UI' }, { name: 'Check', cat: 'UI' }, { name: 'Eye', cat: 'UI' },
  { name: 'Settings', cat: 'UI' }, { name: 'Key', cat: 'RPG' }, { name: 'Gem', cat: 'Economy' },
  { name: 'Package', cat: 'RPG' }, { name: 'Crosshair', cat: 'Combat' }, { name: 'Compass', cat: 'RPG' }
];

export default function Builder() {
  // 1. Asset Selection (200 BloxFX catalog)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [assetSearch, setAssetSearch] = useState('');
  const [activeAsset, setActiveAsset] = useState(bloxfxAssets[0]); // default: Crimson Sweep

  // 2. Customization Controls
  const [customHue, setCustomHue] = useState(bloxfxAssets[0].hue);
  const [customIcon, setCustomIcon] = useState(bloxfxAssets[0].icon);
  const [customLabel, setCustomLabel] = useState('POWER UP');
  const [customSpeed, setCustomSpeed] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);

  // 3. Effects & Audio
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [shineEnabled, setShineEnabled] = useState(true);
  const [idleFloatEnabled, setIdleFloatEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 4. Output Code & Status
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  // Filter 200 assets
  const filteredAssets = useMemo(() => {
    return bloxfxAssets.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = !assetSearch || 
        item.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(assetSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(assetSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, assetSearch]);

  // Audio Click pop synthesis (Web Audio API)
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  };

  // When active asset changes, sync its default properties
  const handleSelectAsset = (asset) => {
    setActiveAsset(asset);
    setCustomHue(asset.hue);
    setCustomIcon(asset.icon);
    setCustomLabel(asset.name.toUpperCase());
    setCustomSpeed(1);
    setReplayCount(prev => prev + 1);
  };

  // When theme changes, update customHue
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setCustomHue(theme.h);
  };

  // Regenerate Luau script whenever parameters change
  useEffect(() => {
    if (!activeAsset) return;
    try {
      const luau = scriptFor(activeAsset, {
        customHue,
        customIcon,
        customLabel,
        customSpeed
      });
      setGeneratedCode(luau);
    } catch (e) {
      console.warn("Script generation fallback:", e);
    }
  }, [activeAsset, customHue, customIcon, customLabel, customSpeed]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadScript = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeAsset.slug || 'bloxfx-effect'}.luau`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>200 Assets • Full Customization Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Visual UI Constructor</span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 font-mono border border-green-500/30">
              200 BloxFX Assets
            </span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            Har qanday BloxFX assetini (tugmalar, panellar, loading barlar, kartochkalar, yorliqlar) tanlang, ranglarini, iconlarini, matnini va tezligini sozlang — 1-klikda Roblox Luau kodini oling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
              soundEnabled ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400' : 'border-[var(--border-color)] text-gray-500'
            }`}
            title={soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => setReplayCount(c => c + 1)}
            className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-gray-400 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Replay Animation</span>
          </button>
        </div>
      </div>

      {/* Main Studio Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================================================================== */}
        {/* LEFT COLUMN: 200 ASSETS CATALOG + CUSTOMIZATION SUITE (7 COLS)       */}
        {/* ==================================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* 1. ASSET PICKER (200 ASSETS ACROSS 10 CATEGORIES) */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                  1. BloxFX Asset Catalog ({bloxfxAssets.length} Assets)
                </h3>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  value={assetSearch}
                  onChange={(e) => setAssetSearch(e.target.value)}
                  placeholder="Search 200 assets..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[var(--accent-primary)] font-mono"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px] font-mono mb-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap font-bold ${
                  selectedCategory === 'All' ? 'bg-white text-black' : 'bg-[var(--bg-secondary)] text-gray-400 hover:text-white'
                }`}
              >
                All (200)
              </button>
              {bloxfxCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                    selectedCategory === cat ? 'bg-white text-black font-bold' : 'bg-[var(--bg-secondary)] text-gray-400 hover:text-white'
                  }`}
                >
                  {cat} (20)
                </button>
              ))}
            </div>

            {/* Grid of 200 Assets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
              {filteredAssets.map(item => {
                const isSelected = activeAsset && activeAsset.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectAsset(item)}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-1 select-none ${
                      isSelected 
                        ? 'border-white bg-[var(--bg-card)] shadow-lg shadow-red-500/10 scale-[1.02]' 
                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-gray-400">
                        #{item.id}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent-secondary)] truncate">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-xs text-white truncate">{item.name}</span>
                    <span className="text-[10px] text-gray-400 line-clamp-1">{item.description}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. TEXT & LABELS CUSTOMIZATION */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              2. Text & Label Customization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Label / Button Text
                </label>
                <input 
                  type="text" 
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value.toUpperCase())}
                  maxLength={18}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-white font-black tracking-wider text-base outline-none focus:border-[var(--accent-primary)] font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Animation Speed ({customSpeed}x)
                </label>
                <div className="flex items-center gap-2 h-[46px]">
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.25"
                    value={customSpeed} 
                    onChange={(e) => setCustomSpeed(Number(e.target.value))} 
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-cyan-400 w-10 text-right">
                    {customSpeed}x
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. COLOR PALETTES & HUE SLIDER (KO'PROQ RANG!) */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-yellow-400" />
                3. Color Customizer ({THEMES.length} Presets & Live Hue Slider)
              </h3>
              <span className="text-[11px] font-mono text-yellow-400 font-bold">
                Hue: {customHue}°
              </span>
            </div>

            {/* Continuous Rainbow Hue Slider */}
            <div className="mb-4 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1.5">
                <span>0° Red</span>
                <span>60° Gold</span>
                <span>120° Green</span>
                <span>180° Cyan</span>
                <span>240° Blue</span>
                <span>300° Purple</span>
                <span>360° Red</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={customHue} 
                onChange={(e) => setCustomHue(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer outline-none"
                style={{
                  background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                }}
              />
            </div>

            {/* 16 Quick Theme Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
              {THEMES.map(theme => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => handleThemeChange(theme)}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2.5 select-none ${
                      isSelected
                        ? 'border-white bg-[var(--bg-card)] shadow scale-[1.03]'
                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500'
                    }`}
                  >
                    <div 
                      className={`w-7 h-7 rounded-lg bg-gradient-to-b ${theme.bg} shadow flex-shrink-0 border border-white/40`}
                      style={{ boxShadow: `0 2px 0 ${theme.shadow}` }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-[11px] text-white block truncate">{theme.name}</span>
                      <span className="text-[9px] text-gray-400 block truncate">{theme.cat}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. ICON SELECTION (200+ / 520+ ICONS SWAPPER) */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-400" />
                4. Vector Icon Swapper (Selected: {customIcon})
              </h3>
              <span className="text-[11px] font-mono text-purple-400 font-bold">
                1-Click Replace
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-h-[180px] overflow-y-auto pr-1">
              {ICON_LIST.map(item => {
                const isSelected = customIcon === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setCustomIcon(item.name)}
                    className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 select-none ${
                      isSelected 
                        ? 'border-white bg-[var(--bg-card)] shadow scale-105' 
                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-base">
                      {item.name === 'Zap' && '⚡'}
                      {item.name === 'Sparkles' && '✦'}
                      {item.name === 'Flame' && '🔥'}
                      {item.name === 'Shield' && '🛡️'}
                      {item.name === 'Crown' && '👑'}
                      {item.name === 'Sword' && '⚔️'}
                      {item.name === 'Swords' && '⚔️'}
                      {item.name === 'Star' && '★'}
                      {item.name === 'Heart' && '♥'}
                      {item.name === 'Trophy' && '🏆'}
                      {item.name === 'Gamepad2' && '🎮'}
                      {item.name === 'Rocket' && '🚀'}
                      {item.name === 'Coins' && '🪙'}
                      {item.name === 'Lock' && '🔒'}
                      {item.name === 'Bell' && '🔔'}
                      {item.name === 'Play' && '▶'}
                      {item.name === 'Check' && '✔'}
                      {item.name === 'Eye' && '👁️'}
                      {item.name === 'Settings' && '⚙️'}
                      {item.name === 'Key' && '🔑'}
                      {item.name === 'Gem' && '💎'}
                      {item.name === 'Package' && '📦'}
                      {item.name === 'Crosshair' && '🎯'}
                      {item.name === 'Compass' && '🧭'}
                    </span>
                    <span className="text-[9px] font-bold text-white truncate w-full text-center">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. EFFECTS TOGGLES */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              5. Visual Micro-Interaction Toggles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                onClick={() => setSparklesEnabled(!sparklesEnabled)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  sparklesEnabled ? 'border-yellow-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">Glint Sparkles</span>
                  <span className="text-[10px] text-gray-400">Pulsing Star Flares</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${sparklesEnabled ? 'bg-yellow-400 border-white' : 'border-gray-500'}`} />
              </div>

              <div 
                onClick={() => setShineEnabled(!shineEnabled)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  shineEnabled ? 'border-cyan-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">Shine Reflection</span>
                  <span className="text-[10px] text-gray-400">Surface Light Sweep</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${shineEnabled ? 'bg-cyan-400 border-white' : 'border-gray-500'}`} />
              </div>

              <div 
                onClick={() => setIdleFloatEnabled(!idleFloatEnabled)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  idleFloatEnabled ? 'border-purple-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">Idle Levitation</span>
                  <span className="text-[10px] text-gray-400">Sine Floating Breath</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${idleFloatEnabled ? 'bg-purple-400 border-white' : 'border-gray-500'}`} />
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: LIVE PHYSICS STAGE & CODE VIEWER (5 COLS)              */}
        {/* ==================================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">

          {/* Live Studio Stage */}
          <div className="glass rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl">
            <div className="bg-[#12122a] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-green-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Live Physics Stage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { playClickSound(); setReplayCount(c => c + 1); }}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono transition-all"
                >
                  Test Click
                </button>
                <span className="text-[10px] text-gray-400 font-mono">Interactive</span>
              </div>
            </div>

            {/* Stage Canvas */}
            <div 
              onClick={() => { playClickSound(); }}
              className="p-8 sm:p-12 flex flex-col items-center justify-center bg-[#0d0d1a] relative min-h-[380px] select-none overflow-hidden"
            >
              {/* Studio Canvas Grid */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* The Live Interactive BloxFX Preview Component */}
              <div key={replayCount} className="relative z-10 w-full flex items-center justify-center">
                <Preview 
                  asset={activeAsset} 
                  customHue={customHue}
                  customIcon={customIcon}
                  customLabel={customLabel}
                  customSpeed={customSpeed}
                  large={true}
                />
              </div>

              {/* Asset Meta Info */}
              <div className="mt-6 text-center z-10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-secondary)] block font-bold">
                  {activeAsset.category} • #{activeAsset.id}
                </span>
                <h4 className="text-base font-black text-white mt-0.5">{activeAsset.name}</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">{activeAsset.description}</p>
              </div>
            </div>
          </div>

          {/* Generated Luau Script Viewer */}
          <div className="glass rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl">
            <div className="bg-[#12122a] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">
                  Roblox Luau Script ({activeAsset.name})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={downloadScript}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  title="Download .luau file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.luau</span>
                </button>

                <button 
                  onClick={copyCode}
                  className="px-3 py-1.5 bg-[var(--accent-primary)] hover:bg-[#ff575e] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
            </div>

            <div className="max-h-[380px] overflow-auto text-xs bg-[#090912]">
              <SyntaxHighlighter language="lua" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}>
                {generatedCode || '-- Generating procedural Roblox Luau code...'}
              </SyntaxHighlighter>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
