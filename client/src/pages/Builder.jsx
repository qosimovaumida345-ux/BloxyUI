import { useState, useEffect, useRef } from 'react';
import { 
  Wand2, Copy, Check, Play, Sparkles, Layers, Sliders, CheckCircle2,
  Volume2, VolumeX, Download, RefreshCw, Layout, Square, CreditCard,
  Activity, Shield, Heart, Coins, Zap, Trophy, Gift, Flame, Key,
  Crosshair, Gem, Bell, Lock, Compass, Settings as SettingsIcon,
  ShoppingBag, Crown, Sword, Star, Package
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { generateCode } from '../lib/api';

// ============================================================================
// 1. COMPONENT TYPES CATALOG
// ============================================================================
const COMPONENT_TYPES = [
  {
    id: 'button',
    name: '3D Simulator Button',
    subtitle: 'Classic beveled button with shine & squish',
    icon: Square,
    defaultText: 'SHOP',
    defaultSubText: '99 ROBUX'
  },
  {
    id: 'panel',
    name: 'Game Window / Panel',
    subtitle: 'Modal dialog with header, close & item grid',
    icon: Layout,
    defaultText: 'INVENTORY',
    defaultSubText: 'Bag Capacity: 24/50'
  },
  {
    id: 'progressbar',
    name: 'Loading / Health Bar',
    subtitle: 'Juicy beveled bar with animated stripes & shine',
    icon: Activity,
    defaultText: 'LEVEL 42',
    defaultSubText: '750 / 1,000 XP'
  },
  {
    id: 'card',
    name: 'Loot / Item Card',
    subtitle: 'Inventory slot with rarity frame & spotlight',
    icon: CreditCard,
    defaultText: 'BLADE OF LIGHT',
    defaultSubText: '+150 ATK • 500 GEMS'
  },
  {
    id: 'toast',
    name: 'Achievement Banner',
    subtitle: 'Pop-in notification toast with glowing border',
    icon: Trophy,
    defaultText: 'ACHIEVEMENT UNLOCKED',
    defaultSubText: '+5,000 EXP & Title "Master"'
  }
];

// ============================================================================
// 2. 16 PREMIUM COLOR PALETTES
// ============================================================================
const THEMES = [
  {
    id: 'cartoony',
    name: 'Cartoony Red',
    category: 'Simulator',
    bg: 'from-[#ff575e] to-[#e62239]',
    stroke: '#ff958e',
    shadow: '#9a1428',
    textShadow: '#a9182c',
    accent: '#e42c40',
    hex: '#ff575e',
    roblox: {
      shadow: 'Color3.fromRGB(154, 20, 40)',
      stroke: 'Color3.fromRGB(255, 149, 142)',
      top: 'Color3.fromRGB(255, 87, 94)',
      bottom: 'Color3.fromRGB(230, 34, 57)',
      textShadow: 'Color3.fromRGB(169, 24, 44)',
      accent: 'Color3.fromRGB(228, 44, 64)'
    }
  },
  {
    id: 'gold',
    name: 'Royal Gold',
    category: 'Simulator',
    bg: 'from-[#ffd700] to-[#daa520]',
    stroke: '#ffeb96',
    shadow: '#a06e0f',
    textShadow: '#965f0a',
    accent: '#daa520',
    hex: '#ffd700',
    roblox: {
      shadow: 'Color3.fromRGB(160, 110, 15)',
      stroke: 'Color3.fromRGB(255, 235, 150)',
      top: 'Color3.fromRGB(255, 215, 0)',
      bottom: 'Color3.fromRGB(218, 165, 32)',
      textShadow: 'Color3.fromRGB(150, 95, 10)',
      accent: 'Color3.fromRGB(218, 165, 32)'
    }
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    category: 'Sci-Fi',
    bg: 'from-[#785aff] to-[#4628d2]',
    stroke: '#00ebff',
    shadow: '#230f4b',
    textShadow: '#28145f',
    accent: '#00c8dc',
    hex: '#785aff',
    roblox: {
      shadow: 'Color3.fromRGB(35, 15, 75)',
      stroke: 'Color3.fromRGB(0, 235, 255)',
      top: 'Color3.fromRGB(120, 90, 255)',
      bottom: 'Color3.fromRGB(70, 40, 210)',
      textShadow: 'Color3.fromRGB(40, 20, 95)',
      accent: 'Color3.fromRGB(0, 200, 220)'
    }
  },
  {
    id: 'emerald',
    name: 'Toxic Emerald',
    category: 'Simulator',
    bg: 'from-[#2ecc71] to-[#27ae60]',
    stroke: '#78ffbe',
    shadow: '#0a5a3c',
    textShadow: '#0f5032',
    accent: '#1e9650',
    hex: '#2ecc71',
    roblox: {
      shadow: 'Color3.fromRGB(10, 90, 60)',
      stroke: 'Color3.fromRGB(120, 255, 190)',
      top: 'Color3.fromRGB(46, 204, 113)',
      bottom: 'Color3.fromRGB(39, 174, 96)',
      textShadow: 'Color3.fromRGB(15, 80, 50)',
      accent: 'Color3.fromRGB(30, 150, 80)'
    }
  },
  {
    id: 'void',
    name: 'Dark Obsidian',
    category: 'Dark',
    bg: 'from-[#323746] to-[#1e232d]',
    stroke: '#8c96aa',
    shadow: '#0f0f19',
    textShadow: '#0f0f14',
    accent: '#282d3c',
    hex: '#323746',
    roblox: {
      shadow: 'Color3.fromRGB(15, 15, 25)',
      stroke: 'Color3.fromRGB(140, 150, 170)',
      top: 'Color3.fromRGB(50, 55, 70)',
      bottom: 'Color3.fromRGB(30, 35, 45)',
      textShadow: 'Color3.fromRGB(15, 15, 20)',
      accent: 'Color3.fromRGB(40, 45, 60)'
    }
  },
  {
    id: 'pink',
    name: 'Bubblegum Pop',
    category: 'Candy',
    bg: 'from-[#ff6b9d] to-[#ee3f7e]',
    stroke: '#ffb3d1',
    shadow: '#9c1445',
    textShadow: '#a01040',
    accent: '#ff4081',
    hex: '#ff6b9d',
    roblox: {
      shadow: 'Color3.fromRGB(156, 20, 69)',
      stroke: 'Color3.fromRGB(255, 179, 209)',
      top: 'Color3.fromRGB(255, 107, 157)',
      bottom: 'Color3.fromRGB(238, 63, 126)',
      textShadow: 'Color3.fromRGB(160, 16, 64)',
      accent: 'Color3.fromRGB(255, 64, 129)'
    }
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    category: 'Simulator',
    bg: 'from-[#00b4d8] to-[#0077b6]',
    stroke: '#90e0ef',
    shadow: '#03045e',
    textShadow: '#023e8a',
    accent: '#0096c7',
    hex: '#00b4d8',
    roblox: {
      shadow: 'Color3.fromRGB(3, 4, 94)',
      stroke: 'Color3.fromRGB(144, 224, 239)',
      top: 'Color3.fromRGB(0, 180, 216)',
      bottom: 'Color3.fromRGB(0, 119, 182)',
      textShadow: 'Color3.fromRGB(2, 62, 138)',
      accent: 'Color3.fromRGB(0, 150, 199)'
    }
  },
  {
    id: 'magma',
    name: 'Molten Magma',
    category: 'Simulator',
    bg: 'from-[#ff7b00] to-[#e85d04]',
    stroke: '#ffb703',
    shadow: '#9d0208',
    textShadow: '#6a040f',
    accent: '#dc2f02',
    hex: '#ff7b00',
    roblox: {
      shadow: 'Color3.fromRGB(157, 2, 8)',
      stroke: 'Color3.fromRGB(255, 183, 3)',
      top: 'Color3.fromRGB(255, 123, 0)',
      bottom: 'Color3.fromRGB(232, 93, 4)',
      textShadow: 'Color3.fromRGB(106, 4, 15)',
      accent: 'Color3.fromRGB(220, 47, 2)'
    }
  },
  {
    id: 'purple',
    name: 'Mystic Amethyst',
    category: 'Magic',
    bg: 'from-[#9d4edd] to-[#7b2cbf]',
    stroke: '#e0aaff',
    shadow: '#3c096c',
    textShadow: '#240046',
    accent: '#5a189a',
    hex: '#9d4edd',
    roblox: {
      shadow: 'Color3.fromRGB(60, 9, 108)',
      stroke: 'Color3.fromRGB(224, 170, 255)',
      top: 'Color3.fromRGB(157, 78, 221)',
      bottom: 'Color3.fromRGB(123, 44, 191)',
      textShadow: 'Color3.fromRGB(36, 0, 70)',
      accent: 'Color3.fromRGB(90, 24, 154)'
    }
  },
  {
    id: 'frost',
    name: 'Frostbite Cyan',
    category: 'Sci-Fi',
    bg: 'from-[#48cae4] to-[#0096c7]',
    stroke: '#caf0f8',
    shadow: '#023e8a',
    textShadow: '#0077b6',
    accent: '#00b4d8',
    hex: '#48cae4',
    roblox: {
      shadow: 'Color3.fromRGB(2, 62, 138)',
      stroke: 'Color3.fromRGB(202, 240, 248)',
      top: 'Color3.fromRGB(72, 202, 228)',
      bottom: 'Color3.fromRGB(0, 150, 199)',
      textShadow: 'Color3.fromRGB(0, 119, 182)',
      accent: 'Color3.fromRGB(0, 180, 216)'
    }
  },
  {
    id: 'lime',
    name: 'Biohazard Lime',
    category: 'Sci-Fi',
    bg: 'from-[#aacc00] to-[#80b918]',
    stroke: '#d4f170',
    shadow: '#2b4c06',
    textShadow: '#1e3704',
    accent: '#55a630',
    hex: '#aacc00',
    roblox: {
      shadow: 'Color3.fromRGB(43, 76, 6)',
      stroke: 'Color3.fromRGB(212, 241, 112)',
      top: 'Color3.fromRGB(170, 204, 0)',
      bottom: 'Color3.fromRGB(128, 185, 24)',
      textShadow: 'Color3.fromRGB(30, 55, 4)',
      accent: 'Color3.fromRGB(85, 166, 48)'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Coral',
    category: 'Candy',
    bg: 'from-[#ff9f43] to-[#ee5253]',
    stroke: '#fed330',
    shadow: '#8c1d40',
    textShadow: '#701530',
    accent: '#ff6b6b',
    hex: '#ff9f43',
    roblox: {
      shadow: 'Color3.fromRGB(140, 29, 64)',
      stroke: 'Color3.fromRGB(254, 211, 48)',
      top: 'Color3.fromRGB(255, 159, 67)',
      bottom: 'Color3.fromRGB(238, 82, 83)',
      textShadow: 'Color3.fromRGB(112, 21, 48)',
      accent: 'Color3.fromRGB(255, 107, 107)'
    }
  },
  {
    id: 'crimson',
    name: 'Blood Crimson',
    category: 'Dark',
    bg: 'from-[#c0392b] to-[#781812]',
    stroke: '#e74c3c',
    shadow: '#400603',
    textShadow: '#300402',
    accent: '#962d22',
    hex: '#c0392b',
    roblox: {
      shadow: 'Color3.fromRGB(64, 6, 3)',
      stroke: 'Color3.fromRGB(231, 76, 60)',
      top: 'Color3.fromRGB(192, 57, 43)',
      bottom: 'Color3.fromRGB(120, 24, 18)',
      textShadow: 'Color3.fromRGB(48, 4, 2)',
      accent: 'Color3.fromRGB(150, 45, 34)'
    }
  },
  {
    id: 'galaxy',
    name: 'Cosmic Nebula',
    category: 'Magic',
    bg: 'from-[#a29bfe] to-[#6c5ce7]',
    stroke: '#fd79a8',
    shadow: '#2c1b74',
    textShadow: '#1e1058',
    accent: '#81ecec',
    hex: '#a29bfe',
    roblox: {
      shadow: 'Color3.fromRGB(44, 27, 116)',
      stroke: 'Color3.fromRGB(253, 121, 168)',
      top: 'Color3.fromRGB(162, 155, 254)',
      bottom: 'Color3.fromRGB(108, 92, 231)',
      textShadow: 'Color3.fromRGB(30, 16, 88)',
      accent: 'Color3.fromRGB(129, 236, 236)'
    }
  },
  {
    id: 'silver',
    name: 'Platinum Steel',
    category: 'Dark',
    bg: 'from-[#b2bec3] to-[#636e72]',
    stroke: '#dfe6e9',
    shadow: '#2d3436',
    textShadow: '#1e272e',
    accent: '#74b9ff',
    hex: '#b2bec3',
    roblox: {
      shadow: 'Color3.fromRGB(45, 52, 54)',
      stroke: 'Color3.fromRGB(223, 230, 233)',
      top: 'Color3.fromRGB(178, 190, 195)',
      bottom: 'Color3.fromRGB(99, 110, 114)',
      textShadow: 'Color3.fromRGB(30, 39, 46)',
      accent: 'Color3.fromRGB(116, 185, 255)'
    }
  },
  {
    id: 'minimal',
    name: 'Midnight Slate',
    category: 'Dark',
    bg: 'from-[#2f3542] to-[#1e222a]',
    stroke: '#57606f',
    shadow: '#0c0d10',
    textShadow: '#050608',
    accent: '#70a1ff',
    hex: '#2f3542',
    roblox: {
      shadow: 'Color3.fromRGB(12, 13, 16)',
      stroke: 'Color3.fromRGB(87, 96, 111)',
      top: 'Color3.fromRGB(47, 53, 66)',
      bottom: 'Color3.fromRGB(30, 34, 42)',
      textShadow: 'Color3.fromRGB(5, 6, 8)',
      accent: 'Color3.fromRGB(112, 161, 255)'
    }
  }
];

// ============================================================================
// 3. 24 PROCEDURAL VECTOR ICONS
// ============================================================================
const ICONS = [
  { id: 'shop', name: 'Market Stall', cat: 'Economy', icon: ShoppingBag },
  { id: 'crown', name: 'VIP Crown', cat: 'RPG', icon: Crown },
  { id: 'sword', name: 'Combat Blade', cat: 'RPG', icon: Sword },
  { id: 'star', name: 'Starlight Gem', cat: 'Status', icon: Star },
  { id: 'shield', name: 'Guardian Shield', cat: 'RPG', icon: Shield },
  { id: 'heart', name: 'Life Heart', cat: 'Status', icon: Heart },
  { id: 'coin', name: 'Golden Coin', cat: 'Economy', icon: Coins },
  { id: 'bolt', name: 'Energy Bolt', cat: 'Status', icon: Zap },
  { id: 'backpack', name: 'Inventory Pack', cat: 'RPG', icon: Package },
  { id: 'settings', name: 'Settings Gear', cat: 'UI', icon: SettingsIcon },
  { id: 'trophy', name: 'Champion Cup', cat: 'Status', icon: Trophy },
  { id: 'gift', name: 'Reward Gift', cat: 'Economy', icon: Gift },
  { id: 'flame', name: 'Fire Boost', cat: 'Status', icon: Flame },
  { id: 'key', name: 'Dungeon Key', cat: 'RPG', icon: Key },
  { id: 'target', name: 'Bullseye', cat: 'RPG', icon: Crosshair },
  { id: 'diamond', name: 'Prism Gem', cat: 'Economy', icon: Gem },
  { id: 'bell', name: 'Alert Bell', cat: 'UI', icon: Bell },
  { id: 'lock', name: 'Security Lock', cat: 'UI', icon: Lock },
  { id: 'compass', name: 'Compass', cat: 'UI', icon: Compass }
];

// 7 Glint Sparkles locations
const SPARKLE_LOCATIONS = [
  { left: '8%', top: '19%', size: 10, delay: '0s' },
  { left: '32%', top: '11%', size: 7, delay: '0.17s' },
  { left: '87%', top: '18%', size: 10, delay: '0.34s' },
  { left: '91%', top: '63%', size: 8, delay: '0.51s' },
  { left: '68%', top: '81%', size: 7, delay: '0.68s' },
  { left: '9%', top: '74%', size: 6, delay: '0.85s' },
  { left: '40%', top: '78%', size: 6, delay: '1.02s' }
];

export default function Builder() {
  // Component Type
  const [componentType, setComponentType] = useState('button');

  // Design Controls
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [themeFilter, setThemeFilter] = useState('All');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [iconFilter, setIconFilter] = useState('All');

  // Custom Labels
  const [textLabel, setTextLabel] = useState('SHOP');
  const [subTextLabel, setSubTextLabel] = useState('99 ROBUX');

  // Sliders & Geometry
  const [cornerRadius, setCornerRadius] = useState(17);
  const [bevelOffset, setBevelOffset] = useState(7);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [progressPercent, setProgressPercent] = useState(75);

  // Micro-interactions & Physics
  const [physicsMode, setPhysicsMode] = useState('squish'); // squish, bounce, wobble, pulse
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [shineEnabled, setShineEnabled] = useState(true);
  const [idleFloatEnabled, setIdleFloatEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Interactive Live Stage States
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isShining, setIsShining] = useState(false);

  // Code Generation
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Play realistic juicy click sound using Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  };

  const triggerShine = () => {
    setIsShining(true);
    setTimeout(() => setIsShining(false), 550);
  };

  const handleComponentChange = (type) => {
    setComponentType(type.id);
    setTextLabel(type.defaultText);
    setSubTextLabel(type.defaultSubText);
  };

  // Generate Procedural Code
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await generateCode({
        componentType,
        text: textLabel,
        subText: subTextLabel,
        theme: selectedTheme.id,
        icon: selectedIcon.id,
        sparkles: sparklesEnabled,
        shine: shineEnabled,
        idleFloat: idleFloatEnabled,
        bevelOffset,
        cornerRadius,
        strokeWidth
      });
      if (res && (res.code || res.luauCode)) {
        setGeneratedCode(res.code || res.luauCode);
      }
    } catch (err) {
      console.warn("Using local fallback generator:", err);
    } finally {
      setIsGenerating(false);
    }
  };

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
    a.download = `BloxyUI_${componentType.toUpperCase()}_${textLabel.replace(/\\s+/g, '_')}.luau`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  // Filtered lists
  const filteredThemes = THEMES.filter(t => themeFilter === 'All' || t.category === themeFilter);
  const filteredIcons = ICONS.filter(i => iconFilter === 'All' || i.cat === iconFilter);

  // Auto generate on first load
  useEffect(() => {
    handleGenerate();
  }, [componentType, selectedTheme, selectedIcon, sparklesEnabled, shineEnabled, idleFloatEnabled, bevelOffset, cornerRadius, strokeWidth, textLabel, subTextLabel]);

  // Icon preview helper
  const renderSelectedIcon = (size = 32, color = '#ffffff') => {
    const IconComp = selectedIcon.icon || Star;
    return <IconComp size={size} style={{ color }} className="drop-shadow-sm" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>All-In-One Visual Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Visual UI Constructor</span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 font-mono border border-green-500/30">
              Live Physics
            </span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Buttons, Panels, Progress Bars, Cards & Toasts — all procedural, zero broken asset IDs, 1-click Roblox Luau export.
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
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[#ff7675] hover:opacity-95 text-white rounded-xl font-black text-sm tracking-wide shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Wand2 className="w-4 h-4" />}
            <span>Re-Generate Luau</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls (7 cols) & Right Live Physics Stage (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================================================================== */}
        {/* LEFT COLUMN: VISUAL CONTROLS                                         */}
        {/* ==================================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 1. COMPONENT TYPE SELECTOR */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
                1. Select Component Architecture
              </h3>
              <span className="text-[11px] font-mono text-[var(--accent-secondary)]">
                {COMPONENT_TYPES.find(c => c.id === componentType)?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {COMPONENT_TYPES.map(comp => {
                const Icon = comp.icon;
                const isSelected = componentType === comp.id;
                return (
                  <div
                    key={comp.id}
                    onClick={() => handleComponentChange(comp)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-1.5 select-none ${
                      isSelected 
                        ? 'border-white bg-[var(--bg-card)] shadow-lg shadow-red-500/10 scale-[1.02]' 
                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-red-400' : 'text-gray-400'}`} />
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="font-bold text-xs text-white truncate">{comp.name}</span>
                    <span className="text-[10px] text-[var(--text-secondary)] line-clamp-1">{comp.subtitle}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. TEXT LABELS & INPUTS */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              2. Custom Labels & Typography
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Main Title / Label
                </label>
                <input 
                  type="text" 
                  value={textLabel}
                  onChange={(e) => setTextLabel(e.target.value.toUpperCase())}
                  maxLength={18}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-white font-black tracking-wider text-base outline-none focus:border-[var(--accent-primary)] font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Subtitle / Stat / Price
                </label>
                <input 
                  type="text" 
                  value={subTextLabel}
                  onChange={(e) => setSubTextLabel(e.target.value)}
                  maxLength={24}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-white font-medium text-sm outline-none focus:border-[var(--accent-primary)] font-mono"
                />
              </div>
            </div>

            {/* If progressbar, show percentage slider */}
            {componentType === 'progressbar' && (
              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-gray-400 font-mono">Fill Percentage:</span>
                  <span className="text-green-400 font-bold font-mono">{progressPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={progressPercent}
                  onChange={(e) => setProgressPercent(Number(e.target.value))}
                  className="w-full accent-green-400 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* 3. 16 COLOR PALETTES */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                3. Color Palette ({THEMES.length} Themes)
              </h3>

              {/* Category tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-[11px] font-mono">
                {['All', 'Simulator', 'Sci-Fi', 'Dark', 'Candy', 'Magic'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setThemeFilter(cat)}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      themeFilter === cat ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
              {filteredThemes.map(theme => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2.5 relative select-none ${
                      isSelected
                        ? 'border-white bg-[var(--bg-card)] shadow-md scale-[1.03]'
                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500'
                    }`}
                  >
                    <div 
                      className={`w-7 h-7 rounded-lg bg-gradient-to-b ${theme.bg} shadow flex-shrink-0 border border-white/40`}
                      style={{ boxShadow: `0 2px 0 ${theme.shadow}` }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-[11px] text-white block truncate">{theme.name}</span>
                      <span className="text-[9px] text-gray-400 block truncate">{theme.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. PROCEDURAL VECTOR ICONS */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-400" />
                4. Procedural Vector Icon ({ICONS.length} Icons)
              </h3>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-[11px] font-mono">
                {['All', 'RPG', 'Economy', 'Status', 'UI'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setIconFilter(cat)}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      iconFilter === cat ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredIcons.map(iconItem => {
                const IconC = iconItem.icon;
                const isSelected = selectedIcon.id === iconItem.id;
                return (
                  <div
                    key={iconItem.id}
                    onClick={() => setSelectedIcon(iconItem)}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
                      isSelected
                        ? 'border-white bg-[var(--bg-card)] shadow scale-[1.05]'
                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-500 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <IconC className={`w-5 h-5 ${isSelected ? 'text-yellow-400' : 'text-gray-300'}`} />
                    <span className="text-[10px] font-bold text-white truncate w-full">{iconItem.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. MICRO-INTERACTIONS & EFFECTS TOGGLES */}
          <div className="glass p-5 rounded-2xl border border-[var(--border-color)]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              5. Interactive FX & Physics Toggles
            </h3>

            {/* Physics Style */}
            <div className="mb-4">
              <span className="text-[11px] font-mono text-gray-400 block mb-2 uppercase">Hover / Click Physics:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'squish', label: 'Tactile Squish' },
                  { id: 'bounce', label: 'Spring Bounce' },
                  { id: 'wobble', label: 'Jelly Wobble' },
                  { id: 'pulse', label: 'Rhythm Pulse' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setPhysicsMode(mode.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      physicsMode === mode.id ? 'border-white bg-white text-black' : 'border-[var(--border-color)] text-gray-300 bg-[var(--bg-secondary)]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Sparkles */}
              <div 
                onClick={() => setSparklesEnabled(!sparklesEnabled)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  sparklesEnabled ? 'border-yellow-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">7 Glint Sparkles</span>
                  <span className="text-[10px] text-gray-400">Pulsing Star Flares</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${sparklesEnabled ? 'bg-yellow-400 border-white' : 'border-gray-500'}`} />
              </div>

              {/* Shine Sweep */}
              <div 
                onClick={() => setShineEnabled(!shineEnabled)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                  shineEnabled ? 'border-cyan-400 bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-white block">Shine Reflection</span>
                  <span className="text-[10px] text-gray-400">Glide Sheen Bar</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${shineEnabled ? 'bg-cyan-400 border-white' : 'border-gray-500'}`} />
              </div>

              {/* Idle Float */}
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

            {/* Sliders for Rounding & Depth */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-[var(--border-color)]">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                  <span>Corner Radius:</span>
                  <span className="text-white font-bold">{cornerRadius}px</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="28" 
                  value={cornerRadius} 
                  onChange={(e) => setCornerRadius(Number(e.target.value))} 
                  className="w-full accent-[var(--accent-primary)] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                  <span>3D Depth Bevel:</span>
                  <span className="text-white font-bold">{bevelOffset}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="14" 
                  value={bevelOffset} 
                  onChange={(e) => setBevelOffset(Number(e.target.value))} 
                  className="w-full accent-[var(--accent-primary)] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                  <span>Border Stroke:</span>
                  <span className="text-white font-bold">{strokeWidth}px</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  value={strokeWidth} 
                  onChange={(e) => setStrokeWidth(Number(e.target.value))} 
                  className="w-full accent-[var(--accent-primary)] cursor-pointer"
                />
              </div>
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: LIVE PHYSICS STAGE & CODE VIEWER                       */}
        {/* ==================================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          
          {/* Live Studio Canvas */}
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
                  onClick={() => { playClickSound(); triggerShine(); }}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono transition-all"
                >
                  Test Click
                </button>
                <span className="text-[10px] text-gray-400 font-mono">Hover & Click</span>
              </div>
            </div>

            <div className="p-8 sm:p-12 flex items-center justify-center bg-[#0d0d1a] relative min-h-[380px] select-none overflow-hidden">
              {/* Studio Canvas Grid Background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* COMPONENT PREVIEW CONTAINER */}
              <div
                className={`relative cursor-pointer transition-all ${idleFloatEnabled ? 'animate-bounce' : ''}`}
                style={{ animationDuration: '3s' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
                onMouseDown={() => { setIsPressed(true); playClickSound(); if (shineEnabled) triggerShine(); }}
                onMouseUp={() => { setIsPressed(false); }}
              >
                {/* 1. BUTTON PREVIEW */}
                {componentType === 'button' && (
                  <div className="relative">
                    {/* 3D Extruded Depth Shadow */}
                    <div 
                      className="absolute inset-0 transition-all"
                      style={{ 
                        backgroundColor: selectedTheme.shadow,
                        borderRadius: `${cornerRadius}px`,
                        transform: `translateY(${bevelOffset}px)`
                      }}
                    />

                    {/* Button Surface */}
                    <div 
                      className={`
                        relative z-10 w-[272px] h-[90px] overflow-hidden flex items-center px-5
                        bg-gradient-to-b ${selectedTheme.bg} transition-transform duration-150
                        ${physicsMode === 'wobble' && isHovered ? 'animate-spin' : ''}
                      `}
                      style={{
                        borderRadius: `${cornerRadius}px`,
                        border: `${strokeWidth}px solid ${selectedTheme.stroke}`,
                        transform: isPressed 
                          ? 'scale(0.95)' 
                          : isHovered 
                            ? (physicsMode === 'bounce' ? 'scale(1.08)' : 'scale(1.045)') 
                            : 'scale(1)'
                      }}
                    >
                      {/* Icon */}
                      <div className="relative z-20 flex-shrink-0 mr-3.5">
                        {renderSelectedIcon(36, '#ffffff')}
                      </div>

                      {/* Text */}
                      <div className="relative z-20 flex-1 min-w-0">
                        <div className="relative">
                          <span 
                            className="absolute font-black text-2xl tracking-wide translate-y-[2.5px] truncate block"
                            style={{ color: selectedTheme.textShadow }}
                          >
                            {textLabel}
                          </span>
                          <span className="relative font-black text-2xl tracking-wide text-white truncate block">
                            {textLabel}
                          </span>
                        </div>
                        <span 
                          className="font-bold text-xs tracking-wider block mt-0.5 truncate"
                          style={{ color: selectedTheme.stroke }}
                        >
                          {subTextLabel}
                        </span>
                      </div>

                      {/* Sparkles */}
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
                          <div className="w-[20%] h-full bg-white absolute" />
                          <div className="w-full h-[20%] bg-white absolute" />
                          <div className="w-[50%] h-[50%] bg-white rotate-45 absolute" />
                        </div>
                      ))}

                      {/* Shine Reflection Bar */}
                      {shineEnabled && (
                        <div 
                          className={`
                            absolute pointer-events-none w-10 h-48 bg-white/30 rotate-[22deg] -top-10
                            transition-all duration-500 ease-out z-15
                            ${isShining ? 'translate-x-[320px]' : '-translate-x-32'}
                          `}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* 2. PANEL / MODAL PREVIEW */}
                {componentType === 'panel' && (
                  <div className="relative">
                    {/* Shadow */}
                    <div 
                      className="absolute inset-0 transition-all"
                      style={{ 
                        backgroundColor: selectedTheme.shadow,
                        borderRadius: `${cornerRadius}px`,
                        transform: `translateY(${bevelOffset}px)`
                      }}
                    />

                    {/* Window Frame */}
                    <div 
                      className="relative z-10 w-[310px] h-[250px] bg-[#181b24] overflow-hidden flex flex-col transition-transform duration-150"
                      style={{
                        borderRadius: `${cornerRadius}px`,
                        border: `${strokeWidth}px solid ${selectedTheme.stroke}`,
                        transform: isPressed ? 'scale(0.97)' : isHovered ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      {/* Header Bar */}
                      <div 
                        className={`h-12 bg-gradient-to-b ${selectedTheme.bg} flex items-center justify-between px-3.5 border-b border-black/20`}
                      >
                        <div className="flex items-center gap-2">
                          {renderSelectedIcon(18, '#ffffff')}
                          <span className="font-black text-sm text-white tracking-wider">{textLabel}</span>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black/30 flex items-center justify-center text-white text-xs font-bold">
                          ✕
                        </div>
                      </div>

                      {/* Body Slot Grid */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map(s => (
                            <div key={s} className="h-16 rounded-lg bg-[#242834] border border-[#3c4254] flex flex-col items-center justify-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 opacity-60" />
                              <span className="text-[9px] text-gray-400 font-mono">#{s}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Action Button */}
                        <div 
                          className={`py-2 rounded-lg bg-gradient-to-b ${selectedTheme.bg} text-center font-black text-xs text-white tracking-wider shadow-md`}
                          style={{ border: `1px solid ${selectedTheme.stroke}` }}
                        >
                          CLAIM ALL REWARDS
                        </div>
                      </div>

                      {/* Shine Reflection */}
                      {shineEnabled && (
                        <div 
                          className={`
                            absolute pointer-events-none w-10 h-64 bg-white/20 rotate-[22deg] -top-10
                            transition-all duration-500 ease-out z-20
                            ${isShining ? 'translate-x-[360px]' : '-translate-x-32'}
                          `}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* 3. PROGRESS / HEALTH BAR PREVIEW */}
                {componentType === 'progressbar' && (
                  <div className="relative">
                    {/* Shadow */}
                    <div 
                      className="absolute inset-0 transition-all"
                      style={{ 
                        backgroundColor: selectedTheme.shadow,
                        borderRadius: `${cornerRadius}px`,
                        transform: `translateY(${bevelOffset}px)`
                      }}
                    />

                    {/* Well */}
                    <div 
                      className="relative z-10 w-[300px] h-[54px] bg-[#161820] overflow-hidden flex items-center px-1 transition-transform duration-150"
                      style={{
                        borderRadius: `${cornerRadius}px`,
                        border: `${strokeWidth}px solid ${selectedTheme.stroke}`,
                        transform: isPressed ? 'scale(0.97)' : isHovered ? 'scale(1.03)' : 'scale(1)'
                      }}
                    >
                      {/* Filled Portion */}
                      <div 
                        className={`h-[42px] bg-gradient-to-b ${selectedTheme.bg} relative overflow-hidden transition-all duration-300 flex items-center justify-between px-3`}
                        style={{
                          width: `${progressPercent}%`,
                          borderRadius: `${Math.max(4, cornerRadius - 4)}px`
                        }}
                      >
                        {/* Moving Stripes Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] [background-size:24px_24px] opacity-70" />
                      </div>

                      {/* Floating Text Over Entire Bar */}
                      <div className="absolute inset-0 z-20 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                          {renderSelectedIcon(20, '#ffffff')}
                          <span className="font-black text-xs text-white tracking-wider">{textLabel}</span>
                        </div>
                        <span className="font-bold text-xs text-white font-mono drop-shadow">{subTextLabel}</span>
                      </div>

                      {/* Shine Reflection */}
                      {shineEnabled && (
                        <div 
                          className={`
                            absolute pointer-events-none w-8 h-32 bg-white/30 rotate-[22deg] -top-6
                            transition-all duration-500 ease-out z-30
                            ${isShining ? 'translate-x-[340px]' : '-translate-x-20'}
                          `}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* 4. ITEM / LOOT CARD PREVIEW */}
                {componentType === 'card' && (
                  <div className="relative">
                    {/* Shadow */}
                    <div 
                      className="absolute inset-0 transition-all"
                      style={{ 
                        backgroundColor: selectedTheme.shadow,
                        borderRadius: `${cornerRadius}px`,
                        transform: `translateY(${bevelOffset}px)`
                      }}
                    />

                    {/* Card Surface */}
                    <div 
                      className="relative z-10 w-[210px] h-[260px] bg-[#181a24] overflow-hidden flex flex-col items-center p-3.5 transition-transform duration-150"
                      style={{
                        borderRadius: `${cornerRadius}px`,
                        border: `${strokeWidth}px solid ${selectedTheme.stroke}`,
                        transform: isPressed ? 'scale(0.96)' : isHovered ? 'scale(1.04)' : 'scale(1)'
                      }}
                    >
                      {/* Top Rarity Tag */}
                      <div 
                        className={`w-full py-1 rounded-md bg-gradient-to-r ${selectedTheme.bg} text-center font-black text-[10px] text-white tracking-widest uppercase mb-3 shadow`}
                      >
                        LEGENDARY
                      </div>

                      {/* Icon Pedestal */}
                      <div 
                        className="w-20 h-20 rounded-full bg-[#242836] flex items-center justify-center border-2 mb-3 shadow-inner relative"
                        style={{ borderColor: selectedTheme.stroke }}
                      >
                        {renderSelectedIcon(40, '#ffffff')}
                        {sparklesEnabled && (
                          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping" />
                        )}
                      </div>

                      {/* Title & Stats */}
                      <span className="font-black text-sm text-white tracking-wider text-center truncate w-full">
                        {textLabel}
                      </span>
                      <span 
                        className="font-bold text-[11px] font-mono tracking-wide text-center mt-0.5 truncate w-full"
                        style={{ color: selectedTheme.stroke }}
                      >
                        {subTextLabel}
                      </span>

                      {/* Equip Button */}
                      <div 
                        className={`w-full py-1.5 rounded-lg bg-gradient-to-b ${selectedTheme.bg} text-center font-black text-xs text-white tracking-wider mt-auto shadow`}
                      >
                        EQUIP
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. TOAST BANNER PREVIEW */}
                {componentType === 'toast' && (
                  <div className="relative">
                    {/* Shadow */}
                    <div 
                      className="absolute inset-0 transition-all"
                      style={{ 
                        backgroundColor: selectedTheme.shadow,
                        borderRadius: `${cornerRadius}px`,
                        transform: `translateY(${bevelOffset}px)`
                      }}
                    />

                    {/* Toast Body */}
                    <div 
                      className="relative z-10 w-[310px] h-[76px] bg-[#181a24] overflow-hidden flex items-center px-4 gap-3.5 transition-transform duration-150"
                      style={{
                        borderRadius: `${cornerRadius}px`,
                        border: `${strokeWidth}px solid ${selectedTheme.stroke}`,
                        transform: isPressed ? 'scale(0.97)' : isHovered ? 'scale(1.03)' : 'scale(1)'
                      }}
                    >
                      {/* Left Accent Stripe */}
                      <div 
                        className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${selectedTheme.bg} flex-shrink-0`}
                      />

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {renderSelectedIcon(28, selectedTheme.stroke)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span className="font-black text-xs text-white tracking-wider block truncate">
                          {textLabel}
                        </span>
                        <span 
                          className="font-medium text-[11px] block truncate mt-0.5"
                          style={{ color: selectedTheme.stroke }}
                        >
                          {subTextLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* CODE VIEWER & EXPORT */}
          <div className="glass rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl">
            <div className="bg-[#12122a] p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">
                  Procedural Luau Script ({componentType})
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
